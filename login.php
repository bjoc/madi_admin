<?php
	include_once 'inklud/sec_session.php';
	ini_set('display_startup_errors',0);
	ini_set('display_errors',0);
	error_reporting(0);
	sec_session_start();
	include_once 'inklud/db_connect.php';
	include_once 'inklud/functions.php';
	if (login_check($mysqli) == true) {
	    $logged = 'in';
	} else {
	    $logged = 'out';
	}
?>
<html>
<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" >
        <meta content="utf-8" http-equiv="encoding">
		<link rel="shortcut icon" href="_config/favicon.ico" type="image/x-icon"/>
	 	<!--[if lt IE 9]>
			<script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
		<![endif]-->
		<title>admin</title>
 		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="author" content="Bernáth József" >
		<meta name="description" content="Admin" >

		<link href="CSS/main.css" rel="stylesheet" media="screen" type="text/css">
		<link href="JSUtil/datetimepicker/jquery.datetimepicker.css" rel="stylesheet" type="text/css" >
		<script src="JSUtil/jquery-1.12.3.min.js"></script>
		<script src="JSUtil/TweenMax.min.js"></script>
 		<script src="JSUtil/datetimepicker/jquery.datetimepicker.js" ></script>
 		<script src="JSUtil/jquery.cookie.js"></script>

 		<script src="JS/sha512.js" ></script>
 		<script src="JS/login_functions.js" ></script>

<script>

$(document).ready(function() {
	loginInit();
});

</script>
</head>
<body>
<div id="loginCont">
	<div id="loginCont2">
		<div id="loginBox">
			<div id="loginHeader"><img src='_config/header.png' style="vertical-align:top; margin-right: 30px; border:2px solid white;">
			<?php
				if ($logged == 'out') { echo 'BEJELENTKEZÉS'; } else {echo 'KILÉPÉS'; }
			?>
			</div>
			<div id="loginForm">
					<label>Felhasználói név</label>
						<input id="loginName" placeholder="" type="text" value="">
					<label>Jelszó</label>
						<input id="loginPw" placeholder="" type="password" value="">
					<label>Belépési adatok tárolása</label>
						<input id="storeIt" type="checkbox" checked value="1">
					<label>Adatbázis</label>
						<select id="selectDb">
							<?php echo $logindbs;?>
						</select>
 			</div>
			<div id="loginSub">
				<div id="navButLogin" class="but">Belépés</div>
			</div>
		</div>
	</div>
</div>


	<div id="message">
		<div id="messageHeader"></div>
		<div id="messageBody"></div>
		<div id="messageBut">
		</div>
	</div>
	<a id="anc"></a>

</body>
</html>
