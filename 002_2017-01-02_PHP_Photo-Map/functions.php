<?php
/**
 * returns city and country from GPS coords
 * @param string $address string gps coords
 * @author CodeBrauer <codebrauer.com> 
 * @link https://gist.github.com/CodeBrauer/984ae92d4c75ff14f087 (modified)
 */
function GoogleMapsGetLocation($address) {
    
    $address = urlencode($address);

    $url = "http://maps.google.com/maps/api/geocode/json?latlng=$address&sensor=false";

    $ch = curl_init();
    $options = array(
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_URL            => $url,
        CURLOPT_HEADER         => false,
    );
        
    curl_setopt_array($ch, $options);
    $response = curl_exec($ch);
    curl_close($ch);

    if (!$response) {
        return false;
    }

    $response = json_decode($response);

    if ($response->status !== 'OK') {
        return false;
    }

    $address = [];

    foreach ($response->results[0]->address_components as $component) {
        if (in_array($component->types[0], ['locality', 'country']) ) {
            $address[] = $component->long_name;
        }
    }
    return implode(', ', $address);
}

/**
 * @author Gerald Kaszuba <http://stackoverflow.com/a/2572991/1990745>
 */
function getGps($exifCoord, $hemi) {
    $degrees = count($exifCoord) > 0 ? gps2Num($exifCoord[0]) : 0;
    $minutes = count($exifCoord) > 1 ? gps2Num($exifCoord[1]) : 0;
    $seconds = count($exifCoord) > 2 ? gps2Num($exifCoord[2]) : 0;
    $flip = ($hemi == 'W' or $hemi == 'S') ? -1 : 1;
    return $flip * ($degrees + $minutes / 60 + $seconds / 3600);
}
function gps2Num($coordPart) {
    $parts = explode('/', $coordPart);
    if (count($parts) <= 0) return 0;
    if (count($parts) == 1) return $parts[0];

    return floatval($parts[0]) / floatval($parts[1]);
}