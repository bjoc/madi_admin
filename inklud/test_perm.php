<?php
	
	echo exec('whoami') . '<br>';

	$uploaddir = '../../eszter/images/objects/';
	
	echo $uploaddir . '<br>';
	echo realpath($uploaddir) . '<br>';
	if (is_dir($uploaddir)) echo 'uploaddir exists' . '<br>';
	if (is_writable($uploaddir)) echo 'uploaddir writeable' . '<br>';


?>