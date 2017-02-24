<?php
function curl_get_contents($url, array $post) {
    if (!function_exists('curl_init')) { return file_get_contents($url); } // fallback
    $ch = curl_init();
    $options = array(
        CURLOPT_CONNECTTIMEOUT => 3,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_HEADER         => false,
        CURLOPT_URL            => $url,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $post,
    );
    curl_setopt_array($ch, $options);
    $response = curl_exec($ch);
    curl_close($ch);
    return $response;
}

$data = curl_get_contents('http://regexr.com/php/RegExr.php', ['patternID' => $_GET['patternID'], 'action' => 'getPatternByID']);
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
echo $data;