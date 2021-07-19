function initThumbdisplay(){ //v1.0 SHAUN COLLINS
var imageLength = (document.images.length);
var tempsrc = "images/a-s002.jpg";  // use for debugging only
var imageborder = 2;

	for(var i = 0; i < imageLength; i++) {
	
		if(document.images[i].name){
		var thisImage = document.images[i].name;
		document.images[i].border=imageborder;
		
			if(thisImage.indexOf('thumb') > -1){
				var docImage = 'document.' + thisImage;
				var docImageNameLength = thisImage.length;
				var docImageName = thisImage.substring(5,docImageNameLength);
				var docImgSrc = "images/" + docImageName + "a.jpg";
				
				MM_swapImage(docImage,docImage,docImgSrc,'#972883660766');
				}
		}
	}	
}
//alert('Loading temporary thumbnails \n\n These will be replaced when we receive the proper images. \n\n Thanks Shaun');
initThumbdisplay();
