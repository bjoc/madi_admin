<?php
	
	include_once('connect.php');
	error_reporting(E_ALL);
	$PHPData = $_REQUEST["PHPData"];	
	include_once('killReserved.php');
	
	$content = 	$PHPData[0]; // grid azonosító
	$mod =		$PHPData[1]; // 0:first 1:prev, 2:next, 3:last
	$limstart = $PHPData[2]; // hányadik rekordnál tart
	$lim = 		$PHPData[3]; // select limit
	$view =		$PHPData[4]; // "(table) where (field)=1" rész a selectből
	$order =	$PHPData[5]; // "(field) desc" rész a selectből
	$fields = 	$PHPData[6]; // grid-et leíró rész
	$searches = $PHPData[7]; // filter-ben megadott feltétel
	$customord =$PHPData[8]; // filter-ben megadott sorrend
	$incdesc = 	$PHPData[9]; // INC, DESC
	$imgpath = $_REQUEST["site_img"];
	$contSize = $_REQUEST["contSize"]-50;	
	$winID = $_REQUEST["winID"];
	$inact = $_REQUEST["inactiveRowByField"];
	// fields-ből tömbök összerakása
	$_label = array();
	$_sqlcol= array();
	$_type 	= array();
	
	$ii = 0;
	for ($i = 0; $i < count($fields); $i++) {
		$_label[$ii]	= $fields[$i];
		$_sqlcol[$ii]= $fields[$i+1];
		$_type[$ii]	= $fields[$i+2];
		$i++;
		$i++;
		$ii++;
	}
	$fieldcou = $ii; // ennyi oszlopot kapott
		
	// select összerakása
	$query = "SELECT SQL_CALC_FOUND_ROWS * FROM " . $view;
	
	if ($searches != "") {
		if (strpos($query,'WHERE') !== false) {
			$query = $query . " AND (" . $searches . ") ";
		} else
			$query = $query . " WHERE (" . $searches . ") ";
	}
	
	if ($customord == "") {
		$query = $query . " ORDER BY " . $order;	
	} else {
		$query = $query . " ORDER BY " . $customord . " " . $incdesc . ", " . $order;		
	}
	$all_result = mysqli_query($con, $query . " LIMIT 0,1");
	$count_result = mysqli_query($con, "SELECT FOUND_ROWS() cou");
	$count_row = mysqli_fetch_array($count_result);	
	$rowcou = $count_row['cou'];
	
	if ($lim > 0) $query = $query . " LIMIT " . $limstart . ", " . $lim;
	if ($limstart == -1) $limstart = $rowcou - $steps;	
	
	//echo $query;
	
	$result = mysqli_query($con, $query);
	
	$till = $limstart + ($lim == 0 ? $rowcou : $lim);
	$till = ($till > $rowcou ? $rowcou : $till);
	echo "
	<div class='gridJump'>
	<div class='gridJumpCont'>
	<img class='icon' src='images/first.png' onclick='_gridShow($winID, \"$content\",0,\"$customord\",0);'>
	<img class='icon' src='images/prev.png'  onclick='_gridShow($winID, \"$content\",1,\"$customord\",0);'>";
	
	echo "<div class='jumper'>".($limstart + 1)."-$till (<div class='rowcou'>$rowcou</div>)</div>";
	
	echo "
	<img class='icon' src='images/next.png' onclick='_gridShow($winID, \"$content\",2,\"$customord\",0);'>
	<img class='icon' src='images/last.png' onclick='_gridShow($winID, \"$content\",3,\"$customord\",0);'>
	<select class='perpage' onchange='_gridShow($winID, \"$content\",2,\"$customord\",0);'>
		<option value='10' ".($lim == 10 ? 'selected' : '').">10/oldal</option>
		<option value='50' ".($lim == 50 ? 'selected' : '').">50/oldal</option>
		<option value='100' ".($lim == 100 ? 'selected' :'').">100/oldal</option>
		<option value='0' ".($lim == 0 ? 'selected' : '').">összes</option>
	</select></div></div>";
	// titles
	echo "<div class='gridFixedHeader'></div><div class='subMenu'></div><div class='gridTableCont'><table id='grid$winID' class='grid'><tr class='noExc'>";
	for ($i=0; $i<$fieldcou; $i++) {
		echo "<th>$_label[$i]
		<div class='removeExc'>$_label[$i]";
/*
		if ($_type[$i] == 'id_type') {
			$rowID = $i;
		}
*/
		if ($_type[$i] != 'image') {
			echo '<img class="img_search" src="images/sort';
			if ($_sqlcol[$i] == $customord) {
				if ($incdesc == 'ASC') {
					echo '_asc';
				} else {
					echo '_desc';
				}
			}
			echo '.png" onclick="_gridShow('.$winID.', \''.$content.'\',0,\''.$_sqlcol[$i].'\',1);">';
			echo '<img class="img_search" src="images/search.png" onclick="filterAddField('.$winID.', \''.$_sqlcol[$i].'\', \''.$_label[$i]. '\', \'' .$_type[$i].'\' );"></div></th>';
		}
	}	
	echo "</tr>";
	
	
	while($row = mysqli_fetch_array($result)) {

	

		$inactCont = "";

		for ($ii=0; $ii<$fieldcou; $ii++) {
			if (($inact == $_sqlcol[$ii] && $row[$_sqlcol[$ii]] < 1))
				$inactCont  = 'class="inactiveRow"';
		}

		echo '<tr ' . $inactCont . ' id="tableRow' .$row[$_sqlcol[0]] .'" onclick="_formInit(\''.$content.'\','.$row[$_sqlcol[0]] . ', '. $winID .');">'; //$rowID =ID

		for ($i=0; $i<$fieldcou; $i++) {

			$sqlval = $row[$_sqlcol[$i]];

			$color = "";
			if ($_type[$i] == "color") $color = " style='background: $sqlval'";
			echo "<td $color>"; 

			switch ($_type[$i]) {
					default : {echo $sqlval; break;}
					case 'checkbox' : {echo '<input type="checkbox" ' . ($sqlval == 1 ? "checked" : "") . ' onclick="return false" class="'.($sqlval == 1 ? "onCheck" : "offCheck").'"/>';break;}
					case 'ddl' : {
						$dd  = array('ddl', $_sqlcol[$i], $sqlval );
						include('dropdowns.php'); break;
					}
					case 'date' : {if ($sqlval) echo date("Y.m.d", strtotime($sqlval)); break;}
					case 'datetime' : {if ($sqlval) echo date("Y.m.d H:i", strtotime($sqlval)); break;}
					case 'color' : {echo ""; break;}
					case 'image' : {
						if ($sqlval) {
							if (substr($sqlval, 0, 4) == "http") 
								echo "<img class='gridimg' src='$sqlval'>";
							else
								echo "<img class='gridimg' src='$imgpath{$sqlval}'>";
						}
						break;
					}
			} echo '</td>';
		} echo '</tr>';
		
	} echo '</table></div></div>';
	mysqli_close($con);
