var finalscore = 0;
var touchX;
var screenMidX;

var body = document.getElementsByTagName("body");

screenMidX = $(document.body).width()/2;

var player = new Player();

var boxes = new Array();
var kulous = new Array();

var countdown = new Countdown();
countdown.setCss()

var isPaused = localStorage.getItem("isPaused");
	if(isPaused=="false"){
		$("body").append('<audio src="../img/music.mp3" autoplay="autoplay" id="audio"/>');
	}

//初始化产生盒子和骷髅头
var produce = function(){
	
	//产生盒子
		for(var i = 0;i<7;i++)
		{
//			console.log(boxes.length);
			var box = new Box();
			box.setCss();
			boxes[i] = box;
			if(i==0){
				boxes[i].changeBottom(1);
			}else{
				boxes[i].changeBottom(1+14*i);
			}
		}
	//	产生骷髅头
		for(var i = 0;i<7;i++)
		{
			var kulou = new Kulou();
			kulou.setCss();
			kulous[i] = kulou;
			if(i==0){
				kulous[i].changeBottom(1);
			}else{
				kulous[i].changeBottom(1+14*i);
			}
		}
}

//点击时盒子和骷髅下落
var kickdown = function(){
	//	盒子下落并重新产生一个盒子
		for(var i = 0;i < 7;i ++){
			boxes[i].changeBottom(1+14*(i-1));
			boxes[i] = boxes[i+1];
		}
		var box = new Box();
		box.setCss();
		boxes[6] = box;
		boxes[6].changeBottom(1+14*(6));
		//重新产生一个骷髅
		for(var i = 0;i < 7;i ++){
			kulous[i].changeBottom(1+14*(i-1));
			kulous[i] = kulous[i+1];
		}
		var kulou = new Kulou();
		kulou.setCss();
		kulous[6] = kulou;
		kulous[6].changeBottom(1+14*(6));
}


var gameRestart = function(){
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
		"top":window.innerHeight/2 - 100 + "px",
		"left":window.innerWidth/2 - 100 + "px"
	});
	
	document.body.appendChild(restartBtn);
	document.body.appendChild(homeBtn);
	document.body.appendChild(scoreDiv);
	
	$(".endScore").append(finalscore);//在endScore的div中加入分数
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



var kick = function(){
		//点击屏幕
		$("#touchscreen").on("touchstart",function(e){
			e.preventDefault();
			
			finalscore+=1;
//			console.log(finalscore);
			
			//如果点击屏幕左边
			var score = document.createElement("div");
			score.innerHTML = finalscore;
			score.className = "score";
			document.body.appendChild(score);
			
			touchX = e.originalEvent.targetTouches[0].clientX;
			//箱子和骷髅下落
			kickdown();
			
			for(var i = 0;i < 7;i ++){
			    kulous[i].listener();
			 //   console.log(kulous[i].over);
			    if(kulous[i].over == 1){
				    gameRestart();
			    }
			}
			
			//小人左右移动
			if(touchX<=screenMidX){
				player.toleft();
			}else if(touchX>=screenMidX){
				player.toright();
			}
		})
	}


var timedMsg = function(){
	var gametime = setTimeout("gameRestart()",20000);
}

var countdown = new Countdown();
countdown.setCss();
countdown.reduce();

kick();
produce();
timedMsg();