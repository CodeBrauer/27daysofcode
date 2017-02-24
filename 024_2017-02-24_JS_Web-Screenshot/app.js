$('.scr').bind('click', function(event) {
    $('body').prepend('<div class="notice">You can select an area of the screenshot! (Press ESC to exit)</div>');
    $('.notice').delay(3000).fadeOut('fast');
    var takeScreenshot = function(element) {
        html2canvas(element, {
            logging: true,
            onrendered: function(canvas) {
                var ctx = canvas.getContext('2d');
                ctx.webkitImageSmoothingEnabled = false;
                ctx.mozImageSmoothingEnabled    = false;
                ctx.imageSmoothingEnabled       = false;
                var url = canvas.toDataURL("image/png");
                window.open(url, '_blank');
            }
        });
    }
    var scrDomOutline = DomOutline({
        onClick: takeScreenshot,
    });

    scrDomOutline.start();
});