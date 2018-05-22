jQuery(document).ready(function($) {
    $.ajaxSetup({
        error: function() { $('.days svg').fadeOut(); $('.days').html('<h2 style="color:#d00">Can\'t receive repo contents from GitHub API :(</h2>') }
    });
    $.getJSON('//api.github.com/repos/CodeBrauer/27daysofcode/contents/', function loadProjects(data) {
        $('.days svg').fadeOut();
        var projectLangs = {};
        for (var i = 0; i < data.length; i++) {
            element = data[i];
            if (element.type === 'dir' && element.name !== 'xindex_assets') {
                var parts = element.path.split('_');
                var html = '<div class="day day-'+parts[0]+'" data-lang="'+parts[2]+'">\
                <span class="lang lang-'+parts[2]+'">'+parts[2]+'</span>\
                <span class="num">'+parts[0]+'</span><span class="date">'+parts[1]+'</span><span class="title">'+parts[3].replace(/-/g, ' ')+'</span>\
                <a href="//codebrauer.github.io/27daysofcode/'+element.path+'/" class="demo-mobile-link"><i class="demo-mobile icon-eye"></i></a>\
                <button class="demo" data-izimodal-open="day-'+parts[0]+'"><i class="icon-magnifier"></i> Demo</button>\
                <button><a href="https://github.com/CodeBrauer/27daysofcode/tree/master/'+element.path+'/"><i class="icon-social-github"></i> Sources</a></button>\
                <div id="day-'+parts[0]+'"></div>\
                </div>';
                $('.days').append(html);
                /* bind iziModal to day */
                $('#day-'+parts[0]).iziModal({
                    title: 'Day '+parts[0], subtitle: parts[1],
                    headerColor: '#000000', theme: 'dark',
                    width: '80%', iframe: true, iframeHeight: 600,
                    iframeURL: '//codebrauer.github.io/27daysofcode/'+element.path+'/',
                    navigateCaption: true, navigateArrows: true,
                    history: true, fullscreen: true,
                    group: 'projects',
                });
                (parts[2] in projectLangs) ? projectLangs[parts[2]] += 1 : projectLangs[parts[2]] = 1;
            }
        }
        /* filtering */
        Object.keys(projectLangs).forEach(function(lang) {
            $('select[name="filter-lang"]').append('<option value="'+lang+'">'+lang+' ('+ projectLangs[lang] +')</option>');
        });
        $('select[name="filter-lang"]').bind('change', function(e) {
            var $selected = $('select[name="filter-lang"] option:selected').val();
            if ($selected == 'all') {
                $('.days .day').show();
            } else {
                $('.days .day').hide();
                $('.days .day[data-lang="'+$selected+'"]').show();
            }
        });
        /* order/sorting */
        $('input[type="radio"]').change(function() {
            $('.days > .day').each(function() {
                $(this).prependTo(this.parentNode);
            });
        });
    });
});