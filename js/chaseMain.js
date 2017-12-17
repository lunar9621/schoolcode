$(function(){
	var fingerMove = false;
	var postion = ["moveX","moveY"];
	var startX,startY,endX,endY,moveX,moveY;
	var score = 1;
	var runner = new Runner();
	runner.bodyTurn();
	var isPaused = localStorage.getItem("isPaused");
	if(isPaused=="false"){
		$("body").append('<audio src="../img/music.mp3" autoplay="autoplay" id="audio"/>');
	}
	//创造敌人
	var enemy = ["enemy1","enemy2","enemy3"];
	var enemyArry = [];
	for(var i = 0;i < 3;i++){
		var enemys = new Enemys(enemy[i]);
		enemys.enemyRun();
		enemys.checkImpact();
		enemyArry.push(enemys);
	}
	
	$(".container").on("touchstart touchmove touchend",function(e){
		switch (e.type){
			case "touchstart":
				startX = e.originalEvent.targetTouches[0].clientX;
				startY = e.originalEvent.targetTouches[0].clientY;
				break;
			case "touchmove":
				fingerMove = true;
				endX = e.originalEvent.targetTouches[0].clientX;
				endY = e.originalEvent.targetTouches[0].clientY;
				break;
			case "touchend":
				//防止点击翻页（手指没有移动的情况下）
				if(!fingerMove) return;
				fingerMove = false;
				moveX = endX - startX;
				moveY = endY - startY;
				if(Math.abs(moveX) > Math.abs(moveY)){
					runner.setTrack("moveX",moveX);
				}else{
					runner.setTrack("moveY",moveY);					
				}
				break;
			default:
				break;
		}
	});
	
	var timer = null;
	timer = setInterval(function(){
		var runner = document.getElementById("runMain");
		if(runner == null){
			clearInterval(timer);
			gameRestart();
			return;
		}
		for(var i = 0;i < 3;i++){
			var postionR = parseInt(Math.random()*2);
			var rand = (Math.random()*2+1)*(Math.random()>0.5?1:-1);
			enemyArry[i].setTrack(postion[postionR],rand,enemy[i]);		
		}
		score++;
		$("#score").text(score);
	},1000);
	
	//结束
	function gameRestart(){
	$(".container").empty();//清空页面
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
	document.getElementById("container").appendChild(restartBtn);
	document.getElementById("container").appendChild(homeBtn);
	document.getElementById("container").appendChild(scoreDiv);
	
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
};
})