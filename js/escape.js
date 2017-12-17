$(function(){
	var startX,endX,moveX;
	var isPaused = localStorage.getItem("isPaused");
		if(isPaused=="false"){
			$("body").append('<audio src="../img/music.mp3" autoplay="autoplay" id="audio"/>');
		}
	var man = {
		moveDir:'none',
		pointX:'',
		pointY:'',
		speed :12,
		init:function(){
			man.pointX = $("#content").width()/2 + 25;
			man.pointY = $("#content").height()/2 -25;
		},
		move:function(){
			$(".man").css({
				"left":man.pointX  +"px",
				"top":man.pointY +"px"
			});
		},
		skill:function(x,y){
			var person = document.getElementById("man");
			var perLeft = person.offsetLeft;
			var perTop = person.offsetTop;
			var staLeft = x;
			var staTop = y;
			//纵向检测
			if(staTop + 30 >perTop && perTop + 50 > staTop){
				//横向检测
				if(perLeft + 50 > staLeft && staLeft + 30 > perLeft){
					return true;
				}
			}
			//person宽高分别为50,50
			//start宽高分别为30，30
		}
	};
	var stime = 0;
	var game = {
		time :'00:00',
		count :0,
		pointX : $(".content").width()-30,
		pointY : $(".content").height()-30,
		randomNum:function (Min,Max){
			var Range = Max - Min;
			var Rand = Math.random();   
			var num = Min + Math.round(Rand * Range);
			return num;
		},
		init:function(){
			man.init();
			man.move();
			for(var i = 0 ; i < 10;i++){
				var star = new createStar();
				star.setCss();
			}
		},
		randEage:function(){
			var flag = Math.random();
			var point = {
				x:'',
				y:'',
			};
			if(flag <= 0.25){
				point.x = 0;
				point.y = Math.random()*game.pointY;
			}else if(flag >0.25 &&flag <=0.5){
				point.x = game.pointX;
				point.y = Math.random()*game.pointY;
			}else if(flag>0.5 && flag <=0.75){
				point.x = Math.random()*game.pointX;
				point.y = 0;
			}else{
				point.x = Math.random()*game.pointX;
				point.y = game.pointY;
			}
			return point;
		},
		getTime:function(){
			game.count++;
			if(game.count%10 ==0){
				stime ++;
				if(stime < 10) game.time = '00:0' + stime;
				if(stime > 59) {
					var t = stime%59;
					var n = stime - 59;
					stime = '0:' + t + n;
				}
			}
		},
		over:function(){
			$(".content").empty();//清空页面
			$(".header").remove();
			var scoreDiv = document.createElement("div");
			var restartBtn = document.createElement("a");
			var homeBtn = document.createElement("a");
			restartBtn.className = "restart";
			homeBtn.className = "home";
			scoreDiv.className = "endScore";
			$(restartBtn).css({
				"background": "url(../img/restart.png) no-repeat center center",
				"background-size": "100% 100%",
				"width":"100px",
				"height":"100px",
				"top":(window.innerHeight/4)*3 - 50 + "px",
				"left":window.innerWidth/2 + "px"
			});
			$(homeBtn).css({
				"background": "url(../img/home.png) no-repeat center center",
				"background-size": "100% 100%",
				"width":"100px",
				"height":"100px",
				"top":(window.innerHeight/4)*3 - 50 + "px",
				"left":window.innerWidth/4 + "px"
			});
			$(scoreDiv).css({
				"top":window.innerHeight/3 - 120 + "px",
				"left":window.innerWidth/2 - 100 + "px"
			});
			document.getElementById("content").appendChild(restartBtn);
			document.getElementById("content").appendChild(homeBtn);
			document.getElementById("content").appendChild(scoreDiv);
	
			$(".endScore").append(game.time);//在endScore的div中加入分数
			$(restartBtn).on("touchstart",function(e){
				switch (e.type){
					case "touchstart":
						gameOver = false;
						//重新加载
						window.location.reload();
						break;
					default:
						break;
				}
			});
			$(homeBtn).on("touchstart",function(e){
				switch (e.type){
					case "touchstart":
						window.location.href = "../index.html";
						break;
					default:
						break;
				}
			});
		}
	};
	function createStar(){
		
		this.body = document.createElement("div");
		var choose = game.randEage();
		this.pointX = choose.x;
		this.pointY = choose.y;
		this.setCss = function(){
			this.body.className = "star rotate";	
			$("#content").append(this.body);
			$(this.body).css({
				"left" : this.pointX  +"px",
				"top" :  this.pointY +"px",
			});
		};
	};
	
	game.init();
	
	var gameTime = setInterval(function(){
		var stars = document.getElementsByClassName("star");
		for(var i = 0 ; i < stars.length; i++){
			var star = stars[i];
			var sLeft = star.offsetLeft;
			var sTop = star.offsetTop;
			var moveX = game.randomNum(-10,10);
			var moveY = game.randomNum(-10,10);
			if(sLeft + moveX >= game.pointX){
				sLeft = 0;
			}else if(sLeft + moveX <= 0){
				sLeft = game.pointX -20;
			}
			if(sTop + moveY >= game.pointY){
				sTop = 0;
			}else if(sTop + moveY  <= 0){
				sTop = game.pointY -20;
			}
			if(man.skill(sLeft + moveX,sTop + moveY)){
				game.over();
				clearInterval(gameTime);
				clearInterval(moveTime);
			}
			$(star).animate({
				"left" : sLeft + moveX +"px",
				"top" : sTop + moveY +'px'
			},3000);
		}
		console.log(game.time);
		game.getTime();
		$(".header").text(game.time);
	},100);
	
	var moveTime = setInterval(function(){
		switch (man.moveDir) {
            case "left":
            	if(man.pointX <= 0){
            		man.pointX = $("#content").width();
            	}
            	man.pointX = man.pointX - man.speed;
             	break;
            case "right":
                if(man.pointX >= $("#content").width()){
            		man.pointX = 0;
            	}
            	man.pointX = man.pointX + man.speed;
                break;
            case "up":
                if(man.pointY <= 0){
            		man.pointY = $("#content").height()-50;
            	}
            	man.pointY = man.pointY - man.speed;
                break;
            case "down":
                if(man.pointY >= $("#content").height()){
            		man.pointY =0;
            	}
            	man.pointY = man.pointY + man.speed;
                break;
            default:
                break;
     }
		man.move();
	},100);
	$('#content').on("touchstart touchmove",function(e){
			e.preventDefault();
			switch (e.type){
				case "touchstart":
					startX = e.originalEvent.targetTouches[0].clientX;
					startY = e.originalEvent.targetTouches[0].clientY;
					break;
				case "touchmove":
					endX = e.originalEvent.targetTouches[0].clientX;
					endY = e.originalEvent.targetTouches[0].clientY;
					moveX = endX-startX;
					moveY = endY-startY;
					if (Math.abs(moveX) > Math.abs(moveY)) {
                		//水平方向
                		var url;
                		if (moveX > 0) {
                			man.moveDir = "right";//向右
                			url = "url(../img/right.gif) no-repeat center center";
                		}	
                    	else  {
                    		man.moveDir = "left";//向左
                    		url = "url(../img/left.gif) no-repeat center center";
                    	} 
            		} else {
                		//垂直方向
                		if (moveY > 0) {
                			man.moveDir = "down";
                			url = "url(../img/forward.gif) no-repeat center center";
                		}
                		else {
                			man.moveDir = "up";
                			url = "url(../img/forward.gif) no-repeat center center";
                		} 
            		}
            		$(".man").css({
            			"background" : url,
            			"width" : "50px",
            			"height" :"50px",
            			"background-size" :'50px',
            		});
					break;
				default:
					break;
			}
	});
});
