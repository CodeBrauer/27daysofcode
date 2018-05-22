# #002 2017-01-02 Sunday: Photo-Map (PHP & JS)

**Features:**

- Extracts Exif-Geodata from jpgs and shows it on a pretty map
- Add a picture to `/images` and it will appear after an reload on the map.
- For better performance the image-metadata will be cached to `cache.json`
- Sidebar images can be clicked to show them on the map
- Map markers have popups containing the image

Built using [Leaflet](http://leafletjs.com/) & [maps.stamen.com](http://maps.stamen.com/)

Demo: https://codebrauer.github.io/27daysofcode/002_2017-01-02_PHP_Photo-Map/