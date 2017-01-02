(function(){
    map = L.map('image-map').setView([50.5, 10], 6);

    L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        ext: 'png'
    }).addTo(map);

    var ajax = new XMLHttpRequest();
    
    // github-pages can't render php files
    var request_uri = (location.host === 'codebrauer.github.io') ? 'cache.json' : 'ajax.php';
    
    ajax.open('GET', request_uri, true);
    ajax.onload = function() {
        var data = JSON.parse(ajax.responseText);
        markers = [];
        data.forEach(function(image, key) {
            // create image element for sidebar
            var imageDiv = document.createElement('div');
            imageDiv.classList.add('image');
            imageDiv.setAttribute('data-lat', image.lat)
            imageDiv.setAttribute('data-long', image.long)

            imageDiv.style.backgroundImage = 'url(' + image.image + ')';
            imageDiv.innerHTML             = image.date + ' – ' + image.human_location;
            // add image
            document.querySelector('#image-list').appendChild(imageDiv);

            // sidebar image onclick
            imageDiv.addEventListener('click', function(e) {
                // center map to marker
                map.panTo(new L.LatLng(
                    e.target.getAttribute('data-lat'),
                    e.target.getAttribute('data-long')
                ));
                // hightlight clicked marker
                var target_marker = document.querySelector('img[title="'+e.target.innerHTML+'"]')
                Array.prototype.forEach.call (document.querySelectorAll('img.leaflet-marker-icon'), function(node) {
                    node.classList.remove('active');
                });
                target_marker.classList.add('active');
            });

            // add marker
            markers[key] = L.marker([image.lat, image.long], {
                riseOnHover: true,
                title: imageDiv.innerHTML // => for selector
            }).addTo(map);
            // add marker popup with image
            markers[key].bindPopup('<img src="' + image.image + '" style="width: 300px;height:auto;">');
        });
    };
    ajax.send();
}());