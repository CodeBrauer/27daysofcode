'use strict';

(function() {
    function Rapid70(selector) {
        this.heading    = document.querySelector('header h1');
        this.game       = document.querySelector(selector);
        this.numbersEl  = this.game.querySelector('.numbers');
        this.intro      = this.game.querySelector('.start');
        this.btn        = this.intro.querySelector('.btn');
        this.info       = this.game.querySelector('.info');
        this.score      = this.info.querySelector('.score');
        this.timer      = this.info.querySelector('.timer');
        this.gameoverEl = this.game.querySelector('.gameover');
        this.finalscore = this.gameoverEl.querySelector('.finalscore');
        this.finaltime  = this.gameoverEl.querySelector('.finaltime');
        this.highscore  = this.gameoverEl.querySelector('.highscore');
        
        this.selectedNumbers = [0];


        this.setScore = function(score) {
            this.score.innerHTML = score;
        };

        this.antiCheat = function(e) {
            if ((e.ctrlKey || e.metaKey) && e.keyCode === 70) {
                e.preventDefault();
                this.setScore(parseInt(this.score.innerHTML) - 10);
            }
        };

        this.numberSelect = function(e) {
            var selected = e.target;
            var matchNum = this.selectedNumbers[this.selectedNumbers.length - 1] + 1;

            if (matchNum == 70) {
                this.numbersEl.classList.add('hidden');
                this.setScore(matchNum);
                this.gameover();
            }

            if (parseInt(selected.innerHTML) === matchNum) {
                this.selectedNumbers.push(matchNum);
                selected.classList.add('out');
                this.setScore(matchNum);
            } else if (parseInt(selected.innerHTML) > matchNum) {
                this.gameover();
            }
        };

        this.updateTimer = function() {
            if (parseFloat(this.timer.innerHTML).toFixed(1) === '1.0') {
                this.gameover();return;
            }
            this.timer.innerHTML = (parseFloat(this.timer.innerHTML) - .1).toFixed(1) + 's';
        };

        this.getHighscore = function() {
            return localStorage.getItem('highscore');
        };

        this.setHighscore = function(score) {
            if (this.getHighscore() < score) {
                localStorage.setItem('highscore', score);
            }
        };

        this.gameover = function () {
            if (parseFloat(this.timer.innerHTML) > 59.8) {
                return; // double click prevention
            }
            clearInterval(this.countdown);
            this.numbersEl.classList.add('hidden');
            this.info.classList.add('hidden');
            this.heading.innerHTML = 'Gameover!';
            this.heading.classList.remove('vhidden');

            this.setHighscore(this.score.innerHTML);

            this.finalscore.innerHTML = this.score.innerHTML;
            this.finaltime.innerHTML  = this.timer.innerHTML;
            this.highscore.innerHTML  = this.getHighscore();
            this.gameoverEl.classList.remove('hidden');
        };

        this.startGame = function() {
            
            window.addEventListener('keydown', this.antiCheat.bind(this), true);

            this.intro.classList.add('hidden');
            this.info.classList.remove('hidden');
            this.heading.classList.add('vhidden');
            
            var elementsNum = Array.from(Array(71).keys());
            elementsNum.shift(); // remove "0" => 1..70
            var elementsNum = _.shuffle(elementsNum);

            elementsNum.forEach(function(el) {
                this.tmpNumber = document.createElement('div');
                this.tmpNumber.innerHTML = el;
                this.numbersEl.appendChild(this.tmpNumber);
                ['click', 'touchstart'].forEach(function(eventType) {
                    this.tmpNumber.addEventListener(eventType, this.numberSelect.bind(this));
                }, this);
            }, this);
            
            this.numbersEl.classList.remove('hidden');
            this.countdown = setInterval(this.updateTimer.bind(this), 100);
        };


        ['click', 'touchstart'].forEach(function(eventType) {
            this.btn.addEventListener(eventType, this.startGame.bind(this));
        }, this);


    }
    new Rapid70('.game');
})();