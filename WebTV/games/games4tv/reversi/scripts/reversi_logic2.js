//REVERSI_LOGIC.JS - Copyright 2003, Iacta LLC & Laura Buddine; All rights reserved.

var lang = "en";
//animation variables
var counter = 0;
var squeezenum = 8;
var numsqueezes = 5;
var animtime = 1;
var turnTimer = 400;
var opponentTimer = 1000;
var maxsize = 40 - squeezenum;

var numrows=8; var numcells = 8;
var gameover = false;
var reds = 0; var blacks = 0; var moves = 64 - (reds + blacks);
var contigpasses = 0; var turn = 1; var oneplayer = true; var ok = true;
var board = grid(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,-1,0,0,0,0,0,0,-1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);

var north = new Array(-1,0); var south = new Array(1,0); var east = new Array(0,1); var west = new Array(0,-1); var nwest = new Array(-1,-1);var neast = new Array(-1,1);var swest = new Array(1,-1);var seast = new Array(1,1);
var factor = new Array(north,south,east,west,nwest,neast,swest,seast); 
var numero = new Array();for (var i = 0; i < 10; i++) {numero[i] = new Image(16,19); numero[i].src = "dnumbers/"+i+".gif";} numero[10] = new Image(16,19); numero[10].src = "dnumbers/black.gif";
var wpiece = new Image(); wpiece.src = "pieces/white1.gif"; 
var bpiece = new Image(); bpiece.src = "pieces/black1.gif";
var black2white = new Image(); black2white.src = "pieces/black2white.gif";
var white2black = new Image(); white2black.src = "pieces/white2black.gif";
var blank = new Image(); blank.src = "pieces/blank.gif";
var players = new Array(); players[0] = new Image(100,30); players[0].src = "lang/"+lang+"/1player.gif"; players[1] = new Image(100,30); players[1].src = "lang/"+lang+"/2player.gif"; 


var spot = new Array(); spot[0] = new Image(40,40); spot[0].src = wpiece.src; spot[1] = new Image(40,40); spot[1].src = bpiece.src;
var flipper = new Array(); flipper[1] = new Image(40,40); flipper[1].src = white2black.src; flipper[0] = new Image(40,40); flipper[0].src = black2white .src;

var moveset; var flipset = new Array();
var pointer = new Array(); pointer[0] = new Image(15,19); pointer[0].src = "dress/pointblank.gif"; pointer[1] = new Image(15,19); pointer[1].src = "dress/pointer.gif";

function grid(arr) {temparr = new Array();for (var i = 0; i < 8; i++) {temparr[i] = new Array();for (var j = 0; j < 8; j++) {temparr[i][j] = grid.arguments[8 * i + j];}}return temparr;}
function point(r,c) {this.row = r; this.col = c;}

function showscore(thenum,prefix) {var tempscore = "" + thenum; var templength = tempscore.length; document.images[prefix+"1"].src = numero[parseInt(tempscore.charAt(templength-1))].src; if (templength > 1) document.images[prefix+"10"].src = numero[parseInt(tempscore.charAt(templength-2))].src; else document.images[prefix+"10"].src = numero[10].src;}
function countscore() {reds = 0; blacks = 0; for (var i = 0; i < 8; i++) {for (var j = 0; j < 8; j++) {if (board[i][j] > 0) reds += 1; if (board[i][j] < 0) blacks +=1;}} showscore(reds, "w"); showscore(blacks, "g"); if (reds+blacks > 63 || contigpasses > 1) {if (reds > blacks) talk(6); else if (blacks > reds) talk(7); else  talk(8); gameover = true;} if (reds < 1 || blacks < 1) {if (reds > blacks) talk(6); else if (blacks > reds) talk(7); gameover = true;} if (!gameover) talk((turn > 0) ? 1 : 2);}
function turnswitch() {if (contigpasses > 1) gameover = true; flipset.length = 0; turn = turn * -1; countscore(); if (!gameover) { getMoves(); document.images["wturn"].src= pointer[(turn > 0)?1:0].src;document.images["bturn"].src= pointer[(turn < 0)?1:0].src; if (oneplayer && turn < 1) setTimeout("opponent()",opponentTimer); else  setTimeout("ok = true;",500);}}

