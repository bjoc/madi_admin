<?php
  include_once 'sec_session.php';
  sec_session_start();
  include_once 'db_connect.php';

  if (isset($_POST['un'], $_POST['p'])) {

    $password = $_POST['p'];
    echo login($email, $password, $mysqli);
  } else {
    echo '0';
  }