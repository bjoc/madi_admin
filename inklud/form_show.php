<?php
	require('connect.php');
	
	$PHPData = $_REQUEST["PHPData"];
	
	$content = 	$PHPData[0];
	$id =		$PHPData[1];
	$view =		$PHPData[2];
	$fields = 	$PHPData[3];
	$where = 	$PHPData[4];
	$formTitle =$PHPData[5];
	
//	$imgpath =	"../Show\images\objects\\";
	$imgpath = $_REQUEST["site_img"]; // pl. ../velenceito/images/objects/
	$objpath = $_REQUEST["site_objects"]; // pl .images/objects/
	$sqlcon  = 0;	// van -e bármilyen connect, pl. új tételnél dropdown
	
	$formfields = array();
	$noedit = array();
	$disabled = array();
	
	$afo = "autofocus"; 
	//első mező kapja meg
	
	if ($id == 0) {
		//insert
		for ($i = 0; $i < count($fields); $i++) {
		
			$i4 = $fields[$i+4];
			$formfields[$i] = $fields[$i+3];  //default
			$formfields[$i+1] = $i4; //placeholder
			
			$noedit[$i] = ($i4 == 'noedit' ? 'noedit' : ''); // CSS class
			$disabled[$i] = ($i4 == 'noedit' ? 'disabled' : ''); // selectek
			$readonly[$i] = ($i4 == 'noedit' ? 'readonly="readonly"' : ''); // text, date
			$checked[$i] = ($i4 == 'noedit' ? 'onclick="return false;"' : ''); // check
			$placeholder[$i] = (($i4 == 'noedit' OR $i4 == 'half1' OR $i4 == 'half2') ? '' : $i4); // placeholder
			$half[$i] = ""; // két mező egymás után
			if (strpos("$i4",'half1') !== false) {$half[$i] = "half1";}
			if (strpos("$i4",'half2') !== false) {$half[$i] = "half2";}
			if (strpos("$i4",'half_cke') !== false) {$half[$i] = "half_cke";}
			$i++;
			$i++;
			$i++;
			$i++;
		}
		
	} else {
		//update
		$sqlcon = 1;
		$query = "SELECT * FROM " . $view;
		$query = $query . $where;
		$result = mysqli_query($con, $query);
		while($row = mysqli_fetch_array($result)) {
			for ($i = 0; $i < count($fields); $i++) {
			
				$i4 = $fields[$i+4];
				$formfields[$i] = $row[str_replace("#","", $fields[$i+1])];
				$formfields[$i+1] = $i4; //placeholder
				
				$noedit[$i] = ($i4 == 'noedit' ? 'noedit' : ''); // CSS class
				$disabled[$i] = ($i4 == 'noedit' ? 'disabled' : ''); // selectek
				$readonly[$i] = ($i4 == 'noedit' ? 'readonly="readonly"' : ''); // text, date
				$checked[$i] = ($i4 == 'noedit' ? 'onclick="return false;"' : ''); // check
				$placeholder[$i] = (($i4 == 'noedit' OR $i4 == 'half1' OR $i4 == 'half2') ? '' : $i4); // placeholder
				
				$half[$i] = ""; // két mező egymás után
				if (strpos("$i4",'half1') !== false) {$half[$i] = "half1";}
				if (strpos("$i4",'half2') !== false) {$half[$i] = "half2";}
				if (strpos("$i4",'half_cke') !== false) {$half[$i] = "half_cke";}
			
				$i++;
				$i++;
				$i++;
				$i++;
			}
		}		
	}
		
