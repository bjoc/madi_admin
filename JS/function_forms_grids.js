
(function ($){ _gridInit = function(content) {
	var gridTitle = $("li[content='"+content+"']").attr("title");
	// NEWWINHANDLE
	initWin(gridTitle);
	_winID = actWinID;
	
	orderA[_winID] = "";
	incdescA[_winID] = "ASC";
	
	_gridShow(_winID, content, 0);
	
}})(jQuery);

(function ($){ _formInit = function(content, _id, _parentWinID) {
	// _id = 0 - új tétel, parent: a grid, amit becsukaskor frissiteni kell
	
	var formTitle = $("li[content='"+content+"']").attr("title");
	// NEWWINHANDLE
	initWin(formTitle);
	_winID = actWinID;
	$("#win"+_parentWinID).attr("lasteditedID", _id);
	$("#win"+_winID).attr("parentwinid", _parentWinID);
	_formShow(_winID, content, _id);
	
}})(jQuery);

(function ($){ _gridShow = function(_winID, content, mod, neworder, neworderchange) {

	if (typeof neworder !== "undefined") orderA[_winID] = neworder;
	if (typeof neworderchange !== "undefined") {changeorder = neworderchange} else changeorder = 0;

	xStartSpinner();
	$actWinBody = $("#win"+_winID).find(".winBody");
	setTimeout(function(){
		menuClicked = false;
	}, 200);
	rowcou = parseInt($actWinBody.find(".rowcou").html());
	
	step = $actWinBody.find(".perpage").find('option:selected').val();
	if (!step) step = 50;
	if (step == 'összes') { step = 0 } else { step = parseInt(step)};
	
	//mod 0:first 1:prev, 2:next, 3:last
	if (mod == 0 || step == 0) limit_start = 0;
	if (rowcou > 0)
	{
		if ((mod == 1) && (limit_start >= step)) limit_start = limit_start - step;
		if ((mod == 2) && (limit_start < rowcou - step)) limit_start = limit_start + step;
		if  (mod == 3) limit_start = rowcou - step;
		// mod == 4 esetén csak a step változott		
	}
	
	if (orderA[_winID] != "") if (changeorder == 1) 	incdescA[_winID] = (incdescA[_winID] == "ASC") ? "DESC" : "ASC"; 
	order = orderA[_winID];
	incdesc = incdescA[_winID];
	
	site = $("#siteSelect option:selected").val();
	
	__initalizeGrid(_winID, content, mod, order, changeorder);
		
}})(jQuery);

function readConfig(alldata, subdata, code) {
		confPart = conf_part(subdata, code + "_copy").trim();
		if (confPart != "") {
			var cp = conf_part(alldata, confPart);
			return conf_part(cp, code);
		} else {
			return conf_part(subdata, code);
		} 
}

function conf_part(data, code) {
	var codelength = code.length;
	var start = data.search('<' + code + '>');
	if (start == -1) return "";
	var end   = data.search('</' + code + '>');
	if (end == -1) return "";
	return data.substr(start + codelength + 2, end - start - codelength - 2).trim();
}

function string_part(data, code) {
	var codelength = code.length;
	var start = data.search(code.substr(0,1));
	if (start == -1) return "";
	var rest = data.substr(start + 1);
	var end = rest.search(code.substr(1,1));
	if (end == -1) return "";
	var ret = rest.substr(0, end).trim();
	return ret;
}

function nextPossibleKeywords(line, actArray, valus) {
	newKeyword = "";
	for (var j=0;j<valus.length;j++) {
		if (line.indexOf(valus[j]) > -1) {
			newKeyword += valus[j] + " ";
		}
	}
	if (newKeyword != "") {
		actArray.push(newKeyword);
		return actArray;
	} else return false;
}

