(function(){
    var ajax = new XMLHttpRequest();
    ajax.open('GET', 'data_comma.csv', true);
    ajax.onload = function() {
        new CSV2HTML('.data', ajax.responseText, ';', true);
    };
    ajax.send();
})();