//	while($row = mysqli_fetch_array($result)) {
	
		//tabs
			echo '<div class="formTabs">';
			for ($i = 0; $i < count($fields); $i++) {
				if ($fields[$i+2] == "page") {
					echo '<div class="formTab" id="tab'. $i/5 	.'" name="'. $fields[$i] .'" onclick="tabDo(\''. $fields[$i] .'\');">'. $fields[$i].'</div>';
				}
				$i++;
				$i++;
				$i++;
				$i++;
			}
			echo '<div id="formTitle"></div></div>';
		//fields
			for ($i = 0; $i < count($fields); $i++) {
			
			//page, section
			if ($fields[$i+1] == "X") {
				switch ($fields[$i+2]) {
					case 'section' : {
						echo '<div class="formSection">'; break;
					}
					case 'page' : {
						echo '<div class="formPage" table="' . $view . '" name="'. $fields[$i] .'"';						
						if ($fields[$i+7] == "keyword") //keyword tabja
							echo ' kot="'.$fields[$i+9][3].'" join="'.$fields[$i+6].'" myfield="'.$fields[$i+9][0].'" valuefield="'.$fields[$i+9][1].'"';
						echo '>'; 						
						echo '<img id="img_close" src="images\\close_big.png" onclick="formClose(1);">'; break;		
					}
					case 'section_end' :
					case 'page_end' : {
						echo '</div>'; break;
					}
				}		
			}
			if ($fields[$i+2] == "keyword") {
				$join = 		$fields[$i+1]; // pl. Object_Keywords
				$join_myfield = $fields[$i+4][0]; // pl. Object_id
				$join_value = 	$fields[$i+4][1]; // pl. Keyword_id
				$join_dict = 	$fields[$i+4][2]; // ha nem 0, akkor Dict sorokból választhat
				$join_noempty = 	$fields[$i+4][3]; // ha "kot", akkor legalább egyet választania kell
				$join_default = 	$fields[$i+4][4]; // default kiválasztott sor (keyword_id-ra értve)
				
				if ($join_dict > 0) {// ha szótár... ha más tábla, akkor arra egyedi query kell
					$query2 = '
					SELECT Dict.Dict_id keyString, Dict.Dict_Name rowString, CASE WHEN '.$join.'.'.$join_value.' IS NULL THEN 0 ELSE 1 END hasIt
					FROM Dict 
					LEFT OUTER JOIN '.$join.' ON ('.$join.'.'.$join_value.' = Dict.Dict_id AND '.$join.'.'.$join_myfield.' = '.$id.')
					WHERE Dict.Dict_Tree_id = ' . $join_dict . ' ORDER BY hasIt DESC, Dict.Dict_id'; 
					
				} else
					switch ($join) {
						case 'News_Objects' :
						case 'Bid_Objects' :
						 {
							$query2 = '
							SELECT Object.id keyString, Object.Object_Name rowString, CASE WHEN '.$join.'.'.$join_value.' IS NULL THEN 0 ELSE 1 END hasIt
							FROM Object 
							LEFT OUTER JOIN '.$join.' ON ('.$join.'.'.$join_value.' = Object.id AND '.$join.'.'.$join_myfield.' = '.$id.')
							ORDER BY HasIt DESC, Object.id DESC'; break;
						}
					
					}
					
				$result2 = mysqli_query($con, $query2);
				
				while($row2 = mysqli_fetch_array($result2)) {
				
					$default = (($join_default == $row2['keyString'] && $id == 0) ? 'checked' : '');
				
					echo '<div class="formRow keyRow ' . $join_noempty . '" field="' . $fields[$i+1] . '" key="' . $row2['keyString'] . '"  > ';
//					echo ' myfield="'.$join_myfield.'" valuefield="'.$join_value.'">';
					echo '<label>'.$row2['rowString'].'</label><input ' . ($row2['hasIt'] == 1 ? "checked" : "") . $default . ' type="checkbox" class="" tabindex="' . ($i/5 + 10) . '" status="none">' ; 		
					echo '</div>';
					}
				
			
			}
			
		
			if ($fields[$i+1] != "X" && $fields[$i+2] != "keyword") {
				
				//zászló kell?
				$flagid = "";
				if (strpos($fields[$i],"HUN") !== false) {$flagid = "HUN";}
				if (strpos($fields[$i],"ENG") !== false) {$flagid = "ENG";}
				if (strpos($fields[$i],"GER") !== false) {$flagid = "GER";}
				$fields[$i] = str_replace("HUN", "", $fields[$i]);
				$fields[$i] = str_replace("ENG", "", $fields[$i]);
				$fields[$i] = str_replace("GER", "", $fields[$i]);
				
				//stilusok
				$rowstyle = "";
				if ($half[$i] == "half1") {$rowstyle = 'style="width:64%;display:inline-block;"';}
				if ($half[$i] == "half2") {$rowstyle = 'style="width:23%;display:inline-block;height:20;"';}
				
				$labelstyle = "";
				if ($half[$i] == "half1") {$labelstyle = 'style="width:39%;padding-left: 3%;"';}
				if ($half[$i] == "half_cke") {$labelstyle = 'style="width:15%"';}
				echo '<div key="0" class="formRow '.($noedit[$i] == 'noedit' ? 'noeditRow' : '').' '.($fields[$i+2] == 'image' ? 'halfRow' : '') .'" field="' . str_replace("#","", $fields[$i+1]) . '"  '. $rowstyle.' >';			
				
				if ($half[$i] != "half2") echo "<label $labelstyle>$fields[$i]</label>";				
				$halffield = "";
				if ($half[$i] == "half1") $halffield = " style='width:45%;' ";
				if ($half[$i] == "half2") $halffield = " style='width:130%;float:right;' ";
				
				//zászló ikon
				$hasflag = "";
				if ($flagid != "") {
					echo "<div class='flagicon'><img class='flagimg' src='images/flag$flagid.png'></div>";
					$hasflag = "hasFlag";
				}
						
				switch ($fields[$i+2]) {
				
/*
					case 'id': {
						echo '<div value="' . $formfields[$i] . '" type="text" class="id '.$noedit[$i].'" tabindex="' . ($i/5 + 10) . '">' . $formfields[$i] . '</div>'; break;				 
					}
*/
					case 'id_type': {
						echo '<input readonly="readonly" value="' . $formfields[$i] . '" type="text" class="id" tabindex="-1">'; break;				
					}
					
					case 'text': {
						$isTitle = "";
						if (strpos($fields[$i+1],"#") !== false) $isTitle = "isTitle";
						
					
						echo "<input $afo $readonly[$i] value='$formfields[$i]' type='text' class=' $isTitle $noedit[$i] $hasflag' tabindex=" . ($i/5 + 10) . " status='none' placeholder='$placeholder[$i]' $halffield >"; $afo=''; break;				
					}
					
					case 'num': {
						echo '<input '.$afo.' '.$readonly[$i].' value="' . $formfields[$i] . '" type="number" class="'.$noedit[$i].'" tabindex="' . ($i/5 + 10) . '" status="none" placeholder="' . $placeholder[$i]  . '" '.$halffield.'>'; $afo=''; break;				
					}
/*
					case 'date': {
						echo '<input '.$afo.' '.$readonly[$i].' value="' . $formfields[$i] . '" type="text" class="datepicker '.$noedit[$i].'" tabindex="' . ($i/5 + 10) . '" status="none" placeholder="' . $placeholder[$i]  . '">'; $afo=''; break;				
					}
					
					case 'datetime': {
						echo '<input '.$afo.' '.$readonly[$i].' value="' . $formfields[$i] . '" type="text" class="datetimepicker '.$noedit[$i].'" tabindex="' . ($i/5 + 10) . '" status="none" placeholder="' . $placeholder[$i]  . '">'; $afo=''; break;				
					}
*/
					case 'date': {
						echo '<input '.$afo.' '.$readonly[$i].' value="' . date("Y.m.d", strtotime($formfields[$i])) . '" type="text" class="datepicker '.$noedit[$i].'" tabindex="' . ($i/5 + 10) . '" status="none" placeholder="' . $placeholder[$i]  . '" '.$halffield.'>'; $afo=''; break;				
					}
					
					case 'datetime': {
						echo '<input '.$afo.' '.$readonly[$i].' value="' . date("Y.m.d H:i", strtotime($formfields[$i])) . '" type="text" class="datetimepicker '.$noedit[$i].'" tabindex="' . ($i/5 + 10) . '" status="none" placeholder="' .$placeholder[$i]  . '" '.$halffield.'>'; $afo=''; break;				
					}
	
					case 'check': {
						echo '<input '.$afo.' '.$checked[$i].' ' . ($formfields[$i] == 1 ? "checked" : "") . ' type="checkbox" class="'.$noedit[$i].'" tabindex="' . ($i/5 + 10) . '" status="none">'; $afo=''; break;		
					}
					
					case 'mapX':
					 {
						echo '<input value="' . $formfields[$i] . '" type="number" class="mapX '.$noedit[$i].'" tabindex="' . ($i/5 + 10) . '" status="none" placeholder="' . $placeholder[$i]  . '">'; 
						break;				
					}
	
					case 'mapY_100%': {
						echo '<input value="' . $formfields[$i] . '" type="number" class="mapY '.$noedit[$i].'" tabindex="' . ($i/5 + 10) . '" status="none" placeholder="' . $placeholder[$i]  . '">'; 
						echo '<div id="mapCont" style="width:100%;"></div>';
						break;				
					}
					case 'mapY_200%': {
						echo '<input value="' . $formfields[$i] . '" type="number" class="mapY '.$noedit[$i].'" tabindex="' . ($i/5 + 10) . '" status="none" placeholder="' . $placeholder[$i]  . '">'; 
						echo '<div id="mapCont"></div>';
						break;				
					}
	
					case 'image': {
					
						echo '<input '.$afo.' value="' . $formfields[$i] . '" preval="" type="text" class="imgUrl '.$noedit[$i].'" tabindex="' . ($i/5 + 10) . '" status="none" placeholder="' . $placeholder[$i]  . '">'; 				
						echo '<input type="file" accept=".jpg, .png">';					
						if (substr($formfields[$i], 0, 4) == "http") 
							echo '<img class="formImg" src="' .  $formfields[$i] . '">';
						else
							echo '<img class="formImg" src="' . $imgpath . $formfields[$i] . '">';
						$afo=''; break;				
					}
					
					case 'dds': {
							$dd  = array('dds', $fields[$i+1], $formfields[$i], $noedit[$i], $disabled[$i]);
							$sqlcon = 1;
							include('dropdowns.php'); $afo=''; break;
					}
	
					
					case 'ck1':
					case 'ck2':
					case 'ck3':
					case 'ck4':
					case 'ck5':
					case 'ck6':
					case 'ck7':
					case 'ck8':
					case 'ck9':
					case 'ck10':
					case 'ck11': {
						$detail = htmlspecialchars_decode($formfields[$i]);
						$detail = str_replace('src="'.$objpath,'src="'.$imgpath,$detail);
						echo $detail;
						
						echo '<div class="ckecont"><textarea '.$afo.' class="ckeditor '.$hasflag.'" id ="' . $fields[$i+2] . '" name="' . $fields[$i+2] . '" tabindex="' . ($i/5 + 10) . '" status="none" placeholder="' . $formfields[$i+1] . '" '.$halffield.'>' . $detail . '</textarea></div>'; $afo=''; break;				
					}
					case 'path': {
						echo "<div id='pathCont' mapid='$formfields[$i]'></div>";
						break;							}
				
				}
			}			
			if ($fields[$i+1] != "X") echo '</div>';
			$i++;
			$i++;
			$i++;
			$i++;
		}	
		echo '</div>';
	//}
		
	if ($sqlcon == 1)
 	mysqli_close($con); 
