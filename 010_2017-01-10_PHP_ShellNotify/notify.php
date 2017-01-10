<?php

$stdin = file_get_contents('php://stdin');

// remove Remove Ansi Escape 
$stdin = preg_replace('/\x1b(\[|\(|\))[;?0-9]*[0-9A-Za-z]/', '', $stdin);
$stdin = preg_replace('/\x1b(\[|\(|\))[;?0-9]*[0-9A-Za-z]/', '', $stdin);
$stdin = preg_replace('/[\x03|\x1a]/', '', $stdin);

$config = [
    'api_url'      => 'https://api.pushbullet.com/v2/pushes',
    'access_token' => 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    'type'         => 'note',
];

$ch = curl_init();
$options = [
    CURLOPT_CONNECTTIMEOUT => 3,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HEADER         => false,
    CURLOPT_URL            => $config['api_url'],
    CURLOPT_HTTPHEADER     => ['Access-Token:' . $config['access_token']],
    CURLOPT_POSTFIELDS     => [
        'type'  => $config['type'],
        'title' => '['. gethostname() .'] Script finished',
        'body'  => 'Output:' . PHP_EOL . $stdin,
    ],
];
curl_setopt_array($ch, $options);
$response = curl_exec($ch);
curl_close($ch);
