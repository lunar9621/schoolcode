function Runner(){
	this.trackMax = 314;
	this.trackMin = 0;
	this.timer = null;
	
	/*设置跑道*/
	this.setTrack = function(track,fingerMove){
		var runner = document.getElementById("runMain");
		if(runner == null){
			return;
		}
		var runnerWidth = runner.offsetWidth;
		var left = runner.offsetLeft;
		var top = runner.offsetTop;
		/*横向切换*/
		if(track == "moveX"){
			if(left == 0 && (top <= 254 && top >=60) 
				&& fingerMove > 0){
				runner.style.left = left + 60 + "px";
				this.trackMax = 254;
				this.trackMin = 60;
			}else if(left == 314 && (top <= 254 && top >=60) 
				&& fingerMove <0){
				runner.style.left = left - 60 + "px";
				this.trackMax = 254;
				this.trackMin = 60;
			}else if(left == 60 && fingerMove < 0){
				runner.style.left = left - 60 + "px";
				this.trackMax = 314;
				this.trackMin = 0;
			}else if(left == 254 && fingerMove > 0){
				runner.style.left = left + 60 + "px";
				this.trackMax = 314;
				this.trackMin = 0;
			}
			/*纵向切换*/
		}else if(track == "moveY" ){
			if(top == 0 && (left >=60 && left <= 254) 
			&& fingerMove > 0){
				runner.style.top = top + 60 + "px";
				this.trackMax = 254;
				this.trackMin = 60;
			}else if(top == 314 && (left >=60 && left <= 254 )
			&& fingerMove <0){
				runner.style.top = top - 60 + "px";
				this.trackMax = 254;
				this.trackMin = 60;
			}else if(top == 60 && fingerMove < 0){
				runner.style.top = top - 60 + "px";
				this.trackMax = 314;
				this.trackMin = 0;
			}else if(top == 254 && fingerMove > 0){
				runner.style.top = top + 60 + "px";
				this.trackMax = 314;
				this.trackMin = 0;
			}
		}
	}
	
	/*人体绕着转圈*/
	this.bodyTurn = function(){
		var state = 3;  //0,1,2,3:向上，向右，向下，向左
		var _this = this;
		this.timer = setInterval(function(){
			var runner = document.getElementById("runMain");
			if(runner == null){
				clearInterval(_this.timer);
				return;
			}
			var left = runner.offsetLeft;
			var top = runner.offsetTop;
			if(left == _this.trackMin && top == _this.trackMax){
				state = 0;
			}else if(left == _this.trackMin && top == _this.trackMin){
				state = 1;
			}else if(left == _this.trackMax && top == _this.trackMin){
				state = 2;
			}else if(left == _this.trackMax && top ==_this.trackMax){
				state = 3;
			}
			switch (state){
				case 0:runner.style.top = top - 1 + "px";
					runner.style.transform = "rotate(90deg)";
					break;
				case 1:runner.style.left = left + 1 + "px";
					runner.style.transform = "rotate(180deg)";
					break;
				case 2:runner.style.top = top + 1 + "px";
					runner.style.transform = "rotate(270deg)";
					break;
				case 3:runner.style.left = left - 1 + "px";
					runner.style.transform = "rotate(0deg)";
					break;
				default:
					break;
			}
			/*console.debug("top:  "+top,"left:  "+left);*/
		},20);
	}
}
