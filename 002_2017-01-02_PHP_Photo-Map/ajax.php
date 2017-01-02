<?php
require_once 'functions.php';

$result = [];
$images = array_diff(scandir('images'), ['.', '..']);

if (file_exists('cache.json')) {
    $result = file_get_contents('cache.json');
}

if (count(json_decode($result)) !== count($images)) {
    foreach ($images as $image) {
        $imagepath = 'images/' . $image;
        if (!in_array(pathinfo($image, PATHINFO_EXTENSION), ['jpg', 'jpeg'])) {
            continue; // skip if file is not a jp(e)g
        }
        $exif = exif_read_data($imagepath);
        if (!isset($exif["GPSLongitude"]) || empty($exif["GPSLongitude"])) {
            continue; // skip if no exif data given
        }
        $long = getGps($exif["GPSLongitude"], $exif['GPSLongitudeRef']);
        $lat  = getGps($exif["GPSLatitude"], $exif['GPSLatitudeRef']);
        $result[] = [
            'image'          => $imagepath,
            'lat'            => $lat,
            'long'           => $long,
            'date'           => date('Y-m-d H:i', $exif['FileDateTime']),
            'human_location' => GoogleMapsGetLocation("$lat, $long"),
        ];
    }
    $result = json_encode($result);
}

header('Content-Type: application/json');
echo $result;