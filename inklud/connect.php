<?php

	include_once 'config.php';   
	$con = mysqli_connect(HOST, USER, PASSWORD, $_REQUEST['schema']);
	$email = 1;
	header('Content-Type: text/html; charset=UTF-8');
	date_default_timezone_set("Europe/Budapest");
	$stmt = mysqli_prepare($con, "SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");
	mysqli_stmt_execute($stmt);

	ini_set('display_startup_errors',0);
	ini_set('display_errors',0);
	error_reporting(0);

	if (get_magic_quotes_gpc()) {
	    function stripslashes_gpc(&$value)
	    {
	        $value = stripslashes($value);
	    }
	    array_walk_recursive($_GET, 'stripslashes_gpc');
	    array_walk_recursive($_POST, 'stripslashes_gpc');
	    array_walk_recursive($_COOKIE, 'stripslashes_gpc');
	    array_walk_recursive($_REQUEST, 'stripslashes_gpc');
	}
