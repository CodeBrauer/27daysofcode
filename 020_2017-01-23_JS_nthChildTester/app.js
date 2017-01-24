jQuery(document).ready(function() {
    function generateItems(items) {
        $('#testarea').html('');
        var html = '';
        for (var i = 1; i <= items; i++) {
            html += '<div>'+i+'</div>';
        }
        $('#testarea').append(html); // write once, better performance
    }
    function genColumn(colCount) {
        $('#testarea div').removeAttr('style'); // remove all existing clears
        $('#testarea div:nth-child(' + colCount + 'n+1)').css('clear', 'both');
    }
    function highlightExpression(exp) {
        // write CSS directly into <style> so it's gets proccessed by the browsers CSS and not by jQuery
        $('style').html('#testarea div:nth-child('+ exp +') { background: #32B67A; color:white; }');
    }

    $('#num').bind('input, keyup', function() {
        generateItems($(this).val()); // rewrites complete inner HTML so the columns are gone
        genColumn($('#col').val());
    });
    $('#col').bind('input, keyup', function() {
        genColumn($(this).val());
    });
    $('#exp').bind('input, keyup', function() {
        highlightExpression($(this).val());
    });

    // render it on page load
    highlightExpression($('#exp').val());
    generateItems($('#num').val());
    genColumn($('#col').val());
});