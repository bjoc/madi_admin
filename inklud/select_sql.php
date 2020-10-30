<?php
	require('connect.php');
	
	$sql = $_REQUEST["sql"];	
	if (get_magic_quotes_gpc()) $sql = stripslashes($sql);
	$fr = 'bjekt';
	$to = 'bject';
	$sql = str_replace($fr, $to, $sql);	
	
	$ddresult = mysqli_query($con, $sql);
	while($ddrow = mysqli_fetch_array($ddresult)) {
		echo $ddrow[0];
	}
	mysqli_close($con);
?>