var touchX,touchY;
var flagLeft = 1;
var flagRight = 3;
function PeopleLeft(){
	this.body = document.createElement("div");
	/*设置样式*/
	this.setCss = function(){
		this.body.className = "peopleLeft";
		$(this.body).css({
//			"left":window.innerWidth/4 + "px"
			"left":"0px",
			"width":window.innerWidth/4 + "px",
			"height":window.innerWidth/4 + "px"
		});
		$(this.body).addClass("run");
		document.body.appendChild(this.body);
	}
	/*控制移动*/
	this.controll = function(){
		var _this = this.body;
		$(".all").on("touchstart touchend",function(e){
			e.preventDefault();
			switch (e.type){
				case "touchstart":
					touchX = e.originalEvent.targetTouches[0].clientX;
//					touchY = e.originalEvent.targetTouches[0].clientY;
					if (touchX < window.innerWidth/2) {//如果点击的是左半部分
						if (flagLeft == 1) {
							$(_this).animate({
								"left":window.innerWidth/4 + "px",
							},200,"linear");
							flagLeft = 2;
						}else if (flagLeft == 2) {
							$(_this).animate({
								"left":"0px",
							},200,"linear");
							flagLeft = 1;
						}
					}
					break;
				case "touchend":
					break;
				default:
					break;
			}
		});
	}
	
}
function PeopleRight(){
	this.body = document.createElement("div");
	/*设置样式*/
	this.setCss = function(){
		this.body.className = "peopleRight";
		$(this.body).css({
			"left":window.innerWidth/2 + "px",
			"width":window.innerWidth/4 + "px",
			"height":window.innerWidth/4 + "px"
		});
		document.body.appendChild(this.body);
	}
	/*控制移动*/
	this.controll = function(){
		var _this = this.body;
		$("body").on("touchstart",function(e){
			e.preventDefault();
			switch (e.type){
				case "touchstart":
					touchX = e.originalEvent.targetTouches[0].clientX;
					if (touchX > window.innerWidth/2) {//如果点击的是右半部分
						if (flagRight == 3) {
							$(_this).animate({
								"left":(window.innerWidth/4)*3 + "px",
							},200,"linear");
							flagRight = 4;
						}else if (flagRight == 4) {
							$(_this).animate({
								"left":window.innerWidth/2 + "px",
							},200,"linear");
							flagRight = 3;
						}
						
					}
					break;
				default:
					break;
			}
		});
	}
}
