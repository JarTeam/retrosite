<SCRIPT LANGUAGE="JavaScript1.2">
<!--

var IE4 = (document.all) ? true : false;
var NS4 = (document.layers) ? true : false;

var Gwidth = 0;
var Gsrc = "";
var Gspeed = 0;
var Gtimer = "";
var firstPage = "";
var secondPage = "";
var upperPage = "";
var lowerPage = "";

// find position of scroller, upper left and lower right corner

bnrLft=document.images.pht.x;
bnrTop=document.images.pht.y;
bnrRit=document.images.phb.x;
bnrBot=document.images.phb.y;
bnrWid=bnrRit-bnrLft;
bnrHit=bnrBot-bnrTop;

function rotatePages() {
        if (upperPage == firstPage) {
        upperPage = secondPage;
        lowerPage =firstPage;
        return true;
        }
        upperPage=firstPage;
        lowerPage=secondPage;
        return true;
}

function slidePages() {
        firstPage.moveBy(0,-1);
        secondPage.moveBy(0,-1);
        if (lowerPage.top == 0){
           upperPage.moveBy(0,upperPage.clip.height*2);
           rotatePages();
         }
}

function scrollPages() {
  Gtimer = setInterval(slidePages,Gspeed);
}

function startScroller() {
  secondPage.visibility="show";
  firstPage.visibility="show";
  delay = setTimeout(scrollPages,1000);
}

function stopScrolling() {
  clearInterval(Gtimer);
}

function launchScroller() {
  secondPage.top = secondPage.clip.height;
  startScroller();
}


function makeSecondPage() {
  secondPage = new Layer(Gwidth,canvas);
  secondPage.top=0;
  secondPage.clip.width = Gwidth;
  secondPage.src=Gsrc;
  secondPage.onMouseOver = stopScrolling;
  secondPage.onMouseOut = scrollPages;
  lowerPage = secondPage;
  secondPage.onLoad=launchScroller;
}

function makeFirstPage() {
  firstPage = new Layer(Gwidth,canvas);
  firstPage.left = 0;
  firstPage.top = 0;
  firstPage.src = Gsrc;
  upperPage = firstPage;
  firstPage.onload = makeSecondPage;
  firstPage.onMouseOver = stopScrolling;
  firstPage.onMouseOut = scrollPages;
}

function scrollBox(left, top, width, height, src, speed) {
  Gwidth = width;
  Gsrc = src;
  Gwidth = width;
  Gspeed = speed;
  canvas = new Layer(width);
  canvas.left = left;
  canvas.top = top;
  canvas.clip.width = width;
  canvas.clip.height= height;
  canvas.visibility = "show";
  makeFirstPage();
  canvas.document.parent = canvas;
}

function redo() { location.reload(); }

function makeScrollBox() {
  setTimeout("window.onresize = redo", 1000);
  if (IE4) return;
  scrollBox(bnrLft, bnrTop, bnrWid, bnrHit,'jscolumns3.html',50);
}

window.onload = makeScrollBox;

// -->
</script>