<?php
	include_once('connect.php');
	
	// van 0(NINCS) az értékkészletben
	$has_empty = 0;
	
	
	if (!isset($dd)) 
		$dd = $_REQUEST["PHPData"];
	$ddtype  = $dd[0]; // dds, ddl
	$ddfield = $dd[1]; // tárgy mező
	$ddvalue = $dd[2]; // selected érték	
	$ddclass  = $dd[3]; // dropdown class, ha kell, pl. noedit, disabled
	$dddisabled  = $dd[4]; // disabled select
	
	if (!$ddvalue) $ddvalue = 0;
	$dicttype = 0;
	if ($ddfield == "Main_Category_id") 	{$dicttype = 1;   $order = "Dict_name";}
	if ($ddfield == "Object_IsTop") 		{$dicttype = 200;   $order = "Dict_name";} // drone futam statusz
	if ($ddfield == "Object_IsBanner") 		{$dicttype = 201;   $order = "Dict_name";} // drone futam erosseg
	if ($ddfield == "Client_Group_id") 		{$dicttype = 210; $order = "Dict_name";}
	if ($ddfield == "Client_MailGroup_id") 	{$dicttype = 211; $order = "Dict_name";}
	if ($ddfield == "News_MailGroup_id") 	{$dicttype = 211; $order = "Dict_name";}
	if ($ddfield == "News_Status") 			{$dicttype = 212; $order = "Dict_id";}
	if ($ddfield == "Bid_Status")	 		{$dicttype = 213; $order = "Dict_id";}
	if ($ddfield == "Product_Status") 		{$dicttype = 214; $order = "Dict_id";}
