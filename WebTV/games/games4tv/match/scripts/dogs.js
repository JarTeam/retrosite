//MATCH.JS - Going to the Dogs

//modify this, depending on the needs of the game
var piecepath = "dogs/"; var ext = ".gif";
var rows = 6; var cols = 8; var w = 50; var h = 50;
var suits = 2; //number of pieces that can be matched - always multiple of 2, obviously
var ppsuit = 24; //number of pieces per suit - ppsuit * suits must equal places
var blank = new Image(w,h);
blank.src= piecepath + "blank" + ext;

var backpath = "back/";
var backnum = 48;
if (backnum > 1) {
	//var cardback = new Image(h,w);
	//cardback.src = piecepath + "cardback" + ext;
}
var back = new Array();
for (var r = 0; r < rows; r++) {
		back[r] = new Array();
		for (var c = 0; c < cols; c++) {
			if (backnum > 1) {
				back[r][c] = new Image(h,w);
				back[r][c].src = piecepath+ backpath + ((r * cols) + c + 1) + ext;
			}
			else back[r][c].src = blank.src;
		}
	}

var colors = new Array("b","t","r","g","m","c");
var bgpic = "dogsout.gif";

function Piece(piecenum) {
	this.num = piecenum;	
	//this.lite = liteface[cardnum];
	this.state = (piecenum % ppsuit) + 1;
	this.suit = Math.floor(piecenum/ppsuit);
	this.face = new Image(w,h);
	this.face.src = piecepath+this.state+ext;
	this.loc = "";
}

//above varies by game