function nextPossibleValues(line, actArray, valus) {
	for (var j=0;j<valus.length;j++) {
		if (line.indexOf(valus[j]) > -1) {
			
			var pushThat = valus[j];
			if (pushThat == "ck") {
				if (typeof numberOfCKs === "undefined") {numberOfCKs = 0;}
				numberOfCKs += 1;
				pushThat += numberOfCKs;
	
			}

			actArray.push(pushThat);
			return actArray;
		}
	}
	return false;
}

(function ($){ __initalizeGrid = function(_winID, content, mod, order, changeorder) {

	console.log("initalize grid...");

	if (isTesting == "YES") {
		loadConfig(funcAllLoaded);
	} else funcAllLoaded();
	
	function funcAllLoaded(){
		var hasConfigError = "";
		var weAreIn = " : " + content + " grid / ";
		
		confAct = conf_part(confOrig, content);
		if (confAct == "") hasConfigError += "Hiányzó menüpont config" + weAreIn;

		confAct = readConfig(confOrig, confAct, "grid");
		confAct = gridReplaceAliases(confAct);
		if (confAct == "") hasConfigError += "Hiányzó grid config" + weAreIn;

		function gridReplaceAliases(data){
			data = data.replaceAll("#site", site);
			data = data.replaceAll("#content", content);
			data = data.replaceAll("#_winID", _winID);
			return data;
		}

		basSel = readConfig(confOrig, confAct, "sql");
		basSel = gridReplaceAliases(basSel);
		if (basSel == "") hasConfigError += "Hiányzó sql config" + weAreIn;

		defaultOrder = readConfig(confOrig, confAct, "orderby");
		defaultOrder = gridReplaceAliases(defaultOrder);
		if (defaultOrder == "") hasConfigError += "Hiányzó order by" + weAreIn;
		
		fieldsArray = [];
		

		confFie = readConfig(confOrig, confAct, "cols");
		confFie = gridReplaceAliases(confFie);
		if (confFie == "") hasConfigError += "Hiányzó oszlop config" + weAreIn;
		if (confFie.indexOf("id_type") == -1) hasConfigError += "Hiányzó ID típus" + weAreIn;
		
		var lines = confFie.split('\n');
		for (var i=0;i<lines.length;i++) {
			if (lines[i].length > 1) {
				var line = lines[i];
				
				var col = string_part(line,'""');
				if (col != "") fieldsArray.push(col); else hasConfigError += "Hiányzó oszlopnév" + weAreIn;
				var col = string_part(line,'{}');
				if (col != "") fieldsArray.push(col); else hasConfigError += "Hiányzó {mezőnév} : " + weAreIn;
				
				if (fieldsArray == nextPossibleValues(line, fieldsArray, ["text","datetime","date","time","checkbox","ddl","dds","image","color","id_type"]) == false) {
					hasConfigError += "Hiányzó/rossz típus : " + weAreIn;			
				}
			}
		}
		
		butData = [];

		confBut = readConfig(confOrig, confAct, "grid_but");
		confBut = gridReplaceAliases(confBut);

		var lines = confBut.split('\n');
		for (var i=0;i<lines.length;i++) {
			if (lines[i].length > 1) {
				var line = lines[i];
				butData.push(string_part(line,'""'));
				butData.push(string_part(line,'{}'));
			}
		}
		
		inactiveRowByField = readConfig(confOrig, confAct, "inactive_row");
		
		if (hasConfigError != "") console.log(hasConfigError);
		console.log("initalized!");
		_gridShowContinue(_winID, content, mod, order, changeorder, inactiveRowByField);
	}
 
}})(jQuery);
	
