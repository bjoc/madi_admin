<?php
	
	
				//stilusok
				$rowstyle = "";
				if ($_half[$i] == "half1") {$rowstyle = 'style="width:64%;display:inline-block;"';}
				if ($_half[$i] == "half2") {$rowstyle = 'style="width:23%;display:inline-block;height:20;"';}
				if ($isGrid) 			   {$rowstyle = 'style="width:'.$_gridWidth[$i].'%;"';} 
				
				$labelstyle = "";
				if ($_half[$i] == "half1") {$labelstyle = 'style="width:39%;padding-left: 3%;"';}
				if ($_half[$i] == "half_cke") {$labelstyle = 'style="width:15%"';}
				echo '<div key="0" class="formRow '.$isJoinRow.' '.$isGridRow.' '.($_noedit[$i] == 'noedit' ? 'noeditRow' : '').' './*($_type[$i] == 'image' ? 'halfRow' : '') .*/'" field="' . str_replace("#","", $_sqlcol[$i]) . '"  '. $rowstyle.' >';			
				
				// itt dől el az image átméretezés
				$imgwidth = '800';
				$imgquality = '75';
				if (str_replace("#","", $_sqlcol[$i]) == 'Product_Image_Small') { $imgwidth = '640';}
				if (str_replace("#","", $_sqlcol[$i]) == 'Object_List_Image_Small') { $imgwidth = '640';}
				if (str_replace("#","", $_sqlcol[$i]) == 'Object_Banner_Image') { $imgwidth = '1200'; $imgquality = '90';}
				if (str_replace("#","", $_sqlcol[$i]) == 'Gallery_Src') { $imgwidth = '1234'; $imgquality = '90';}
				//$imgwidth = '1234' = ezzel jelzem, hogy Galériát töltök fel, vagyis a kép mellé még automatikusan csinál egy kisképet (fileupload.php)


				if ($_half[$i] != "half2" && !$isGrid) echo "<label $labelstyle>$_label[$i]</label>";				
				$halffield = "";
				if ($_half[$i] == "half1") $halffield = " style='width:45%;' ";
				if ($_half[$i] == "half2") $halffield = " style='width:130%;float:right;' ";
				
				//zászló ikon
				$hasflag = "";
				if ($_flagid[$i] != "") {
					echo "<div class='flagicon'><img class='flagimg' src='images/flag$_flagid[$i].png'></div>";
					$hasflag = "hasFlag";
				}
						
				switch ($_type[$i]) {
					case 'id_type': {
						echo '<input readonly="readonly" value="' . $_value[$i] . '" type="text" class="id" tabindex="-1">'; break;				
					}
					
					case 'text': {
						echo "<input $afo $_readonly[$i] value='$_value[$i]' type='text' class=' $isGridRow $_istitle[$i] $_noedit[$i] $hasflag' tabindex='$tabOrder' status='none' noempty='$_noempty[$i]' placeholder='$_placeho[$i]' $halffield >"; $afo=''; break;				
					}
					
					case 'textarea': {
						$detail = htmlspecialchars_decode($_value[$i]);
						echo "<div class='ckecont'><textarea rows='30' cols='100' $afo $_readonly[$i] type='textarea' class=' txtarea $isGridRow $_istitle[$i] $_noedit[$i] $hasflag' tabindex='$tabOrder' status='none' noempty='$_noempty[$i]' placeholder='$_placeho[$i]' $halffield >$detail</textarea></div>"; $afo=''; break;				
					}

					case 'num': {
						echo '<input '.$afo.' '.$_readonly[$i].' value="' . $_value[$i] . '" type="number" class=" '.$isGridRow.' '.$_noedit[$i].'" tabindex="' . $tabOrder . '" status="none" noempty="'.$_noempty[$i].'" placeholder="' . $_placeho[$i]  . '" '.$halffield.'>'; $afo=''; break;				
					}
					case 'date': {
						echo '<input '.$afo.' '.$_readonly[$i].' value="' . str_replace("-", ".", $_value[$i]) . '" type="text" class="datepicker '.$isGridRow.' '.$_noedit[$i].'" noempty="'.$_noempty[$i].'"tabindex="' . $tabOrder . '" emptytonull="1" status="none" placeholder="' . $_placeho[$i]  . '" '.$halffield.'>'; $afo=''; break;				
					}
					
					case 'datetime': {
						echo '<input '.$afo.' '.$_readonly[$i].' value="' . str_replace("-", ".", $_value[$i]) . '" type="text" class="datetimepicker '.$isGridRow.' '.$_noedit[$i].'" noempty="'.$_noempty[$i].'"tabindex="' . $tabOrder . '" emptytonull="1" status="none" placeholder="' .$_placeho[$i]  . '" '.$halffield.'>'; $afo=''; break;				
					}
					case 'time': {
						echo '<input '.$afo.' '.$_readonly[$i].' value="' . date("H:i", strtotime($_value[$i])) . '" type="text" class="timepicker '.$isGridRow.' '.$_noedit[$i].'" noempty="'.$_noempty[$i].'"tabindex="' . $tabOrder . '" emptytonull="1" status="none" placeholder="' .$_placeho[$i]  . '" '.$halffield.'>'; $afo=''; break;				
					}
					case 'check': {
						echo '<input '.$afo.' '.$_checked[$i].' ' . ($_value[$i] == 1 ? "checked" : "") . ' type="checkbox" class="'.$_noedit[$i].'" tabindex="' . $tabOrder . '" status="none">'; $afo=''; break;		
					}
					
					case 'mapX':
					 {
						echo '<input value="' . $_value[$i] . '" type="number" class="mapX '.$_noedit[$i].'" tabindex="' . $tabOrder . '" status="none" placeholder="' . $_placeho[$i]  . '">'; 
						break;				
					}
	
					case 'mapY_100%': {
						echo '<input value="' . $_value[$i] . '" type="number" class="mapY '.$_noedit[$i].'" tabindex="' . $tabOrder . '" status="none" placeholder="' . $_placeho[$i]  . '">'; 
						echo '<div id="mapCont" style="width:100%;"></div>';
						break;				
					}
					case 'mapY_200%': {
						echo '<input value="' . $_value[$i] . '" type="number" class="mapY '.$_noedit[$i].'" tabindex="' . $tabOrder . '" status="none" placeholder="' . $_placeho[$i]  . '">'; 
						echo '<div id="mapCont"></div>';
						break;				
					}
	
					// NEWUPLOAD
					case 'image': {
					
						echo '<input id="fileInputText'.$i. '" ' . $afo.' value="' . $_value[$i] . '" preval="" type="text" class="imgUrl '.$_noedit[$i].'" tabindex="' . $tabOrder . '" status="none" placeholder="' . $_placeho[$i]  . '">'; 				
						echo "<input id='fileInputButton$i' type='file' wid='$imgwidth' wqu='$imgquality' accept='.jpg, .png'>";					
						if ($_value[$i] == "") 
							echo "<img id='fileInputImg$i' class='formImg' src='images/imagehere.png'>"; 
						else
						if (substr($_value[$i], 0, 4) == "http") 
							echo '<img id="fileInputImg' . $i . '" class="formImg" src="' . $_value[$i] . '">';
						else
							echo '<img id="fileInputImg' . $i . '" class="formImg" src="' . $imgpath . $_value[$i] . '">';
						$afo=''; break;				
					}
					
					case 'dds': {
							$dd  = array('dds', $_sqlcol[$i], $_value[$i], $_noedit[$i], $_disabled[$i]);
							$sqlcon = 1;
							include('dropdowns.php'); $afo=''; break;
					}
	
					case 'ddl' : {
							$dd  = array('ddl', $_sqlcol[$i], $_value[$i], $_noedit[$i], $_disabled[$i]);
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
						$ckid = str_replace("ck", "ck".$winID, $_type[$i]);
						$detail = htmlspecialchars_decode($_value[$i]);
//						$detail = str_replace($objpath,$imgpath,$detail);
//						$detail = str_replace('src="'.$objpath,'src="'.$imgpath,$detail);
						
						echo '<div class="ckecont"><textarea '.$afo.' class="ckeditor '.$hasflag.'" id ="' . $ckid . '" name="' . $ckid . '" tabindex="' . $tabOrder . '" status="none" noempty="'.$_noempty[$i].'" placeholder="' . $_placeho[$i] . '" '.$halffield.'>' . $detail . '</textarea></div>'; $afo=''; break;				
					}
					case 'path': {
						echo "<div id='pathCont' mapid='$_value[$i]'></div>";
						break;							
					}
				
				}
				
				echo '</div>';
				
