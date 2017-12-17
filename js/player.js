
function Player(){
	this.body = document.getElementById("player");
	
	//踢箱子的图片切换
	this.toleft = function(){
		$(this.body).css({"left":"10%"});
		$("#player1").attr("src","../img/stand.png");
		setTimeout(function(){
            $("#player1").attr("src","../img/left.png");
		},500);
		
//		$(".box").eq(1).addClass("leftDown");
	}
	
	this.toright = function(){
		$(this.body).css({"left":"65%"});
		$("#player1").attr("src","../img/stand.png");
		setTimeout(function(){
            $("#player1").attr("src","../img/right.png");
		},500);
	}
}
