<?php

	ini_set("allow_url_fopen", true);
	ini_set('memory_limit', '128M');
//	require("smart_resize_image.function.php");
	set_time_limit(0);

	ini_set('display_startup_errors',1);
	ini_set('display_errors',1);
	error_reporting(E_ALL);

	
	$max_width = $_GET['max_width'];
	$max_quality = $_GET['max_quality'];
	$img_dir = "../" . $_GET['img_dir'];
	$isSmall = $_GET['issmall'];

	if (isset($_FILES['upload_file'])) {
	    if(move_uploaded_file($_FILES['upload_file']['tmp_name'], $img_dir . $isSmall . $_FILES['upload_file']['name'])){
	        echo $_FILES['upload_file']['name']. " OK";
//				smart_resize_image($img_dir . $isSmall . $_FILES['upload_file']['name'] , null, intval($max_width), 0 , true , $img_dir . $isSmall . $_FILES['upload_file']['name'] , false , false , intval($max_quality) );
				$wi = intval($max_width);
				if ($wi != 1234) {
					$filePart = $img_dir . $isSmall . $_FILES['upload_file']['name'];
					image_resize($filePart, $filePart, $wi, intval($max_quality) );
				} else {
					// galéria
					$filePart  = $img_dir . $_FILES['upload_file']['name'];
					$filePart2 = $img_dir . "th_" . $_FILES['upload_file']['name']; // thumbnail
					image_resize($filePart, $filePart2, 320, "75" );
					image_resize($filePart, $filePart, 1000, intval($max_quality) );
				}
	    } else {
	        echo $_FILES['upload_file']['name']. " KO";
	    }
	    exit;
	} else {
	    echo "No files uploaded ...";
	}
	
	function image_resize($src, $dst, $width, $quality){
			if(!list($w, $h) = getimagesize($src)) return "Unsupported picture type!";
		 	$type = strtolower(substr(strrchr($src,"."),1));
		  	if($type == 'jpeg') $type = 'jpg';
		  	switch($type){
				case 'bmp': $img = imagecreatefromwbmp($src); break;
				case 'BMP': $img = imagecreatefromwbmp($src); break;
				case 'gif': $img = imagecreatefromgif($src); break;
				case 'GIF': $img = imagecreatefromgif($src); break;
				case 'jpg': $img = imagecreatefromjpeg($src); break;
				case 'JPG': $img = imagecreatefromjpeg($src); break;
				case 'png': $img = imagecreatefrompng($src); break;
				case 'PNG': $img = imagecreatefrompng($src); break;
				default : return "Unsupported picture type!";
		  	}
			if($w < $width) return "Picture is too small!";
    		$ratio = $width/$w;
    		$width = $w * $ratio;
    		$height = $h * $ratio;
		    $x = 0;
  			$new = imagecreatetruecolor($width, $height);
			// preserve transparency
			if($type == "gif" or $type == "png"){
				imagecolortransparent($new, imagecolorallocatealpha($new, 0, 0, 0, 127));
				imagealphablending($new, false);
				imagesavealpha($new, true);
			}
			imagecopyresampled($new, $img, 0, 0, $x, 0, $width, $height, $w, $h);
			switch($type){
				case 'bmp': imagewbmp($new, $dst); break;
				case 'gif': imagegif($new, $dst); break;
				case 'jpg': imagejpeg($new, $dst, $quality); break;
				case 'png': imagepng($new, $dst, $quality/10); break;
			}
			return true;


		
	}
