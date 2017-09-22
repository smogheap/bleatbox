window.addEventListener("load", function() {
	// handle switching beats
	var sel = document.querySelector("#controls select");
	var aud = document.querySelector("#controls audio");
	var auds = document.querySelectorAll("#assets audio.beat");
	var opt = null;
	var name = null;
	for(var i = 0; i < auds.length; ++i) {
		opt = document.createElement("option");
		opt.value = auds.item(i).src;
		name = opt.value;
		name = name.substring(name.lastIndexOf("/") + 1);
		opt.appendChild(document.createTextNode(name));
		sel.appendChild(opt);
		auds.item(i).addEventListener("ended", function() {
			console.log("ended", this);
			document.querySelector(".player").classList.toggle("bleat", false);
		});
		if(!aud) {
			aud = document.createElement("audio");
			aud.src = opt.value;
			aud.controls = true;
			aud.loop = true;
			sel.parentElement.appendChild(aud);
		}
	}
	sel.addEventListener("change", function() {
		aud.pause();
		aud.currentTime = 0;
		aud.src = this.value;
		aud.play();
	});

	// wire up bleat buttons
	var btns = document.querySelectorAll("#controls button");
	var lastsound = null;
	for(var i = 0; i < btns.length; ++i) {
		btns.item(i).addEventListener("click", function() {
			if(lastsound) {
				lastsound.pause();
				lastsound.currentTime = 0;
			}
			var snd = document.getElementById(this.className);
			snd.currentTime = 0;
			snd.play();
			lastsound = snd;
			document.querySelector(".player").classList.toggle("bleat", true);
		});
	}

	// change frame when done bleating
	var snds = document.querySelectorAll("#assets audio.bleat");
	for(var i = 0; i < snds.length; ++i) {
		snds.item(i).addEventListener("ended", function() {
			console.log("ended", this);
			document.querySelector(".player").classList.toggle("bleat", false);
		});
	}
});