function display() {for (var i = 0; i < 8; i++) {for (var j = 0; j < 8; j++) {if (board[i][j] > 0) document.images["t" + i + ":" + j].src=wpiece.src;if (board[i][j] < 0) document.images["t" + i + ":" + j].src=bpiece.src;}}}
function setup() {display(); countscore(); getMoves(); talk((turn > 0) ? 1 : 2); playerswitch.focus();}
function testit(r,c,rf,cf) {offset = 0;if (c+(2*cf) > -1 && c+(2*cf) < 8 && r+(2*rf) > -1 && r+(2*rf) < 8 && board[r+rf][c+cf] == -turn) {for (var x = 2; x < 8; x++) {if ((r+(x*rf)) < 0 || (r+(x*rf)) > 7 ||(c+(x*cf)) < 0 ||(c+(x*cf)) > 7) break; if (board[r+(x*rf)][c+(x*cf)] == 0) break; if (board[r+(x*rf)][c+(x*cf)] == turn) {offset = x;break;}}}return offset;}
function testSpot(r,c) {var can = false; tarr = new Array(r,c); for (var i = 2; i < 10; i++) {tarr[i] = testit(r,c,factor[i-2][0],factor[i-2][1]); if (tarr[i] > 0) can = true;} if (can) return tarr; else return new Array(r, c, 0)}
function getMoves() {var possmoves = findPossibles();moveset = new Array(); for (var i = 0; i < possmoves.length; i++) {var temp = testSpot(possmoves[i].row, possmoves[i].col); if (temp.length > 3) moveset[moveset.length] = temp;}}
function findPossibles() {var temparray = new Array();for (var i = 0; i < 8; i++) {for (var j = 0; j < 8; j++) { var mayplay = false; if (board[i][j] == 0) {for (var k = 0; k < 8; k++) {
if (i+factor[k][0] > -1 && i+factor[k][0] < 8 && j+factor[k][1] > -1 && j+factor[k][1] < 8 &&  board[i + factor[k][0]][j + factor[k][1]] == -turn) {mayplay = true; break}}}if (mayplay) temparray[temparray.length] = new point(i,j);}} return temparray;}

function makeMove(r,c) {
	ok = false; if (moveset.length < 1) {contigpasses++; talk(4); setTimeout("turnswitch();",1000);}
	else {contigpasses = 0; var themove; var notlegal = true; for (var i = 0; i < moveset.length; i++) {if (moveset[i][0] == r && moveset[i][1] == c) {themove = moveset[i]; notlegal = false; break;}}
	if (notlegal) { var msgnum = (turn > 0) ? 1 : 2; talk(3); setTimeout("talk("+ msgnum+"); ok = true;",1000); return;} board[r][c] = turn; document.images["t" + r + ":" + c].src = (turn > 0)? wpiece.src : bpiece.src; //place the piece
	for (var k = 0; k < 8; k++) {for (var i = 1; i < themove[k+2]; i++) {board[r + i*factor[k][0]][c + i*factor[k][1]] = turn; flipset[flipset.length] = (r+i*factor[k][0]) + ":" + (c+ i*factor[k][1]);}} if (flipset.length > 0) setTimeout("flip();",turnTimer);} 
}

//UI
function switchturns() {if ((blacks ==2 && reds == blacks) || (moveset.length < 1)) { turnswitch();} else {var msgnum = (turn > 0) ? 1 : 2; talk(5); setTimeout("talk("+ msgnum+")",1000);}}
function switchplayers() {if (oneplayer) {oneplayer = false; document.images["players"].src = players[1].src;talk2(10);} else {oneplayer = true; document.images["players"].src = players[0].src; if (turn < 1) setTimeout("opponent()",3000); talk2(9);}}