/* 	if ($ddfield == "Product_Type_id") 		{$dicttype = 215; $order = "Dict_id";} */
	if ($ddfield == "Media_Type_id") 		{$dicttype = 216; $order = "Dict_id";}
	if ($ddfield == "Gallery_Type_id") 		{$dicttype = 216; $order = "Dict_id";}
	if ($ddfield == "Period_Day_id") 		{$dicttype = 217; $order = "Dict_id";}
	if ($ddfield == "Object_accoType_id") 	{$dicttype = 218; $order = "Dict_id";}

	if ($ddfield == "Client_Gender") 	{$dicttype = 230; $order = "Dict_id";}
	if ($ddfield == "Client_Shirt") 	{$dicttype = 231; $order = "Dict_id";}
	if ($ddfield == "Client_Rotor") 	{$dicttype = 233; $order = "Dict_id";}
	if ($ddfield == "Client_Propeller") 	{$dicttype = 234; $order = "Dict_id";}
	if ($ddfield == "Client_Cell") 	{$dicttype = 235; $order = "Dict_id";}
	if ($ddfield == "Result_Type_id") 	{$dicttype = 236; $order = "Dict_id";}
	if ($ddfield == "Client_Palsecam") 	{$dicttype = 237; $order = "Dict_id";}

	//alapselect
	if ($dicttype > 0) {
			if ($ddtype == 'ddl') // nem szelektálható dropdown
				$ddquery = "SELECT Dict_id, Dict_Name FROM Dict WHERE Dict_Tree_id = " . $dicttype . " and Dict_id =  " . $ddvalue;
			if ($ddtype == 'dds') // szelektálható dropdown
				$ddquery = "SELECT Dict_id, Dict_Name FROM Dict WHERE Dict_Tree_id = " . $dicttype . " ORDER BY $order";
	}
	else switch ($ddfield) {
			
		case 'Menu_Category_id' : 
		case 'Menu_Parent_id' : {	
			if ($ddtype == 'ddl') 
				$ddquery = "SELECT id, Menu_Name FROM Menu WHERE id =  " . $ddvalue;
			if ($ddtype == 'dds') 
				$ddquery = "SELECT id, Menu_Name FROM Menu ORDER BY Menu_Name";
			break;}
		case 'Product_Manu_id' : {	
			if ($ddtype == 'ddl') 
				$ddquery = "SELECT id, Manu_Name FROM Product_Manu WHERE id =  " . $ddvalue;
			if ($ddtype == 'dds') 
				$ddquery = "SELECT id, Manu_Name FROM Product_Manu ORDER BY Manu_Name";
			break;}
			
		case 'Cat_Parent_id' : {	
			if ($ddtype == 'ddl') 
				$ddquery = "SELECT id, Cat_Name FROM Product_Cat WHERE id =  " . $ddvalue;
			if ($ddtype == 'dds') 
				$ddquery = "SELECT id, Cat_Name FROM Product_Cat ORDER BY Cat_Name";
			$has_empty = 1;
			break;}
			
		case 'Product_Type_id' : {	
			if ($ddtype == 'ddl') 
				$ddquery = "SELECT id, Cat_Name FROM Product_Cat WHERE id =  " . $ddvalue;
			if ($ddtype == 'dds') 
				$ddquery = "SELECT id, Cat_Name FROM Product_Cat ORDER BY Cat_Name";
			break;}
		case 'Banner_Product_id' : 	
		case 'Product_Parent_id' : {	
			if ($ddtype == 'ddl') 
				$ddquery = "SELECT id, Product_Name FROM Product WHERE id =  " . $ddvalue;
			if ($ddtype == 'dds') 
				$ddquery = "SELECT id, Product_Name FROM Product ORDER BY Product_Name";
			$has_empty = 1;
			break;}
		case 'Path_Map_id' : {	
			if ($ddtype == 'ddl') 
				$ddquery = "SELECT id, Map_Name FROM Map WHERE id =  " . $ddvalue;
			if ($ddtype == 'dds') 
				$ddquery = "SELECT id, Map_Name FROM Map ORDER BY Map_Name";
			break;}
		case 'Client_Country_id' : {	
			if ($ddtype == 'ddl') 
				$ddquery = "SELECT id, Country_Name FROM Country WHERE id =  " . $ddvalue;
			if ($ddtype == 'dds') 
				$ddquery = "SELECT id, Country_Name FROM Country ORDER BY Country_Name";
				
			break;}
		case 'Path_Object_id' : 	
		case 'Object_Master_id' : 	
		case 'Object_id' : {	
			if ($ddtype == 'ddl') 
				$ddquery = "SELECT id, Object_Name FROM Object WHERE id =  " . $ddvalue;
			if ($ddtype == 'dds') 
				$ddquery = "SELECT id, Object_Name FROM Object ORDER BY Object_Name";
			$has_empty = 1;
			break;}
		case 'News_Template_id' : {	
			if ($ddtype == 'ddl') 
				$ddquery = "SELECT id, Template_Name FROM Template WHERE id =  " . $ddvalue;
			if ($ddtype == 'dds') 
				$ddquery = "SELECT id, Template_Name FROM Template ORDER BY Template_Name";
			break;}
		case 'Banner_Modified_by' : 	
		case 'Map_Modified_by' : 	
		case 'Menu_Modified_by' : 	
		case 'Product_Modified_by' : 	
		case 'News_Modified_by' : 	
		case 'Template_Modified_by' : 	
		case 'Bid_Modified_by' : 	
		case 'Bid_Client_id' : 	
		case 'Object_Modified_by' : 	
		case 'Object_Client_id' : {	
			if ($ddtype == 'ddl') 
				$ddquery = "SELECT id, Client_Username FROM Client WHERE id =  " . $ddvalue;
			if ($ddtype == 'dds') 
				$ddquery = "SELECT id, Client_Username FROM Client ORDER BY Client_Username";
			break;}
			
		case 'Menu_Dict_Tree_id' : 
		case 'Dict_Tree_id' : {	
			if ($ddtype == 'ddl') 
				$ddquery = "SELECT id, Dict_Name FROM Dict_Tree WHERE id =  " . $ddvalue;
			if ($ddtype == 'dds') 
				$ddquery = "SELECT id, Dict_Name FROM Dict_Tree ORDER BY Dict_Name";
			break;}
		case 'ddsSite' :
		case 'Banner_Site_id' :
		case 'Manu_Site_id' :
		case 'Cat_Site_id' :
		case 'Map_Site_id' :
		case 'Txt_Site_id' :
		case 'Pic_Site_id' :
		case 'Product_Site_id' :
		case 'Bid_Site_id' :
		case 'Client_Site_id' :
		case 'Menu_Site_id' :
		case 'News_Site_id' :
		case 'Object_Site_id' : {	
			if ($ddtype == 'ddl') 
				$ddquery = "SELECT id, Site_Name FROM Site WHERE id = " . $ddvalue;
			if ($ddtype == 'dds') 
				$ddquery = "SELECT id, Site_Name FROM Site ORDER BY Site_Name";
			break;}
		case 'Entry_Client_id' :
		case 'Client_id' : {	
			if ($ddtype == 'ddl') 
				$ddquery = "SELECT id, CONCAT(Client_No, ' ', Client_Nickname) Racer FROM Client WHERE id =  " . $ddvalue;
			if ($ddtype == 'dds') 
				$ddquery = "SELECT id, CONCAT(Client_No, ' ', Client_Nickname) Racer FROM Client ORDER BY Client_No";
			break;}
		case 'Entry_Race_id' :
		case 'Race_id' : {	
			if ($ddtype == 'ddl') 
				$ddquery = "SELECT id, Object_Name FROM Object WHERE id = " . $ddvalue;
			if ($ddtype == 'dds') 
				$ddquery = "SELECT id, Object_Name FROM Object WHERE Main_Category_id = 1 ORDER BY Object_Date_Available";
			break;}
			
	}
	//keret
