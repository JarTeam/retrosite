function doBoard(){
var myLoc = document.location;
myLoc = myLoc + "";
var loc2 = "http://www.deepdish.com/cgi-bin/polbb-s.pl?go=headers"

document.write('<html><head><title>Untitled Document</title>');
document.write('<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">');
document.write('</head>');
document.write('<frameset cols="55%,45%" rows="*" border="10" framespacing="1" frameborder="yes"> <frame src= ');
document.write(myLoc);
document.write('   marginwidth="0" marginheight="0" name="guide"  border="2" scrolling="auto"  frameborder="yes">');
document.write('<frame src= ');
document.write(loc2 );
document.write(' frameborder="yes" border="2" scrolling="AUTO" marginwidth="0" marginheight="0" name="board">');
document.write('</frameset><noframes><body bgcolor="#FFFFFF">');
document.write('</body></noframes></html>');
document.close();
}
function hideBoard(){
var myWin = parent.document.location.href;
}
