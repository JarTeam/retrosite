function DynLayer(id,nestref,frame) {
	if (!is.ns5 && !DynLayer.set && !frame) DynLayerInit()
	this.frame = frame || self
	if (is.ns) {
		if (is.ns4) {
			if (!frame) {
				if (!nestref) var nestref = DynLayer.nestRefArray[id]
				if (!DynLayerTest(id,nestref)) return
				this.css = (nestref)? eval("document."+nestref+".document."+id) : document.layers[id]
			}
			else this.css = (nestref)? eval("frame.document."+nestref+".document."+id) : frame.document.layers[id]
			this.elm = this.event = this.css
			this.doc = this.css.document
		}
		else if (is.ns5) {
			this.elm = document.getElementById(id)
			this.css = this.elm.style
			this.doc = document
		}
		this.x = this.css.left
		this.y = this.css.top
		this.w = this.css.clip.width
		this.h = this.css.clip.height
	}
	else if (is.ie) {
		this.elm = this.event = this.frame.document.all[id]
		this.css = this.frame.document.all[id].style
		this.doc = document
		this.x = this.elm.offsetLeft
		this.y = this.elm.offsetTop
		this.w = (is.ie4)? this.css.pixelWidth : this.elm.offsetWidth
		this.h = (is.ie4)? this.css.pixelHeight : this.elm.offsetHeight
	}
	this.id = id
	this.nestref = nestref
	this.obj = id + "DynLayer"
	eval(this.obj + "=this")
}
function DynLayerMoveTo(x,y) {
	if (x!=null) {
		this.x = x
		if (is.ns) this.css.left = this.x
		else this.css.pixelLeft = this.x
	}
	if (y!=null) {
		this.y = y
		if (is.ns) this.css.top = this.y
		else this.css.pixelTop = this.y
	}
}
function DynLayerMoveBy(x,y) {
	this.moveTo(this.x+x,this.y+y)
}
function DynLayerShow() {
	this.css.visibility = (is.ns4)? "show" : "visible"
}
function DynLayerHide() {
	this.css.visibility = (is.ns4)? "hide" : "hidden"
}
DynLayer.prototype.moveTo = DynLayerMoveTo
DynLayer.prototype.moveBy = DynLayerMoveBy
DynLayer.prototype.show = DynLayerShow
DynLayer.prototype.hide = DynLayerHide
DynLayerTest = new Function('return true')

// DynLayerInit Function
function DynLayerInit(nestref) {
	if (!DynLayer.set) DynLayer.set = true
	if (is.ns) {
		if (nestref) ref = eval('document.'+nestref+'.document')
		else {nestref = ''; ref = document;}
		for (var i=0; i<ref.layers.length; i++) {
			var divname = ref.layers[i].name
			DynLayer.nestRefArray[divname] = nestref
			var index = divname.indexOf("Div")
			if (index > 0) {
				eval(divname.substr(0,index)+' = new DynLayer("'+divname+'","'+nestref+'")')
			}
			if (ref.layers[i].document.layers.length > 0) {
				DynLayer.refArray[DynLayer.refArray.length] = (nestref=='')? ref.layers[i].name : nestref+'.document.'+ref.layers[i].name
			}
		}
		if (DynLayer.refArray.i < DynLayer.refArray.length) {
			DynLayerInit(DynLayer.refArray[DynLayer.refArray.i++])
		}
	}
	else if (is.ie) {
		for (var i=0; i<document.all.tags("DIV").length; i++) {
			var divname = document.all.tags("DIV")[i].id
			var index = divname.indexOf("Div")
			if (index > 0) {
				eval(divname.substr(0,index)+' = new DynLayer("'+divname+'")')
			}
		}
	}
	return true
}
DynLayer.nestRefArray = new Array()
DynLayer.refArray = new Array()
DynLayer.refArray.i = 0
DynLayer.set = false

