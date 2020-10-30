
(function ($){ logOut = function () {
	//	$.post('inklud/logout.php', {}, function(data) {
			window.location.replace("login.php");
	//	});
	
}})(jQuery);
(function ($){ xShake = function(e) {
	TweenLite.from(e, 1, { left: -15, ease:Elastic.easeOut});
}})(jQuery);

(function ($){ initConfig = function (fun) {
		console.log("config.html ....");
    $.get('_config/config.html?random=' + Math.random(), function(config) {
		console.log("config.html loaded!");
    	isTesting = data_part(config, "Testing");
    	filemanDir = data_part(config, "fileman");
 		$("nav").html(data_part(config, "MenuMain"));
 		document.title = data_part(config, "Title");
  		menuDefault = data_part(config, "MenuDefault");
 		defMapX = data_part(config, "defMapX");
 		defMapY = data_part(config, "defMapY");
 		ddsSite = parseInt(data_part(config, "SiteID")) || 0;
 		if (ddsSite == 0) ddsSite = 1;

 		loadConfig(fun);
    });
}})(jQuery);

(function ($){ loadConfig = function (fun) {
		   console.log("grid_forms.html ....");
 	   $.get('_config/grids_forms.html?random=' + Math.random(), function(config) {
		   console.log("grid_forms.html loaded!");
		   confOrig = config;
		   fun();
	   });
}})(jQuery);

(function ($){ Init = function () {
		if (typeof $_POST === 'undefined') {
			window.location.replace("login.php");
		} else  {
			xDesktopResize();
			xStartSpinner();
			initConfig(funcConfigLoaded);
		}
}})(jQuery);

(function ($){ _killReservedSQL = function(data) {
	var fr = new RegExp('bject', 'g');
	var to = 'bjekt';
	data = data.toString().replaceAll(fr,to);
	var fr = new RegExp('images/objekt', 'g');
	var to = 'images/object';
	data = data.toString().replaceAll(fr,to);
	return data;
}})(jQuery);
			
			
(function ($){ funcConfigLoaded = function () {
			
				initWins("work");
				ck = [];
				
				userName = ($_POST['username'] ? $_POST['username'] : $_POST['sessionname']);
				userID = ($_POST['userid'] ? $_POST['userid'] : $_POST['sessionid']);
				userDB	= ($_POST["userceg"] ? $_POST["userceg"] : $.cookie("selectDb") );
				cooStyle = ($_POST["userstyle"] ? $_POST["userstyle"] : $.cookie("selectStyle"));
				schema = userDB;
				
				//header
				$.post('inklud/firstDB.php', {schema:schema, userID:userID, siteID:ddsSite }, function(data) {

					$("#userName").html(userName + " (" + data_part(data, 'maxGroup') + ") ");
					site    	 = data_part(data, 'site');
					site_img     = data_part(data, 'site_img');
					console.log(site_img);
					site_objects     = data_part(data, 'site_objects');
					CK_Images_Folder= data_part(data, 'CK_Images_Folder');
					imgObjFromPHPInclude		= "../" + site_img;
					
					$.post('inklud/dropdowns.php', { PHPData:['dds', 'ddsSite', ddsSite], schema:schema }, function(data) {
						$("#siteSelect").html(data);
		
						// mehet a menü
						menuInit();
						$("#siteSelect").on('change',function(){
								ddsSite = $(this).find(":selected").val();
								_gridInit(content);
						});
					});
				});
								
				$("#navButLogout").on("click", function () {
					logOut();
				});
			
}})(jQuery);

function data_part(data, code) {
	var codelength = code.length;
	var start = data.search('<' + code + '>') + codelength + 2;
	var end   = data.search('</' + code + '>');
	return data.substr(start, end - start).trim();
}

(function ($){ menuInit = function () {
	
	xDesktopResize();
	limit_start = 0;
	step = 50;
	rowcou = 0;
	prev_order = "id";
	
	noDelPopup = 0;
	
	askDelPopup = 0;
	
	answer = "";
	searches = '';
	search_open = 0;
	menuClicked = false;
	$('nav li').click(function () {
		if (menuClicked) return false;
		else
		if ($(this).attr("content")) {
			menuClicked = true;
			content = $(this).attr("content");
			butDataOld = '';
			formClose(1); //cancel img uploads
			searches = '';
			_gridInit(content);
		}
	}); 
	
	orderA = [];
	incdescA = [];
 	xStopSpinner();
 	
 	if (menuDefault != "") {
	 	content = menuDefault;
	 	_gridInit(content);
 	}

	$(document).unbind("keyup").keyup(function(e) {	
		if (e.keyCode == 27) {
			$(".winAbs[active=1]").remove();
			var $lastWin = $(".winAbs:last");
			makeActive($lastWin);
		}
	});

	
}})(jQuery);

//(function ($){ filterDoRefresh = function(content, order) {
(function ($){ filterDoRefresh = function(_winID) {
/// végigmegy a searchCont mezőin és bepakolja a searches mezőbe, majd frissít
	searches = "";
	var need_and = 0;
	
	var $sea = $("#win"+_winID).find(".searchCont");

	$sea.find(".searchField[type!='checkbox']").each(function () {
		if (this.value) {
			var sea = $(this);
			sea.attr("value", this.value);	
			var field = sea.attr("field");
			var ftype  = sea.attr("type");
	
			if (need_and == 1) searches += " AND "		
			need_and = 1;
			if (sea.hasClass("datepicker_from")) ftype = "date_from";
			if (sea.hasClass("datepicker_to")) ftype = "date_to";
			if (sea.hasClass("datetimepicker_from")) ftype = "datetime_from";
			if (sea.hasClass("datetimepicker_to")) ftype = "datetime_to";
			switch (ftype) {
				case "date_from":
				case "datetime_from":	{searches += field + " >= date(\'" + this.value + "\') "; break;}
				case "date_to": 		
				case "datetime_to":		{searches += field + " <= date(\'" + this.value + "\') "; break;}
				case "text": 			{searches += field + " like \'%" + this.value + "%\' "; break;}
			}
			
			if (sea.attr("name") == sea.attr("field")) 
				searches += field + " = " + sea.find('option:selected').val(); 
		}
	});
	
	$sea.find(".searchCheck").each(function () {	
		var sea = $(this);
		sea.attr("value", this.value);	
		var field = sea.attr("field");
		if (need_and == 1) searches += " AND "		
		need_and = 1;
		searches += field + " = " + (this.checked ? '1' : '0');	
	});
		
	setTimeout(function(){
		_gridShow(_winID, content, 0);
		
	}, 500);
					
}})(jQuery);

