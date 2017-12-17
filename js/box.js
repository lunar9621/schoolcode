function Box(){
	this.body = document.createElement("div");
	
	this.setCss = function(){
		this.body.className = "box";
		document.body.appendChild(this.body);
		var img = document.createElement("img");
		img.className = "boximg"
		img.src = "../img/box.png";
		
		
		
		this.body.appendChild(img);
		if($(this.body).offsetTop>window.innerHeight){
			this.remove();
		}
	}
	
	this.changeBottom = function(newbottom){
		$(this.body).css({"bottom":newbottom+"%"})
	}
}
