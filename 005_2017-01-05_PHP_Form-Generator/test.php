<?php

require 'src/FormGenerator.php';

$login = new FormGenerator([
    'action'         => 'test.php',
    'method'         => 'POST',
    'accept-charset' => 'utf-8',
]);

$login->input('text', 'username', ['required'])->withLabel('Username:')
     ->input('password', 'password', ['required'])->withLabel('Password:')
     ->input('checkbox', 'remember_me')->withLabel('Remember me')
     ->input('submit', 'login', ['value' => 'Login', 'class' => 'btn'])
     ->generate();

// second form

$story = new FormGenerator([
    'action'         => 'test.php',
    'method'         => 'POST',
    'accept-charset' => 'utf-8',
]);

$select_options = [
    0 => 'Funny',
    1 => 'Fairytale',
    2 => 'Drama',
];

$story->textarea('story', ['style' => 'display:block;'])->withLabel('Story:')
      ->select('category', $select_options, false)->withLabel('Category:')
      ->input('submit', 'login', ['value' => 'Login', 'class' => 'btn'])
      ->generate();