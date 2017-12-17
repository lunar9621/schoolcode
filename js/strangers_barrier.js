var barriers = ["../img/strangers_heart.png","../img/strangers_skull.png"];
var pos = [".one",".two",".three",".four"];
function Barrier(){
	this.body = document.createElement("div");
	this.type = Math.round(Math.random());//随机生成障碍物的种类
	this.moveTime = 4000 - score*10;
	if (this.moveTime <= 1500) {
		this.moveTime = 1500;
	}
	this.setCss = function(){
		this.body.className = "barrier";
		$(this.body).css({
			"background": "url("+barriers[this.type]+") no-repeat center center",
			"background-size": "80% 80%",
			"width":window.innerWidth/4 + "px",
			"height":window.innerWidth/4 + "px",
			"top":-window.innerWidth/4 + "px",
//			"top":"0px",
		});
//		document.body.appendChild(this.body);
		$(pos[Math.round(Math.random()*3)]).append(this.body);
		/*移动*/
		$(this.body).animate({
			"top":window.innerHeight + "px"
		},this.moveTime,"linear",function(){
			this.remove();
			score += 3;//躲过一个骷髅
			$(".srcoe").empty();//清除此div
			$(".srcoe").append(score);
		});
	}
	
	/*碰撞检测*/
	this.barrierTimer = null;	//碰撞检测计时器
	this.listener = function(){
		var peopleLeft = document.getElementsByClassName("peopleLeft");
		var peopleRight = document.getElementsByClassName("peopleRight");
		
		var _this = this;
		this.barrierTimer = setInterval(function(){
			if(peopleLeft[0] == null && peopleRight[0] == null){
				clearInterval(this.barrierTimer);
				return;
			}
			var pLLfet = peopleLeft[0].offsetLeft;
			var pLTop = peopleLeft[0].offsetTop;
			var pLWidth = peopleLeft[0].offsetWidth;
			var pLHeight = peopleLeft[0].offsetHeight;
			
			var pRLeft = peopleRight[0].offsetLeft;
			var pRTop = peopleRight[0].offsetTop;
			var pRWidth = peopleRight[0].offsetWidth;
			var pRHeight = peopleRight[0].offsetHeight;
			
			var barLeft = _this.body.offsetLeft;
			var barTop = _this.body.offsetTop;
			var barWidth = _this.body.offsetWidth;
			var barHeight = _this.body.offsetHeight;
			//障碍物的宽高分别为70,70
			//人的宽高分别为80,80
			
			/*如果这个障碍物是骷髅*/
			if (_this.type == 1) {
				if (barTop + barHeight-20 > pLTop && (barLeft+5 > pLLfet && barLeft-5 < pLLfet) ) {//左边的人
					gameOver = true;
					$(".barrier").stop();
					clearInterval(this.barrierTimer);
					gameRestart();
//					alert("game over");
//					$(_this.body).remove();
				}
				if (barTop + barHeight-20 > pRTop && (barLeft+5 > pRLeft && barLeft-5 < pRLeft) ) {//右边的人
					gameOver = true;
					$(".barrier").stop();
					clearInterval(this.barrierTimer);
					gameRestart();
				}
			}else if (_this.type == 0) {/*如果这个障碍物是爱心*/
				if (barTop + barHeight >= window.innerHeight) {
					gameOver = true;
					$(".barrier").stop();
					clearInterval(this.barrierTimer);
					gameRestart();
//					alert("这个心没有吃到哦！");
				}else{
					if (barTop + barHeight-20 > pLTop && (barLeft+5 > pLLfet && barLeft-5 < pLLfet) ) {//左边的人
						$(_this.body).remove();
						score += 5;
						$(".srcoe").empty();//清除此div
						$(".srcoe").append(score);
					}
					if (barTop + barHeight-20 > pRTop && (barLeft+5 > pRLeft && barLeft-5 < pRLeft) ) {//右边的人
						$(_this.body).remove();
						score += 5;
						$(".srcoe").empty();//清除此div
						$(".srcoe").append(score);
					}
				}
			}
		},30);
	}
}
function gameRestart(){
	$("body").empty();//清空页面
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
//	var div = document.getElementsByClassName("endScore");
	$(scoreDiv).css({
		"top":window.innerHeight/2 - 150 + "px",
		"left":window.innerWidth/2 - 100 + "px"
	});
	document.body.appendChild(restartBtn);
	document.body.appendChild(homeBtn);
	document.body.appendChild(scoreDiv);
	
	$(".endScore").append(score);//在endScore的div中加入分数
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
				//homeBtn.href = "../index.html";
				console.log(homeBtn.href);
				window.location.href = "../index.html";
				break;
			default:
				break;
		}
	});
}
