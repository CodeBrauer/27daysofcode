function PasswordRequirements() {
    this.requirements = [];
    this.pwr          = document.querySelector('.password-requirements');
    this.input        = document.querySelector('input[type="password"]'); // or this.pwr.previousElementSibling
    this.regexMap = {
        uppercase: /[A-Z]/g,
        lowercase: /[a-z]/g,
        numbers: /[\d]/g,
        special: /[^a-zA-Z\d]/g,
        minLength: /.+/g
    };

    // parse all requirements
    [].forEach.call(this.pwr.querySelectorAll('span'), function(element) {
        var condition = Object.keys(element.dataset)[0];
        this.requirements.push({type: condition, length: element.dataset[condition]});
    }, this);

    // generates a regex for html5 pattern attribute 
    this.getPattern = function() {
        this.pattern = '^';
        this.requirements.forEach(function(req) {
            if (req.type !== 'minLength') {
                var regex_str = this.regexMap[req.type].toString();
                regex_str     = regex_str.replace('/g', '').replace('/', '');
                this.pattern += '(?=.*' + regex_str + '{' + req.length + ',})';
            }
        }, this);
        this.pattern += '(?!.*\\s).*$';
        return this.pattern;
    }

    this.input.setAttribute('pattern', this.getPattern());

    this.focusInput = function() {
        this.input.focus();
    }

    document.addEventListener('invalid', function() {

    }, true);

    // check each requirement and add class if requirement is met.
    this.checkPassword = function(e) {
        [].forEach.call(this.pwr.querySelectorAll('span'), function(element) {
            element.classList.remove('success');
        }, this);
        this.requirements.forEach(function(req) {
            if (this.checkRequirement(req)) {
                var className = req.type.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                this.pwr.querySelector('span[data-' + className + ']').classList.add('success');
            }
        }, this);
        // Debug
        document.querySelector('code.debug').innerHTML = this.input.value;
    }

    // check each requirement by regex & length
    this.checkRequirement = function(req) {
        var len = this.input.value.length - this.input.value.replace(this.regexMap[req.type], '').length;
        return len >= req.length;
    }

    this.input.addEventListener('keyup', this.checkPassword.bind(this), false);
}

(function() {
    new PasswordRequirements();
})();