(function ($){ _gridShowContinue = function(_winID, content, mod, order, changeorder, inactiveRowByField) {

	PHPData = [content, mod, limit_start, step,	basSel, defaultOrder, fieldsArray,  searches, order, incdesc];		
	PHPData = _killReservedWords(PHPData);

	$.post('inklud/grids.php', { PHPData:PHPData, site_img:site_img, schema:schema, contSize:contSize, winID:_winID, inactiveRowByField:inactiveRowByField }, function(data) {
		$actWinBody.html(data);
		var $subMenu = $("#win"+_winID).find(".subMenu");
		$subMenu.html("");
		for (i=0; i<butData.length; i++) {
			$subMenu.html($subMenu.html() + '<div class="but" onclick="' + butData[i+1] + '">' + butData[i] + '</div>'); i++;
		}
		
		var $gridWidth = $("#grid"+_winID);
		var gridWidth = $gridWidth.width() + 50;
		$gridWidth.parent().parent().find(".gridTableCont").css("width",gridWidth);
		$gridWidth.parent().parent().find(".gridFixedHeader").css("width",gridWidth);
		$gridWidth.parent().parent().find(".gridJump").css("width",gridWidth);
		
		xStopSpinner();
		
		var lastID = $("#win"+_winID).attr("lasteditedid");
		if (lastID != "") {
			var w = $(window);
			var row = $("#tableRow"+lastID);
			var cont = $actWinBody.find(".gridTableCont");
			if (row.length){
			    cont.animate({scrollTop: row.offset().top - (w.height()/2)}, 500 );
			    row.css("color","red");
			}
		}
		
	});


}})(jQuery);

(function ($){ _gridRead = function(_code) {
$(document).ready(function() {
    //fetch text file
    $.get('text.txt', function(data) {
        //split on new lines
        var lines = data.split('\n');
        //create select
        var dropdown = $('<select>');
        //iterate over lines of file and create a option element
        for(var i=0;i<lines.length;i++) {
            //create option
            var el = $('<option value="'+i+'">'+lines[i]+'</option>');
            //append option to select
            $(dropdown).append(el);
        }
        //append select to page
        $('body').append(dropdown);
    });
});
}})(jQuery);


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

String.prototype.found = function(search) {
    return this.indexOf(search) > -1;
};


