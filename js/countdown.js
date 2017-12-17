function Countdown(){
	this.body = document.createElement("div");
	this.allcount = 20;
	console.log(this.allcount);
	
	this.setCss = function(){
		this.body.className = "countdown";
		document.body.appendChild(this.body);
		
		var countbox = document.createElement("div");
		countbox.className = "countbox"
		this.body.appendChild(countbox);
		
		var countnum = document.createElement("div");
		countnum.className = "countnum"
		this.body.appendChild(countnum);
	}
	
	this.reduce = function(){
		 var _this = this;
		setInterval(function(){
	        _this.allcount-=1;
	     //   console.log(_this.allcount);
	        $(".countnum").css({"height":_this.allcount+"%"});
        },1000);
	}

}
