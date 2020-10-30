<?php
  include_once 'sec_session.php';
  sec_session_start();
  include_once 'db_connect.php';
   include_once 'functions.php';
  if (isset($_POST['un'], $_POST['p'])) {
    $email = $_POST['un'];
    $password = $_POST['p'];
    echo login($email, $password, $mysqli);
  } else {
    echo '0';
  }
