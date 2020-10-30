<?php
	
	$schema = $_REQUEST["schema"];
	include_once('connect.php');
	error_reporting(E_ALL);
	$imgObjFromPHPInclude = $_REQUEST["imgObjFromPHPInclude"]; 
	$error = "OK";

	$PHPData = $_REQUEST["PHPData2"];	
	include_once('killReserved.php');
	$PHPData2 = $PHPData;

	$PHPData = $_REQUEST["PHPData"];	
	include_once('killReserved.php');

	$table = 	$PHPData[0]; // törlendő tábla
	$id =		$PHPData[1]; // törlendő rekord
	$imgFields = $PHPData[2]; // mezőnevek, amikben a képeket tárolja (TÖMB)
	$imgTables = $PHPData[3]; // tömbök, amikben a kapcsolt táblákat tárolja (TÖMB)
	
	
	
	//torlendo kepek, kapcsolt tablaban
	for ($i = 0; $i < count($PHPData2); $i++) {
		$joinTable = $PHPData2[$i][0];
		$joinKey = $PHPData2[$i][1];
		$sql = "SELECT ";
		for ($j = 0; $j < count($PHPData2[$i][2]); $j++) {
			$sql .= $PHPData2[$i][2][$j] . ",";
		}
		$sql = substr($sql, 0, -1);
		$fieldcou = $j; // ennyi mező volt
		$sql .= " FROM $joinTable WHERE $joinKey = $id";
		
		$result = mysqli_query($con, $sql);
		while ($row = mysqli_fetch_array($result)) {
			for ($k = 0; $k < $fieldcou; $k++) {
	
				$fileToDel =  $imgObjFromPHPInclude . $row[$k];
				
				echo "File törlés: " . $fileToDel . "<br>";
				if (!unlink($fileToDel)) $error = "Egyes képeket nem sikerült törölni";
			}
		}
	}
	
	//torlendo kepek
	$sql = "SELECT ";
	for ($i = 0; $i < count($PHPData[2]); $i++) {
		$sql .= $PHPData[2][$i] . ",";
	}
	$sql = substr($sql, 0, -1);
	$fieldcou = $i; // ennyi mező volt
	$sql .= " FROM $table WHERE id = $id";
	
	$result = mysqli_query($con, $sql);
	while ($row = mysqli_fetch_array($result)) {
		for ($i = 0; $i < $fieldcou; $i++) {

			$fileToDel =  $imgObjFromPHPInclude . $row[$i];
			
			echo "File törlés: " . $fileToDel . "<br>";
			if (!unlink($fileToDel)) $error = "Egyes képeket nem sikerült törölni";
		}
	}

	//torlendo kapcsolt tablak
	for ($i = 3; $i < count($PHPData); $i++) {
		$joinTable = $PHPData[$i][0];
		$joinKey = $PHPData[$i][1];
		$sql = "DELETE FROM $joinTable WHERE $joinKey = $id";
		mysqli_multi_query($con, $sql);
	}
	
		$sql = "DELETE FROM $table WHERE id = $id";
		mysqli_multi_query($con, $sql);

	echo("<error>$error</error>");
	mysqli_close($con);
