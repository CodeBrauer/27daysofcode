jQuery(document).ready(function($) {
    $.getJSON('cache.json', function loadProjects(data) {
        data.forEach(function(element) {
            if (element.type === 'dir') {
                var parts = element.path.split('_');
                console.log(parts);
                var html = '<div class="day day-'+parts[0]+'">\
                    <span class="lang lang-'+parts[2]+'">'+parts[2]+'</span>\
                    <span class="num">'+parts[0]+'</span>\
                    <span class="date">'+parts[1]+'</span>\
                    <span class="title">'+parts[3].replace(/-/g, ' ')+'</span>\
                    <button class="demo"><i class="icon-magnifier"></i> Demo</button>\
                    <button><a href="https://github.com/CodeBrauer/100daysofcode/tree/master/'+element.path+'/"><i class="icon-social-github"></i> Sources</a></button>\
                    <div id="day-'+parts[0]+'"></div>\
                </div>';
                $('.days').append(html);
                $('#day-'+parts[0]).iziModal({
                    title: 'Day '+parts[0],
                    subtitle: parts[1],
                    headerColor: '#000000',
                    theme: 'dark',
                    width: '80%',
                    iframe: true,
                    iframeHeight: 600,
                    iframeURL: 'https://codebrauer.github.io/100daysofcode/'+element.path+'/',
                    navigateCaption: true,
                    navigateArrows: true,
                    history: true,
                    fullscreen: true,
                    group: 'projects',
                });
                $('.day-'+parts[0]+' button.demo').bind('click', function() {
                    $('#day-'+parts[0]).iziModal('open');
                });
            }
        });
    });
});