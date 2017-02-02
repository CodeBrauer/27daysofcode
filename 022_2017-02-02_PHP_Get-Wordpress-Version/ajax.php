<?php
require_once 'WordpressVersion.php';

if (isset($_POST['url']) && !empty($_POST['url'])) {
    echo WordpressVersion::get($_POST['url']);
}