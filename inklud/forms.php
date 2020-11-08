<?php
	require('connect.php');

	$PHPData = $_REQUEST["PHPData"];
	include_once('killReserved.php');

	$content = 	$PHPData[0];
	$id =		$PHPData[1];
	$view =		$PHPData[2];
	$fields = 	$PHPData[3];
	$where = 	$PHPData[4];
	$formTitle =$PHPData[5];

	$imgpath = $_REQUEST["site_img"]; // pl. ../velenceito/images/objects/
	$objpath = $_REQUEST["site_objects"]; // pl .images/objects/
	$winID = $_REQUEST["winID"];
	$sqlcon  = 0;	// van -e bármilyen connect, pl. új tételnél dropdown

	$afo = "autofocus";
	//első mező kapja meg
	// fields-ből tömbök összerakása
	$_label = array();
	$_sqlcol= array();
	$_type 	= array();
	$_default = array();
	$_keyword = array();
	$_placeho = array();
	$_categor = array(array());
	$_half = array();
	$_noedit = array();
	$_disabled = array();
	$_readonly = array();
	$_checked = array();
	$_istitle = array();
	$_noempty = array();

	$ii = 0;
	for ($i = 0; $i < count($fields); $i++) {
		$_label[$ii]	= $fields[$i];
		$_sqlcol[$ii] = str_replace("Objekt","Object",$fields[$i+1]);
		$_sqlcol[$ii]= $fields[$i+1];
		$_type[$ii]	= $fields[$i+2];
		$_default[$ii]	= $fields[$i+3];  //$_value[$i]
		$_keyword[$ii]	= $fields[$i+4];
		$i4				= $fields[$i+4]; //$_value[$i+1]
			// "noedit": nem átírható
			// "half_cke": feleakkora cke
			// "half1": feleakkora
			// "half2": feleakkora
			// ÚJ "noempty": korábbi "kot" helyett:
			$_half[$ii] = "";
			if (strpos("$i4",'half1') !== false) {$_half[$ii] = "half1";}
			if (strpos("$i4",'half2') !== false) {$_half[$ii] = "half2";}
			if (strpos("$i4",'half_cke') !== false) {$_half[$ii] = "half_cke";}
			if (strpos("$i4",'title') !== false) {$_istitle[$ii] = "isTitle";}
			if (strpos("$i4",'noempty') !== false) {$_noempty[$ii] = "noempty";}
			$_noedit[$ii] = "";
			$_disabled[$ii] = "";
			$_readonly[$ii] = "";
			$_checked[$ii] = "";
			$_flagid[$ii] = "";
			if (strpos("$i4",'noedit') !== false) {
				$_noedit[$ii] = "noedit";
				$_disabled[$ii] = "disabled";
				$_readonly[$ii] = 'readonly="readonly"';
				$_checked[$ii] = 'onclick="return false;"';
			}
			if (strpos("$i4","HUN") !== false) {$_flagid[$ii] = "HUN";}
			if (strpos("$i4","ENG") !== false) {$_flagid[$ii] = "ENG";}
			if (strpos("$i4","GER") !== false) {$_flagid[$ii] = "GER";}
		$_placeho[$ii] = $fields[$i+5]; //ÚJ placeholder
		$_gridWidth[$ii] = $fields[$i+5]; // "20": grid esetén hány% a szélesség
		$_categor[$ii] = $fields[$i+6]; //ÚJ pl. kategória választónál leíró

		$i++;
		$i++;
		$i++;
		$i++;
		$i++;
		$i++;
		$ii++;
	}
	$fieldcou = $ii; // ennyi mezőt kapott
	if ($id == 0) {
		//insert
		for ($i = 0; $i < $fieldcou; $i++) {
			$_value[$i] = $_default[$i];
		}
	} else {
		//update
		$sqlcon = 1;
		$query = "SELECT * FROM " . $view;
		$query = $query . $where;
		$result = mysqli_query($con, $query);
		while($row = mysqli_fetch_array($result)) {
			for ($i = 0; $i < $fieldcou; $i++) {
				$_value[$i] = $row["$_sqlcol[$i]"];
			}
		}
	}

	//tabs
	echo '<div class="formTitle"></div><div class="gridJump"></div><div class="subMenu"></div><div class="formTabs">';
	for ($i = 0; $i < $fieldcou; $i++) {
		if ($_type[$i] == "page") echo "<div class='formTab' id='tab$i' name='$_label[$i]' onclick='tabDo(".$winID.", \"$_label[$i]\");'>$_label[$i]</div>";
	}
	echo '</div>';
	echo '<div class="formPageCont">';
	//fields
	for ($i = 0; $i < $fieldcou; $i++) {

			//page, section, join, grid_header
			if ($_sqlcol[$i] == "X") {
				switch ($_type[$i]) {
					case 'line' : {
						echo "<div class='formLine'></div>";
						break;
					}
					case 'join' : {
						echo "<div class='formJoin' join='{$_categor[$i][1]}' myfield='{$_categor[$i][2]}'>";
						$joinlabel = $_label[$i];
						break;
					}
					case 'grid' : {
						echo "<div class='formJoin' join='{$_categor[$i][1]}' myfield='{$_categor[$i][2]}'>";
						$joinlabel = $_label[$i];
						break;
					}
					case 'section' : {
						echo '<div class="formSection">'; break;
					}

					case 'page' : {
						echo '<div class="formPage" table="' . $view . '" name="'. $_label[$i] .'"';
						if ($_type[$i+1] == "keyword") //keyword tabja
						{
							echo ' kot="'.$_categor[$i+1][3].'" join="'.$_categor[$i+1][1].'" myfield="'.$_categor[$i+1][0].'" valuefield="'.$_categor[$i+1][2].'"';
						}
//							echo ' kot="'.$_categor[$i+1][3].'" join="'.$_sqlcol[$i+1].'" myfield="'.$_categor[$i+1][0].'" valuefield="'.$_categor[$i+1][1].'"';
						echo '>';  break;
					}
					case 'join_end' :
					case 'grid_end' :
					case 'section_end' :
					case 'page_end' : {	echo '</div>'; break;}
				}
			}
			if ($_sqlcol[$i] != "X" && $_type[$i] != "keyword" && $_type[$i] != "join" && $_type[$i] != "grid" && $_type[$i] != "line") {
				 //egy mező (sor);
				 $tabOrder = $i + 10; // siman $i lesz taborder
				 $isJoinRow = ''; // NEM kapcsolt tábla formRow Class... formSave figyeli
				 $isGridRow = ''; // NEM kapcsolt tábla grid alapból. Ha de, akkor nem 100% a szélesség
				 require 'fields.php';
			}

			//! kapcsolt tábla. Join = miniform, grid = header + sorok
			if ($_type[$i] == "join" or $_type[$i] == "grid") {
				$isGrid = ($_type[$i] == "grid" ? true : false);

				$join_myfield = $_categor[$i][0]; // pl. Object_id
				$join = 		$_categor[$i][1]; // pl. Object_Media
				$join_field = 	$_categor[$i][2]; // pl. Object_id
				$join_order = 	$_categor[$i][3]; // pl. Media_Order
				$join_fieldcou = $_categor[$i][4]; // hány mező van amit töltünk
				$query2 = "SELECT * FROM $join WHERE $join.$join_field = $id ORDER BY $join_order";
				$result2 = mysqli_query($con, $query2);
				$i++; // kapcsolt tabla elso mezo
				$i_tmp = $i; // minden kapcsolt rekordnal innen kezdi a mezoket
				$tabOrder = $i + 10;

				//header
				if ($isGrid) {
					echo "<div class='gridHeader'>";
					for ($i = $i_tmp; $i < $i_tmp + $join_fieldcou; $i++) {
						echo "<div class='gridColumnHeader' style='width:$_gridWidth[$i]%'>" . $_label[$i] . "</div>";
					}
					echo "</div>";
					$isGridRow = ' gridRow ';
				}


					//meglevo sorok
				while($row2 = mysqli_fetch_array($result2)) {

					$rowID = $row2["id"];
					echo "<div class='formJoinRow $isGridRow' row='$rowID'>";
					for ($i = $i_tmp; $i < $i_tmp + $join_fieldcou; $i++) {
						$_value[$i] = $row2["$_sqlcol[$i]"]; // felülirja a kapcsolt table mezojevel
						$isJoinRow = ' joinRow '; // kapcsolt tábla formRow Class... formSave figyeli
						//egy mező (sor);
						require 'fields.php';
						$tabOrder++;
					}
					echo "<img class='formJoinRowMinus $isGridRow $isJoinRow' src='images/minus_big.png'  onclick='JoinDelRow(this)' ></div>";
				}

					//uj sor
					$rowID = '0';
					echo "<div class='formJoinRow $isGridRow' row='$rowID'>";
					for ($i = $i_tmp; $i < $i_tmp + $join_fieldcou; $i++) {
						//egy mező (sor);
						$_value[$i] = $_default[$i];
						$isJoinRow = ' joinRow '; // kapcsolt tábla formRow Class... formSave figyeli
						require 'fields.php';
					}
					echo "<img class='formJoinRowPlus $isGridRow' src='images/plus_big.png'  onclick='JoinAddRow(this)' ></div>";

				$i--; //kovetkezo sor, ami mar nem kapcsolt tabla mezoje
/* 					echo "<div class='formJoinRow' row='0' onclick='JoinAddRow($join)'>$joinlabel hozzáadása<img class='formJoinRowPlus' src='images/plus_big.png'></div></div>"; */

			} else if ($_type[$i] == "keyword") {



				$kywrd_myfield = $_categor[$i][0]; // pl. Object_id
				$kywrd = 		$_categor[$i][1]; // pl. Object_Keywords
				$kywrd_value = 	$_categor[$i][2]; // pl. Keyword_id
				$kywrd_dict = 	$_categor[$i][3]; // ha nem 0, akkor Dict sorokból választhat
				$kywrd_noempty = 	$_categor[$i][4]; // ha "kot", akkor legalább egyet választania kell
				$kywrd_default = 	$_categor[$i][5]; // default kiválasztott sor (keyword_id-ra értve)

/*
				$kywrd = 		$_sqlcol[$i]; // pl. Object_Keywords
				$kywrd_myfield = $_categor[$i][0]; // pl. Object_id
				$kywrd_value = 	$_categor[$i][1]; // pl. Keyword_id
				$kywrd_dict = 	$_categor[$i][2]; // ha nem 0, akkor Dict sorokból választhat
				$kywrd_noempty = 	$_categor[$i][3]; // ha "kot", akkor legalább egyet választania kell
				$kywrd_default = 	$_categor[$i][4]; // default kiválasztott sor (keyword_id-ra értve)
*/

				if ($kywrd_dict > 0) {// ha szótár... ha más tábla, akkor arra egyedi query kell

					$query2 = '
					SELECT Dict.Dict_id keyString, Dict.Dict_Name rowString, CASE WHEN '.$kywrd.'.'.$kywrd_value.' IS NULL THEN 0 ELSE 1 END hasIt
					FROM Dict
					LEFT OUTER JOIN '.$kywrd.' ON ('.$kywrd.'.'.$kywrd_value.' = Dict.Dict_id AND '.$kywrd.'.'.$kywrd_myfield.' = '.$id.')
					WHERE Dict.Dict_Tree_id = ' . $kywrd_dict . ' ORDER BY hasIt DESC, Dict.Dict_id';


				} else
					switch ($kywrd) {
						case 'News_Objects' :
						case 'Bid_Objects' :
						 {
							$query2 = '
							SELECT Object.id keyString, Object.Object_Name rowString, CASE WHEN '.$kywrd.'.'.$kywrd_value.' IS NULL THEN 0 ELSE 1 END hasIt
							FROM Object
							LEFT OUTER JOIN '.$kywrd.' ON ('.$kywrd.'.'.$kywrd_value.' = Object.id AND '.$kywrd.'.'.$kywrd_myfield.' = '.$id.')
							ORDER BY HasIt DESC, Object.id DESC'; break;
						}

					}
				$result2 = mysqli_query($con, $query2);
				while($row2 = mysqli_fetch_array($result2)) {

					$keyBoxChecked = ($row2['hasIt'] == 1 ? "keyBoxChecked" : "");
					$keyBoxKey = $row2['keyString'];
//					$keyBoxRow = mb_substr($row2['rowString'],0,200,'UTF8');
					$keyBoxRow = $row2['rowString'];
					if ($keyBoxRow != '')
						echo "<div class='keyBoxCont'><div class='keyBox $keyBoxChecked' field='{$_sqlcol[$i]}' key='$keyBoxKey'>$keyBoxRow</div></div>";

/*
					$default = (($kywrd_default == $row2['keyString'] && $id == 0) ? 'checked' : '');
					echo '<div class="formRow keyRow ' . $kywrd_noempty . '" field="' . $_sqlcol[$i] . '" key="' . $row2['keyString'] . '"  > ';
					echo '<label>'.$row2['rowString'].'</label><input ' . ($row2['hasIt'] == 1 ? "checked" : "") . $default . ' type="checkbox" class="" tabindex="' . ($i + 10) . '" status="none">' ;
					echo '</div>';
*/
				}


			}

		}
	echo '</div></div></div>';

	if ($sqlcon == 1) mysqli_close($con);

?>
