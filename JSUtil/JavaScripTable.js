/*
 * JavaScripTable is a part of JavaScripTools (http://javascriptools.sourceforge.net).
 * This file was compressed using JavaScriptZip (http://javascriptzip.sourceforge.net).
 * Author: Luis Fernando Planella Gonzalez (lfpg.dev at gmail dot com)
 * Version: 2.2.5
 * JavaScripTools is distributed under the GNU Lesser General Public License (LGPL).
 * For more information, see http://www.gnu.org/licenses/lgpl-2.1.txt
*/
var JST_TYPE_STRING=0;var JST_TYPE_NUMERIC=1;var JST_TYPE_CURRENCY=2;var JST_TYPE_DATE=3;var JST_TYPE_BOOLEAN=4;var JST_SEL_NONE="";var JST_SEL_SINGLE="radio";var JST_SEL_MULTI="checkbox";var JST_SEL_MULTIPLE=JST_SEL_MULTI;var JST_NAV_NONE=0;var JST_NAV_TOP=1;var JST_NAV_BOTTOM=2;var JST_NAV_BOTH=3;var JST_ALIGN_LEFT="left";var JST_ALIGN_RIGHT="right";var JST_ALIGN_CENTER="center";var JST_ALIGN_JUSTIFY="justify";var JST_VALIGN_BASELINE="baseline";var JST_VALIGN_SUB="sub";var JST_VALIGN_SUPER="super";var JST_VALIGN_TOP="top";var JST_VALIGN_TEXT_TOP="text-top";var JST_VALIGN_MIDDLE="middle";var JST_VALIGN_BOTTOM="bottom";var JST_VALIGN_TEXT_BOTTOM="text-bottom";var JST_CONTROL_TEXT="text";var JST_CONTROL_PASSWORD="password";var JST_CONTROL_TEXTAREA="textarea";var JST_CONTROL_CHECKBOX="checkbox";var JST_CONTROL_RADIO="radio";var JST_CONTROL_SELECT="select";var JST_CONTROL_SELECT_MULTIPLE="select-multiple";var JST_CLIENT_SIDE=0;var JST_SERVER_SIDE=1;var JST_HIGHLIGHTING_NONE="000";var JST_HIGHLIGHTING_TEXT="001";var JST_HIGHLIGHTING_CELL="010";var JST_HIGHLIGHTING_TEXT_CELL="011";var JST_HIGHLIGHTING_ROW="100";var JST_HIGHLIGHTING_ROW_TEXT="101";var JST_HIGHLIGHTING_ROW_CELL="110";var JST_HIGHLIGHTING_ROW_TEXT_CELL="111";var JST_DEFAULT_OPERATION_MODE=JST_CLIENT_SIDE;var JST_DEFAULT_USE_PAGING=true;var JST_DEFAULT_PAGE_SIZE=25;var JST_DEFAULT_MAX_ROWS=-1;var JST_DEFAULT_PAGE_ONLY_SELECT_ALL=false;var JST_DEFAULT_WIDTH="";var JST_DEFAULT_ALIGN="";var JST_DEFAULT_BORDER="0";var JST_DEFAULT_PADDING="1";var JST_DEFAULT_SPACING="0";var JST_DEFAULT_SHOW_COLUMN_HEADERS=true;var JST_DEFAULT_CROP_REPEATED=false;var JST_DEFAULT_CROP_REPEATED_TREE=false;var JST_DEFAULT_ROW_HIGHLIGHTING=JST_HIGHLIGHTING_ROW;var JST_DEFAULT_COLUMN_HEADER_HIGHLIGHTING=JST_HIGHLIGHTING_TEXT;var JST_DEFAULT_NAVIGATION=JST_NAV_BOTTOM;var JST_DEFAULT_ALLOW_TOP_LINK=false;var JST_DEFAULT_ALLOW_CHANGE_PAGING=true;var JST_DEFAULT_ALLOW_CHANGE_PAGE_SIZE=true;var JST_DEFAULT_SELECTION_TYPE=JST_SEL_NONE;var JST_DEFAULT_SELECTION_NAME=null;var JST_DEFAULT_SELECTION_VALIGN=JST_VALIGN_TOP;var JST_DEFAULT_SHOW_SELECT_ALL=true;var JST_DEFAULT_VALUE_SEPARATOR=",";var JST_DEFAULT_COLUMN_SEPARATOR=";";var JST_DEFAULT_ROW_SEPARATOR="\n";var JST_DEFAULT_TABLE_CLASS="JSTTable";var JST_DEFAULT_HEADER_CLASS="JSTHeader";var JST_DEFAULT_FOOTER_CLASS="JSTFooter";var JST_DEFAULT_ADDITIONAL_HEADER_CLASS="JSTColumnHeader";var JST_DEFAULT_ADDITIONAL_FOOTER_CLASS="JSTColumnHeader";var JST_DEFAULT_SELECTION_CONTROL_CLASS="JSTSelectionControl";var JST_DEFAULT_EDIT_CONTROL_CLASS="JSTEditControl";var JST_DEFAULT_INVALID_EDIT_CONTROL_CLASS="JSTInvalidEditControl";var JST_DEFAULT_EDIT_CONTROL_RADIO_CHECKBOX_CLASS="JSTEditControlRadioCheckbox";var JST_DEFAULT_NAVIGATION_CLASS="JSTNavigation";var JST_DEFAULT_NAVIGATION_LINK_CLASS="JSTNavigationLink";var JST_DEFAULT_HIGHLIGHTED_NAVIGATION_LINK_CLASS="JSTHighlightedNavigationLink";var JST_DEFAULT_COLUMN_HEADER_CLASS="JSTColumnHeader";var JST_DEFAULT_COLUMN_HEADER_TEXT_CLASS="JSTColumnHeaderText";var JST_DEFAULT_HIGHLIGHTED_COLUMN_HEADER_CLASS="JSTHighlightedColumnHeader";var JST_DEFAULT_HIGHLIGHTED_COLUMN_HEADER_TEXT_CLASS="JSTHighlightedColumnHeaderText";var JST_DEFAULT_ODD_ROW_CLASS="JSTOddRow";var JST_DEFAULT_HIGHLIGHTED_ODD_ROW_CLASS="JSTHighlightedOddRow";var JST_DEFAULT_ODD_ROW_CELL_CLASS="JSTOddRowCell";var JST_DEFAULT_HIGHLIGHTED_ODD_ROW_CELL_CLASS="JSTHighlightedOddRowCell";var JST_DEFAULT_ODD_ROW_TEXT_CLASS="JSTOddRowText";var JST_DEFAULT_ODD_ROW_TEXT_WITH_FUNCTION_CLASS="JSTOddRowTextWithFunction";var JST_DEFAULT_HIGHLIGHTED_ODD_ROW_TEXT_CLASS="JSTHighlightedOddRowText";var JST_DEFAULT_HIGHLIGHTED_ODD_ROW_TEXT_WITH_FUNCTION_CLASS="JSTHighlightedOddRowTextWithFunction";var JST_DEFAULT_EVEN_ROW_CLASS="JSTEvenRow";var JST_DEFAULT_HIGHLIGHTED_EVEN_ROW_CLASS="JSTHighlightedEvenRow";var JST_DEFAULT_EVEN_ROW_CELL_CLASS="JSTEvenRowCell";var JST_DEFAULT_HIGHLIGHTED_EVEN_ROW_CELL_CLASS="JSTHighlightedEvenRowCell";var JST_DEFAULT_EVEN_ROW_TEXT_CLASS="JSTEvenRowText";var JST_DEFAULT_EVEN_ROW_TEXT_WITH_FUNCTION_CLASS="JSTEvenRowTextWithFunction";var JST_DEFAULT_HIGHLIGHTED_EVEN_ROW_TEXT_CLASS="JSTHighlightedEvenRowText";var JST_DEFAULT_HIGHLIGHTED_EVEN_ROW_TEXT_WITH_FUNCTION_CLASS="JSTHighlightedEvenRowTextWithFunction";var JST_DEFAULT_HEADER_TEXT="";var JST_DEFAULT_FOOTER_TEXT="";var JST_DEFAULT_EMPTY_TABLE_TEXT="";var JST_DEFAULT_WAIT_TEXT="";var JST_DEFAULT_ASC_LABEL=new Image();JST_DEFAULT_ASC_LABEL.src="images/asc.gif";var JST_DEFAULT_DESC_LABEL=new Image();JST_DEFAULT_DESC_LABEL.src="images/desc.gif";var JST_DEFAULT_TRUE_LABEL=new Image();JST_DEFAULT_TRUE_LABEL.src="images/true.gif";var JST_DEFAULT_FALSE_LABEL=new Image();JST_DEFAULT_FALSE_LABEL.src="images/false.gif";var JST_DEFAULT_MESSAGES_ON_STATUS_BAR=false;var JST_DEFAULT_SORT_MESSAGE="Click here to sort by this column";var JST_DEFAULT_SINGLE_ROW_TEXT="row";var JST_DEFAULT_MULTIPLE_ROW_TEXT="rows";var JST_DEFAULT_PAGE_TEXT="Page ${current} of ${total}";var JST_DEFAULT_FIRST_PAGE_DESCRIPTION="Click here to navigate to the first page";var JST_DEFAULT_FIRST_PAGE_TEXT="<img src=\"images/first.gif\" border=\"0\">";var JST_DEFAULT_PREVIOUS_PAGE_DESCRIPTION="Click here to navigate to the previous page";var JST_DEFAULT_PREVIOUS_PAGE_TEXT="<img src=\"images/prev.gif\" border=\"0\">";var JST_DEFAULT_NEXT_PAGE_DESCRIPTION="Click here to navigate to the next page";var JST_DEFAULT_NEXT_PAGE_TEXT="<img src=\"images/next.gif\" border=\"0\">";var JST_DEFAULT_LAST_PAGE_DESCRIPTION="Click here to navigate to the last page";var JST_DEFAULT_LAST_PAGE_TEXT="<img src=\"images/last.gif\" border=\"0\">";var JST_DEFAULT_SHOW_ALL_DESCRIPTION="Click here to show all rows";var JST_DEFAULT_SHOW_ALL_TEXT="[show all]";var JST_DEFAULT_USE_PAGING_DESCRIPTION="Click here to show paged rows";var JST_DEFAULT_USE_PAGING_TEXT="[show paged]";var JST_DEFAULT_TOP_DESCRIPTION="Click here to go to the table top";var JST_DEFAULT_TOP_TEXT="[top]";var JST_DEFAULT_CHANGE_PAGE_DESCRIPTION="Click here to change the current page";var JST_DEFAULT_CHANGE_PAGE_PROMPT="Navigate to wich page?";var JST_DEFAULT_CHANGE_PAGE_SIZE_DESCRIPTION="Click here to change the page size";var JST_DEFAULT_CHANGE_PAGE_SIZE_PROMPT="How many rows per page?";var JST_DEFAULT_STRING_PARSER=new StringParser();var JST_DEFAULT_NUMBER_PARSER=new NumberParser(-1);var JST_DEFAULT_CURRENCY_PARSER=new NumberParser(2,",",".",true,"R$",true,true);var JST_DEFAULT_DATE_PARSER=new DateParser("dd/MM/yyyy");var JST_DEFAULT_BOOLEAN_PARSER=new BooleanParser(JST_DEFAULT_TRUE_LABEL,JST_DEFAULT_FALSE_LABEL);var JST_DEFAULT_STRING_ENCODING_PARSER=new EscapeParser();var JST_DEFAULT_NUMBER_ENCODING_PARSER=new NumberParser(-1,".",",",false,"$",false,false);var JST_DEFAULT_CURRENCY_ENCODING_PARSER=new NumberParser(-1,".",",",false,"$",false,false);var JST_DEFAULT_DATE_ENCODING_PARSER=new DateParser("yyyyMMdd");var JST_DEFAULT_BOOLEAN_ENCODING_PARSER=new BooleanParser("true","false");var _jstCache_={};
function JavaScripTable(id,container,width,align,border,padding,spacing){this.columns=[];this.rows=[];this.rowIndex={};this.rowBreaks=[];this.width=width||JST_DEFAULT_WIDTH;this.align=align||JST_DEFAULT_ALIGN;this.border=border||JST_DEFAULT_BORDER;this.padding=padding||JST_DEFAULT_PADDING;this.spacing=spacing||JST_DEFAULT_SPACING;this.sortColumn=-1;this.ascSort=true;this.usePaging=JST_DEFAULT_USE_PAGING;this.pageSize=JST_DEFAULT_PAGE_SIZE;this.currentPage=1;this.rowFunction=null;this.printing=false;this.maxRows=JST_DEFAULT_MAX_ROWS;this.showColumnHeaders=JST_DEFAULT_SHOW_COLUMN_HEADERS;this.mapperClassName=null;this.mapperConstructorArguments=null;this.identifierName=null;this.objectRowMapper=null;this.cropRepeated=JST_DEFAULT_CROP_REPEATED;this.cropRepeatedTree=JST_DEFAULT_CROP_REPEATED_TREE;this.rowHighlighting=JST_DEFAULT_ROW_HIGHLIGHTING;this.columnHeaderHighlighting=JST_DEFAULT_COLUMN_HEADER_HIGHLIGHTING;this.operationMode=JST_DEFAULT_OPERATION_MODE;this.updateTableFunction=function(){alert("The callback for table update events was not defined")};this.rowCount=0;this.navigation=JST_DEFAULT_NAVIGATION;this.allowTopLink=JST_DEFAULT_ALLOW_TOP_LINK;this.allowChangePaging=JST_DEFAULT_ALLOW_CHANGE_PAGING;this.allowChangePageSize=JST_DEFAULT_ALLOW_CHANGE_PAGE_SIZE;this.onSelectionChange=null;this.onRender=null;this.selectionType=JST_DEFAULT_SELECTION_TYPE;this.selectionName=JST_DEFAULT_SELECTION_NAME;this.selectionValign=JST_DEFAULT_SELECTION_VALIGN;this.pageOnlySelectAll=JST_DEFAULT_PAGE_ONLY_SELECT_ALL;this.showSelectAll=JST_DEFAULT_SHOW_SELECT_ALL;this.valueSeparator=JST_DEFAULT_VALUE_SEPARATOR;this.columnSeparator=JST_DEFAULT_COLUMN_SEPARATOR;this.rowSeparator=JST_DEFAULT_ROW_SEPARATOR;this.tableClass=JST_DEFAULT_TABLE_CLASS;this.headerClass=JST_DEFAULT_HEADER_CLASS;this.footerClass=JST_DEFAULT_FOOTER_CLASS;this.additionalHeaderClass=JST_DEFAULT_ADDITIONAL_HEADER_CLASS;this.additionalFooterClass=JST_DEFAULT_ADDITIONAL_FOOTER_CLASS;this.selectionControlClass=JST_DEFAULT_SELECTION_CONTROL_CLASS;this.editControlClass=JST_DEFAULT_EDIT_CONTROL_CLASS;this.invalidEditControlClass=JST_DEFAULT_INVALID_EDIT_CONTROL_CLASS;this.editControlRadioCheckboxClass=JST_DEFAULT_EDIT_CONTROL_RADIO_CHECKBOX_CLASS;this.navigationClass=JST_DEFAULT_NAVIGATION_CLASS;this.navigationLinkClass=JST_DEFAULT_NAVIGATION_LINK_CLASS;this.highlightedNavigationLinkClass=JST_DEFAULT_HIGHLIGHTED_NAVIGATION_LINK_CLASS;this.columnHeaderClass=JST_DEFAULT_COLUMN_HEADER_CLASS;this.columnHeaderTextClass=JST_DEFAULT_COLUMN_HEADER_TEXT_CLASS;this.highlightedColumnHeaderClass=JST_DEFAULT_HIGHLIGHTED_COLUMN_HEADER_CLASS;this.highlightedColumnHeaderTextClass=JST_DEFAULT_HIGHLIGHTED_COLUMN_HEADER_TEXT_CLASS;this.oddRowClass=JST_DEFAULT_ODD_ROW_CLASS;this.highlightedOddRowClass=JST_DEFAULT_HIGHLIGHTED_ODD_ROW_CLASS;this.oddRowCellClass=JST_DEFAULT_ODD_ROW_CELL_CLASS;this.highlightedOddRowCellClass=JST_DEFAULT_HIGHLIGHTED_ODD_ROW_CELL_CLASS;this.oddRowTextClass=JST_DEFAULT_ODD_ROW_TEXT_CLASS;this.oddRowTextWithFunctionClass=JST_DEFAULT_ODD_ROW_TEXT_WITH_FUNCTION_CLASS;this.highlightedOddRowTextClass=JST_DEFAULT_HIGHLIGHTED_ODD_ROW_TEXT_CLASS;this.highlightedOddRowTextWithFunctionClass=JST_DEFAULT_HIGHLIGHTED_ODD_ROW_TEXT_WITH_FUNCTION_CLASS;this.evenRowClass=JST_DEFAULT_EVEN_ROW_CLASS;this.highlightedEvenRowClass=JST_DEFAULT_HIGHLIGHTED_EVEN_ROW_CLASS;this.evenRowCellClass=JST_DEFAULT_EVEN_ROW_CELL_CLASS;this.highlightedEvenRowCellClass=JST_DEFAULT_HIGHLIGHTED_EVEN_ROW_CELL_CLASS;this.evenRowTextClass=JST_DEFAULT_EVEN_ROW_TEXT_CLASS;this.evenRowTextWithFunctionClass=JST_DEFAULT_EVEN_ROW_TEXT_WITH_FUNCTION_CLASS;this.highlightedEvenRowTextClass=JST_DEFAULT_HIGHLIGHTED_EVEN_ROW_TEXT_CLASS;this.highlightedEvenRowTextWithFunctionClass=JST_DEFAULT_HIGHLIGHTED_EVEN_ROW_TEXT_WITH_FUNCTION_CLASS;this.headerText=JST_DEFAULT_HEADER_TEXT;this.footerText=JST_DEFAULT_FOOTER_TEXT;this.emptyTableText=JST_DEFAULT_EMPTY_TABLE_TEXT;this.waitText=JST_DEFAULT_WAIT_TEXT;this.headers=[];this.footers=[];this.ascLabel=JST_DEFAULT_ASC_LABEL;this.descLabel=JST_DEFAULT_DESC_LABEL;this.trueLabel=JST_DEFAULT_TRUE_LABEL;this.falseLabel=JST_DEFAULT_FALSE_LABEL;this.invalidTableIdMessage="The id must be set";this.invalidTableContainerMessage="The container object must be set, and must contain the innerHTML property";this.tableNotInitializedMessage="The JavaScripTable was not correctly initialized";this.columnAddWithRowsMessage="A column cannot be added to the table if it already contains rows";this.invalidColumnMessage="The specified column is invalid";this.invalidRowMessage="The specified row is invalid";this.invalidRowIdMessage="The row's identifier must be informed";this.rowIdAlreadyInUseMessage="The row's identifier is already in use";this.messagesOnStatusBar=JST_DEFAULT_MESSAGES_ON_STATUS_BAR;this.sortMessage=JST_DEFAULT_SORT_MESSAGE;this.singleRowText=JST_DEFAULT_SINGLE_ROW_TEXT;this.multipleRowText=JST_DEFAULT_MULTIPLE_ROW_TEXT;this.pageText=JST_DEFAULT_PAGE_TEXT;this.firstPageDescription=JST_DEFAULT_FIRST_PAGE_DESCRIPTION;this.firstPageText=JST_DEFAULT_FIRST_PAGE_TEXT;this.previousPageDescription=JST_DEFAULT_PREVIOUS_PAGE_DESCRIPTION;this.previousPageText=JST_DEFAULT_PREVIOUS_PAGE_TEXT;this.nextPageDescription=JST_DEFAULT_NEXT_PAGE_DESCRIPTION;this.nextPageText=JST_DEFAULT_NEXT_PAGE_TEXT;this.lastPageDescription=JST_DEFAULT_LAST_PAGE_DESCRIPTION;this.lastPageText=JST_DEFAULT_LAST_PAGE_TEXT;this.showAllDescription=JST_DEFAULT_SHOW_ALL_DESCRIPTION;this.showAllText=JST_DEFAULT_SHOW_ALL_TEXT;this.usePagingDescription=JST_DEFAULT_USE_PAGING_DESCRIPTION;this.usePagingText=JST_DEFAULT_USE_PAGING_TEXT;this.topDescription=JST_DEFAULT_TOP_DESCRIPTION;this.topText=JST_DEFAULT_TOP_TEXT;this.changePageDescription=JST_DEFAULT_CHANGE_PAGE_DESCRIPTION;this.changePagePrompt=JST_DEFAULT_CHANGE_PAGE_PROMPT;this.changePageSizeDescription=JST_DEFAULT_CHANGE_PAGE_SIZE_DESCRIPTION;this.changePageSizePrompt=JST_DEFAULT_CHANGE_PAGE_SIZE_PROMPT;this.stringParser=JST_DEFAULT_STRING_PARSER;this.numberParser=JST_DEFAULT_NUMBER_PARSER;this.currencyParser=JST_DEFAULT_CURRENCY_PARSER;this.dateParser=JST_DEFAULT_DATE_PARSER;this.booleanParser=JST_DEFAULT_BOOLEAN_PARSER;this.stringEncodingParser=JST_DEFAULT_STRING_ENCODING_PARSER;this.numberEncodingParser=JST_DEFAULT_NUMBER_ENCODING_PARSER;this.currencyEncodingParser=JST_DEFAULT_CURRENCY_ENCODING_PARSER;this.dateEncodingParser=JST_DEFAULT_DATE_ENCODING_PARSER;this.booleanEncodingParser=JST_DEFAULT_BOOLEAN_ENCODING_PARSER;var valid=true;if(id==null||id==""){alert(this.invalidTableIdMessage);valid=false}
if(isInstance(container,String)){container=getObject(container)}
if(container==null||container.innerHTML==null){alert(this.invalidTableContainerMessage);valid=false}
this.id=escapeCharacters(id);this.container=container;this.form=null;_jstCache_[""+this.id]=this;
this.addColumn=function(column){if(this.rows.length>0){alert(this.columnAddWithRowsMessage);return}
if(isInstance(column,String)){column=new Column(column)}
if(!(isInstance(column,Column))){alert(this.invalidColumnMessage);return}
column.index=this.columns.length;column.table=this;if(column.watch){column.watch("index",function(prop,oldVal,newVal){return oldVal});column.watch("table",function(prop,oldVal,newVal){return oldVal})}
this.columns[this.columns.length]=column;this.objectRowMapper=null;return column}
this.removeColumn=function(index){var ret=this.columns[index];this.columns.splice(index,1);this.objectRowMapper=null;return ret}
this.removeAllColumns=function(){var ret=this.columns;this.columns=[];this.objectRowMapper=null;return ret}
this.getColumnCount=function(){return this.columns.length}
this.getColumnByIndex=function(index){return this.columns[index]}
this.getSortColumn=function(){return this.sortColumn>=0?this.getColumnByIndex(this.sortColumn):null}
this.getAllColumns=function(){return this.columns}
this.getVisibleColumns=function(){var ret=[];for(var i=0;i<this.columns.length;i++){column=this.columns[i];if(column.visible){ret[ret.length]=column}}
return ret}
this.getVisibleColumnsArray=function(){var array=[];var row=[];for(var i=0;i<this.columns.length;i++){column=this.columns[i];if(column.visible){row[row.length]=column}
if(inArray(column.index,this.rowBreaks)){if(row.length>0){array[array.length]=row;row=[]}}}
if(row.length>0){array[array.length]=row}
return array}
this.addHeader=function(){var cells=new JavaScripTableCellContainer();JavaScripTableCellContainer.apply(cells,arguments);this.headers[this.headers.length]=cells;return cells}
this.getHeaderCount=function(){return this.headers.length}
this.getHeader=function(index){return this.headers[index]}
this.clearHeaders=function(){this.headers=[]}
this.addFooter=function(){var cells=new JavaScripTableCellContainer();JavaScripTableCellContainer.apply(cells,arguments);this.footers[this.footers.length]=cells;return cells}
this.getFooterCount=function(){return this.footers.length}
this.getFooter=function(index){return this.footers[index]}
this.clearFooters=function(){this.footers=[]}
this.setRowBreak=function(columnIndex,flag){if(!isInstance(columnIndex,Number)){if(this.columns.length==0){return}
columnIndex=this.columns.length-1}
flag=flag||true;var contains=inArray(columnIndex,this.rowBreaks);if(flag&&!contains){this.rowBreaks[this.rowBreaks.length]=columnIndex} else if(!flag&&contains){this.rowBreaks=removeFromArray(this.rowBreaks,columnIndex)}}
this.isRowBreak=function(columnIndex){if(!isInstance(columnIndex,Number)){return false}
return inArray(this.rowBreaks,columnIndex)}
this.findIndexedRow=function(id){var index=this.rowIndex[""+id];return index||null}
this.addRowToIndex=function(row,index){var array=[row,index]
this.rowIndex[""+row.id]=array;return array}
this.replaceRowOnIndex=function(row){var array=this.findIndexedRow(row.id);if(array){array[0]=row}
return array}
this.removeRowFromIndexById=function(rowId){delete this.rowIndex[""+rowId]}
this.rebuildRowIndex=function(){this.rowIndex=[];for(var i=0,len=this.rows.length;i<len;i++){this.addRowToIndex(this.rows[i],i)}}
this.prepareRow=function(row){if(!isInstance(row,Row)){var mapper=this.getObjectRowMapper();if(mapper!=null){row=mapper.toRow(row)}}
if(!isInstance(row,Row)){alert(this.invalidRowMessage);return null}
if(row.id==null){alert(this.invalidRowIdMessage);return null}
while(row.values.length<this.columns.length){row.values[row.values.length]=null}
while(row.possibleValues.length<row.values.length){row.possibleValues[row.possibleValues.length]=null}
while(row.titles.length<row.values.length){row.titles[row.titles.length]=null}
row.table=this;for(var i=0;i<this.columns.length;i++){var column=this.columns[i];if(column.type!=JST_TYPE_STRING&&isInstance(row.values[i],String)){row.values[i]=column.getParser(row).parse(row.values[i],row,column)}}
return row}
this.addRow=function(row,refresh){if((this.maxRows>=0)&&(this.rows.length>=this.maxRows)){return}
row=this.prepareRow(row);if(row==null){return}
if(this.getRowById(row.id)!=null){alert(this.rowIdAlreadyInUseMessage);return null}
var index=this.rows.length;this.rows[index]=row;this.addRowToIndex(row,index);if(booleanValue(refresh)){this.render()}
return row}
this.updateRow=function(row,refresh){row=this.prepareRow(row);if(row==null){return}
var index=this.replaceRowOnIndex(row);if(index){this.rows[index[1]]=row}
if(booleanValue(refresh)){this.render()}
return row}
this.removeRowById=function(id,refresh){var ret=null;var index=this.removeRowFromIndexById(id);if(index){this.rows.splice(index[1],1)}
if(booleanValue(refresh)){this.render()}
return ret}
this.removeSelectedRows=function(refresh){var ret=[];var i=0;while(i<this.rows.length){var row=this.rows[i];if(row.selected){ret[ret.length]=row;this.rows.splice(i,1);this.removeRowFromIndexById(row.id)} else {i++}}
if(booleanValue(refresh)){this.render()}
return ret}
this.removeAllRows=function(refresh){var ret=this.rows;this.rows=[];this.rowIndex={};if(booleanValue(refresh)){this.render()}
return ret}
this.getAllRows=function(){return this.rows}
this.getAllRowsAsObjects=function(){return this.rowArrayToObjectArray(this.getAllRows())}
this.rowArrayToObjectArray=function(rows){var mapper=this.getObjectRowMapper();if(mapper==null){return rows}
var objects=[];for(var i=0;i<rows.length;i++){objects[i]=mapper.toObject(rows[i])}
return objects}
this.getAllRowIds=function(){var ret=[];for(var i=0;i<this.rows.length;i++){row=this.rows[i];ret[ret.length]=row.id}
return ret}
this.getSelectedRows=function(){var ret=[];for(var i=0;i<this.rows.length;i++){row=this.rows[i];if(row.selected){ret[ret.length]=row}}
return ret}
this.getSelectedRowsAsObjects=function(){return this.rowArrayToObjectArray(this.getSelectedRows())}
this.getSelectedRowIds=function(){var ret=[];for(var i=0;i<this.rows.length;i++){row=this.rows[i];if(row.selected){ret[ret.length]=row.id}}
return ret}
this.getSelectedRowCount=function(){return this.getSelectedRows().length}
this.getRowById=function(id){var ret=null;var index=this.findIndexedRow(id);if(index){ret=index[0]}
return ret}
this.getRowByIdAsObject=function(id){var row=this.getRowById(id);if(row==null){return null}
return this.rowArrayToObjectArray([row])[0]}
this.getCellValue=function(rowId,colIndex){var row=this.getRowById(rowId);return row.values[colIndex]}
this.getFormattedCellValue=function(rowId,colIndex){var column=this.getColumnByIndex(colIndex);if(column==null){alert(this.invalidColumnMessage);return null}
var row=this.getRowById(rowId);if(row==null){alert(this.invalidRowIdMessage);return null}
return column.getParser(row).format(this.getCellValue(row.id,column.index),row,column)}
this.setCellValue=function(rowId,colIndex,value,refresh){var row=this.getRowById(rowId);row.values[colIndex]=value;cellEditor=row.editors[colIndex];if(cellEditor!=null){setValue(cellEditor,value)}
if(booleanValue(refresh)){this.render()}}
this.setFormattedCellValue=function(rowId,colIndex,value,refresh){var column=this.getColumnByIndex(colIndex);if(column==null){alert(this.invalidColumnMessage);return null}
var row=this.getRowById(rowId);if(row==null){alert(this.invalidRowIdMessage);return null}
value=column.getParser(row).parse(value,row,column);this.setCellValue(row.id,column.index,value,refresh)}
this.encode=function(data,columns,encodeRowId){columns=columns||null;encodeRowId=encodeRowId||true;if(data==null){data=this.getAllRows()}
if(!isInstance(data,Array)){data=[data]}
var temp=[];for(var i=0;i<data.length;i++){var current=data[i];temp[i]=escapeCharacters(((isInstance(current,Row))?current.encode(columns,encodeRowId):current),this.rowSeparator,true)}
return temp.join(this.rowSeparator)}
this.setPage=function(page){if(this.pageOnlySelectAll){for(var i=0;i<this.rows.length;i++){this.rows[i].selected=false}}
this.currentPage=page;this.update()}
this.setUsePaging=function(flag){if(this.pageOnlySelectAll){for(var i=0;i<this.rows.length;i++){this.rows[i].selected=false}}
this.usePaging=flag;this.update()}
this.setSort=function(column,asc){if(column==this.sortColumn){if(asc==null){this.ascSort=!this.ascSort} else {this.ascSort=booleanValue(asc)}} else {this.sortColumn=column;this.ascSort=(asc==null?true:booleanValue(asc))}
this.rows.sort(this.sort);this.rebuildRowIndex();this.update()}
this.selectAll=function(flag){var firstRow,lastRow;if(this.pageOnlySelectAll){if(this.operationMode==JST_CLIENT_SIDE){firstRow=Math.max(this.pageSize*(this.currentPage-1),0);lastRow=Math.min(firstRow+this.pageSize,this.rows.length)} else {firstRow=0;lastRow=Math.min(this.rows.length,this.pageSize)}} else {firstRow=0;lastRow=this.rows.length}
for(var i=firstRow;i<lastRow;i++){var row=this.rows[i];this.setSelection(row.id,flag)}}
this.setSelection=function(rowId,flag){if(this.selectionType==JST_SEL_SINGLE){for(var i=0;i<this.rows.length;i++){this.rows[i].selected=false}}
var row=this.getRowById(rowId);if(row){row.selected=flag;var selection=getObject(this.getSelectionName()+rowId);if(selection!=null){selection.checked=flag}}}
this.fireSelection=function(rowId,flag){if(this.getRowById(rowId).selected==flag){return}
if(typeof(this.onSelectionChange)=='function'){if(this.onSelectionChange(rowId,flag,this)==false){return}}
this.setSelection(rowId,flag)}
this.getTableVar=function(){return "_jstCache_['"+this.id+"']"}
this.getSelectionName=function(){return this.selectionName!=null?this.selectionName:"selection_"+this.id}
this.getControlName=function(row,column){var isRadioCheckbox=inArray(column.editControl.type,[JST_CONTROL_RADIO,JST_CONTROL_CHECKBOX]);if(column.editControl!=null&&column.editControl.name!=null){var name=column.editControl.name;if(isRadioCheckbox){name+="_"+row.id}
return name} else {return "edit_"+this.id+(isRadioCheckbox?"_"+row.id:"")+"_"+column.index}}
this.getControlId=function(row,column){return "id_edit_"+this.id+"_"+row.id+"_"+column.index}
function validateValue(value,stringValue,row,column){if(column.allowEmptyValue&&isEmpty(stringValue)){return [true,null]}
var parser=column.getParser(row);var valid=parser.isValid(stringValue);var validateMessage=null;if(valid&&column.validateFunction!=null){var ret=column.validateFunction(value,column,row);if(ret==null){valid=true} else if((ret==true)||(ret==false)){valid=ret} else {validateMessage=ret;valid=false}}
return [valid,validateMessage]}
this.updateValue=function(rowId,columnIndex){var column=this.getColumnByIndex(columnIndex);var row=this.getRowById(rowId)
var parser=column.getParser(row);var valid;var value;var targetControls;var isRadioCheckbox=inArray(column.editControl.type,[JST_CONTROL_RADIO,JST_CONTROL_CHECKBOX]);if(isRadioCheckbox){var controls=getObject(this.getControlName(row,column));targetControls=controls;var stringValues=getValue(controls);if(stringValues==null){stringValues=[]} else if(!isInstance(stringValues,Array)){stringValues=[stringValues]}
value=new Array(stringValues.length);for(var i=0;i<stringValues.length;i++){value[i]=parser.parse(stringValues[i],row,column);valid=validateValue(value[i],stringValues[i],row,column)[0];if(!valid) break}
if(value.length==0){value=null} else if(value.length==1){value=value[0]}} else {var control=getObject(this.getControlId(row,column));targetControls=[control];var stringValue=getValue(control);value=parser.parse(stringValue,row,column);valid=validateValue(value,stringValue,row,column)[0]}
var className;if(valid){className=isRadioCheckbox?this.editControlRadioCheckboxClass:this.editControlClass;row.values[column.index]=value} else {className=this.invalidEditControlClass;row.values[column.index]=null}
for(var i=0;i<targetControls.length;i++){targetControls[i].className=className}}
this.finishEdit=function(rowId,columnIndex){var column=this.getColumnByIndex(columnIndex);var row=null;if(inArray(column.editControl.type,[JST_CONTROL_TEXT,JST_CONTROL_PASSWORD,JST_CONTROL_TEXTAREA])){row=this.getRowById(rowId)
var control=getObject(this.getControlId(row,column));if(!isInstance(control,Array)){var parser=column.getParser(row);var stringValue=control.value;var value=parser.parse(stringValue,row,column);var arr=validateValue(value,stringValue,row,column);var valid=arr[0];var msg=arr[1];if(valid){value=parser.format(value,row,column);setValue(control,value);this.updateValue(rowId,columnIndex)}
if(msg!=null){alert(msg)}}}}
this.getRowCount=function(){return(this.operationMode==JST_CLIENT_SIDE)?this.rows.length:this.rowCount}
this.getMaxPage=function(){return Math.ceil(this.getRowCount()/this.pageSize)}
this.getObjectRowMapper=function(){if(this.objectRowMapper==null&&this.identifierName!=null){this.objectRowMapper=new ObjectRowMapper();if(this.mapperClassName!=null){this.objectRowMapper.className=this.mapperClassName}
if(this.mapperConstructorArguments!=null){this.objectRowMapper.constructorArguments=this.mapperConstructorArguments}
this.objectRowMapper.mapIdentifier(this.identifierName);for(var i=0;i<this.columns.length;i++){var column=this.columns[i];this.objectRowMapper.mapProperty(column.index,column.propertyName)}}
return this.objectRowMapper}
this.update=function(){if(this.operationMode==JST_CLIENT_SIDE){this.render()} else {this.updateTableFunction(this)}}
this.render=function(firstTime){if(firstTime!=false){firstTime=true}
if(!valid){alert(this.tableNotInitializedMessage);return}
if(/MSIE/.test(navigator.userAgent)&&!window.opera){var inputs=this.container.getElementsByTagName("input");for(var i=0;i<inputs.length;i++){var input=inputs[i];input.mask=input.dateMask=input.sizeLimit=null}}
if(((this.columns.length==0)||(this.rows.length==0))&&(!isEmpty(this.emptyTableText))){this.container.innerHTML=this.emptyTableText;return}
var tableVar=this.getTableVar();if(firstTime&&!isEmpty(this.waitText)){this.container.innerHTML=this.waitText;setTimeout(tableVar+".render(false)",10);return}
var cursorPointer="cursor:"+(document.createTextRange?"hand":"pointer")+";";var buffer=new StringBuffer(500);var usesSelection=this.selectionType!=JST_SEL_NONE&&!this.printing;var visibleColumns=this.getVisibleColumns();var visibleColumnsArray=this.getVisibleColumnsArray();var columnsPerRow=[];var renderedColumnCount=0;var subRowCount=visibleColumnsArray.length;for(var i=0;i<visibleColumnsArray.length;i++){var current=visibleColumnsArray[i];var count=0;for(var j=0;j<current.length;j++){count+=current[j].colspan}
columnsPerRow[i]=count;if(count>renderedColumnCount){renderedColumnCount=count}}
if(usesSelection){renderedColumnCount++}
var navBar="";var images=new Map();var editControls=[];if((this.navigation!=JST_NAV_NONE)&&(!this.printing)){navBar=this.buildNavigation(renderedColumnCount)}
var firstRow,lastRow,maxPage;if(this.usePaging){var maxPage=this.getMaxPage();if(this.currentPage<=0){this.currentPage=1} else if(this.currentPage>maxPage){this.currentPage=maxPage}
if(this.operationMode==JST_CLIENT_SIDE){firstRow=Math.max(this.pageSize*(this.currentPage-1),0);lastRow=Math.min(firstRow+this.pageSize,this.rows.length)} else {firstRow=0;lastRow=Math.min(this.rows.length,this.pageSize)}} else {firstRow=0;lastRow=this.rows.length}
buffer.append("<a name=\"tableTop").append(this.id).append("\"></a>");buffer.append("<table width=\"").append(this.width).append("\" align=\"").append(this.align).append("\" border=\"").append(this.border).append("\" class=\"").append(this.tableClass).append("\" cellpadding=\"").append(this.padding).append("\" cellspacing=\"").append(this.spacing).append("\">");if(!isEmpty(this.headerText)){buffer.append("<tr><td colspan=\"").append(renderedColumnCount).append("\" class=\"").append(this.headerClass).append("\">").append(this.headerText).append("</td></tr>")}
buffer.append(this.renderCells(this.headers,this.additionalHeaderClass));if(this.navigation==JST_NAV_TOP||this.navigation==JST_NAV_BOTH){buffer.append(navBar)}
if(this.showColumnHeaders){buffer.append("<tr>");if(usesSelection){buffer.append("<th width=\"20px\" class=\"").append(this.columnHeaderClass).append("\" rowspan=\"").append(subRowCount).append("\">");if(this.selectionType==JST_SEL_SINGLE||!this.showSelectAll){buffer.append("&nbsp;")} else {buffer.append("<input style=\"border:0px\" type=\"checkbox\" class=\"").append(this.selectionControlClass).append("\" onclick=\"").append(tableVar).append(".selectAll(this.checked)\">")}
buffer.append("</th>")}
for(var i=0;i<visibleColumnsArray.length;i++){for(var j=0;j<visibleColumnsArray[i].length;j++){var column=visibleColumnsArray[i][j];if(i>0&&j==0){buffer.append("<tr>")}
buffer.append("<th nowrap width=\"").append(column.width).append("\" class=\"").append(this.columnHeaderClass).append("\" colspan=\"").append(subRowCount==1?1:column.colspan).append("\" rowspan=\"").append(subRowCount==1?1:column.rowspan).append("\" align=\"").append(column.align).append("\"");if(!this.printing&&this.getColumnHeaderHighlightingParts()[1]){buffer.append(" onmouseover=\"this.className='").append(this.highlightedColumnHeaderClass).append("'\" onmouseout=\"this.className='").append(this.columnHeaderClass).append("'\"")}
buffer.append(">");if(isEmpty(trim(column.header))){buffer.append("&nbsp;")} else {buffer.append("<span class=\"").append(this.columnHeaderTextClass).append("\"");if(!this.printing&&this.getColumnHeaderHighlightingParts()[2]){buffer.append(" onmouseover=\"this.className='").append(this.highlightedColumnHeaderTextClass).append("'\" onmouseout=\"this.className='").append(this.columnHeaderTextClass).append("'\"")}
var style="";if(!this.printing&&column.sortable){style=cursorPointer;buffer.append(" onclick=\"").append(tableVar).append(".setSort(").append(column.index).append(");\"");if(this.messagesOnStatusBar){buffer.append(" onMouseOver=\"window.status='").append(this.sortMessage).append("';return true;\" onMouseOut=\"window.status='';return true;\"")} else {buffer.append("title=\"").append(this.sortMessage).append("\"")
}}
buffer.append(" style=\"").append(style).append("\">");if(column.headerTextClass!=null||column.headerTextStyle!=null){buffer.append("<span");if(column.headerTextClass!=null){buffer.append(" class=\"").append(column.headerTextClass).append("\"")}
if(column.headerTextStyle!=null){buffer.append(" style=\"").append(column.headerTextStyle).append("\"")}
buffer.append(">")}
buffer.append(column.header);if(column.headerTextClass!=null||column.headerTextStyle!=null){buffer.append("</span>")}
if(!this.printing&&column.sortable&&this.sortColumn==column.index){buffer.append("&nbsp;").append(this.handleLabel(((this.ascSort)?this.ascLabel:this.descLabel),images))}
buffer.append("</span>")}
buffer.append("</th>")}
buffer.append("</tr>")}}
var even=true;var lastValues=null;for(var i=firstRow;i<lastRow;i++){var row=this.rows[i];even=!even;var rowClass=(even?this.evenRowClass:this.oddRowClass);var trHtml=new StringBuffer();var subRow=0;trHtml.append("<tr id='").append(this.id+"_"+escapeCharacters(row.id)+"_%subRow%").append("' class=\"").append(rowClass).append("\" ");if(!this.printing&&!isEmpty(this.rowFunction)){var funct=this.rowFunction;if(isInstance(funct,Function)){funct=functionName(funct)}
trHtml.append("onclick=\"").append(funct).append("('").append(row.id).append("', ").append(tableVar).append(")\" ");trHtml.append("style=\"").append(cursorPointer).append("\"")}
if(!this.printing&&this.getRowHighlightingParts()[0]){var highlightedRowClass=(even?this.highlightedEvenRowClass:this.highlightedOddRowClass);if(subRowCount>1){trHtml.append("onmouseover=\"changeRowsClass('").append(this.id).append("', '").append(row.id).append("', ").append(subRowCount).append(", '").append(highlightedRowClass).append("');\" ");trHtml.append("onmouseout=\"changeRowsClass('").append(this.id).append("', '").append(row.id).append("', ").append(subRowCount).append(", '").append(rowClass).append("');\"")} else {trHtml.append("onmouseover=\"this.className='").append(highlightedRowClass).append("';\" onmouseout=\"this.className='").append(rowClass).append("';\"")}}
trHtml.append(">");buffer.append(replaceAll(trHtml.toString(),"%subRow%",subRow));if(usesSelection){buffer.append("<td width=\"20px\" onclick=\"stopPropagation(event)\" style=\"cursor:auto\" rowspan=\"").append(subRowCount).append("\">");if(row.selectable){buffer.append("<input type=\"").append(this.selectionType).append("\" class=\"").append(this.selectionControlClass).append("\" name=\"").append(this.getSelectionName()).append("\" ").append("id=\"").append(this.getSelectionName()).append(row.id).append("\" onclick=\"").append(tableVar).append(".fireSelection('").append(row.id).append("', this.checked);\" ").append("value=\"").append(row.id).append("\" ").append(row.selected?"checked":"").append(">")} else {buffer.append("&nbsp;")}
buffer.append("</td>")}
for(var j=0;j<visibleColumnsArray.length;j++){for(var j2=0;j2<visibleColumnsArray[j].length;j2++){if(j>0&&j2==0){subRow++;buffer.append(replaceAll(trHtml.toString(),"%subRow%",subRow))}
var column=visibleColumnsArray[j][j2];var values=row.values[column.index];if(!isInstance(values,Array)){values=[values]}
var formattedValue="";var useValue=true;if((this.cropRepeated||column.cropRepeated)&&lastValues!=null){var oldValues=lastValues[column.index];if(!isInstance(oldValues,Array)){oldValues=[oldValues]}
if(""+values==""+oldValues){useValue=false}}
var useCellFunction=false;var cellEditable=false;var cellClass=null;if(useValue){if(this.cropRepeatedTree){lastValues=null}
var formattedValues=[];var tmpFmt=[];var parser=column.getParser(row);for(var k=0;k<values.length;k++){value=values[k];if(column.editable&&isInstance(value,String)){value=replaceAll(value,"&","&amp;");value=replaceAll(value,"\"","&quot;");value=replaceAll(value,"'","&apos;")}
formattedValues[k]=isEmpty(value)?null:parser.format(value,row,column);if(!isEmpty(value)){if((formattedValues[k])&&(formattedValues[k].src)){formattedValues[k]=this.handleLabel(formattedValues[k],images)}
tmpFmt[tmpFmt.length]=formattedValues[k]}}
cellEditable=(column.editable&&row.editable&&(isInstance(column.editControl,EditControl)));useCellFunction=!this.printing&&!cellEditable&&!isEmpty(column.cellFunction)&&row.useCellFunction;cellClass=null;formattedValue=tmpFmt.join(this.valueSeparator+" ")}
var cellClass=(even?this.evenRowCellClass:this.oddRowCellClass);buffer.append("<td width=\"").append(column.width).append("\" align=\"").append(column.align).append("\" valign=\"").append(column.valign).append("\" class=\"").append(cellClass).append("\" colspan=\"").append(subRowCount==1?1:column.colspan).append("\" rowspan=\"").append(subRowCount==1?1:column.rowspan).append("\" ");if(!this.printing&&this.getRowHighlightingParts()[1]){var highlightedCellClass=(even?this.highlightedEvenRowCellClass:this.highlightedOddRowCellClass);buffer.append(" onmouseover=\"this.className='").append(highlightedCellClass).append("'\" onmouseout=\"this.className='").append(cellClass).append("';\"")}
var title=row.titles[column.index];if(!isEmpty(title)){buffer.append(" title=\"").append(title).append("\"")}
buffer.append(">");if(cellEditable){var controlName=this.getControlName(row,column);var controlId=this.getControlId(row,column);var editControl=column.editControl;var updateFunction=this.getTableVar()+".updateValue('"+row.id+"', "+column.index+")";var finishEditFunction=this.getTableVar()+".finishEdit('"+row.id+"', "+column.index+")";var possibleValues=new Map();if(isInstance(column.possibleValues,Map)){possibleValues.putAll(column.possibleValues)}
if((row.possibleValues!=null)&&(isInstance(row.possibleValues[column.index],Map))){possibleValues.putAll(row.possibleValues[column.index])}
formattedValue=replaceAll(formattedValue,'\\','\\\\');switch(editControl.type){case JST_CONTROL_TEXTAREA:buffer.append("<textarea id=\"").append(controlId).append("\" class=\"").append(this.editControlClass).append("\" onblur=\"").append(finishEditFunction).append("\" onkeyup=\"").append(updateFunction).append("\" name=\"").append(controlName).append("\" ").append(editControl.attributes).append(" onclick=\"stopPropagation(event)\">").append(formattedValue).append("</textarea>");break;case JST_CONTROL_SELECT:case JST_CONTROL_SELECT_MULTIPLE:buffer.append("<select").append(editControl.type==JST_CONTROL_SELECT_MULTIPLE?" multiple":"").append(" id=\"").append(controlId).append("\" class=\"").append(this.editControlClass).append("\" onchange=\"").append(updateFunction).append("\" name=\"").append(controlName).append("\" ").append(editControl.attributes).append(" onclick=\"stopPropagation(event)\">");var keys=possibleValues.getKeys();for(var k=0;k<keys.length;k++){var key=keys[k];var value=possibleValues.get(key);buffer.append("<option value=\"").append(key).append("\" ").append(inArray(key,values)?"selected":"").append(" onclick=\"stopPropagation(event)\">").append(value).append("</option>")}
buffer.append("</select>");break;case JST_CONTROL_RADIO:case JST_CONTROL_CHECKBOX:if((possibleValues.size()==0)&&(column.type==JST_TYPE_BOOLEAN)){if(editControl.type==JST_CONTROL_CHECKBOX){possibleValues.put('true','')} else {possibleValues.put('true','true');possibleValues.put('false','false')}}
var entries=possibleValues.getEntries();for(var k=0;k<entries.length;k++){var key=entries[k].key;var value=entries[k].value;if(k>0){if(editControl.multiLine){buffer.append("<br>")} else {buffer.append("&nbsp;&nbsp;&nbsp;")}}
var isChecked;if(column.type==JST_TYPE_BOOLEAN){isChecked=values[k]} else {isChecked=inArray(key,values)}
buffer.append("<div style=\"display:inline\"><label onclick=\"stopPropagation(event)\"><input id=\"").append(controlId).append("\" class=\"").append(this.editControlRadioCheckboxClass).append("\" onclick=\"stopPropagation(event);").append(updateFunction).append("\" name=\"").append(controlName).append("\" ").append(editControl.attributes).append(" type=\"").append(editControl.type).append("\" value=\"").append(key).append("\" ").append(isChecked?"checked":"").append(">").append(isEmpty(value)?"":("&nbsp;"+value)).append("</label></div>")}
break;default:buffer.append("<input id=\"").append(controlId).append("\" class=\"").append(this.editControlClass).append("\" onclick=\"stopPropagation(event)\" onblur=\"").append(finishEditFunction).append("\" onkeyup=\"").append(updateFunction).append("\" name=\"").append(controlName).append("\" ").append(editControl.attributes).append(" type=\"").append(editControl.type).append("\" value=\"").append(formattedValue).append("\">");break}} else {var textClass;var cellFunction="";if(useCellFunction){textClass=(even?column.evenRowCellWithFunctionClass:column.oddRowCellWithFunctionClass);if(textClass==null) textClass=(even?this.evenRowTextWithFunctionClass:this.oddRowTextWithFunctionClass);var funct=column.cellFunction;if(isInstance(funct,Function)){funct=functionName(funct)}
cellFunction=" style=\""+cursorPointer+"\" onclick=\""+funct+"('"+row.id+"', "+column.index+", "+tableVar+");stopPropagation(event)\""} else {textClass=(even?this.evenRowTextClass:this.oddRowTextClass)}
buffer.append("<span class=\"").append(textClass).append("\"").append(cellFunction);if(!this.printing&&this.getRowHighlightingParts()[2]){var highlightedTextClass;if(useCellFunction){highlightedTextClass=(even?column.highlightedEvenRowCellWithFunctionClass:column.highlightedOddRowCellWithFunctionClass);if(highlightedTextClass==null) highlightedTextClass=(even?this.highlightedEvenRowTextWithFunctionClass:this.highlightedOddRowTextWithFunctionClass)} else {highlightedTextClass=(even?this.highlightedEvenRowTextClass:this.highlightedOddRowTextClass)}
buffer.append(" onmouseover=\"this.className='").append(highlightedTextClass).append("'\" onmouseout=\"this.className='").append(textClass).append("';\"")}
buffer.append(">");if(column.cellTextClass!=null||column.cellTextStyle!=null){buffer.append("<span");if(column.cellTextClass!=null){buffer.append(" class=\"").append(column.cellTextClass).append("\"")}
if(column.cellTextStyle!=null){buffer.append(" style=\"").append(column.cellTextStyle).append("\"")}
buffer.append(">")}
buffer.append((isEmpty(formattedValue)?"&nbsp;":formattedValue));if(column.cellTextClass!=null||column.cellTextStyle!=null){buffer.append("</span>")}
buffer.append("</span>")}
buffer.append("</td>")}
buffer.append("</tr>");lastValues=row.values}}
buffer.append(this.renderCells(this.footers,this.additionalFooterClass));if(this.navigation==JST_NAV_BOTTOM||this.navigation==JST_NAV_BOTH){buffer.append(navBar)}
if(!isEmpty(this.footerText)){buffer.append("<tr><td colspan=\"").append(renderedColumnCount).append("\" class=\"").append(this.footerClass).append("\">").append(this.footerText).append("</td></tr>")}
buffer.append("</table>");this.container.innerHTML="<input type=\"hidden\" name=\"hidden"+this.id+"\">";var hidden=getObject("hidden"+this.id);if(hidden==null||hidden.form==null){this.form=null} else {this.form=hidden.form}
this.container.innerHTML=buffer.toString();buffer.clear();var keys=images.getKeys();for(var i=0;i<keys.length;i++){var key=keys[i];var ref=document.images[key];var img=images.get(key);if(ref&&img.src){ref.src=img.src}}
for(var i=0;i<visibleColumns.length;i++){var column=visibleColumns[i];if(column.getMaskFunction!=null){for(var j=firstRow;j<lastRow;j++){var row=this.rows[j];var controls=getObject(this.getControlId(row,column));if(controls==null) continue;if(!isInstance(controls,Array)){controls=[controls]}
for(var k=0;k<controls.length;k++){var mask=column.getMaskFunction(controls[k],column,row);if(mask!=null){mask.updateValueFunction=tableVar+".updateValue('"+row.id+"', "+column.index+")";mask.finishEditFunction=tableVar+".finishEdit('"+row.id+"', "+column.index+")";mask.updateFunction=function(){eval(this.updateValueFunction)}
mask.blurFunction=function(){eval(this.finishEditFunction)}}}}}}
if(typeof(this.onRender)=='function'){this.onRender(this)}}
this.renderCells=function(containers,defaultClass){if(isEmpty(containers)){return ""}
var sb=new StringBuffer();var usesSelection=this.selectionType!=JST_SEL_NONE&&!this.printing;for(var i=0;i<containers.length;i++){var container=containers[i];sb.append("<tr>");if(usesSelection){sb.append("<td class='").append(defaultClass).append("'>&nbsp;</td>")}
for(var j=0;j<container.cells.length;j++){var cell=container.cells[j];sb.append("<td ");if(isEmpty(cell["class"])){cell["class"]=defaultClass}
for(var opt in cell){var value=cell[opt];if(value==true){value=opt} else if(value==false){continue}
if(opt=="text"||(!isInstance(value,String)&&!isInstance(value,Number))){continue}
sb.append(opt).append("='").append(value).append("' ")}
sb.append(">");sb.append(cell.text||"&nbsp;").append("</td>")}
sb.append("</tr>")}
return sb.toString()}
this.changePage=function(page){if(isNaN(page)){do {page=prompt(this.changePagePrompt,this.currentPage);if(page==null){return}} while(isNaN(page))}
var maxPage=this.getMaxPage();page=parseInt(page,10);if(page<=0){page=1} else if(page>maxPage){page=maxPage}
this.currentPage=page;this.update()}
this.changePageSize=function(size){if(isNaN(size)){do {size=prompt(this.changePageSizePrompt,this.pageSize);if(size==null){return}
size=parseInt(size,10)} while(isNaN(size))}
if(size<=1){size=1}
this.pageSize=parseInt(size,10);var maxPage=this.getMaxPage();if(this.currentPage>maxPage){this.currentPage=maxPage}
this.update()}
this.buildNavigation=function(renderedColumnCount){var cursorPointer="cursor:"+(document.createTextRange?"hand":"pointer")+";";var buffer=new StringBuffer();var rowCount=this.getRowCount();var tableVar=this.getTableVar();buffer.append("<tr><td colspan=\""+renderedColumnCount+"\" class=\""+this.navigationClass+"\">");buffer.append(rowCount+" "+(rowCount==1?this.singleRowText:this.multipleRowText)+"&nbsp;&nbsp;&nbsp;");var linkClass=this.navigationLinkClass;var highlightedLinkClass=this.highlightedNavigationLinkClass;var table=this;function buildLink(text,onclick,statusMsg){var sb=new StringBuffer();sb.append("<span style=\"").append(cursorPointer).append("\" class=\"").append(linkClass).append("\" onclick=\"").append(onclick).append("\" ");sb.append("onMouseOver=\"this.className='"+highlightedLinkClass+"'");if(table.messagesOnStatusBar){sb.append(";window.status='").append(statusMsg).append("';return true;\" ")} else {sb.append("\" title=\"").append(statusMsg).append("\"")}
sb.append("onMouseOut=\"this.className='"+linkClass+"'");if(table.messagesOnStatusBar){sb.append(";window.status='").append(statusMsg).append("';return true; ")}
sb.append("\">").append(text).append("</span>");return sb.toString()}
if(rowCount>0){if(this.usePaging){var maxPage=this.getMaxPage();if(this.currentPage>1){buffer.append(buildLink(this.firstPageText,tableVar+".setPage(1);",this.firstPageDescription)+"&nbsp;");buffer.append(buildLink(this.previousPageText,tableVar+".setPage("+(this.currentPage-1)+");",this.previousPageDescription)+"&nbsp;")}
var current=buildLink(this.currentPage,tableVar+".changePage()",this.changePageDescription);var total;if(this.allowChangePageSize){total=buildLink(maxPage,tableVar+".changePageSize()",this.changePageSizeDescription)} else {total=maxPage}
buffer.append("&nbsp;"+this.pageText.replace("${current}",current).replace("${total}",total)+"&nbsp;");if(this.currentPage<maxPage){buffer.append(buildLink(this.nextPageText,tableVar+".setPage("+(this.currentPage+1)+");",this.nextPageDescription)+"&nbsp;");buffer.append(buildLink(this.lastPageText,tableVar+".setPage("+maxPage+");",this.lastPageDescription)+"&nbsp;")}
if(this.allowChangePaging){buffer.append("&nbsp;&nbsp;"+buildLink(this.showAllText,tableVar+".setUsePaging(false);",this.showAllDescription))}} else {if(this.allowChangePaging){buffer.append(buildLink(this.usePagingText,tableVar+".setUsePaging(true);",this.usePagingDescription))}}
if(this.allowTopLink){buffer.append("&nbsp;").append(buildLink(this.topText,"var pos = self.location.href.indexOf('#');var loc = pos < 0 ? self.location.href : self.location.href.substring(0, pos); self.location.href = loc + '#tableTop"+this.id+"'",this.topDescription))}}
buffer.append("</td></tr>");return buffer.toString()}
var imgId=0;this.handleLabel=function(label,images){if(label.src){var id="img"+imgId;imgId++;if(isInstance(images,Map)){images.put(id,label)}
return "<img name='"+id+"' border='0'>"} else {return label}}
this.sort=function(row1,row2){var jst=row1.table;var column=jst.getColumnByIndex(jst.sortColumn);var type=column.type;var value1,values2;values1=row1.values[jst.sortColumn];values2=row2.values[jst.sortColumn];if(!isInstance(values1,Array)){values1=[values1]}
if(!isInstance(values2,Array)){values2=[values2]}
var prepare;switch(column.type){case JST_TYPE_NUMERIC:case JST_TYPE_CURRENCY:prepare=function(value){if(isNaN(value)){value=0}
return value}
break;case JST_TYPE_DATE:prepare=function(value){return value.valueOf()}
break;case JST_TYPE_BOOLEAN:prepare=function(value){return booleanValue(value)?1:0}
break;case JST_TYPE_STRING:default:prepare=function(value){return String(value).replace(/\<[^\>]*\>/g,"").toUpperCase()}
break}
var maxIndex=Math.max(values1.length,values2.length);var comp=0;for(var i=0;(comp==0)&&(i<maxIndex);i++){var var1=values1[i];if(var1==null){comp=-1}
var var2=values2[i];if(var2==null){comp=1}
if(comp==0){var1=prepare(var1);var2=prepare(var2);comp=(var1==var2)?0:(var1>var2)?1:-1}
if(comp!=0){comp*=(jst.ascSort?1:-1)}}
return comp}
this.buildHighlightingConstant=function(row,cell,text){return(row?"1":"0")+(cell?"1":"0")+(text?"1":"0")}
this.buildHighlightingParts=function(constant){if(isEmpty(constant)||(constant.length<3)){return [false,false,false]}
var ret=new Array(3);for(var i=0;i<3;i++){ret[i]=constant.charAt(i)=="1"}
return ret}
this.setColumnHeaderHighlightingParts=function(cell,text,update){this.columnHeaderHighlighting=this.buildHighlightingConstant(false,cell,text);if(update){this.update()}}
this.setRowHighlightingParts=function(row,cell,text,update){this.rowHighlighting=this.buildHighlightingConstant(row,cell,text);if(update){this.update()}}
this.getColumnHeaderHighlightingParts=function(){return this.buildHighlightingParts(this.columnHeaderHighlighting)}
this.getRowHighlightingParts=function(){return this.buildHighlightingParts(this.rowHighlighting)}
this.toString=function(){return "Table: Id = '"+this.id+"', Rows = "+this.getRowCount()+", Columns = "+this.columns.length}}
function changeRowsClass(tableId,rowId,subRowCount,className){for(var i=0;i<subRowCount;i++){getObject(tableId+"_"+rowId+"_"+i).className=className}}
function Column(header,type,width,align,valign,possibleValues){this.table=null;this.index=-1;this.header=header||"";this.type=type||JST_TYPE_STRING;this.width=width||"";this.align=align||JST_ALIGN_LEFT;this.valign=valign||JST_VALIGN_MIDDLE;this.possibleValues=possibleValues||null;this.propertyName=null;this.visible=true;this.sortable=true;this.editable=false;this.editControl=new EditControl();this.parser=null;this.encodingParser=null;this.validateFunction=null;this.cellFunction=null;this.getMaskFunction=null;this.cellTextClass=null;this.cellTextStyle=null;this.oddRowCellWithFunctionClass=null;this.evenRowCellWithFunctionClass=null;this.highlightedOddRowCellWithFunctionClass=null;this.highlightedEvenRowCellWithFunctionClass=null;this.headerTextClass=null;this.headerTextStyle=null;this.allowEmptyValue=false;this.cropRepeated=false;this.colspan=1;this.rowspan=1;
this.getParser=function(row){if(this.parser!=null&&isInstance(this.parser,Parser)){return this.parser}
var colValues=isInstance(this.possibleValues,Map)&&this.possibleValues.size()>0;var rowValues=false;try {rowValues=isInstance(row.possibleValues[this.index],Map)&&(row.possibleValues[this.index].size()>0)} catch(e){}
if(colValues||rowValues){var values=new Map();if(colValues){var entries=this.possibleValues.getEntries();for(var i=0;i<entries.length;i++){var entry=entries[i];values.put(entry.key,entry.value)}}
if(rowValues){var entries=row.possibleValues[this.index].getEntries();for(var i=0;i<entries.length;i++){var entry=entries[i];values.put(entry.key,entry.value)}}
return new MapParser(values,true)}
switch(this.type){case JST_TYPE_STRING:return this.table.stringParser;case JST_TYPE_NUMERIC:return this.table.numberParser;case JST_TYPE_CURRENCY:return this.table.currencyParser;case JST_TYPE_DATE:return this.table.dateParser;case JST_TYPE_BOOLEAN:return this.table.booleanParser;default:return this.table.stringParser}}
this.getEncodingParser=function(){if(this.encodingParser!=null&&(this.encodingParser.parse)&&(this.encodingParser.format)){return this.encodingParser}
switch(this.type){case JST_TYPE_STRING:return this.table.stringEncodingParser;case JST_TYPE_NUMERIC:return this.table.numberEncodingParser;case JST_TYPE_CURRENCY:return this.table.currencyEncodingParser;case JST_TYPE_DATE:return this.table.dateEncodingParser;case JST_TYPE_BOOLEAN:return this.table.booleanEncodingParser;default:return this.table.stringEncodingParser}}
this.toString=function(){return "Column: Index = "+this.index+", Header = '"+this.header+"'"}}
function Row(id,values,possibleValues,titles){this.table=null;this.id=id;this.values=ensureArray(values);this.possibleValues=ensureArray(possibleValues);this.titles=ensureArray(titles);this.selectable=true;this.selected=false;this.editable=true;this.useCellFunction=true;
this.encode=function(columns,encodeRowId){encodeRowId=encodeRowId||true;var ret=encodeRowId?escapeCharacters(id,this.table.columnSeparator+this.table.valueSeparator):"";columns=columns||null;if(this.values.length>0){if(encodeRowId){ret+=this.table.columnSeparator}
var tempVals=[];for(var i=0;i<this.values.length;i++){var cellValue=this.values[i];if((columns!=null)&&(!inArray(i,columns))){continue}
var column=this.table.getColumnByIndex(i);var encodingParser=column.getEncodingParser();if(!isInstance(cellValue,Array)){cellValue=[cellValue]}
values=[];for(var j=0;j<cellValue.length;j++){var value=cellValue[j];if(value==null){values[j]=""} else {var formattedValue=encodingParser.format(value,this,column);values[j]=escapeCharacters(formattedValue,this.table.valueSeparator,false)}}
cellValue=values.join(this.table.valueSeparator);cellValue=escapeCharacters(cellValue,this.table.columnSeparator,true);tempVals[tempVals.length]=cellValue}
ret+=tempVals.join(this.table.columnSeparator)}
return ret}
this.toString=function(){return "Row: Id = '"+this.id+"', Values = "+this.values}}
function EditControl(type,attributes,multiLine,name){this.type=type||JST_CONTROL_TEXT;this.attributes=attributes||"";this.multiLine=booleanValue(multiLine);this.name=null;
this.toString=function(){return "Edit Control: Type = '"+this.type+"'"}}
function JavaScripTableCellContainer(){this.cells=[];for(var i=0;i<arguments.length;i++){var arg=arguments[i];var cell;if(isInstance(arg,String)){cell={text:arg}} else {cell=arg}
this.cells[this.cells.length]=cell}
this.add=function(text,options){var cell=options||{}
cell.text=text;this.cells[this.cells.length]=cell}}
function ObjectRowMapper(){this.identifierName=null;this.propertyNames=[];this.className="Object";this.constructorParams=null;this.mapIdentifier=function(name){this.identifierName=name}
this.mapProperty=function(columnIndex,name){this.propertyNames[columnIndex]=name}
this.toObject=function(row){if(!isInstance(row,Row)){return null}
var className=this.className;if(isInstance(className,Function)){className=functionName(className)}
var object=invoke("new "+className,this.constructorParams);if(this.identifierName!=null){object[this.identifierName]=row.id}
for(var i=0;i<this.propertyNames.length;i++){try {object[this.propertyNames[i]]=row.values[i]} catch(exception){}}
return object}
this.toMap=function(row){if(!isInstance(row,Row)){return null}
return new ObjectMap(this.toObject(row))}
this.toRow=function(object){if(!object){return null}
var id=this.getIdentifier(object);var values=new Array(this.propertyNames.length);for(var i=0;i<this.propertyNames.length;i++){var name=this.propertyNames[i];if(name!=null){values[i]=this.getProperty(object,name)}}
return new Row(id,values)}
this.getProperty=function(object,name){try {if(isInstance(object,Row)){for(var i=0;i<this.propertyNames;i++){if(this.propertyNames[i]==name){return row.values[i]}}} else if(isInstance(object,Map)){return object.get(name)} else {return object[name]}} catch(exception){}
return null}
this.setProperty=function(object,name,value){try {if(isInstance(object,Row)){for(var i=0;i<this.propertyNames;i++){if(this.propertyNames[i]==name){row.values[i]=value;return}}} else if(isInstance(object,Map)){object.put(name,value)} else {object[name]=value}} catch(exception){}}
this.getIdentifier=function(object){try {if(isInstance(object,Row)){return row.id} else if(this.identifierName==null){return null} else {return this.getProperty(object,this.identifierName)}} catch(exception){}
return null}
this.setIdentifier=function(object,value){try {if(isInstance(object,Row)){row.id=value} else if(this.identifierName!=null){this.setProperty(object,this.identifierName,value)}} catch(exception){}}}