//JEWELS.JS - Jewel Concentration

//modify this, depending on the needs of the game
var piecepath = "jewels/"; var ext = ".gif";
var rows = 6; var cols = 8; var w = 50; var h = 50;
var suits = 4; //number of pieces that can be matched - always multiple of 2, obviously
var ppsuit = 12; //number of pieces per suit - ppsuit * suits must equal places
var blank = new Image(w,h);
blank.src= piecepath + "blank" + ext;
var cardback = new Image(h,w);
cardback.src = piecepath + "cardback" + ext;

var back = new Array();
for (var r = 0; r < rows; r++) {
	back[r] = new Array();
	for (var c = 0; c < cols; c++) {
	back[r][c] = cardback;
	}
}

var colors = new Array("b","t","r","g","m","c");
var bgpic = "chest.jpg";
//above varies by game

function Piece(piecenum) {
	this.num = piecenum;	
	this.state = (piecenum % ppsuit);
	this.suit = Math.floor(piecenum/ppsuit);
	this.face = new Image(w,h);
	this.face.src = piecepath+this.state+ext;
	this.loc = "";
}