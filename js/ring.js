function Ring(){
	this.body = document.getElementById("ring");
	var players = document.getElementsByClassName("player");
   
     function getmatrix(a,b,c,d,e,f){
        var aa=Math.round(180*Math.asin(a)/ Math.PI);
        var bb=Math.round(180*Math.acos(b)/ Math.PI);
        var cc=Math.round(180*Math.asin(c)/ Math.PI);
        var dd=Math.round(180*Math.acos(d)/ Math.PI);
        var deg=0;
        if(aa==bb||-aa==bb){
            deg=dd;
        }else if(-aa+bb==180){
            deg=180+cc;
        }else if(aa+bb==180){
            deg=360-cc||360-dd;
        }
        //return deg>=360?0:deg;
        return deg;
    }
    //判断是否颜色相同
    this.same=function(){
    	var player;
    	 var deg=eval('get'+$(this.body).css('transform'));
    	 console.log(deg);
    	 var i;
    	 i=players.length-1;
    	 var player=players[i];
    	console.log(players.length);
    	 console.log(i);
    	 console.log(players);
    	 console.log(players[i]);
    	 console.log(player.mark);
    	if($(player.mark)==1&&deg>0&&deg<125){
    		return true;
    		console.log("活");
    	}
    	else if($(player.mark)==2&&deg>125&&deg<235)
    	{
    		return true;
    		console.log("活");
    	}
    	else if($(player.mark)==0&&deg>235)
    	{
    		return true;
    		console.log("活");
    	}
//  	else{
//  		return false;
//  	}
    }
}
