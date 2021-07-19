function initThumbdisplay(){
var imageLength = (document.images.length);
var tempsrc = "images/a-s002.jpg";


	for(var i = 0; i < imageLength; i++) {
	
		if(document.images[i].name){
		var thisImage = document.images[i].name;
		var docImage = 'document.' + thisImage;
		MM_swapImage(docImage,docImage,tempsrc,'#972883660766');
		}
	}
	
	
}