// Slide Methods
function DynLayerSlideTo(endx,endy,inc,speed,fn) {
	if (endx==null) endx = this.x
	if (endy==null) endy = this.y
	var distx = endx-this.x
	var disty = endy-this.y
	this.slideStart(endx,endy,distx,disty,inc,speed,fn)
}
function DynLayerSlideBy(distx,disty,inc,speed,fn) {
	var endx = this.x + distx
	var endy = this.y + disty
	this.slideStart(endx,endy,distx,disty,inc,speed,fn)
}
function DynLayerSlideStart(endx,endy,distx,disty,inc,speed,fn) {
	if (this.slideActive) return
	if (!inc) inc = 10
	if (!speed) speed = 20
	var num = Math.sqrt(Math.pow(distx,2) + Math.pow(disty,2))/inc
	if (num==0) return
	var dx = distx/num
	var dy = disty/num
	if (!fn) fn = null
	this.slideActive = true
	this.slide(dx,dy,endx,endy,num,1,speed,fn)
}
function DynLayerSlide(dx,dy,endx,endy,num,i,speed,fn) {
	if (!this.slideActive) return
	if (i++ < num) {
		this.moveBy(dx,dy)
		this.onSlide()
		if (this.slideActive) setTimeout(this.obj+".slide("+dx+","+dy+","+endx+","+endy+","+num+","+i+","+speed+",\""+fn+"\")",speed)
		else this.onSlideEnd()
	}
	else {
		this.slideActive = false
		this.moveTo(endx,endy)
		this.onSlide()
		this.onSlideEnd()
		eval(fn)
	}
}
function DynLayerSlideInit() {}
DynLayer.prototype.slideInit = DynLayerSlideInit
DynLayer.prototype.slideTo = DynLayerSlideTo
DynLayer.prototype.slideBy = DynLayerSlideBy
DynLayer.prototype.slideStart = DynLayerSlideStart
DynLayer.prototype.slide = DynLayerSlide
DynLayer.prototype.onSlide = new Function()
DynLayer.prototype.onSlideEnd = new Function()

// Clip Methods
function DynLayerClipInit(clipTop,clipRight,clipBottom,clipLeft) {
	if (is.ie) {
		if (arguments.length==4) this.clipTo(clipTop,clipRight,clipBottom,clipLeft)
		else if (is.ie4) this.clipTo(0,this.css.pixelWidth,this.css.pixelHeight,0)
	}
}
function DynLayerClipTo(t,r,b,l) {
	if (t==null) t = this.clipValues('t')
	if (r==null) r = this.clipValues('r')
	if (b==null) b = this.clipValues('b')
	if (l==null) l = this.clipValues('l')
	if (is.ns) {
		this.css.clip.top = t
		this.css.clip.right = r
		this.css.clip.bottom = b
		this.css.clip.left = l
	}
	else if (is.ie) this.css.clip = "rect("+t+"px "+r+"px "+b+"px "+l+"px)"
}
function DynLayerClipBy(t,r,b,l) {
	this.clipTo(this.clipValues('t')+t,this.clipValues('r')+r,this.clipValues('b')+b,this.clipValues('l')+l)
}
function DynLayerClipValues(which) {
	if (is.ie) var clipv = this.css.clip.split("rect(")[1].split(")")[0].split("px")
	if (which=="t") return (is.ns)? this.css.clip.top : Number(clipv[0])
	if (which=="r") return (is.ns)? this.css.clip.right : Number(clipv[1])
	if (which=="b") return (is.ns)? this.css.clip.bottom : Number(clipv[2])
	if (which=="l") return (is.ns)? this.css.clip.left : Number(clipv[3])
}
DynLayer.prototype.clipInit = DynLayerClipInit
DynLayer.prototype.clipTo = DynLayerClipTo
DynLayer.prototype.clipBy = DynLayerClipBy
DynLayer.prototype.clipValues = DynLayerClipValues

// Write Method
function DynLayerWrite(html) {
	if (is.ns) {
		this.doc.open()
		this.doc.write(html)
		this.doc.close()
	}
	else if (is.ie) {
		this.event.innerHTML = html
	}
}
DynLayer.prototype.write = DynLayerWrite

// BrowserCheck Object
function BrowserCheck() {
	var b = navigator.appName
	if (b=="Netscape") this.b = "ns"
	else if (b=="Microsoft Internet Explorer") this.b = "ie"
	else this.b = b
	this.version = navigator.appVersion
	this.v = parseInt(this.version)
	this.ns = (this.b=="ns" && this.v>=4)
	this.ns4 = (this.b=="ns" && this.v==4)
	this.ns5 = (this.b=="ns" && this.v==5)
	this.ie = (this.b=="ie" && this.v>=4)
	this.ie4 = (this.version.indexOf('MSIE 4')>0)
	this.ie5 = (this.version.indexOf('MSIE 5')>0)
	this.min = (this.ns||this.ie)
}
is = new BrowserCheck()

