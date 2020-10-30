<?php
	include_once 'inklud/sec_session.php';
	sec_session_start();
	include_once 'inklud/db_connect.php';
	include_once 'inklud/functions.php';

	if (login_check($mysqli) == 0) header('Location: login.php');
?>
<html>
<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" >
        <meta content="utf-8" http-equiv="encoding">
		<link rel="shortcut icon" href="_config/favicon.ico" type="image/x-icon"/>
	 	<!--[if lt IE 9]>
			<script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
		<![endif]-->
		<title>Admin</title>
 		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="author" content="Bernáth József" >
		<meta name="description" content="Admin" >
		<meta name="robots" content="noindex" >

		<link href='https://fonts.googleapis.com/css?family=Open+Sans:400&subset=latin-ext' rel='stylesheet' type='text/css'>

		<link href="CSS/main.css?ver=<?php echo(rand(10,100)); ?>" rel="stylesheet" media="screen" type="text/css">

		<link href="JSUtil/datetimepicker/jquery.datetimepicker.css" rel="stylesheet" type="text/css" >
		<script src="JSUtil/jquery-1.12.3.min.js"></script>
		<script src="JSUtil/ckeditor/ckeditor.js"></script>
  		<script src="JSUtil/ckeditor/adapters/jquery.js" ></script>
		<script src="JSUtil/TweenMax.min.js"></script>
 		<script src="JSUtil/datetimepicker/jquery.datetimepicker.js" ></script>
 		<script src="JSUtil/jquery.cookie.js"></script>
 		<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCqLQ6qjhlXeafd_WT2qum9dpYWgoMA0aY" ></script>

 		<script src="JS/toolkitWindows.js?ver=<?php echo(rand(10,100)); ?>" ></script>
 		<script src="JS/function_forms_grids.js?ver=<?php echo(rand(10,100)); ?>" ></script>
 		<script src="JS/functions.js?ver=<?php echo(rand(10,100)); ?>" ></script>

<script>

$(document).ready(function() {
	Init();

});

$(window).resize(function() {
	xDesktopResize();
});

</script>
</head>
<body>

<div id="workCont">
	<div id="title">
		<div id="titleText"><img src='_config/header.png' style="vertical-align:top; margin-right: 30px; "></div>
		<div id="progress"></div>
		<div id="navEnd">
			<div id="navButLogout" class="but">Kilépés</div>
			<select id="siteSelect" class="titleSelect">
			</select>
			<div id="userName"></div>
		</div>
	</div>

	<nav>
	</nav>

	<div id="work"></div>

</div>

	<div id="message">
		<div id="messagetext"></div>
		<div id="spinner"></div>
	</div>
	<div id="popup">
		<div id="popupHeader"></div>
		<div id="popupBody"></div>
		<div id="popupBut"></div>
	</div>
	<a id="anc"></a>
	<a id="xls_export"></a>

	<script type='text/javascript'>
		var $_POST = <?php echo !empty($_POST)?json_encode($_POST):'[]';?>;
		$_POST["sessionname"] = "<?php echo $_SESSION['username'];?>";
		$_POST["sessionid"] = "<?php echo $_SESSION['user_id'];?>";
	</script>

	<img id="spinimg" src="images/spinner.png">
	<div id="bulkPopup">
		<div id="bulkText">
		</div>
		<div id="bulkLine">
		</div>

	</div>


</body>
</html>