(function ($){ __initalizeForm = function(_winID, content, id) {

	console.log("initalize form...");
	
	if (typeof keyw === "undefined") keyw = "";

	if (isTesting == "YES") {
		loadConfig(funcAllLoaded2);
	} else funcAllLoaded2();
	
	function funcAllLoaded2(){
	
		var hasConfigError = "";
		var weAreIn = " : " + content + " form / ";
		
		var actualRows = "";
		
				
		confAct = conf_part(confOrig, content);
		if (confAct == "") hasConfigError += "Hiányzó menüpont config" + weAreIn;

		confAct = readConfig(confOrig, confAct, "form");
		if (confAct == "") hasConfigError += "Hiányzó form config" + weAreIn;
		
		confAct = formReplaceAliases(confAct);
		
		function formReplaceAliases(data){
			data = data.replaceAll("#site", site);
			data = data.replaceAll("#content", content);
			data = data.replaceAll("#_winID", _winID);
			data = data.replaceAll("#id", id);
			data = data.replaceAll("#site", site);
			data = data.replaceAll("#userID", userID);
			data = data.replaceAll("#datetime", xGetDateTime(0));
			data = data.replaceAll("#date_plus_year", xGetDate(3650));
			data = data.replaceAll("#date", xGetDate(0));
			//! megcsinálni a relatív napokat
			data = data.replaceAll("#keyw", keyw);
			//! a keyw-t tölteni kell
			return data;
		}


		
		basSel = readConfig(confOrig, confAct, "sql");
		basSel = formReplaceAliases(basSel);
		if (basSel == "") hasConfigError += "Hiányzó sql config" + weAreIn;

		whereStr = readConfig(confOrig, confAct, "whe");
		whereStr = formReplaceAliases(whereStr);
		if (whereStr == "") {
			hasConfigError += "Hiányzó where" + weAreIn;
		} else whereStr = " " + whereStr;
		
		fieldsArray = [];
		subArray = [];
		numberOfCKs = 0;
		
		confFie = readConfig(confOrig, confAct, "cols");
		confFie = formReplaceAliases(confFie);

		if (confFie == "") hasConfigError += "Hiányzó oszlop config" + weAreIn;
		if (confFie.indexOf("id_type") == -1) hasConfigError += "Hiányzó ID típus" + weAreIn;
		
		var lines = confFie.split('\n');
		for (var i=0;i<lines.length;i++) {
			if (lines[i].length > 1) {
				var line = lines[i];
				
				if (1==2) {}
				else if  (line.found("<join_param>")) 	{
					subArray = [];
					actualRows = "join";
				}
				else if (line.found("</join_param>")) 	{
					fieldsArray.push(subArray);
					actualRows = "";
				}
				else if (actualRows == "join") {
					var col = string_part(line,'""');
					if (col != "") subArray.push(col); 
				}
				else if (line.found("<keyword>"))			{
					fieldsArray.push(string_part(line,'""'),"","keyword","","","");
					subArray = [];
					actualRows = "keyword";
				} 
				else if (line.found("</keyword>")) 	{
					fieldsArray.push(subArray);
					actualRows = "";
				}
				else if (actualRows == "keyword") {
					var col = string_part(line,'""');
					if (col != "") subArray.push(col); 
				}
				else if (line.found("</page>")) 	{fieldsArray.push("","X","page_end","","","","");}
				else if (line.found("</section>"))	{fieldsArray.push("","X","section_end","","","","");}
				else if (line.found("</join>"))	{fieldsArray.push("","X","join_end","","","","");}
				else if (line.found("</subgrid>"))	{fieldsArray.push("","X","grid_end","","","","");}
				else if (line.found("<page>"))			{fieldsArray.push(string_part(line,'""'),"X","page","","","","");}
				else if (line.found("<section>"))		{fieldsArray.push("","X","section","","","","");}
				else if (line.found("<line>"))			{fieldsArray.push("","X","line","","","","");}
				else if (line.found("<join>"))			{fieldsArray.push(string_part(line,'""'),"X","join","","","");} 
				else if (line.found("<grid>"))			{fieldsArray.push(string_part(line,'""'),"X","grid","","","");} 

				else {
					var col = string_part(line,'""');
					if (col != "") fieldsArray.push(col); else hasConfigError += "Hiányzó oszlopnév" + weAreIn + ", sor:" + i;
					
					var col = string_part(line,'{}');
					if (col != "") {
						if (col != "keyword") fieldsArray.push(col); 
					} else hasConfigError += "Hiányzó {mezőnév} : " + weAreIn;
					
if (fieldsArray == nextPossibleValues(line, fieldsArray, ["textarea","datetime","date","time","check","num","text","mapY_200%", "mapY", "mapX", "ddl","dds","image","color","id_type","ck"]) == false) {
						hasConfigError += "Hiányzó/rossz típus : " + weAreIn;			
					}
					//default
					if (line.found("default=")) {
						var def = line.substr(line.indexOf("default")+9);
						var def = def.substr(0, def.indexOf(")"));
						fieldsArray.push(def);
					} 
					else fieldsArray.push("");
					
					// kulcsszók
					if (fieldsArray == nextPossibleKeywords(line, fieldsArray,["title","noempty","HUN","ENG","GER","half1","half2","half_cke","noedit"]) == false) {
						fieldsArray.push("");		
					}
					
					// placeholder most ures
					fieldsArray.push("");

					// nincs keyword, grid, join
//					if (!line.found("keyword")) fieldsArray.push("");
					if (actualRows == "") fieldsArray.push("");
				}
			}
		}
		
		butData = [];
		
		confBut = readConfig(confOrig, confAct, "form_but");
		confBut = formReplaceAliases(confBut);
		
		var lines = confBut.split('\n');
		for (var i=0;i<lines.length;i++) {
			if (lines[i].length > 1) {
				var line = lines[i];
				butData.push(string_part(line,'""'));
				butData.push(string_part(line,'{}'));
			}
		}
		
		if (hasConfigError != "") console.log(hasConfigError);
		console.log("initalized!");
		__formShowContinue(_winID, content, id);
		
	}
 
}})(jQuery);
	
