<?php
require_once __DIR__ . '/vendor/autoload.php';

$app = [];

/* development error handler / debug */
if (PHP_OS == 'Darwin') { // my dev machine
    $whoops = new \Whoops\Run;
    $whoops->pushHandler(new \Whoops\Handler\PrettyPageHandler);
    $whoops->register();
}

/* main class */
use \ForestPoll\Poll as Poll;

/* init router */
$app['router'] = new \Klein\Klein();

/* init twig template engine */
$loader = new Twig_Loader_Filesystem(__DIR__ . '/templates/');
$app['twig']   = new Twig_Environment($loader, [
    'cache' => false//__DIR__ . '/.twigcache/',
]);

/* load .env files */
$dotenv = new Dotenv\Dotenv(__DIR__);
$dotenv->load();
$dotenv->required(['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASS']);

/* connect to mysql database */
$app['db'] = new medoo([
    'database_type' => 'mysql',
    'database_name' => getenv('DB_NAME'),
    'server'        => getenv('DB_HOST'),
    'username'      => getenv('DB_USER'),
    'password'      => getenv('DB_PASS'),
    'charset'       => 'utf8mb4',
]);

/* app routes */

$app['router']->respond('GET', '/', function () use ($app) {
    $app['view']['title'] = 'Create a poll';
    return $app['twig']->load('create.php')->render($app['view']);
});

$app['router']->respond('POST', '/', function ($request, $response) use ($app) {
    $poll = new Poll($app['db']);
    $result = $poll->savePoll($request->params());
    if ($result) {
        $response->redirect('/' . $result);
    }
});

$app['router']->respond('GET', '/[:id]', function ($request, $response) use ($app) {
    $poll = new Poll($app['db']);

    $app['view']['title']    = 'Answer poll';
    $app['view']['id']       = $request->id;
    $app['view']['data']     = $poll->find($request->id);
    $app['view']['answered'] = isset($_COOKIE['Poll-' . $request->id]) ? $_COOKIE['Poll-' . $request->id] : false;
    
    if (!$app['view']['data']) {
        return $response->code(404);
    }

    return $app['twig']->load('answer.php')->render($app['view']);
});

$app['router']->respond('POST', '/[:id]', function ($request, $response) use ($app) {
    $poll = new Poll($app['db']);
    $result = $poll->saveEntries($request->id, $request->param('answer'));
    if ($result) {
        $response->redirect('/' . $request->id . '/r');
    }
});

$app['router']->respond('GET', '/[:id]/r', function ($request, $response) use ($app) {
    $poll = new Poll($app['db']);
    $app['view']['data']  = $poll->getEntries($request->id);
    $app['view']['title'] = 'Poll results';
    return $app['twig']->load('results.php')->render($app['view']);
});

$app['router']->dispatch();