/* 	if ($ddtype == 'dds') echo '<select tabindex="' . ($i/5 + 10) . '" name="'.$ddfield.'" field="'.$ddfield.'" class="'.$ddclass.'">'; */
	if ($ddtype == 'dds') echo '<select '.$dddisabled.' tabindex="' . $tabOrder . '" name="'.$ddfield.'" field="'.$ddfield.'" class="'.$isGridRow.' '.$ddclass.'">';
	if ($has_empty == 1) {
		if ($ddtype == 'dds') echo '<option value="0">NINCS</option>';
	}
	$ddresult = mysqli_query($con, $ddquery);
		
	if (mysqli_num_rows($ddresult) > 0)
	while($ddrow = mysqli_fetch_array($ddresult)) {
	
		switch ($ddfield) {
			default					: 	{$dd_val = $ddrow['Dict_id']; 	$dd_name = $ddrow['Dict_Name']; break;}
			case 'Menu_Category_id':
			case 'Menu_Parent_id': 		{$dd_val = $ddrow['id']; 	$dd_name = $ddrow['Menu_Name']; break;}
			case 'Cat_Parent_id': 		
			case 'Product_Type_id': 	{$dd_val = $ddrow['id']; 	$dd_name = $ddrow['Cat_Name']; break;}
			case 'Product_Manu_id': 	{$dd_val = $ddrow['id']; 	$dd_name = $ddrow['Manu_Name']; break;}
			case 'Banner_Product_id' 	:
			case 'Product_Parent_id': 	{$dd_val = $ddrow['id']; 	$dd_name = $ddrow['Product_Name']; break;}
			case 'Object_Master_id' 	:
			case 'Path_Object_id' 		: 	
			case 'Object_id' 		: 	{$dd_val = $ddrow['id']; 	$dd_name = $ddrow['Object_Name']; break;}
			case 'Path_Map_id': 	{$dd_val = $ddrow['id']; 	$dd_name = $ddrow['Map_Name']; break;}
			case 'Client_Country_id': 	{$dd_val = $ddrow['id']; 	$dd_name = $ddrow['Country_Name']; break;}
			case 'Main_Category_id' : 	{$dd_val = $ddrow['Dict_id']; 	$dd_name = $ddrow['Dict_Name']; break;}
			case 'Banner_Modified_by' : 	
			case 'Map_Modified_by' : 	
			case 'Product_Modified_by' : 	
			case 'Bid_Modified_by' : 	
			case 'Bid_Client_id' : 	
			case 'Menu_Modified_by' : 	
			case 'News_Modified_by' : 	
			case 'Template_Modified_by' : 	
			case 'Object_Modified_by' : 	
			case 'Object_Client_id' : 	{$dd_val = $ddrow['id']; 		$dd_name = $ddrow['Client_Username']; break;}
			case 'News_Template_id' : 	{$dd_val = $ddrow['id']; 		$dd_name = $ddrow['Template_Name']; break;}
			case 'Menu_Dict_Tree_id' 	:	
			case 'Dict_Tree_id' 	:	{$dd_val = $ddrow['id']; 		$dd_name = $ddrow['Dict_Name']; break;}
			case 'Banner_Site_id' :
			case 'Manu_Site_id' :
			case 'Cat_Site_id' :
			case 'Map_Site_id' 	:
			case 'Txt_Site_id' 	:
			case 'Menu_Site_id' 	:
			case 'Pic_Site_id' 	:
			case 'Product_Site_id' 	:
			case 'Bid_Site_id' 	:
			case 'Client_Site_id' 	:
			case 'News_Site_id' 	:
			case 'Object_Site_id'	:
			case 'ddsSite' 			:	{$dd_val = $ddrow['id']; 		$dd_name = $ddrow['Site_Name']; break;}
			case 'Entry_Race_id'	:
			case 'Race_id' 			:	{$dd_val = $ddrow['id']; 		$dd_name = $ddrow['Object_Name']; break;}
			case 'Entry_Client_id' 	:
			case 'Client_id' 			:	{$dd_val = $ddrow['id']; 		$dd_name = $ddrow['Racer']; break;}
		}
		
		if ($ddtype == 'ddl') echo $dd_name;
		if ($ddtype == 'dds') echo '<option value="' . $dd_val . '" ' . ($dd_val == $ddvalue ? "selected" : "") . ' class="'.$isGridRow.'">' . $dd_name . '</option>';
	}
		else if ($ddtype == 'ddl'  and $has_empty == 1) echo "NINCS";
	
	//keret
	if ($ddtype == 'dds') echo '</select>';
					
	
