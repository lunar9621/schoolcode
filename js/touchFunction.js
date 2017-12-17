
//当前页索引
var nowPage = 3;
var startX, endX, moveX;
var fingerMove;
$(".content .checkpoint").on("touchstart touchmove touchend",function(e){
	switch(e.type){
		case "touchstart" :
			startX = e.originalEvent.targetTouches[0].clientX;
			break;
		case "touchmove" :
			e.preventDefault();
			fingerMove = true;
			endX = e.originalEvent.targetTouches[0].clientX;
			break;
		case "touchend" :
			//防止点击翻页（手指没有移动的情况下）
			if(!fingerMove) return;
			fingerMove = false;
			moveX = endX - startX;
			//向左滑动
			if(moveX < 0){
				if(nowPage == $(".checkpoint").size()-1){
					return ;
				}
				nowPage++;
				$(this).removeClass("active").addClass("toleft");
				$(this).prev().removeClass("left").addClass("hidden");
				$(this).next().removeClass("right").addClass("nextToCur");
				$(this).next().next().removeClass("hidden").addClass("toRight");
				
				//当动画结束，隐藏，并且都移除动画属性
				$(this).on("webkitAnimationEnd",function(){
					$(this).removeClass("toleft").addClass("left").next().removeClass("nextToCur");
					$(this).next().next().removeClass("toRight").addClass("right");
					$(this).next().addClass("active");
					$(this).off("webkitAnimationEnd");
				});
			}else{
				if(nowPage == 0) return;
				nowPage--;
				$(this).removeClass("active").addClass("toRight");
				$(this).next().removeClass("right").addClass("hidden");
				$(this).prev().removeClass("left").addClass("nextToCur");
				$(this).prev().prev().removeClass("hidden").addClass("toleft");
				
				$(this).on("webkitAnimationEnd",function(){
					$(this).removeClass("toRight").addClass("right").prev().removeClass("nextToCur");			
					$(this).prev().prev().removeClass("toleft").addClass("left");
					$(this).prev().addClass("active");
					$(this).off("webkitAnimationEnd");
				});
			}
			console.log(nowPage);
			break;

	}
});
$(".music").click(function(){
	var audio = document.getElementById("audio");
	//暂停
	if(audio.paused){
		audio.play();
		if(window.localStorage){
			localStorage.setItem("isPaused","false");
		}
		$(".Music").attr("src","img/music.png");
	}else{
		audio.pause();
		if(window.localStorage){
			localStorage.setItem("isPaused","true");
		}
		$(".Music").attr("src","img/quiet.png");
	}
});