(function ($){ _formShow = function(_winID, content, id) {
	//INSERT id=0
	
	xStartSpinner();
	butDataOld = butData;
	
	site = $("#siteSelect option:selected").val();
	
	needCallback = false;
	
	keyw = "";
	customInitForm(_winID, content, id);
	//__initalizeForm(_winID, content, id);
	

}})(jQuery);

	
(function ($){ customInitForm = function(_winID, content, id) {

	hasPeriod = [];
	hasHotelSpec = [];

	switch (content) {
	
		//! formObj	
		case "Obj": 
		case "Obj_Img": 		
		case "Obj_New": 		
		case "Obj_Ban": 		
		case "Obj_Top": 		
		case "Obj_Ese": 		
		case "Obj_Sza": 	
		case "Obj_Szo": 	
		case "Obj_Ven": 		
		case "Obj_Has": 		
		case "Obj_Lat": 
		case "Obj_Key": 
		case "Obj_Per": 
		case "Obj_Mas": 
		case "Obj_Med": 
		 { 		
			var needCallback = true;
			var sql_select = "SELECT Main_Category_id FROM Object WHERE Object.id = " + id;
			$.post('inklud/select_sql.php', { sql:_killReservedSQL(sql_select), schema:schema }, function(data) {
				
				//itt dönti el, hogy milyen sémát mutasson
				var cat = data;
				switch (cat) { 
					case "99": {keyw="205"; break;} //szolgáltatók
					case "94": {keyw="200"; break;} //szállás
					case "98": {keyw="201"; break;} //vendéglátás
					case "91": {keyw="202"; break;} //program
					case "95": {keyw="203"; break;} //látnivalók
					case "3": {keyw="204"; break;} //hasznos
					default:  {keyw="0"; break;} //default
				}

				if	(cat == "91" || cat == "94") hasPeriod = [
					"Időpontok",	 		"X",						"page",		"",				"",		"",			"",	
					"Időpontok", 			"X",						"grid",		"", 			"",		"",			["Object_id","Object_Period","Object_id","Period_Start, Period_Day_id","6"],
		
					"Időszaktól", 		"Period_Start",				"date",		xGetDate(0),	"",		"15",			"",	 
					"Időszakig", 		"Period_End",				"date",		xGetDate(0),	"",		"15",			"",	 
					"Nap", 				"Period_Day_id",			"dds",		"1",			"",		"30",			"",
					"Időpponttól", 		"Period_Hour_Start",		"time",		xGetDate(0),	"",		"15",			"",	 
					"Időppontig", 		"Period_Hour_End",			"time",		xGetDate(0),	"",		"15",			"",	 					"", 				"X",						"grid_end",	"", 			"",		"",			"",
					"",					"X",						"page_end",	"",				"",		"",			"",
				];	
				
				if	(cat == "94") hasHotelSpec = [
					"Szállás spec",	 		"X",						"page",		"",				"",		"",			"",	
					"Szállás spec",			"X",						"section",		"", 			"",		"",		"",
		
					"Ellátás", 			"Object_accoType_id",		"dds",		"1", 			"",		"",			"",	
					"Szobák száma", 	"Object_numRooms",			"num",		"", 			"",		"",			"",	
					"Férőhelyek száma", 	"Object_numBeds",		"num",		"", 			"",		"",			"",	
					"", 				"X",						"section_end",	"", 			"",		"",			"",
					"",					"X",						"page_end",	"",				"",		"",			"",
				];	


					__initalizeForm(_winID, content, id);

			});
			break;
		 }
		default: {break;}
	}

	if (!needCallback) __initalizeForm(_winID, content, id);

}})(jQuery);


