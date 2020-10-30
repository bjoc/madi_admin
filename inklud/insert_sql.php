<?php
	require('connect.php');
	
	$sql = $_REQUEST["sql"];	
	if (get_magic_quotes_gpc()) $sql = stripslashes($sql);
	$fr = 'bjekt';
	$to = 'bject';
	$sql = str_replace($fr, $to, $sql);	

	mysqli_query($con, $sql);
	$id = mysqli_insert_id($con);
	if ($id == 0) $id = $con->insert_id;

	echo "<id>". $id . "</id>";

	if ($id == -1)	echo "<errorInSql>". $sql . "</errorInSql>";
	
	mysqli_close($con);
?>