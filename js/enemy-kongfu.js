function Enemy(){
	this.body = document.createElement("img");
	this.Timer = null;
	var _this = this;
	var windowW = window.innerWidth;
	var windowH = window.innerHeight;
	this.listener = function(){
		/***************************敌人碰撞检测************************/
		var person = $(".person");
		this.Timer = setInterval(function(){
			if(person.length == 0){
				clearInterval(_this.Timer);
				return;
			}
			var eneLeft = _this.body.offsetLeft;
			var eneTop = _this.body.offsetTop;
			if(Math.round(eneTop) == Math.round(windowH*0.45)){
				/*左边*/
				if(eneLeft + windowW * 0.1 > windowW * 0.4 && eneLeft + windowW * 0.1 < windowW * 0.45){
					person.remove();
					gameRestart();
					_this.body.remove();
				}
				//右边
				else if(eneLeft < windowW * 0.6 && eneLeft > windowW * 0.55){
					person.remove();
					gameRestart();
					_this.body.remove();
				}
			}
			if(Math.round(eneLeft) == Math.round(windowW*0.45)){
				/*上面*/
				if(eneTop + windowH * 0.1 > windowH * 0.4 && eneTop + windowH * 0.1 < windowH * 0.45){
					person.remove();
					gameRestart();
					_this.body.remove();
				}
				//下面
				else if(eneTop < windowH * 0.6 && eneTop > windowH * 0.55){
					person.remove();
					gameRestart();
					_this.body.remove();
				}
			}
		},30);
	}
	this.setCss = function(){
		/***********************敌人出现*****************************/
		this.body.className = "enemy";
//		document.body.appendChild(this.body);
        $(".container").append(this.body);
		var random = Math.round(Math.random()*3 + 1);
		var time = 2000;
		if (random == 1) {
			_this.body.src = "../img/run_right.gif";
			$(_this.body).css({
				"top":windowH * 0.45 + "px",
				"left":0+"px"
			})
			
		$(_this.body).animate({
			"left":windowW*0.35+'px'
		},time,"linear",function(){
			/*this.remove();*/
		});
		} else if(random == 2){
			_this.body.src = "../img/walk.gif";
			$(_this.body).css({
				"top":0 + "px",
				"left":windowW*0.45+"px"
			})
			
			/*移动*/
			$(_this.body).animate({
			"top":windowH*0.35+'px'
		     },time,"linear",function(){
			this.remove();
		      });
		}
		else if(random == 3){
			_this.body.src = "../img/run_left.gif";
			$(_this.body).css({
				"top":windowH*0.45 + "px",
				"left":windowW+"px"
			})
			$(_this.body).animate({
			"left":windowW*0.53+'px'
			},time,"linear",function(){
			this.remove();
			});
		}
		else if(random == 4){
			_this.body.src = "../img/walk.gif";
			$(_this.body).css({
				"top":windowH + "px",
				"left":windowW*0.45+"px"
			})
			$(_this.body).animate({
			"top":windowH*0.53+'px'
			},time,"linear",function(){
			this.remove();
			});
		}
	
	}
}

function control(){
	//**************************触摸事件
	var windowW = window.innerWidth;
	var windowH = window.innerHeight;
	this.body = $(".person");
	var _this = this;
	var score = 0;
	var fingerMove = false;
	/*var enemyTop = $(".enemy").offsetTop;
	var enemyLeft = $(".enemy").offsetLeft;*/
	this.listener = function(){
		$(".container").on("touchstart touchmove touchend",function(e){
			switch (e.type){
		case "touchstart":
			startY = e.originalEvent.targetTouches[0].clientY;
			startX = e.originalEvent.targetTouches[0].clientX;
			break;
		case "touchmove":
			fingerMove = true;
			endY = e.originalEvent.targetTouches[0].clientY;
			endX = e.originalEvent.targetTouches[0].clientX;
			break;
		case "touchend":
			//防止点击（手指没有移动的情况下）
			if(!fingerMove)return;
			fingerMove = false;
			
			moveY = endY - startY;
			moveX = endX - startX;
			/*上滑*/
			if(moveY < 0){ 	
				 $(".person").attr("src","../img/gun_2.gif");
				$(".enemy").each(function(){
					var _this = this;
					var enemyTop = $(this).offset().top;
					var enemyLeft = $(this).offset().left;
					if(enemyLeft == windowW*0.45 && enemyTop > windowH*0.2 && enemyTop < windowH*0.3){
						_this.remove();
						score += 1;
					}
				})
			}
			/*下滑*/
			if(moveY > 0){ 			
				$(".person").attr("src","../img/gun_1.gif");
				$(".enemy").each(function(){
					var _this = this;
					var enemyTop = $(this).offset().top;
					var enemyLeft = $(this).offset().left;
					if(enemyLeft == windowW*0.45 && enemyTop > windowH*0.6 && enemyTop < windowH*0.7){
						_this.remove();
						score += 1;
					}
				})
			}
			/*左滑*/
			if(moveX < 0){
				$(".person").attr("src","../img/gun_2.gif");
				$(".enemy").each(function(){
					var _this = this;
					var enemyTop = Math.round($(this).offset().top);
					var enemyLeft = Math.round($(this).offset().left);
					if(enemyTop == Math.round(windowH*0.45) && enemyLeft < windowW*0.3 && enemyLeft > windowW*0.2){
						_this.remove();
						score += 1;
					}
				})
			}
			/*右滑*/
			if(moveX > 0){
				$(".person").attr("src","../img/gun_1.gif");
				$(".enemy").each(function(){
					var _this = this;
					var enemyTop = Math.round($(this).offset().top);
					var enemyLeft = Math.round($(this).offset().left);
					if(enemyTop == Math.round(windowH*0.45) && enemyLeft < windowW*0.7 && enemyLeft > windowW*0.6){
						_this.remove();
						score += 1;
					}
				})
			}
			$(".number").html(score);
			break;
			}
		});
	
	}
}
var isPaused = localStorage.getItem("isPaused");
	if(isPaused=="false"){
		$("body").append('<audio src="../img/music.mp3" autoplay="autoplay" id="audio"/>');
	}
function gameRestart(){
	var number = $(".number").text();
	$("body").empty();
	$("body").append('<div class="final-number">'+number+'</div><img class="home" src="../img/home.png"/><img class="restart-ico" src="../img/restart.png"/>');
	$(".restart-ico").css({
		"top":(window.innerHeight/4)*3 - 50 + "px",
		"left":window.innerWidth/2 + "px"
	});
	$(".home").css({
		"top":(window.innerHeight/4)*3 - 50 + "px",
		"left":window.innerWidth/4 + "px"
	});
    $(".final-number").css({
		"top":window.innerHeight/2 - 100 + "px",
		"left":window.innerWidth/2 - 100 + "px"
	});

	clearInterval(globalTimer);
	$(".restart-ico").click(function(){
		window.location.reload();
	})
	$(".home").click(function(){
		window.location.href = "../index.html";
	})
	$(".container").css("background-color","rgba(0,0,0,0.1)")
}
var control = new control();
control.listener();
var globalTimer = setInterval(function(){
			var enemy = new Enemy();
			enemy.setCss();
			enemy.listener();
		},1000)