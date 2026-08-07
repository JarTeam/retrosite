//gameboard.js - this script writes out the game board for HTML Reversi

var r = 0;
var c = 0;
document.write("<TABLE border=0 width=320 height=320 cellpadding=0 cellspacing=0  bgcolor=#003300>");
for (r=0; r < 8; r++) {
	document.write("<TR>");
	for (c=0; c<8; c++) {
		document.write("<TD width=40 height=40 background='pieces/bg.gif'><a href='javascript:click(" + r + "," + c + ")//'>");
		document.write("<IMG id = 't" + r + ":" + c + "' name='t" + r + ":" + c + "' SRC='"+blank.src+"' border=0 width=40 height=40>");
	document.write("</a></TD>");
	}
	document.write("</TR>");
}
document.write("</TABLE>");