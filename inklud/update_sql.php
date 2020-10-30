<?php
	require('connect.php');
	
	$sql = $_REQUEST["sql"];
	if (get_magic_quotes_gpc()) $sql = stripslashes($sql);
	$fr = 'bjekt';
	$to = 'bject';
	$sql = str_replace($fr, $to, $sql);	
	
	mysqli_query($con, $sql);
	$aff = mysqli_affected_rows($con);
	echo "<rows>". $aff . "</rows>";

	if ($aff == -1)	echo "<errorInSql>". $sql . "</errorInSql>";


	
	mysqli_close($con);
?>