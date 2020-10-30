<?php
	require('connect.php');
	
	$sql = $_REQUEST["sql"];	
	if (get_magic_quotes_gpc()) $sql = stripslashes($sql);
	$fr = 'bjekt';
	$to = 'bject';
	$sql = str_replace($fr, $to, $sql);	

	mysqli_multi_query($con, $sql);
	echo mysqli_affected_rows($con);
	mysqli_close($con);
?>