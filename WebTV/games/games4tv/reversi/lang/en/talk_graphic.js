//reversi/scripts/talk_graphic.js - this script contains the functions and routines for game messages in graphics
//this method will work for all browsers and languages, but requires language-specific graphic messages

var msg = new Array();
msg[0] = new Image(70,200);
msg[0].src = "lang/"+lang+"/blank.gif"; //clear talker
msg[1] = new Image(70,200);
msg[1].src = "lang/"+lang+"/wturn.gif"; //white turn
msg[2] = new Image(70,200);
msg[2].src = "lang/"+lang+"/bturn.gif"; //black/green turn
msg[3] = new Image(70,200);
msg[3].src = "lang/"+lang+"/nopiece.gif"; //not valid move turn
msg[4] = new Image(70,200);
msg[4].src = "lang/"+lang+"/nomoves.gif"; //no moves on this turn
msg[5] = new Image(70,200);
msg[5].src = "lang/"+lang+"/mustplay.gif"; //must play on this turn
msg[6] = new Image(70,200);
msg[6].src = "lang/"+lang+"/wwin.gif"; //white win
msg[7] = new Image(70,200);
msg[7].src = "lang/"+lang+"/bwin.gif"; //black/green win
msg[8] = new Image(70,200);
msg[8].src = "lang/"+lang+"/tie.gif"; //black/green win
msg[9] = new Image(70,200);
msg[9].src = "lang/"+lang+"/oneplyr.gif"; //black/green win
msg[10] = new Image(70,200);
msg[10].src ="lang/"+lang+"/twoplyr.gif"; //black/green win

function talk(num) {
	document.images["talk"].src = msg[num].src;
	//talker.innerHTML= msgs[language][num];
}

function talk2(num) {
	//document.images["talk"].src = msg[num].src;
		var msgnum = (turn > 0) ? 1 : 2;
		talk(num);
		setTimeout("talk("+ msgnum+")",2000);
}


document.write("<IMG name='talk' src='controls/blank.gif' width=70 height=200>");
