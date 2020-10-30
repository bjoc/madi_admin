<?php
    include_once 'config.php';
    if (isset($_POST['db'])) $session_db = $_POST['db'];
    if (isset($_SESSION['db'])) $session_db = htmlentities($_SESSION['db']);
    if (!$session_db) $session_db = $defaultdb;
    $mysqli = new mysqli(HOST, USER, PASSWORD, $session_db);

?>
