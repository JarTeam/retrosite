//CARS.JS - Car Concentration

//modify this, depending on the needs of the game
var piecepath = "cars/"; var ext = ".gif";
var rows = 8; var cols = 7; var w = 70; var h = 35;
var suits = 4; //number of pieces that can be matched - always multiple of 2, obviously
var ppsuit = 14; //number of pieces per suit - ppsuit * suits must equal places
var blank = new Image(w,h);
blank.src= piecepath + "blank" + ext;
var backpath = "cars/";
var backnum = 1;
var cardback = new Image(h,w);
cardback.src = piecepath + "cardback" + ext;

var back = new Array();
for (var r = 0; r < rows; r++) {
		back[r] = new Array();
		for (var c = 0; c < cols; c++) {
			back[r][c] = new Image(h,w);
			if (backnum > 1) {
				
				back[r][c].src = piecepath+ backpath + ((r * cols) + c + 1) + ext;
			}
			else back[r][c].src = cardback.src;
		}
	}

var colors = new Array("b","t","r","g","m","c");
var bgpic = "paperbg.gif";
//above varies by game

function Piece(piecenum) {
	this.num = piecenum;	
	this.state = (piecenum % ppsuit);
	this.suit = Math.floor(piecenum/ppsuit);
	this.face = new Image(w,h);
	this.face.src = piecepath+this.state+ext;
	this.loc = "";
}