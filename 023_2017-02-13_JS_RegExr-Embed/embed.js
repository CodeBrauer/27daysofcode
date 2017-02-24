(function() {
    /* http://stackoverflow.com/a/18750001/1990745 */
    function encodedStr(rawStr) {
        return rawStr.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
            return '&#'+i.charCodeAt(0)+';';
        })
    }

    var scriptEmbed = document.currentScript;
    if (scriptEmbed.getAttribute('data-id') === null) {
        console.warn('RegExr Embed: data-id attribute missing');
        return;
    } else {
        var patternID = scriptEmbed.getAttribute('data-id');
    }

    // create element to add
    var post = document.createElement('div');
    post.classList.add('regexr-embed-container');
    scriptEmbed.parentNode.insertBefore(post, scriptEmbed.nextSibling);

    // add css <link rel="stylesheet" href="app.css">
    var cssLink = document.createElement('link');
    cssLink.setAttribute('rel', 'stylesheet');
    cssLink.setAttribute('href', '//cdn.rawgit.com/CodeBrauer/100daysofcode/master/023_2017-02-13_JS_RegExr-Embed/app.css');
    scriptEmbed.parentNode.insertBefore(cssLink, scriptEmbed.nextSibling);

    // add font
    var cssLink = document.createElement('link');
    cssLink.setAttribute('rel', 'stylesheet');
    cssLink.setAttribute('href', '//fonts.googleapis.com/css?family=Source+Code+Pro:400,900');
    scriptEmbed.parentNode.insertBefore(cssLink, scriptEmbed.nextSibling);

    // add mark.js
    var cssLink = document.createElement('script');
    cssLink.setAttribute('src', '//cdnjs.cloudflare.com/ajax/libs/mark.js/8.8.3/mark.min.js');
    scriptEmbed.parentNode.insertBefore(cssLink, scriptEmbed.nextSibling);
    
    var preCode = '<pre>';
    
    var ajax = new XMLHttpRequest();
    ajax.open('GET', 'https://codebrauer.com/regexembed/?patternID=' + patternID);
    ajax.onload = function() {
        var data = JSON.parse(ajax.responseText);
        var data = data.data;
        preCode += encodedStr(data.content);
        var author = (data.author.length > 0) ? data.author : 'unknown';
        preCode += '<pre>';
        var header       = '<div class="regexr-embed-header"><a href="http://regexr.com/'+ data.urlID +'" target="_blank">'+ data.name +' ('+ data.dateAdded +') by '+ author +'</a></div>';
        var regexDisplay = '<div class="regexr-embed-regex-display">'+ data.pattern +'</div>';
        post.innerHTML = header + regexDisplay + preCode;

        var instance = new Mark(document.querySelector('.regexr-embed-container pre'));
        var regex_split = data.pattern.match(/\/[gimuy]+$/);
        if (regex_split !== null) {
            var regex_str   = regex_split.input.replace(/\/[gimuy]+$/,'').slice(1);
            var regex_flags = regex_split[0].replace('/','');
        } else { // no flags found
            var regex_str   = data.pattern.slice(1).slice(0, data.pattern.slice(1).length-1);
            var regex_flags = '';
        }
        var regex = new RegExp(regex_str, regex_flags);
        instance.markRegExp(regex);

    };
    ajax.onerror = function(error) {
        post.style.display = 'none';
        console.error(error);
    };
    ajax.send();    
})();