(function ($){ filterShow = function(_winID) {
	var $win = $("#win"+_winID);
	if 	($win.find(".searchCont").length == 0) {
			$win.append("<div class='searchCont'></div>");	
	}
	
}})(jQuery);
(function ($){ filterHide = function(_winID) {
	$("#win"+_winID).find(".searchCont").remove();;	
	filterDoRefresh(_winID);
}})(jQuery);
(function ($){ filterRemoveField = function(_winID, field) {
	var $sea = $("#win"+_winID).find(".searchCont");	
	$sea.find(".searchFieldCont[fieldcont='"+field+"']").remove();
	filterDoRefresh(_winID);
	
}})(jQuery);
//(function ($){ filterAddField = function(content, order, field, label, type) {
(function ($){ filterAddField = function(_winID, field, label, type) {
	//type = 0:text, 1:list, 2:date, 3:check
	
	filterShow(_winID);	
	var $sea = $("#win"+_winID).find(".searchCont");	
	var htm_act = $sea.html();	
	var htm = '';	
	if (htm_act == "") {
			htm =  '<img id="img_do_search" src="images/search_big.png" onclick="filterDoRefresh('+_winID+');">';
			htm += '<img id="img_hide_search" src="images/ico_close.png" onclick="filterHide('+_winID+');">';
	}
	
	if ($sea.find("[field='"+field+"']").length == 0) 
	{
	
		htm += ' <div class="searchFieldCont" fieldcont="' + field + '">';
		switch (type) {
			case 'id_type':
			case 'text': {
				htm += ' <input type="text" class="searchField" field="' + field + '" value="" placeholder="'+ label +'">';
				filterFinalizeField(_winID);
				break;
			}		
			case 'ddl': {
				$.post('inklud/search_dds.php', { PHPData:[field], schema:schema }, function(data) {
					htm += data;
					filterFinalizeField(_winID);
				});					
				break;
			}	
			case 'date': {
				htm += '<input type="text" value="" class="searchField datepicker_from" field="' + field + '"placeholder="'+ label +'"> - ';
				htm += '<input type="text" value="" class="searchField datepicker_to" field="' + field + '"placeholder="'+ label +'">';
				filterFinalizeField(_winID);
				break;
			}
			case 'datetime': {
				htm += '<input type="text" value="" class="searchField datetimepicker_from" field="' + field + '"placeholder="'+ label +'"> - ';
				htm += '<input type="text" value="" class="searchField datetimepicker_to" field="' + field + '"placeholder="'+ label +'">';
				filterFinalizeField(_winID);
				break;
			}
			case 'checkbox': {
				htm += '<input type="checkbox" class="searchField searchCheck" field="' + field + '"value=""><label>' + label + '</label>';
				filterFinalizeField(_winID);
				break;
			}
		}
	
	}
		
	function filterFinalizeField(_winID){
	
		htm += '<img class="img_remove_search" src="images/ico_close.png" onclick="filterRemoveField('+_winID+',\'' + field + '\');"></div>';
/* 		$("#searchCont").html(htm); */
		var $sea = $("#win"+_winID).find(".searchCont");	
		$sea.append(htm);
		$('.datepicker_from, .datepicker_to').datetimepicker({ format:'Y.m.d', lang:'hu',timepicker:false,closeOnDateSelect: true});
		$('.datetimepicker_from, .datetimepicker_to').datetimepicker({ format:'Y.m.d H:i', lang:'hu' });
		
			$sea.find("[field='"+field+"']").each(function(){
				var thi = $(this);
				thi.selectedIndex = 0;
				thi.unbind("change");
				thi.bind("change", function () {
					var _winID = thi.parent().parent().parent().attr("winid");
					filterDoRefresh(_winID);
				});
				if (!thi.hasClass("datepicker_from") && !thi.hasClass("datepicker_to") && !thi.hasClass("datetimepicker_from") && !thi.hasClass("datetimepicker_to"))
				thi.focus();
			
			});
	
	
		
	}
	
	
	
}})(jQuery);
(function ($){ formClose = function(_winID) {
	var $thisWin = $("#win"+_winID);
 	$thisWin.remove();
	var $lastWin = $(".winAbs:last");
	makeActive($lastWin);
			
}})(jQuery);
(function ($){ mailBulk = function(_id, mode) {
	//mode=0: mindenkinek, 1:News_LastWrongs-ben lévő címekre (utoljára nem sikerült mailcímek)
	bulks = [];
	bulkMode = mode;
	
	xStartSpinner();

	if (mode == 1) {
		_wrongsArray = $(".formRow[field='News_LastWrongs']").find("input").val();
		if (_wrongsArray == "") {
			xShowPopup("HIBA", "Nincs korábbi hibás cím. Nyomja a Kiküldés gombot", "OK");
			return true;
		} 
	} else _wrongsArray = "";
	
	$("#bulkPopup").css("display", "block");
	
	if (mode == 1) {
		bulks = _wrongsArray.replace(/['"]+/g, '');
		bulks = bulks.split(",");
		bulkTotal = (_wrongsArray != "") ? (_wrongsArray.match(/,/g)||[]).length+1 : 0;
		bulkIDs = [];
		_wrongsArray = "";
		bulkStart = 0;
		bulkSize = 5; // egyszerre küldendő mailcím db
		bulkInterval = 2 * 1000; // két küldés között mp 
				
		doMail();
	} else {

		$.post('inklud/get_chunks.php', { PHPData:[_id, ddsSite], site_img:site_img, schema:schema }, function(data) {
			bulkStart = 0;
			bulkSize = parseInt(data_part(data,"bulksize")); // egyszerre küldendő mailcím db
			bulkInterval = parseInt(data_part(data,"interval")) * 1000; // két küldés között mp 
			bulkTotal = parseInt(data_part(data,"bulktotal")); // összes mail cím db		
			bulks = JSON.parse(data_part(data,"mails"));
			bulkIDs = JSON.parse(data_part(data,"ids"));
			
			doMail();
		});
		
	}
	
	function doMail(){
			var bulkPack = bulkStart + bulkSize;
			$("#bulkLine").css("width", 0);
			$("#bulkText").html("Mail ütemező előkészítése..");
				
			if (typeof bulkIV  === 'undefined') {} else clearInterval(bulkIV);		
			lastCallbackDone = 0;
			lastCallbackNext = 0;
			bulkIV = setInterval(function () {
				if (bulkStart >= bulkTotal) {
					$("#bulkPopup").css("display", "none");
					//if (lastCallbackDone == 1) {
						xStopSpinner();
						clearInterval(bulkIV);
		
						if (_wrongsArray != "") {
							xShowMsg('Bizonyos címekre NEM sikerült kiküldeni a hírlevelet ... ', 0);
							var newStat = 3;						
						} else {
							xShowMsg('Sikeres hírlevél kiküldés ... ', 0);
							var newStat = 2;						
						}
							_userdate = xGetDateTime(0);
							_sender = userID;
							$.post('inklud/prepared_update.php', {sql:"UPDATE News Set News_LastWrongs = ?, News_Modified_at = ?, News_Modified_by = ?, News_Sent = ?, News_Status = ? WHERE id = ?", pars:6, par1:_wrongsArray, par2:_userdate, par3:_sender, par4:_userdate, par5:newStat, par6:_id, schema:schema }, function(data) {
								_formShow('New', _id);
								xStopSpinner();
							});
						
					//}
				} else 
				if (bulkStart < bulkTotal) {				
					bulkMailList = "";
					bulkIDList = "";
					for (i=bulkStart; i<(bulkStart+bulkSize); i++) {
							bulkMailList +=  "\"" + bulks[i] + "\", ";
							bulkIDList +=  "\"" + bulkIDs[i] + "\", ";
					}
					bulkMailList = bulkMailList.substring(0, bulkMailList.length - 2); // utolso vesszo nem kell
					bulkIDList = bulkIDList.substring(0, bulkIDList.length - 2); // utolso vesszo nem kell
					_userdate = xGetDateTime(0);
					_sender = userID;
					var bulkPack = bulkStart + bulkSize;
					$("#bulkLine").css("width", 400*Math.min(1, bulkPack/bulkTotal));
					$("#bulkText").html("(" + bulkStart + "-" + Math.min(bulkPack, bulkTotal) + ") "+ " / " + bulkTotal + ". mail küldése .. / eddig sikertelen: " + ((_wrongsArray != "") ? (_wrongsArray.match(/,/g)||[]).length : 0) + " db");
		
					bulkStart += bulkSize;
					
					if (bulkStart >= bulkTotal || lastCallbackDone != 1) {
						lastCallbackNext = 1;
					}

					$.post('inklud/send_mail.php', { PHPData:['NG', ddsSite, _sender, _userdate, _id, bulkMailList, bulkIDList, bulkMode, ''], schema:schema, isLast:lastCallbackNext }, function(data) {
	//					_wrongsArray += JSON.parse(data_part(data,"wrong"));				
						_wrongsArray += data_part(data,"wrong");	
						if (data_part(data,"waslast") == "1") {
							_wrongsArray = _wrongsArray.substring(0, _wrongsArray.length - 1); // utolso vesszo nem kell
							lastCallbackDone = 1;
							
							
						}
					});

	
					
				} 			
			}, bulkInterval);

	}
	
}})(jQuery);
(function ($){ mailSend = function(mode, _id, _user, _obj_in, mess) {
	// módok
	// ["NG", site, sender_id, datetime, news_id, 0		] News+objektumok -> news group-okhoz	pl. hírlevél
	// ["NU", site, sender_id, datetime, news_id, user_id	] News+objektumok -> user_id-ra 		pl. hírlevél előnézet
	// ["TU", site, sender_id, datetime, template_id, user_id] Template -> user_id-ra 				pl. lejelentkezés, jelszó változtatás! 
	// ["TM", site, sender_id, datetime, template_id, mail] 	Template -> mailre					pl. feliratkozás 
	// ["OU", site, sender_id, datetime, template_id, user_id, 'obj1, obj2, ...']] 	Template+object -> user_id-ra 		pl. ?  
	// ["OM", site, sender_id, datetime, template_id, mail, 'obj1, obj2, ...'] 	Template+object -> mailre			pl. emlékeztető 
	
	// ["BB", site, sender_id, datetime, template_id, bid_id	] Bid+objektumok -> user_id-ra  
	xShowMsg('Levél küldése',1);		
	_userdate = xGetDateTime();
	_sender = userID;
	
	$.post('inklud/send_mail.php', { PHPData:[mode, ddsSite, _sender, _userdate, _id, _user, _obj_in], schema:schema }, function(data) {
		if (data == "<waslast></waslast>OK") {
			xShowMsg(mess,0);
		}
		else {
			xShowMsg('',0); //0, hogy eltűnjön
			xShowPopup('HIBA', data, 'OK');
			}
	});
	
	
}})(jQuery);

(function ($){ formDel = function(_winID, table, cid, imgFields, joinFields, joinTables) {
	// table: fő tábla, amit töröl
	// cid: id
	// imgFields: fő tábla mezői, amikben lévő img nevet törölni kell
	// joinFields: mellék táblák mezői, amikben lévő img nevet törölni kell
	// joinTables: mellék táblák, amiket törölni kell
	
/* 				"Törlés" {formDel(#_winID, 'Product', #id, ['Product_Image', 'Product_Image_Small'],[['Product_Media','Product_id',['Media_Image','Media_Image_Small']]],[['Product_Media','Product_id'],['Product_Color','Product_id'],['Product_Color2','Product_id']]);} */
	
	if (cid != 0) {
		if (noDelPopup == 1) doFormDel();
		else {
			if (confirm('Törölni készül. A tétel és a hozzá kapcsolódó tárolt képek is törlődni fognak.')) {
				if (askDelPopup == 0) {
					askDelPopup = 1;
					if (confirm('A következő törlésnél megerősítés nélkül töröljön a rendszer a mostani használat során.')) {
						noDelPopup = 1;
					}
				}
				doFormDel();
			}
		}	

	
		function doFormDel(){
	
			PHPData = [];
			PHPData2 = [];
			PHPData.push(table); 
			PHPData.push(cid); 
			PHPData.push(imgFields); 
			for (var i=0; i<joinTables.length; i++) {
				PHPData.push(joinTables[i]);
			}
			for (var i=0; i<joinFields.length; i++) {
				PHPData2.push(joinFields[i]);
			}
	
			$.post('inklud/delItem.php', { PHPData:PHPData, PHPData2:PHPData2, schema:schema, imgObjFromPHPInclude:imgObjFromPHPInclude }, function(data) {
				var dat = data_part(data,"error");
				if (dat == "OK") {
					xShowMsg("Sikeres törlés",0);
				}
				else {
					xShowPopup('HIBA', dat, 'OK');
				}
				$actParentID = $("#win"+_winID).attr("parentwinid");
				formClose(_winID); //2: ha volt kép, tartsa meg
				filterDoRefresh($actParentID);
	
			});
		}
	}

}})(jQuery);

(function ($){ formSave = function(_winID, content, cid, masolatField, masolatStat) {
	//cid == 0: Új tétel		
	//masolatField != "": meglévő másolata, a beleírt Field value mögé rakja, hogy " másolat"
	//masolatStat != "": meglévő másolata, a beleírt Field passzív lesz (=0)
	
	if (typeof masolatField !== "undefined")
		if (typeof masolatStat !== "undefined")
			if (masolatField != "" && masolatStat != "") cid = 0;
	
	$actWinBody = $("#win"+_winID).find(".winBody");
	$actParentID = $("#win"+_winID).attr("parentwinid");
	$actWinBody.find(".ckeditor").each(function () {
		var $textarea = $(this);
 		$textarea.attr("value", CKEDITOR.instances[$textarea.attr('name')].getData()); 
	});
	function fieldSaveValue(row) {

		type  = row.find('input').attr("type");
		if (row.find('textarea').length) type = "textarea";
		
		clas = row.find('input').attr("class");
		if (!clas) clas = row.find('div').attr("class"); //ID
		if (!clas) clas = row.find('textarea').attr("class"); //textarea
		if (type == "checkbox") clas = "checkbox";

		value = row.find('input').val();
		ckvalue = row.find('textarea').attr("value");
		txvalue = row.find('textarea').val();
		select  = row.find('select option:selected').val();

		emptyMapValue = (value == "" || value == null || value == 0 || value == "0");
				
		if (clas == "mapX " && emptyMapValue) 	value = defMapX;
		if (clas == "mapY " && emptyMapValue) 	value = defMapY;

		if (select) { value = select; clas = "dds";} 
		
		
		if (typeof clas !== "undefined") {
			if ((clas != "id") && (clas != "page") && (field != "id")) {
				if ((clas.indexOf("date") > -1) && (value == "")) {save_value = 'NOP';} else {
					save_value = value;
					
					if (field  == masolatField)			save_value += " másolat";

					if (type == "checkbox")	save_value = row.find('input').is(":checked") ? 1 : 0;
					if (type == "text")			save_value = '\'' + save_value + '\'';
					if (type == "textarea")		save_value = '\'' + escapeHtml(txvalue) + '\'';

					if (field  == masolatStat)			save_value = 0;
					
					if (ckvalue) {
						ckvalue = ckvalue.replaceAll(site_img, site_objects);
						save_value = '\'' + ckvalue + '\'';
					} 
					if (field) if (field.indexOf("Modified_at") > -1)	save_value = '\'' + xGetDateTime(0) + '\'';
					if (field) if (field.indexOf("Modified_by") > -1)	save_value = userID;
					if ((cid == 0) && (field.indexOf("Created") > -1))	save_value = '\'' + xGetDateTime(0) + '\'';
					if (save_value === undefined) save_value = '\'' + ckvalue + '\'';
		
				}


			} else save_value = 'NOP';
			
		} else save_value = 'NOP';
			
		return save_value;

			function escapeHtml(text) {
			  var map = {
			    '&': '&amp;',
			    '<': '&lt;',
			    '>': '&gt;',
			    '"': '&quot;',
			    "'": '&#039;'
			  };
			
			  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
			}
	}
	
	// csak azokat a mezőket, amik NEM kapcsolt táblába mentenek
	sql_update = "";
	sql_insert = "";
	sql_values = "";
	comma = 0;
	id_field = $actWinBody.find(".id").parent().attr("field");
	id_value = $actWinBody.find(".id").attr("value");
	var tabl = $actWinBody.find(".formPage:first").attr("table");
	sql_update  = "UPDATE " +  tabl + " SET ";
	sql_insert = "INSERT INTO " + tabl + " (";
	$actWinBody.find('.formRow[key="0"]').not(".joinRow").each(function () {
	
		var thi = $(this);
		field = thi.attr("field");
		saveValue = fieldSaveValue(thi);
		
		if (saveValue != 'NOP') {
			if (comma == 1)  {sql_update += ', '; sql_insert += ', '; sql_values += ', ';}
			comma = 1;
			sql_update  += field + ' = ' + save_value + ' ';
			sql_insert  += field ;
			sql_values  += save_value;
		}
	});
	sql_update += ' WHERE ' + id_field + '=' + id_value + ';';
	sql_insert += ' ) VALUES (' + sql_values + ' );';
	
	// mező szintű check
	form_error = formCheck();
	function insertJoinedTables() {
			
			// csak azokat a mezőket, amik kapcsolt táblába mentenek
			sql_join_insert = [];
			sql_join_values = [];
			joinRec = 0;
			$actWinBody.find('.formJoinRow[row!="0"]').each(function () {
				sql_join_insert[joinRec] = "INSERT INTO " + $(this).parent().attr("join") + " (" + $(this).parent().attr("myfield");
				sql_join_values[joinRec] = id_value;
				
				$(this).find(".joinRow").each(function () {
				
					var thi = $(this);
					field = thi.attr("field");
					saveValue = fieldSaveValue(thi);
					if (field && saveValue != 'NOP') {
						sql_join_insert[joinRec]  += ", " + field ;
						sql_join_values[joinRec]  += ", " + save_value;
					}
				});
				
				sql_join_insert[joinRec] += ' ) VALUES (' + sql_join_values[joinRec] + ' ); ';
				joinRec += 1;
			});

			
			sql_delete1 = ''; //fő update-en kívüli műveletek ide (join)
			sql_update1 = ''; //fő update-en kívüli műveletek ide (join)
			sql_delete2 = ''; //fő update-en kívüli műveletek ide (kw)
			sql_update2 = ''; //fő update-en kívüli műveletek ide (kw)
			//jointable
			$actWinBody.find(".formJoin").each(function () {
				var thi = $(this);
				var join = thi.attr("join");
				var myfield = thi.attr("myfield");
				sql_delete1 += 'DELETE FROM ' + join + ' WHERE ' + myfield + '  = ' + id_value + '; ';
//				$.post('inklud/update_sql.php', { sql:sql_update, schema:schema }, function(data) {});
			});
			for (var i=0; i<sql_join_insert.length; i++) {
				sql_update1 += sql_join_insert[i];
			}
			//keywords
			$actWinBody.find(".formPage").each(function () {
				thi = $(this);
				var join = thi.attr("join");
				if (join) {
					var myfield = thi.attr("myfield");
					var valuefield = thi.attr("valuefield");
					sql_delete2 += 'DELETE FROM ' + join + ' WHERE ' + myfield + '  = ' + id_value + '; ';
	
					firstInsert = 1;
					thi.find('.keyBox[key!="0"]').each(function () {
						if ($(this).hasClass('keyBoxChecked') ) {
							if (firstInsert == 1) {
								sql_update2 += 'INSERT INTO ' + join + ' (' + valuefield + ', ' + myfield + ') VALUES ';
							}
							firstInsert = 0;
							sql_update2 += '(' + $(this).attr("key") + ', ' + id_value + '),';
						}
					});
					if (firstInsert == 0) sql_update2 = sql_update2.slice(0, -1) + ';'
				}
			});
			
			if (sql_delete1 != '') $.post('inklud/multi_sql.php', { sql:_killReservedSQL(sql_delete1), schema:schema }, function(data) {
					if (sql_update1 != '') $.post('inklud/multi_sql.php', { sql:_killReservedSQL(sql_update1), schema:schema }, function(data) {
						
					});
				
			});
						if (sql_delete2 != '') $.post('inklud/multi_sql.php', { sql:_killReservedSQL(sql_delete2), schema:schema }, function(data) {
								if (sql_update2 != '') $.post('inklud/multi_sql.php', { sql:_killReservedSQL(sql_update2), schema:schema }, function(data) {
									
								});
							
						});
							//alert(sql_update);
	}
	
	if (form_error == '') {
		//! NEWUPLOAD
		$actWinBody.find('input.changed[type=file]:visible').each(function(){
			var $this = $(this);
			var fileWidth = $this.attr("wid");
			var fileQuality = $this.attr("wqu");
			var inputImg = $this.next().attr("id");
			
			xFileUpload(inputImg,"inklud/fileupload.php",site_img,fileWidth,fileQuality); 
			//input file img, php url, upload url, resize max width, jpg quality
		});
		if (cid != 0) {	
			//update
			//alert(sql_update);
			$.post('inklud/update_sql.php', { sql:_killReservedSQL(sql_update), schema:schema }, function(data) {
				if (data_part(data, "rows") != "-1") {
					xShowMsg(data_part(data, "rows") + " db tétel mentve...", 0);
					insertJoinedTables();
					formClose(_winID); //2: ha volt kép, tartsa meg
					filterDoRefresh($actParentID);
				} else {
					xShowPopup('HIBA', data_part(data, "errorInSql"), 'OK');
				}
			});		
		} else {
			//alert(sql_insert);			
			//insert

			$.post('inklud/insert_sql.php', { sql:_killReservedSQL(sql_insert), schema:schema }, function(data) {

				if (data_part(data, "id") != "0") {
					xShowMsg("Sikeres mentés...", 0);
					id_value = data_part(data, "id");
					insertJoinedTables();
					// ide kéne egy popup
					formClose(_winID); //2: ha volt kép, tartsa meg
					$("#win"+$actParentID).attr("lasteditedID", id_value);
					filterDoRefresh($actParentID);

				} else {
					xShowPopup('HIBA', data_part(data, "errorInSql"), 'OK');
				}



			});		

		}
		
	} else {
		xShowPopup('HIBA', form_error, 'OK');
	}
	
}})(jQuery);

(function ($){ formCheck = function () {
	var error = '';
	$actWinBody.find(".formTab").removeClass("bad");
	
	$actWinBody.find(".formRow").each(function () {
	
		var thi = $(this);
		if (thi.parent().attr("row") != "0") { // jointable (+) sor nem kell
			var chi = thi.children(":first").next(); //label után az input
			var err = false;
			chi.attr("status","none");
	
			if (thi.find('input').val() == "" && thi.find('input').attr("noempty") == 'noempty') 
				{ 
					err = true;
				}
			else
			if (thi.find('textarea').attr("value") == "" && thi.find('textarea').attr("noempty") == 'noempty')
				{ 
					err = true;
				}
			else 
			if (thi.find('select option:selected').val() == "" && thi.find('select').attr("noempty") == 'noempty')
				{ 
					err = true;
				}
		} else err = false;
		
		if (err) {
			//alert(thi.attr("field"));
			chi.attr("status","bad");
			xShake(chi);
			var tab = thi.parent();
			if (tab.hasClass("formJoinRow")) tab = tab.parent();
			if (tab.hasClass("formJoin")) tab = tab.parent();
			if (tab.hasClass("formSection")) tab = tab.parent();
			$actWinBody.find(".formTab[name='" + tab.attr("name") + "']").addClass("bad");
			error = "Kötelező mezők kitöltendők";
		}
	});
	$actWinBody.find(".formPage[kot='kot']").each(function (){
		kotKeywChecked = $(this).find(".keyBoxChecked").length;
		
		if (kotKeywChecked == 0) {
			error = "Kötelező mezők kitöltendők";
			$actWinBody.find(".formTab[name='" + $(this).attr("name") + "']").addClass("bad");;
		}
	});
	
	return error; 
}})(jQuery);
(function ($){ JoinAddRow = function(el) {
	var joinRow = $(el).parent(); 
	var formJoin = $(joinRow).parent(); 
	var newRowContent  = joinRow.html();
	var isGrid = (joinRow.hasClass("gridRow") ? "gridRow" : "");
	var maxRow = 1;
	formJoin.find(".formJoinRow").each(function(){
		var curRow = parseInt($(this).attr("row"));
		//console.log(curRow);
		if (curRow >= maxRow) maxRow = curRow + 1;	
	})
	joinRow.attr("row",maxRow); 
	
	//ikon csere
	joinRow.append('<img class="formJoinRowMinus '+isGrid+'" src="images/minus_big.png" onclick="JoinDelRow(this)">');
	$(el).remove(); // regi ikon
	joinRow.parent().append("<div class='formJoinRow "+isGrid+"' row='0'>"+newRowContent+"</div>");
	// NEWUPLOAD
	joinRow.find("*").not("label").each(function(){
		var $el = $(this);
		var el = $el[0];
		$el.attr("id",$el.attr("id") + "_" + maxRow);
		if ($el.parent().attr("field") == "Media_Order") $el.val(maxRow);
		if (el.classList.contains("imgUrl"))  $el.val("");
		if (el.classList.contains("formImg")) $el.attr("src","images/imagehere.png");
	});
	setTimeout(function(){
		refreshDatePickers();
		refreshFilePickers();		
	}, 1000);
}})(jQuery);
(function ($){ JoinDelRow = function(el) {
	$(el).parent().remove();
}})(jQuery);
(function ($){ xPathInit = function(heig,el) {
	var elem = $("#"+el);
	var myLatlng = new google.maps.LatLng(47.2136, 18.6122);
	var mapOptions = {
			center: myLatlng,
			zoom: 12,
			minZoom: 8,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
	        navigationControl: true,
	        scrollwheel: true,
				zoomControlOptions:
		    {
		        style: google.maps.ZoomControlStyle.LARGE 
		    }
	}
	
	var map = new google.maps.Map(document.getElementById(el), mapOptions);
	var avgx = 0;
	var	avgy = 0;
	var map_id = elem.attr("mapid");
	var flagHasPath = 0;
	var flagHasObjs = 0;
	var boundsPath = new google.maps.LatLngBounds();
	var boundsObjs = new google.maps.LatLngBounds();
  	var myPathCoo = [];
	$.post('inklud/pathpoints.php', { map_id:map_id, schema:schema }, function(data) {
	
	  	var pathArray = JSON.parse(data);
	  	var numOfPoints = 0;
		for (var i=0; i<pathArray.length; i++) {
		
			flagHasPath = 1;
			var px = parseFloat(pathArray[i]);
			var py = parseFloat(pathArray[i+1]);
			avgx = avgx + px; 
			avgy = avgy + py; 
			var myLatlng = new google.maps.LatLng(px,py);
			myPathCoo.push(myLatlng);
			boundsPath.extend(myLatlng);
			i++;
			numOfPoints++;
		}
	  
	  	var centerPath = new google.maps.LatLng((avgx/numOfPoints).toFixed(4),(avgy/numOfPoints).toFixed(4));
  		avgx = 0;
  		avgy = 0;
	  
		$.post('inklud/pathobjects.php', { map_id:map_id, schema:schema }, function(data) {
		  	var pathArray = JSON.parse(data);
	
			for (var i=0; i<pathArray.length; i++) {
			
				flagHasObjs = 1;
				var px = parseFloat(pathArray[i]);
				var py = parseFloat(pathArray[i+1]);
				avgx = avgx + px; 
				avgy = avgy + py; 
				var myLatlng = new google.maps.LatLng(px,py);
//				myPathCoo.push(myLatlng);
				boundsObjs.extend(myLatlng);
				var marker = new google.maps.Marker({
					position: myLatlng,
					map: map,
					draggable: true
				}); 
				
				i++;				
			}
			
			if (flagHasPath == 1) {
				var myPath = new google.maps.Polyline({
				    path: myPathCoo,
				    geodesic: false,
				    strokeColor: '#0000FF',
				    strokeOpacity: 1.0,
				    strokeWeight: 3,
				    editable: false
				  });
				myPath.setMap(map);
				map.setCenter(centerPath);
				map.fitBounds(boundsPath);
			}
			
			if (flagHasObjs == 1) {
				map.fitBounds(boundsObjs);
			}
			
			elem.css("height", heig);
			google.maps.event.trigger(map, 'resize');
			
		});
		
	
	});
}})(jQuery);
(function ($){ xMapInit = function(x,y,heig,el) {
	var elem = $("#"+el);
	var myLatlng = new google.maps.LatLng(x,y);
	var mapOptions = {
			center: myLatlng,
/* 		 	zoom: (x) ? 15 : 8, */
			zoom: 12,
			minZoom: 8,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
	        navigationControl: true,
	        scrollwheel: true,
				zoomControlOptions:
		    {
		        style: google.maps.ZoomControlStyle.LARGE 
		    }
	
	}
	
	var map = new google.maps.Map(document.getElementById(el), mapOptions);
		
	var marker = new google.maps.Marker({
	position: myLatlng,
	map: map,
	draggable: true
	});
	
	google.maps.event.addListener(marker, 'dragend', function(e){
		$(".mapX").attr("value",e.latLng.lat().toFixed(4));
		$(".mapY").attr("value",e.latLng.lng().toFixed(4));
	});
	
	elem.css("height", heig);
	$(".formRow[field='Object_Postcode'").find("input").off("change").on("change", function(){
		geoCodeIt();
	});
	
	$(".formRow[field='Object_Settlement'").find("input").off("change").on("change", function(){
		geoCodeIt();
	});
	
	$(".formRow[field='Object_Addresse'").find("input").off("change").on("change", function(){
		geoCodeIt();
	});
	
	function geoCodeIt(){
		var a1 = $(".formRow[field='Object_Postcode'").find("input").val();
		var a2 = $(".formRow[field='Object_Settlement'").find("input").val();
		var a3 = $(".formRow[field='Object_Addresse'").find("input").val();
		var aa = a1 + " " + a2 + " " + a3;
		
		geocoder = new google.maps.Geocoder();
	    geocoder.geocode({'address': aa}, function(results, status) {
	        if (status == google.maps.GeocoderStatus.OK) {

	        	var latlng = results[0].geometry.location;
	            map.setCenter(latlng);
				marker.setPosition(latlng);
				$(".mapX").attr("value",latlng.lat().toFixed(4));
				$(".mapY").attr("value",latlng.lng().toFixed(4));

	        } else {
	            console.log("Geokódolás nem sikerült, a következő okok miatt: " + status);
	        }
	    });
		
		
	}


}})(jQuery);

(function ($){ tabDo = function(_winID, name) {
	$actWinBody = $("#win"+_winID).find(".winBody");
	$actWinBody.find(".formTab,.formPage").removeClass("on");
	$actWinBody.find(".formTab[name='"+name+"']").addClass("on");
	$actWinBody.find(".formPage[name='"+name+"']").addClass("on");
	$actWinBody.find(".formPage[name='"+name+"']").find("input:first").focus();	
}})(jQuery);
(function ($){ xStartMsgSpinner = function () {
	spi = 0;
	$("#spinner").html(" .");
	spinIV = setInterval(function () {
		spi++;
		if (spi>3) {
			spi = 0;
			$("#spinner").html(".");
		} else $("#spinner").append(".");
		
	}, 500);
	
}})(jQuery);
(function ($){ xStopMsgSpinner = function () {
	$("#spinner").html('');
	if (typeof spinIV === 'undefined') {} else clearInterval(spinIV);
	
}})(jQuery);
(function ($){ xShowMsg = function(msg, msgmode) {
	//mode=0: rövid ideig, mode=1: látszik, amíg 0-val nem hívjuk-t.
	var message = $("#message");
	var messagetext = $("#messagetext");
	message.css("display","block");
	messagetext.html(msg);
	if (msgmode == 1) xStartMsgSpinner();
	
	TweenLite.to("#message", 0.2, { opacity: 1, ease:Power4.easeOut});
	if (msgmode == 0) {
		TweenLite.to("#message", 0.5, { opacity: 0, ease:Power4.easeOut, delay:1.2});
		xStopMsgSpinner();
		setTimeout(function(){
			message.css("display","none");
		
		},3000);
	}
}})(jQuery);
(function ($){ xShowPopup = function(title, body, but1, but2, but3) {
	$("#popup").css("display","block");
	$("#popupHeader").html(title);
	$("#popupBody").html(body);
	$("#popupBut").html("");
	answer = "";	
	if (but1) {
		$("#popupBut").html($("#popupBut").html() + '<div id="msgButOK" class="but">' + but1 + '</div>');
		setTimeout(function(){
			$("#msgButOK").unbind("click");
			$("#msgButOK").on("click", function(){
				$("#popup").css("display","none");
				answer = "YES";
			});
		}, 500);
	}
	if (but2) {
		$("#popupBut").html($("#popupBut").html() + '<div id="msgButNO" class="but">' + but2 + '</div>');
		setTimeout(function(){
			$("#msgButNO").unbind("click");
			$("#msgButNO").on("click", function(){
				$("#popup").css("display","none");
				answer = "NO";
			});
		}, 500);
	}
	if (but3) {
		$("#popupBut").html($("#popupBut").html() + '<div id="msgButX" class="but">' + but3 + '</div>');
		setTimeout(function(){
			$("#msgButX").unbind("click");
			$("#msgButX").on("click", function(){
				$("#popup").css("display","none");
				answer = "";
			});
		}, 500);
	}
}})(jQuery);
(function ($){ xGetDate = function(plus_days) {
	var today = new Date();
	today.setDate(today.getDate() + plus_days);
	var dd = today.getDate();
	var mm = today.getMonth() + 1; 
	var yyyy = today.getFullYear();
	if (dd<10) dd = '0' + dd;
	if (mm<10) mm = '0' + mm;
	today = yyyy + '.' + mm + '.' + dd;
	return today;
}})(jQuery);
(function ($){ xGetDateTime = function () {
	var today = new Date();
	today.setDate(today.getDate());
	var dd = today.getDate();
	var mm = today.getMonth() + 1; 
	var yyyy = today.getFullYear();
	var HH = today.getHours();
	var ii = today.getMinutes();
	var ss = today.getSeconds();
	if (dd<10) dd = '0' + dd;
	if (mm<10) mm = '0' + mm;
	if (HH<10) HH = '0' + HH;
	if (ii<10) ii = '0' + ii;
	today = yyyy + '.' + mm + '.' + dd + ' ' + HH + ':' + ii;
	return today;
	
}})(jQuery);

(function ($){ xExportXLS = function() {

	
	var myName = $("#win"+_winID).find(".winHead").html() + "_" + xGetDateTime() + ".xls";
	var myTable = $("#win"+_winID).find(".winBody").find(".grid");
	var myTableID = myTable.attr("id");
	var expxls = $("#xls_export");
	
	expxls.html(myTable.html());
	expxls.find(".removeExc").each(function(){$(this).remove();});
	expxls.find(".noExc").find("img").each(function(){$(this).remove();});
	expxls.find(".onCheck").parent().append("1");
	expxls.find(".offCheck").parent().append("0");


	var xtableToExcel = (function () {
	    var uri = 'data:application/vnd.ms-excel;base64,';
	    var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/><x:FilterOn/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
	    var xbase64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
	    var xformat = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
 	    return function (table, name) { 
	        if (!table.nodeType) table = document.getElementById(table)
	        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }

	        myanchor = document.getElementById("anc")
	        myanchor.href = uri + xbase64(xformat(template, ctx))
	        myanchor.download = myName
	        myanchor.click()
	        myanchor.href = "#"
	    }
	})()
	
	
	xtableToExcel("xls_export");
	expxls.html("");
	
}})(jQuery);
(function ($){ x = function(what) {
	$("#titleText").html(what);
}})(jQuery);
(function ($){ xDesktopResize = function () {
	var winhei = window.innerHeight;
 	contSize = winhei - $("#title").height() - $("nav").height(); 
	$("#work").height(contSize+"px");
}})(jQuery);
(function($){ xStartSpinner = function() {
	xStopSpinner();
	$("body").append("<img id='spinimg' src='images/spinner.png'>");
	TweenMax.to("#spinimg", 1.5, {rotation:"360", repeat:-1, ease:Linear.easeNone});
}})(jQuery);
(function($){ xStopSpinner = function() {
	TweenMax.killTweensOf("#spinimg");
	$("#spinimg").remove();
}})(jQuery);
(function($){ refreshDatePickers = function() {
		$('.datepicker').not('.noedit').datetimepicker({ format:'Y.m.d', lang:'hu',timepicker:false,closeOnDateSelect: true });
		$('.datetimepicker').not('.noedit').datetimepicker({ format:'Y.m.d H:i', lang:'hu' });
		$('.timepicker').not('.noedit').datetimepicker({ format:'H:i', lang:'hu',datepicker:false });
}})(jQuery);
function xFileUpload(_img, _php, _url, _maxwi, _maxqu){
	var img = document.getElementById(_img);
	var file = img.file;
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    
    // small képek auto feltöltés
	var rowSmall = img.parentNode;
	var field2 = rowSmall.querySelector('[type="text"]');
	var isSmall= field2.value.substring(0,3);
	isSmall = (isSmall == "sm_") ? "sm_" : "";
	//
    
    xhr.open("POST", _php+'?max_width='+_maxwi+'&max_quality='+_maxqu+'&img_dir='+_url+'&issmall='+isSmall, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
         //   console.log(xhr.responseText);
        }
    };
    fd.append("upload_file", file);
    xhr.send(fd);
}
function xFileSelector(_field, _input, _img){
	document.getElementById(_input).addEventListener('change', function(){
		this.classList.add('changed');
		var file = this.files[0];
		var img = document.getElementById(_img);
		var field = document.getElementById(_field);
		img.file = file;
 		field.value = file.name;
		var reader = new FileReader();
		reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
		reader.readAsDataURL(file);
		// small képek auto feltöltés
		var rowBig = this.parentNode;
		var rowField = rowBig.getAttribute("field") + "_Small";
		var rowParent = rowBig.parentNode;
		if (rowParent.classList.contains("formSection"))
			rowParent = rowParent.parentNode;
		var rowSmall = rowParent.querySelector('[field="' + rowField + '"]');
		var field2 = rowSmall.querySelector('[type="text"]');
		if (field2.value == "") {
			var input2 = rowSmall.querySelector('[type="file"]');
	 		input2.classList.add('changed');
			var img2 = rowSmall.getElementsByClassName("formImg")[0];
			var file2 =  this.files[0];
			img2.file = file2;
	 		field2.value = "sm_" + file2.name;
			var reader2 = new FileReader();
			reader2.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img2);
			reader2.readAsDataURL(file2);
		}
		// 
		
		
	}, false);	
}
(function($){ refreshFilePickers = function() {
			$('input[type=file]:visible').each(function(){
				var $this = $(this);
				var inputButton = $(this).attr("id");
				var inputTextBox = $this.prev().attr("id"); 
				var inputImg = $this.next().attr("id"); 
				
				
				xFileSelector(inputTextBox, inputButton, inputImg); 
				//input file textbox ID, input file gomb ID, preview img ID
			});
				$('.formImg').off('click').on('click', function(){
					$(this).prev().click();
				});
}})(jQuery);
