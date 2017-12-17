var gameOver = false;//游戏是否结束

var peopleLeft = new PeopleLeft();
var score = 0;//分数

$(".srcoe").append(score);

var barrierInterval = null;//障碍物的产生时间间隔的interval
peopleLeft.setCss();
peopleLeft.controll();
var peopleRight = new PeopleRight();
peopleRight.setCss();
peopleRight.controll();

var isPaused = localStorage.getItem("isPaused");
if(isPaused=="false"){
	$("body").append('<audio src="../img/music.mp3" autoplay="autoplay" id="audio"/>');
	//localStorage.removeItem("isPaused");
}
var barrierTime = 2000;//随机产生障碍物的时间

var barrierFunction = function(){
	clearInterval(barrierInterval);//清除
	barrierTime = 2000 - score*10;
	if (barrierTime <= 500) {
		barrierTime = 500;
	}
	if (gameOver == false) {
		var barrier = new Barrier();
		barrier.setCss();
		barrier.listener();
	}else if(gameOver == true){
		clearInterval(barrierInterval);
	}
	
	barrierInterval = setInterval(barrierFunction,barrierTime);
};
barrierInterval = setInterval(barrierFunction,barrierTime);



