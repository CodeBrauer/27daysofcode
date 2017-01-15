if (document.querySelector('.more .icon-plus')) {
    document.querySelector('.more .icon-plus').addEventListener('click', function() {
        var optionCount = 0;
        [].forEach.call(document.querySelectorAll('input[id^="op"]'), function(element) {
            optionCount = Math.max(optionCount, parseInt(element.getAttribute('id').match(/\d+/)));
        });
        optionCount++;
        var addHTML = '<div class="group">\
        <label for="op'+(optionCount)+'">Option '+optionCount+':</label>\
        <input type="text" name="options[]" id="op'+optionCount+'" maxlength="255">\
        </div>';
        document.querySelector('.more-answers').innerHTML += addHTML;
    });
}

[].forEach.call(document.querySelectorAll('.bar'), function(element) {
    var count   = parseInt(element.getAttribute('data-count'));
    var entries = parseInt(element.getAttribute('data-entries'));
    element.style.width =  entries/count*100 + '%';
});