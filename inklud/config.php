<?php

/*	define("HOST", "localhost");
	define("USER", "dotwhite2");
	define("PASSWORD", "49RsgtE4X2W7");
	$defaultdb 		= "tdm_velence";
	$defaultdbName 	= "TDM Velence";
*/

	define("HOST", "127.0.0.1");
	define("USER", "root");
	define("PASSWORD", "Dorina01");
	$defaultdb 		= "tdm_velence";
	$defaultdbName 	= "TDM Velence";



	$uberMail = '';
/* 	$uberMail = 'joco.bernath@gmail.com'; */
	// ha üres, akkor a rendes mail-re megy!

	$logindbs = "<option value='$defaultdb' selected>$defaultdbName</option>";
	if (isset($_SESSION['db'])) $database = htmlentities($_SESSION['db']);
	else $database = $defaultdb;
	define("DATABASE", $database);
	define("CAN_REGISTER", "any");
	define("DEFAULT_ROLE", "member");
	define("SECURE", FALSE);

?>