// OPPONENT
var corners = new Array(); corners[0] = new Array(0, 0, 0); corners[1] = new Array(0, 7, 0); corners[2] = new Array(7, 0, 0); corners[3] = new Array(7, 7, 0);
var keyspots = new Array(); keyspots[0] = new Array(0, 2, 0); keyspots[1] = new Array(0, 5, 0); keyspots[2] = new Array(2, 0, 0); keyspots[3] = new Array(5, 0, 0); keyspots[4] = new Array(7, 2, 0); keyspots[5] = new Array(7, 5, 0); keyspots[6] = new Array(2, 7, 0); keyspots[7] = new Array(5, 7, 0); keyspots[8] = new Array(2, 2, 0); keyspots[9] = new Array(2, 5, 0); keyspots[10] = new Array(5, 2, 0); keyspots[11] = new Array(5, 5, 0);
var badmoves = new Array();badmoves[0] = new Array(0, 1, 0);badmoves[1] = new Array(0, 6, 0);badmoves[2] = new Array(1, 0, 0);badmoves[3] = new Array(1, 7, 0);badmoves[4] = new Array(1, 1, 0);badmoves[5] = new Array(1, 6, 0);badmoves[6] = new Array(6, 0, 0);badmoves[7] = new Array(7, 1, 0);badmoves[8] = new Array(7, 6, 0);badmoves[9] = new Array(6, 7, 0);badmoves[10] = new Array(6, 1, 0);badmoves[11] = new Array(6, 6, 0);
function iscorner(moveobj) {var temp = false; for (var j = 0; j < corners.length; j++) {if (moveobj[0] == corners[j][0] && moveobj[1] == corners[j][1]) {temp = true; break;}} return temp;}
function iskey(moveobj) {var temp = false; for (var j = 0; j < keyspots.length; j++) {if (moveobj[0] == keyspots[j][0] && moveobj[1] == keyspots[j][1]) {temp = true; break;}} return temp;}
function isbad(moveobj) {var temp = false; for (var j = 0; j < badmoves.length; j++) {if (moveobj[0] == badmoves[j][0] && moveobj[1] == badmoves[j][1]) {temp = true;break;}} return temp;}
function opponent() {if (moveset.length > 0) {var ther; var thec; var cornermoves = new Array(); var goodmoves = new Array(); var okmoves = new Array(); for (var i = 0; i < moveset.length; i++) {if (iscorner(moveset[i])) cornermoves[cornermoves.length] = moveset[i]; else if (iskey(moveset[i])) goodmoves[goodmoves.length] = moveset[i]; else if (!isbad(moveset[i])) okmoves[okmoves.length] = moveset[i];} if (cornermoves.length > 0) {ther = cornermoves[0][0];thec = cornermoves[0][1];}else if (goodmoves.length > 0) {ther = goodmoves[0][0];thec = goodmoves[0][1];} else if (okmoves.length > 0) {ther = okmoves[0][0];thec = okmoves[0][1];} else {ther = moveset[0][0];thec = moveset[0][1];} makeMove(ther,thec);} else {contigpasses++; turnswitch();}}

//ANIMATION
function flip() {
	spo = (turn > 0) ? 0 : 1;
	for (var i = 0; i < flipset.length; i++) {
		document.images['t'+flipset[i]].src = flipper[spo].src; 
	}
	setTimeout("restore()",1100);
}

function restore() {
	spo = (turn > 0) ? 0 : 1;
	for (var i = 0; i < flipset.length; i++) {
		document.images['t'+flipset[i]].src = spot[spo].src; 
	}
	setTimeout("turnswitch()",500);
}


//USER EVENT
function click(r,c) {if (!gameover && ok) makeMove(r,c);}

