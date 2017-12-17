function Kulou(){
	this.body = document.createElement("div");
	this.lisTimer = null;
	
	//碰撞检测计时器
	this.listener = function(){
		
		
		var player = document.getElementById("player");
		this.lisTimer = null;
		var _this = this;
		
		this.lisTimer = setInterval(function(){
		    if(player == null){
			    clearInterval(this.lisTimer);
			    return;
		    }
			var plaLeft = player.offsetLeft;
			var plaTop = player.offsetTop;
			var kuLeft = _this.body.offsetLeft;
			var kuTop = _this.body.offsetTop;
			//player宽高分别为60和90
			//enemy宽高分别为50和70
			
			//纵向碰撞
			if(kuTop-plaTop<50 && kuTop-plaTop>0){
				//横向碰撞
				if(plaLeft-kuLeft==0){
					player.remove();
					player = null;
					//创建重新开始游戏的按钮
					if(player ==null){
						gameRestart();
					}
				}
			}
			
		},30);
	}
	
	this.setCss = function(){
		
		this.body.className = "kulou";
		document.body.appendChild(this.body);
		var img = document.createElement("img");
		img.className = "kulouimg"
		img.src = "../img/kulou.png";
		this.body.appendChild(img);
		$(this.body).css({"left":"65%"})
		
		var choice = Math.round(Math.random()*5);
		if(choice == 3){
			//箱子在左
			$(this.body).css({"left":"10%"})
			this.leftkulou = 1;
		}else if(choice ==5){
			$(this.body).css({"left":"65%"})
		}else{
			$(this.body).css({"left":"40%"})
		}
		
		console.log(this.body);
		
		if($(this.body).offsetTop>window.innerHeight){
			this.remove();
		}
	}
		
	this.changeBottom = function(newbottom){
		$(this.body).css({"bottom":newbottom+"%"})
	}
}
