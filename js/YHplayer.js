
function Player() {
	this.body = document.createElement("img");
	this.mark=-1;
	this.didRepeat = false;
	var Live;
	var ring = document.getElementById("ring");
	this.change = function() { //
		this.body.className = "player";
		var paths = new Array();
		paths[0] = "../img/blue.png";
		paths[1] = "../img/Green.png";
		paths[2] = "../img/yellow.png";
		var i = Math.round(Math.random() * 2 + 0);
		this.body.src = paths[i];
//		console.log(i);
//		console.log(this.body.src);
		switch (i) {
			case 0:
//			    console.log("tiao");
				this.mark = 0;
				break;
			case 1:
//			   console.log("tiao");
				this.mark = 1;
				break;
			case 2:
//			     console.log("tiao");
				this.mark = 2;
				break;
		}
		$(this.body).css({
			"position": "absolute",
			"width": "16%",
			"left": "42%",
			"top": "5%",
		})
		document.body.appendChild(this.body);
//		console.log(this.mark);
	}

	this.move = function(callBack) {
		var _this=this;
		var isDead;
		//var ring = new Ring();
		$(document).on("touchstart", function(e) {
			didRepeat = false;
			e.preventDefault();
			$(_this.body).animate({
				"top": window.innerHeight * 0.34 + "px"
			}, 1000, "linear", function() {
				_this.same();
				if (Live) {
					_this.rotate();
					isDead = false;
					if(!_this.didRepeat){
						callBack(false)
						_this.didRepeat = true;
					}
				} else {
					$(this.body).css({
							"top": window.innerHeight * 0.38,
						})
						//gamerestart();
					isDead = true;
					callBack(true);
				}
			})

		})
		return isDead;
	}
	this.same = function(){
	//	console.log("0");
		var deg = eval('get' + $(ring).css('transform'));
//		console.log(deg);
//		console.log(this.mark);
		if (this.mark == 1 && deg > 0 && deg < 125) {
			Live = true;
			return true;
//			console.log("活");
		} else if (this.mark == 2 && deg > 125 && deg < 235) {
			Live = true;
			return true;
//			console.log("活");
		} else if (this.mark == 0 && deg > 235) {
			Live = true;
			return true;
//			console.log("活");
		}
		//  	else{
		//  		return false;
		//  	}
	}
	this.rotate = function() {
//		console.log("1");
		$(this.body).css({
			"animation": "rotate" + " " + "2s" + " " + "linear" + " " + "infinite",
			"transform-origin": "54%" + " " + "329%"
		})
	}
	
}

function gamerestart() {
	var btn = document.createElement("a");
	btn.innerHTML = "RESTART GAME";
	document.body.appendChild(btn);
	btn.className = "btn";
	$(btn).on("touchstart", function() {
		window.location.reload();
	})
}

function getmatrix(a, b, c, d, e, f) {
	var aa = Math.round(180 * Math.asin(a) / Math.PI);
	var bb = Math.round(180 * Math.acos(b) / Math.PI);
	var cc = Math.round(180 * Math.asin(c) / Math.PI);
	var dd = Math.round(180 * Math.acos(d) / Math.PI);
	var deg = 0;
	if (aa == bb || -aa == bb) {
		deg = dd;
	} else if (-aa + bb == 180) {
		deg = 180 + cc;
	} else if (aa + bb == 180) {
		deg = 360 - cc || 360 - dd;
	}
	//return deg>=360?0:deg;
	return deg;
}