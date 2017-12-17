var ring = new Ring();
var players = new Array();
var score = -1;

loop();

function loop() {
	console.log(123)
	var isDead = false;
	var player = new Player();
	player.change();
	score++;
	player.move(function(e) {
		if (e == false) {
			loop();
		} else {
			isDead = true;
			gamerestart();
		}

	});
}

function gamerestart() {
	$("body").empty(); //清空页面
	var scoreDiv = document.createElement("div");
	var restartBtn = document.createElement("a");
	var homeBtn = document.createElement("a");
	restartBtn.className = "restart";
	homeBtn.className = "home";
	scoreDiv.className = "endScore";
	$(restartBtn).css({
		"background": "url(../img/restart.png) no-repeat center center",
		"background-size": "100% 100%",
		"width": "100px",
		"height": "100px",
		"top": (window.innerHeight / 4) * 3 - 50 + "px",
		"left": window.innerWidth / 2 + "px"
	});
	$(homeBtn).css({
		"background": "url(../img/home.png) no-repeat center center",
		"background-size": "100% 100%",
		"width": "100px",
		"height": "100px",
		"top": (window.innerHeight / 4) * 3 - 50 + "px",
		"left": window.innerWidth / 4 + "px"
	});

	$(scoreDiv).css({
		"top": window.innerHeight / 3 - 120 + "px",
		"left": window.innerWidth / 2 - 100 + "px"
	});
	document.body.appendChild(restartBtn);
	document.body.appendChild(homeBtn);
	document.body.appendChild(scoreDiv);

	$(".endScore").append(score);
	$(restartBtn).on("touchstart", function(e) {
		switch (e.type) {
			case "touchstart":
				gameOver = false;
				//重新加载
				window.location.reload();
				break;
			default:
				break;
		}
	});
	$(homeBtn).on("touchstart", function(e) {
		switch (e.type) {
			case "touchstart":
				window.location.href = "../index.html";
				break;
			default:
				break;
		}
	});
}
var isPaused = localStorage.getItem("isPaused");
		if(isPaused=="false"){
			$("body").append('<audio src="../img/music.mp3" autoplay="autoplay" id="audio"/>');
		}
//加快速度
function speed() {
	$(ring).css({
		"animation": "rotate" + " " + "4s" + " " + "linear" + " " + "infinite"
	});
}