(function ($){ __formShowContinue = function(_winID, content, id) {
		
	//!Custom
	fieldsArray = fieldsArray.concat(hasHotelSpec).concat(hasPeriod);

	PHPData = [content, id, basSel, fieldsArray,  whereStr];		
	PHPData = _killReservedWords(PHPData);

		//! formShow php
		$.post('inklud/forms.php', { PHPData:PHPData, site_img:site_img, site_objects:site_objects, schema:schema, winID:_winID  }, function(data) {
			$actWinBody = $("#win"+_winID).find(".winBody");
			CKEDITOR.config.toolbar_MY=[ ['Bold','Italic','Underline','Subscript','Superscript','-','RemoveFormat'],['Format','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BulletedList','TextColor'],[ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','CreateDiv',
	'-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl' ],['Cut','Copy','Paste','-','Undo','Redo'],['Table','Link','Unlink','-','Image','-','SpecialChar','Iframe','-','HorizontalRule'],['Source'] ];
			$actWinBody.html(data);
			
			heig = $actWinBody.height() - $("#img_close").height() - $(".formTabs").height() - 150;
			
			$actWinBody.find(".formPageCont").height($actWinBody.height() - 80 + "px");
			if (numberOfCKs > 0) {
				ck[_winID] = [];
				for (i=1; i<=numberOfCKs; i++) {
					var ckNum = _winID.toString() + i.toString();
					var roxyFileman = filemanDir;
					ck[_winID][i] = CKEDITOR.replace('ck'+ckNum, {
						height: heig,
						language: 'hu', 
						toolbar:'MY',
						format_tags: 'p;h2;h3',
						//baseHref: CK_Images_Folder,
						filebrowserBrowseUrl:roxyFileman, 
                               filebrowserImageBrowseUrl:roxyFileman,
                               removeDialogTabs: 'link:upload;image:upload'
					});	
					
					ck[_winID][i].updateElement();
					ck[_winID][i].on('change', function(e) {
						this.updateElement();
					});
					
				}
			}
	
			refreshDatePickers();
			
			//! NEWUPLOAD
			refreshFilePickers();
			//xUploadsInit();
			
			if ($actWinBody.find(".mapX").length) {
				xMapInit( $actWinBody.find(".mapX").attr("value") , $actWinBody.find(".mapY").attr("value"), heig+100,"mapCont");
			}
	
/*
			if ($("#pathCont").length) {
				xPathInit(heig+100,"pathCont");
			}
*/
	
			 
			$actWinBody.find(".formTab:first").addClass("on");
			tabDo(_winID, $actWinBody.find(".formTab:first").attr("name"));
	
			$actWinBody.find(".formTitle").html($actWinBody.find(".isTitle").val());
			
			$actWinBody.find(".keyBox").click(function(){
				$(this).toggleClass("keyBoxChecked");
			});
	
			var $subMenu = $("#win"+_winID).find(".subMenu");
			$subMenu.html("");
			for (i=0; i<butData.length; i++) {
				$subMenu.html($subMenu.html() + '<div class="but" onclick="' + butData[i+1] + '">' + butData[i] + '</div>'); i++;
			}	
			
					
//			$actWinBody.find(".formPage").css("height", "150px");
					
/*
		var $gridWidth = $("#grid"+_winID);
		var gridWidth = $gridWidth.width() + 50;
		$gridWidth.parent().parent().find(".gridTableCont").css("width",gridWidth);
		$gridWidth.parent().parent().find(".gridFixedHeader").css("width",gridWidth);
		$gridWidth.parent().parent().find(".gridJump").css("width",gridWidth);
*/


			xStopSpinner();
	
		});
	
		
		
	
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

(function ($){ _killReservedWords = function(data) {
	var fr = new RegExp('bject', 'g');
	var to = 'bjekt';
	$.each(data, function(index, item) {
		if ($.isArray(item)) {
			$.each(item, function(index2, item2) {
				if ($.isArray(item2)) {
					$.each(item2, function(index3, item3) {
						data[index][index2][index3] = item3.toString().replaceAll(fr,to);
					});
				} else {
					data[index][index2] = item2.toString().replaceAll(fr,to);
				}
			});
		} else {
			data[index] = item.toString().replaceAll(fr,to);
		}
	});	
	
	return data;
}})(jQuery);