// CSS Function
function css(id,left,top,width,height,color,vis,z,other) {
	if (id=="START") return '<STYLE TYPE="text/css">\n'
	else if (id=="END") return '</STYLE>'
	var str = (left!=null && top!=null)? '#'+id+' {position:absolute; left:'+left+'px; top:'+top+'px;' : '#'+id+' {position:relative;'
	if (arguments.length>=4 && width!=null) str += ' width:'+width+'px;'
	if (arguments.length>=5 && height!=null) {
		str += ' height:'+height+'px;'
		if (arguments.length<9 || other.indexOf('clip')==-1) str += ' clip:rect(0px '+width+'px '+height+'px 0px);'
	}
	if (arguments.length>=6 && color!=null) str += (is.ns)? ' layer-background-color:'+color+';' : ' background-color:'+color+';'
	if (arguments.length>=7 && vis!=null) str += ' visibility:'+vis+';'
	if (arguments.length>=8 && z!=null) str += ' z-index:'+z+';'
	if (arguments.length==9 && other!=null) str += ' '+other
	str += '}\n'
	return str
}
function writeCSS(str,showAlert) {
	str = css('START')+str+css('END')
	document.write(str)
	if (showAlert) alert(str)
}

</script>
<script language="JavaScript">

ns4 = (document.layers)? true:false
ie4 = (document.all)? true:false

onload = init
function init() {
        mylayer = new DynLayer("OverlayImage")
        
        if (ns4) block = document.OverlayImage
        if (ie4) block = OverlayImage.style
        block.xpos = parseInt(block.left)
        block.ypos = parseInt(block.top)

        mylayer.elm.onmousedown = layerDownHandler
        mylayer.elm.onmousemove = layerMoveHandler
        mylayer.elm.onmouseup = layerUpHandler
        if (is.ns) mylayer.elm.captureEvents(Event.MOUSEDOWN | Event.MOUSEUP | Event.MOUSEMOVE)
}

function moveTo(obj,x,y) {
        obj.xpos = x
        obj.left = obj.xpos
        obj.ypos = y
        obj.top = obj.ypos
}

function layerDownHandler(e) {
        var x = (is.ns)? e.layerX:event.offsetX
        var y = (is.ns)? e.layerY:event.offsetY
        document.myform.downx.value = x
        document.myform.downy.value = y
        return false
}

function layerMoveHandler(e) {
        var x = (is.ns)? e.layerX:event.offsetX
        var y = (is.ns)? e.layerY:event.offsetY
        document.myform.movex.value = x
        document.myform.movey.value = y
        
        moveTo(block,x,y);
        return false
}

function layerUpHandler(e) {
        var x = (is.ns)? e.layerX:event.offsetX
        var y = (is.ns)? e.layerY:event.offsetY
        document.myform.upx.value = x
        document.myform.upy.value = y
        return false
}


function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}


function MM_preloadImages() { //v2.0
  if (document.images) {
    var imgFiles = MM_preloadImages.arguments;
    if (document.preloadArray==null) document.preloadArray = new Array();
    var i = document.preloadArray.length;
    with (document) for (var j=0; j<imgFiles.length; j++) if (imgFiles[j].charAt(0)!="#"){
      preloadArray[i] = new Image;
      preloadArray[i++].src = imgFiles[j];
  } }
}

function MM_swapImgRestore() { //v2.0
  if (document.MM_swapImgData != null)
    for (var i=0; i<(document.MM_swapImgData.length-1); i+=2)
      document.MM_swapImgData[i].src = document.MM_swapImgData[i+1];
}

function MM_swapImage() { //v2.0
  var i,j=0,objStr,obj,swapArray=new Array,oldArray=document.MM_swapImgData;
  for (i=0; i < (MM_swapImage.arguments.length-2); i+=3) {
    objStr = MM_swapImage.arguments[(navigator.appName == 'Netscape')?i:i+1];
    if ((objStr.indexOf('document.layers[')==0 && document.layers==null) ||
        (objStr.indexOf('document.all[')   ==0 && document.all   ==null))
      objStr = 'document'+objStr.substring(objStr.lastIndexOf('.'),objStr.length);
    obj = eval(objStr);
    if (obj != null) {
      swapArray[j++] = obj;
      swapArray[j++] = (oldArray==null || oldArray[j-1]!=obj)?obj.src:oldArray[j];
      obj.src = MM_swapImage.arguments[i+2];
  } }
  document.MM_swapImgData = swapArray; //used for restore
}

function MM_showHideLayers() { //v2.0
  var i, visStr, args, theObj;
  args = MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) { //with arg triples (objNS,objIE,visStr)
    visStr   = args[i+2];
    if (navigator.appName == 'Netscape' && document.layers != null) {
      theObj = eval(args[i]);
      if (theObj) theObj.visibility = visStr;
    } else if (document.all != null) { //IE
      if (visStr == 'show') visStr = 'visible'; //convert vals
      if (visStr == 'hide') visStr = 'hidden';
      theObj = eval(args[i+1]);
      if (theObj) theObj.style.visibility = visStr;
  } }
} 
