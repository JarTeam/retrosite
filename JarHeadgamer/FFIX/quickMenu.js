//	V1.0 Shaun Collins - url is passed as xxx.html#url where url is target frame
// 	If no target is specified, then forwards on with no target
//	If there is an underscore "_" then use default frame targets ie. "self,top,parent".

function quickMenu(url){	
var goURL = url;
var target = "";
thePound = goURL.indexOf('#');
theUnderscore = goURL.indexOf('_');

	if(goURL.indexOf('#') > -1) {
		useURL = (goURL.substr(0,thePound));
		target = (goURL.substr(thePound + 1,goURL.length));
		
			if(theUnderscore > -1){	// if there is an underscore then use target default names else use frame names
				target = (goURL.substr(theUnderscore + 1,goURL.length));
				eval(target + ".location.href='" + useURL + "';");
			}else{
				if(eval("parent.frames['" + target + "']")){	// make sure that frame name is actually loaded
				eval("parent.frames['" + target + "']" + ".location.href='" + useURL + "';");
				}
			}
		}else{	// if no target info then default to specified url.
		document.location.href = goURL;
	}	
}


