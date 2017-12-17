/*var html;
window.onload = function(){
	html = document.getElementsByTagName("html")[0];
	html.style.fontSize = window.innerWidth/20 + "px";
}
window.onresize = function(){
	html.style.fontSize = window.innerWidth/20 + "px";
}*/
$(function() {
	var people = document.getElementById("people");
	var line = document.getElementById("line1");
	var timer;
	var oldLeft;
	var oldTop;
	var oldWidth;
	var oldHeight;
	var score = 0;
	
	var isPaused = localStorage.getItem("isPaused");
	if(isPaused=="false"){
		$("body").append('<audio src="../img/music.mp3" autoplay="autoplay" id="audio"/>');
	}
	//设置分数,显示分数
	$("#score").append(score);
	//设置小人位置
	console.log($(".box").height());
	people.style.bottom = $(".box").height() + "px";
	//棍子的位置
	line.style.left = line.offsetLeft + $(".box").width() + "px";
	line.style.bottom = $(".box").height() + "px";
	//随机生成第二个box
	randomBox();
	
	$("#game").on("touchstart touchend", function(e) {
			e.preventDefault();
			switch (e.type) {
				case "touchstart":
					oldLeft = line.offsetLeft;
					oldTop = line.offsetTop;
					timer = setInterval(function() {
						line.style.opacity = "1";
						line.style.height = line.offsetHeight + 10 + "px";
						line.style.top = line.offsetTop - 10 + "px";
					}, 30)
					break;
				case "touchend":
					//
					clearInterval(timer);
					//
					oldWidth = line.offsetWidth;
					oldHeight = line.offsetHeight;
					//
					line.style.width = oldHeight + "px";
					line.style.height = oldWidth + "px";
					line.style.left = oldLeft + "px";
					line.style.top = oldTop + "px";
					lineLength();
					break;
				default:
					break;
			}
	});
	//判断棍子长度是否合理
	function lineLength() {
		var lineLength = line.offsetWidth;
		/*两个盒子间的宽度*/
		var boxLeft = $(".box").offset().left;
		//var boxLeft = document.getElementsByClassName("box")[0].offsetLeft;
		var boxWidth = document.getElementsByClassName("box")[0].offsetWidth;
		var distance = $(".box1").offset().left - boxLeft - boxWidth;
		var move = lineLength + (boxLeft + boxWidth - people.offsetLeft - people.offsetWidth);
		var flag = people.offsetLeft - boxLeft;//修正小人的位置
		if (lineLength >= distance && lineLength <= distance + $(".box1").width()) {
			//小人走过去
			moveSucc(lineLength, move,flag);
			score++;
			$("#score").html(score);
		} else {
			//小人掉下去
			moveFail(lineLength);
		}
	}
	//小人走过去
	function moveSucc(lineLength, move,x) {
		$("#people img").attr("src", "../img/run_right.gif");
		$("#people").animate({
				"left": people.offsetLeft + move + "px"
			}, 1000, "linear", function() {
				$("#people img").attr("src", "../img/start.png");
				//前一个box移除
				$(".box").remove();
				//棍子隐藏
				line.style.opacity = 0;
				
				//第二个box左移
				$(".box1").animate({
					"left": "10%"
				}, 1000, "linear");
				//小人右移
				
				$("#people").animate({
					"left": "10%"
				}, 1000, "linear", function() {
					//棍子变回原样
					line.style.width = "6px";
					line.style.height = "6px";
					line.style.left = $(".box1").width() + $(".box1").offset().left + "px";
					//左边盒子改变class
					$(".box1").addClass("box");
					$(".box1").removeClass("box1");
					//右边生成盒子
					randomBox();
				});
				
			})
			//游戏继续
	}
	//小人和棍子掉下去
	function moveFail(lineLength) {
		$("#people img").attr("src", "../img/run_right.gif");
		//小人走过去
		$("#people").animate({
				"left": people.offsetLeft + $(".box").width() + lineLength - people.offsetWidth + "px"
			}, 700, "linear", function() {
				
				//
				//棍子掉下去
				console.log(oldWidth,oldHeight);
				$("#line1").animate({
					"width": oldWidth + "px",
					"height": oldHeight + "px",
					"left": oldLeft + "px",
					"top": oldTop + "px"
				}, 10, "linear", function() {
					//
					//小人掉下去
					$("#people img").attr("src", "../img/die.png");
					$("#people").animate({
						"bottom": 0
					}, 500, "linear", function() {
						gameRestart();
					});
				})
			})
			//
			//游戏结束
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
					window.location.href = "../index.html";
					break;
				default:
					break;
			}
		});
	}
	//随机出现box的x位置和宽度
	function randomBox() {
		/*当前小人站的盒子*/
		var box = document.getElementsByClassName("box");
		var boxLeft = box[0].offsetLeft;
		var boxWidth = box[0].offsetWidth;
		/*新的盒子*/
		var box1 = document.createElement("div");
		//新盒子的宽度
		var randomWidth = Math.round(Math.random()*80 + 30);//宽度在30-60之间
		//新盒子的左边起点
		var randomLeft = boxLeft + boxWidth + Math.round(Math.random()*100 + 5);
		
		box1.className = "box1";
		box1.style.width = randomWidth + "px";
		box1.style.height = "40%";
		box1.style.left = randomLeft + "px";
		document.getElementById("game").appendChild(box1);
	}
})