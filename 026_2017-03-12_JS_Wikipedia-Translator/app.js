$(document).ready(function() {
    $('#lang').val(navigator.language.substr(0,2));
    $('#string,#lang').bind('keydown', function(e) {
        if (e.keyCode === 13) {
            $('button').trigger('click');
        }
    });
    $('button').bind('click', function(e) {
        $('.alert').hide();
        if ($('#lang').val().length < 2) {
            $('.alert').html('Language code must be at least 2 characters long.\
                <br>Check the wikipedia subdomain for correct language code.').stop().slideDown().delay(5000).slideUp();
            return false;
        }
        if ($('#string').val().length == 0) {
            $('.alert').html('Please enter a string to translate.').stop().slideDown().delay(5000).slideUp();
            return false;
        }
        var apiURL = 'https://'+$('#lang').val()+'.wikipedia.org/w/api.php';
        $.ajax({
            url: apiURL,
            method: 'GET',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: {
                origin: '*',
                action: 'query',
                titles: $('#string').val(),
                prop: 'langlinks',
                format: 'json',
                lllimit: 500,
                llprop: 'langname|url',
                redirects: 1
            }
        }).done(function(result) {
            var result = result.query.pages[Object.keys(result.query.pages)[0]];
            if (result.missing !== undefined) {
                $('.alert').html('Word not found').slideDown().delay(5000).slideUp();
            } else if (result.langlinks !== undefined) {
                $('.result table tbody').html('');
                result.langlinks.forEach(function(row) {
                    console.log(row);
                    $('.result table tbody').append('<tr><td>'+row.langname+'</td><td><a href="'+row.url+'">'+row['*']+'</a></td></tr>');
                });
                var jets = new Jets({
                    searchTag: '#jetsSearch',
                    contentTag: '#jetsContent',
                });
            }
        }).fail(function(result, textStatus, errorThrown) {
            $('.alert').html(result.statusText + ' (check js console)').slideDown().delay(5000).slideUp();
        })
    });
});