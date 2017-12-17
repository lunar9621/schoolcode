function Enemys(enemy){
	this.trackMax = 314;
	this.trackMin = 0;
	this.timerImpact = null;
	this.timeRun = null;
	this.enemy = document.getElementById(enemy);
	this.game = true;
	
	/*设置跑道*/
	this.setTrack = function(track,fingerMove){
		var runner = document.getElementById("runMain");
		var rLeft = runner.offsetLeft;
		var rTop = runner.offsetTop;
		var left = this.enemy.offsetLeft;
		var top = this.enemy.offsetTop;
		if(Math.abs(rLeft-left) <= 60 && Math.abs(rTop - top) <= 60){
			return;
		}
		/*横向切换*/
		if(track == "moveX"){
			if(left == 0 && (top <= 254 && top >=50) 
				&& fingerMove > 0){
				this.enemy.style.left = left + 60 + "px";
				this.trackMax = 255;
				this.trackMin = 60;
			}else if(left == 314 && (top <= 254 && top >=60) 
				&& fingerMove <0){
				this.enemy.style.left = left - 60 + "px";
				this.trackMax = 254;
				this.trackMin = 60;
			}else if(left == 60 && fingerMove < 0){
				this.enemy.style.left = left - 60 + "px";
				this.trackMax = 314;
				this.trackMin = 0;
			}else if(left == 254 && fingerMove > 0){
				this.enemy.style.left = left + 60 + "px";
				this.trackMax = 314;
				this.trackMin = 0;
			}
			/*纵向切换*/
		}else if(track == "moveY" ){
			if(top == 0 && (left >=60 && left <= 254) 
			&& fingerMove > 0){
				this.enemy.style.top = top + 60 + "px";
				this.trackMax = 254;
				this.trackMin = 60;
			}else if(top == 314 && (left >=60 && left <= 254 )
			&& fingerMove <0){
				this.enemy.style.top = top - 60 + "px";
				this.trackMax = 254;
				this.trackMin = 60;
			}else if(top == 60 && fingerMove < 0){
				this.enemy.style.top = top - 60 + "px";
				this.trackMax = 314;
				this.trackMin = 0;
			}else if(top == 254 && fingerMove > 0){
				this.enemy.style.top = top + 60 + "px";
				this.trackMax = 314;
				this.trackMin = 0;
			}
		}
	}
	
	/*敌人移动*/
	this.enemyRun = function(){
		var state = 3;  //0,1,2,3:向上，向右，向下，向左
		var _this = this;
		this.timeRun = setInterval(function(){
			if(_this.enemy == null){
				return;
			}
			var left = _this.enemy.offsetLeft;
			var top = _this.enemy.offsetTop;
			if(left == _this.trackMin && top == _this.trackMax){
				state = 1;
			}else if(left == _this.trackMin && top == _this.trackMin){
				state = 2;
			}else if(left == _this.trackMax && top == _this.trackMin){
				state = 3;
			}else if(left == _this.trackMax && top ==_this.trackMax){
				state = 0;
			}
			switch (state){
				case 0:_this.enemy.style.top = top - 1 + "px";
					_this.enemy.style.transform = "rotate(-90deg)";
					break;
				case 1:_this.enemy.style.left = left + 1 + "px";
					_this.enemy.style.transform = "rotate(0deg)";
					break;
				case 2:_this.enemy.style.top = top + 1 + "px";
					_this.enemy.style.transform = "rotate(90deg)";
					break;
				case 3:_this.enemy.style.left = left - 1 + "px";
					_this.enemy.style.transform = "rotate(-180deg)";
					break;
				default:
					break;
			}
			/*console.debug("top:  "+top,"left:  "+left);*/
		},20);
	}
		
	/*碰撞检测*/
	this.checkImpact = function(){
		var _this = this;
		this.timerImpact = setInterval(function(){
			var runner = document.getElementById("runMain");
			if(runner == null && _this.enemy == null){
				clearInterval(_this.timerImpact);
				clearInterval(_this.timeRun);
				return;
			}else if(runner == null && _this.enemy != null){
				_this.enemy.remove();
				_this.enemy = null;
				return;
			}
			var rLeft = runner.offsetLeft;
			var rTop = runner.offsetTop;
			var eLeft = _this.enemy.offsetLeft;
			var eTop = _this.enemy.offsetTop;
			if((rLeft == eLeft && rTop - eTop <=28 && rTop - eTop >= 0)||
			(rLeft == eLeft && eTop - rTop <=28 && eTop - rTop >= 0)||
			(rTop == eTop && eLeft - rLeft <=28 && eLeft - rLeft >=0)||
			(rTop == eTop && rLeft-eLeft <=28 && rLeft-eLeft >=0)){
				runner.remove();
				runner = null;
			}
		},20);
	}
}