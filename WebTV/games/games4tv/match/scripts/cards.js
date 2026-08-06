//CARDS.JS - Card Concentration

//modify this, depending on the needs of the game
var piecepath = "cards/"; var ext = ".gif";
var rows = 4; var cols = 13; var w = 41; var h = 56;
var suits = 4; //number of pieces that can be matched - always multiple of 2, obviously
var ppsuit = 13; //number of pieces per suit - ppsuit * suits must equal places
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
var bgpic = "blank.gif";
//above varies by game

function Piece(piecenum) {
	this.num = piecenum;	
	//this.lite = liteface[cardnum];
	this.state = (piecenum % ppsuit) + 1;
	this.suit = Math.floor(piecenum/ppsuit);
	this.face = new Image(w,h);
	this.face.src = piecepath+this.num+ext;
	this.loc = "";
}