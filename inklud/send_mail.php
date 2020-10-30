<?php

	
	require('connect.php');
	require("class.phpmailer.php");  
	require("class.smtp.php");  
	require('hyphenize.php');
	
	$PHPData = $_REQUEST["PHPData"];
	
	// módok
	// ["NG", site, sender_id, datetime, news_id, emails_to_send	] News+objektumok -> news group-okhoz	pl. hírlevél
	// ["NU", site, sender_id, datetime, news_id, user_id	] News+objektumok -> user_id-ra 		pl. hírlevél előnézet
	// ["TU", site, sender_id, datetime, template_id, user_id] Template -> user_id-ra 				pl. lejelentkezés, jelszó változtatás! 
	// ["TM", site, sender_id, datetime, template_id, mail] 	Template -> mailre					pl. feliratkozás 
	// ["OU", site, sender_id, datetime, template_id, user_id, 'obj1, obj2, ...']] 	Template+object -> user_id-ra 		pl. ?  
	// ["OM", site, sender_id, datetime, template_id, mail, 'obj1, obj2, ...'] 	Template+object -> mailre			pl. emlékeztető 
	// ["BB", site, sender_id, datetime, template_id, bid_id	] Bid+objektumok -> user_id-ra  
	
	$mode = 		$PHPData[0];
	$NTO = 			substr($mode, 0, 1); // news, template, object, bid
	$GUM = 			substr($mode, 1, 1); // group, userid, mail, bid
	$siteid =		$PHPData[1];
	$senderid =		$PHPData[2];
	$datetime =		$PHPData[3];
	$newsid =		$PHPData[4];
	$templateid =	$PHPData[4];
	$bidid =		$PHPData[5];
	$userid =		$PHPData[5];
	$usermail =		$PHPData[5];
	$mailstosend =	$PHPData[5];
	$obj_in =		$PHPData[6];
	$mailIDstosend =	$PHPData[6];
	$bulkMode =	$PHPData[7];

    echo "<waslast>" . $_REQUEST["isLast"] . "</waslast>"; // bulk utolso kuldes callback-hez
	require("site_params.php");  
	$mail = new PHPMailer();   
	$mail->Host 	= $siteSMTPAddr; 
	$mail->Port 	= $siteSMTPPort;
	if ($siteSMTPAuth == 1) {
		$mail->Username = $siteSMTPUsername;
		$mail->Password = $siteSMTPPassword;
		$mail->SMTPSecure = "ssl";  
		$mail->SMTPAuth = true;		
	} else {
		$mail->Username = "";
		$mail->Password = "";
		$mail->SMTPSecure = "ssl";  
		$mail->SMTPAuth = true;		
	}
	
	
	// php 5.6
	
	$mail->Username = "info@velenceturizmus.hu";
	$mail->Password = "Inf01234";
	$mail->SMTPSecure = "tls";
	$mail->Port = "587";
	$mail->Host = "outlook.office365.com";
	$mail->SMTPDebug =0;		

		/*
	$mail->SMTPOptions = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    ));
	*/

	$mail->CharSet = 'UTF-8';
	$mail->IsSMTP();
	$mail->IsHTML(true);
	$mail->WordWrap = 50;
	$mail->SMTPKeepAlive = true;	
			
	// küldő user
	$query = "SELECT Client_Username, Client_ForName, Client_SurName, Client_Company, Client_Email FROM Client WHERE id = $senderid";
	$result = mysqli_query($con, $query); 
	$row = mysqli_fetch_assoc($result);
	$sendername = $row['Client_SurName'] . ' ' . $row['Client_ForName'];
	$sendermail = $row['Client_Email'];

	// template paraméterek
	$query = "	SELECT Template_Subject, Template_Header, Template_Body, Template_Footer, Template_ReplyMail, Template_ReplyMailDesc, Template_CanReply ";
	if ($NTO == "N") 
		$query .= ", News_HasOwnBody, News_Body FROM Template INNER JOIN News ON News_Template_id = Template.id WHERE News.id = $newsid";
	else // T, O
		$query .= "FROM Template WHERE Template.id = $templateid";
	$result = mysqli_query($con, $query); $row = mysqli_fetch_assoc($result);
	$oriheader = htmlspecialchars_decode($row['Template_Header']);
	$oribody 	= htmlspecialchars_decode($row['Template_Body']);
	$orifooter = htmlspecialchars_decode($row['Template_Footer']);
	$orisubject = $row['Template_Subject'];
	$orireply = $row['Template_ReplyMail'];
	$orireplydesc = $row['Template_ReplyMailDesc'];

	// ha van a hírlevélnek saját body-ja...
	$newsbody 	= htmlspecialchars_decode($row['News_Body']);
	$ownnewsbody 	= htmlspecialchars_decode($row['News_HasOwnBody']);
	if ($ownnewsbody == 1) $oribody = $newsbody;

	
	// "B" esetén ajánlat paraméterek
	$arrivedate = "";
	$staynights = "";
	$adults = "";
	$persons = "";
	$children = "";
	$childage = "";
	$offerdate = "";
	$offercomment = "";
	if ($NTO == "B") {
		$query = "	SELECT Bid_ArriveDate, Bid_StayNights, Bid_Adults, Bid_Children, Bid_ChildrenAge, Bid_Created, Bid_Comment, Bid_Client_id FROM Bid WHERE Bid.id = $bidid";
		$result = mysqli_query($con, $query); $row = mysqli_fetch_assoc($result);
		$arrivedate = $row['Bid_ArriveDate'];
		$staynights = $row['Bid_StayNights'];
		$adults = $row['Bid_Adults'];
		$children = $row['Bid_Children'];
		$persons = $adults + $children;
		$childage = $row['Bid_ChildrenAge'];
		$offerdate = $row['Bid_Created'];
		$offercomment = $row['Bid_Comment'];
		$biduserid = $row['Bid_Client_id']; // ezt kapja a következő query
	} 
	
	// csatolt objektumok
 	$objs = "</td></tr><tr><td colspan='2' ><hr></td></tr>"; 
	// ...ajánlat esetén
	if ($NTO == "B") {
				$query = "	SELECT  Object.id, Object_Name, Object_List_Image_Small, Object_Short_Description, fromdate, todate FROM Object 
 						INNER JOIN Bid_Objects ON Bid_Objects.Object_id = Object.id
						WHERE Bid_Objects.Bid_id = $bidid
						ORDER BY Object.Object_Date_Available DESC";
			$result = mysqli_query($con, $query);
			while($row = mysqli_fetch_row($result)) {
				$objectid = $row[0];
				$objectname = $row[1];
				$objectimg = $row[2];
				$objectdesc = trim(htmlspecialchars_decode($row[3]));
				$objectdate = $row[4] . (($row[5] == "" OR $row[5] == $row[4])? "" : " - ".$row[5]);
				$img = $siteimages.$siteimagesdir.$objectimg;
				$objs .= "<b>$objectname</b><br>".($objectdate ? "$objectdate<br>" : "")."<br>$objectdesc<br><br><hr>";
			}
	}
	// ...egyéb esetben
	if ($NTO == "N" || $NTO == "O") {
			$query = "	SELECT  Object.id, Object_Name, Object_List_Image_Small, Object_Short_Description, Object_Date_Available
						FROM Object ";
			if ($NTO == "N") 
				$query .= "	
 						INNER JOIN News_Objects ON News_Objects.Object_id = Object.id
						WHERE News_id = $newsid
						ORDER BY Object.Object_Date_Available DESC";
			if ($NTO == "O") {
				$query .= " WHERE Object_id IN (";	
					for ($i=0;$i<count($obj_in);$i++) {
						$query .= $obj_in[$i];
						if ($i<count($obj_in)-1) $query .= ","; 
					} 
				$query .= " ) ";	
			}
			$result = mysqli_query($con, $query);
			
			while($row = mysqli_fetch_row($result)) {
				$objectid = $row[0];
				$objectname = $row[1];
				$objectimg = $row[2];
				$objectdesc = htmlspecialchars_decode($row[3]);
				$objectdate = $row[4];
				$img = $siteimages.$siteimagesdir.$objectimg;
				
				$seoName	= $objectname;
				$seoName 	= hyphenize($seoName)."-".$objectid;


				
				$objs .= "
				<tr>
				<td valign='top' width='300'>
					<a href='$siteimages-$seoName' style='text-decoration:none;'>
						<img width='290' src='$img'>
					</a>
				</td>
				<td valign='top' style='line-height:1.3;color:#000000;' width='300'>
					<a href='$siteimages-$seoName' style='text-decoration:none;color:#000000;'>
						<b><big>$objectname</big></b><br><br>
						$objectdesc
					</a>
				</td></tr><tr><td colspan='2'>
				<hr></td></tr>";
			}
			 	$objs .= "<tr><td>"; 

	} 
		// user(ek)
		if ($GUM == "B") $query = "SELECT Client_Username, Client_ForName, Client_SurName, Client_Company, Client_Email, Client_Password, Client_NewPassword, Client_Phone, Client_Postcode, Client_City, Client_Address, Country_Name FROM Client INNER JOIN Country ON Country.id = Client.Client_Country_id WHERE Client.id = " . $biduserid;		
		if ($GUM == "M") $query = "SELECT '$usermail' AS Client_Email";
		if ($GUM == "U") $query = "SELECT Client_Username, Client_ForName, Client_SurName, Client_Company, Client_Email, Client_Password FROM Client WHERE id = $userid";
		
		$wrongOnes = "";
		
		if ($GUM == "G") {
				if ($bulkMode == 0) {
					// mindenkinek küld, ID-ra szűr
					$query = "SELECT DISTINCT Client_Username, Client_ForName, Client_SurName, Client_Company, Client_Email FROM Client WHERE Client.Client_Status = 1 AND Client.id in ($mailIDstosend)";
					
				} else {
					// csak a rosszakat, mailre szűr
					$query = "SELECT DISTINCT Client_Username, Client_ForName, Client_SurName, Client_Company, Client_Email FROM Client WHERE Client.Client_Status = 1 AND Client_Email in ($mailstosend)";	
					
				}	
			
		}
		
		$result = mysqli_query($con, $query); 
		
		$mailco = 1;
	
		while ($row = mysqli_fetch_array($result)) {
		
		
			$username = $row['Client_Username'];
			$forname = $row['Client_ForName'];
			$surname = $row['Client_SurName'];
			$compname = $row['Client_Company'];
			
			$usermail = $row['Client_Email'];
//			$usermail = $row['mymail'];
			
			// !!!!!!!!!!!!!!!!!!!!!
			if ($GUM == "G") 
				if ($uberMail != "") { $usermail = $uberMail; }
			// ha üres, akkor a rendes mail-re megy!
			
			$userpw = 	($GUM == "U" ? $row['Client_Password'] : '');
			$mail->ClearAddresses();
			$mail->AddAddress($usermail, ($forname == "" ? $compname : $surname . ' ' . $forname));
	
			//beágyazott változók
			
			$rplc = array(
			"#sendermail", $sendermail,
			"#sendername", $sendername,
			"#sitemail", $sitemail,
			"#sitename", $sitename,
			"#userid", $username,
			"#userpw", $userpw,
			"#usermail", $usermail,
			"#username", ($forname == "" ? $compname : $surname . ' ' . $forname),
			"#datetime", $datetime,
			"#newsletter_link_on" , $siteurl . $sitesubdir . "/include/newslettersubscribe.php?s=$siteid&m=$usermail&c=".hash('sha512',$usermail.'DorZal'),			
			"#newsletter_link_off" , $siteurl . $sitesubdir . "/include/newsletterunsubscribe.php?s=$siteid&m=$usermail&c=".hash('sha512',$usermail.'DorZal'),			
			"#newpassword_link" , $siteurl . $sitesubdir . "/include/newpasswordsubscribe.php?s=$siteid&m=$usermail&c=".hash('sha512',$usermail.'DorZal')."&p=".hash('sha512',$temppw.'DorZal'),
			"#userphone", $userphone,
			"#useraddress", $useraddress,
			"#offer_objects", $objs,
			"#arrivedate", $arrivedate,
			"#staynights", $staynights,
			"#adults", $adults,
			"#persons", $persons,
			"#children", $children,
			"#childage", $childage,
			"#offerdate", $offerdate,
			"#offercomment", $offercomment,
			"#usercountry", $usercountry);
			$reply 		= Macro($rplc, $orireply);
			$replydesc 	= Macro($rplc, $orireplydesc);
			$subject	= Macro($rplc, $orisubject);
			$header		= Macro($rplc, $oriheader);
			$body		= Macro($rplc, $oribody);
			$footer		= Macro($rplc, $orifooter);
			$mail->From     = $reply;
			$mail->FromName = $replydesc;
			if ($row['Template_CanReply'])
				$mail->AddReplyTo($reply,$replydesc);
			else
				$mail->AddReplyTo("noreply@","");
			$mail->Subject = $subject;
			$mail->Body = $header; 
			$mail->Body .= $body.'<br>'; 
			if ($NTO != "B") $mail->Body .= $objs; 
			$mail->Body .= $footer; 
			
			
//			$mail->WordWrap = 50;                              // Sortörés állítása  
//			$mail->AddAttachment("/var/tmp/file.tar.gz");   // Csatolás  //
//			$mail->AddAttachment("/tmp/kep.jpg", "kep.jpg"); // Csatolás más néven  


			if ($GUM == "G") {
				if (!$mail->Send()) {
					$wrongOnes .= "\"$usermail\",";
				} else echo "OK";
			} else {
				if (!$mail->Send()) {  
				  echo "A levél nem került elküldésre<br>";  
				  echo "A felmerült hiba: " . $mail->ErrorInfo;   
				}  else echo "OK";
			}

		}
 	mysqli_close($con); 
 	 	
 	if ($GUM == "G") {
	 	 	echo "<wrong>";
	 	 	echo $wrongOnes ;
	 	 	echo "</wrong>";
 	}
 	
 	function Macro($mrplc, $mstr) {
	 	for ($i=0; $i<count($mrplc);$i++) {
			$mstr = str_replace($mrplc[$i],$mrplc[$i+1],$mstr);
		 	$i++;
	 	}
	 	return $mstr;
 	}
