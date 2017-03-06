<?php
require_once 'vendor/autoload.php';

use Fetch\Server;
use Fetch\Message;
use Medoo\Medoo;

$dotenv = (new Dotenv\Dotenv(__DIR__))->load();
$db_cfg = [
    'database_type' => 'mysql',
    'database_name' => getenv('DB_DATABASE'),
    'username'      => getenv('DB_USERNAME'),
    'password'      => getenv('DB_PASSWORD'),
    'charset'       => 'utf8'
];
if (empty(getenv('DB_HOST')) && !empty(getenv('DB_SOCKET'))) {
    $db_cfg['socket'] = getenv('DB_SOCKET');
} else {
    $db_cfg['server'] = getenv('DB_HOST');
}
$db = new Medoo($db_cfg);

$server = new Server(getenv('IMAP_SERVER'), getenv('IMAP_PORT'));
$server->setAuthentication(getenv('IMAP_USERNAME'), getenv('IMAP_PASSWORT'));

$messages = $server->getMessages();

foreach ($messages as $key => $message) {
    $overview = $message->getOverview();
    if ($overview->seen === 0) {
        $insert = $db->insert(getenv('DB_TABLE'), [
            'flag'    => str_replace(getenv('SUBJECT_PREFIX'), '', $message->getHeaders()->to[0]->mailbox),
            'from'    => $overview->from,
            'subject' => $overview->subject,
            'message' => $message->getMessageBody(),
            'sent'    => date('Y-m-d H:i:s', $overview->udate),
        ]);
        if ($insert) {
            $message->setFlag('seen');
            echo 'Saved email from: '. $overview->from . PHP_EOL;
        }
    }

}