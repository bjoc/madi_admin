<?php

	define("HOST", "127.0.0.1");
	define("USER", "root");
	define("PASSWORD", "Dorina01");

	$con = mysqli_connect(HOST, USER, PASSWORD, 'tdm_velence');

	header('Content-Type: text/html; charset=UTF-8');
	date_default_timezone_set("Europe/Budapest");
	$stmt = mysqli_prepare($con, "SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");
	mysqli_stmt_execute($stmt);

	ini_set('display_startup_errors',0);
	ini_set('display_errors',0);
	error_reporting(0);


				$query2 = 'select Object_id from Object_Keywords';
				$result2 = mysqli_query($con, $query2);

				while($row2 = mysqli_fetch_array($result2)) {
					echo $row2['Object_id'];
				}


	mysqli_close($con);

?>
