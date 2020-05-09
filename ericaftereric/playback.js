console.log('script kiddie has been in here\nhttps://wikipedia.org/wiki/Script_kiddie')
var audio = document.getElementById("audio");
var tracks = {
    list: ["fileslol/acnh.mp3", "fileslol/accf.mp3", "fileslol/ac.mp3", "fileslol/acnl.mp3"], 
    index: 0,
    next: function() {
        if (this.index == this.list.length - 1) this.index = 0;
        else {
            this.index += 1;
        }
},
play: function() {
    return this.list[this.index];
}
}
      
audio.onended = function() {
    tracks.next();
    audio.src = tracks.play();
    audio.load();
    audio.play();
}

audio.src = tracks.play();