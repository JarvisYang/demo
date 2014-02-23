var waitingDot = function(waitBoxName){
	this.$ = function(className){
	    return document.getElementsByClassName(className)[0];
	};

	this.getCss = function(obj){
	    return window.getComputedStyle(obj,false);
	};

	this.waitingTime;
	this.eachTime = 4;
	this.waitBoxWidth = parseFloat(this.getCss(this.$(waitBoxName)).width);
	this.waitDotWidth = parseFloat(this.getCss(this.$(waitBoxName).children[0]).width);
	this.Vstart = 15;
	this.Vconst = 3;
	this.speedChangeDis = (this.waitBoxWidth + this.waitDotWidth*2 - 5*this.Vconst*this.eachTime)/2.0;
	this.a = (this.Vconst*this.Vconst - this.Vstart*this.Vstart)/(2.0*this.speedChangeDis);
	this.decTime = (this.Vconst - this.Vstart)/this.a;
	this.conTime = this.eachTime*5;
	this.accTime = this.decTime;
	this.constBegin = this.Vstart*this.decTime + 0.5*this.a*this.decTime*this.decTime;
	this.accBegin = this.constBegin + this.Vconst*this.conTime;
	this.status =  new Array(8);
	this.timeNow = new Array(8);
	this.Obj = this.$(waitBoxName).children;
	this.waitDotLength = this.Obj.length;
	console.log(waitBoxName,this.Obj,this.waitDotLength);

	this.waitingShow = function(){
		this.waitDotMove();
	};

	this.waitDotMove = function(){

		for(var i = 0;i < this.waitDotLength;++i){
			this.status[i] = 0;
			this.timeNow[i] = 0 - this.eachTime*i;
		};
		var loopObj = this;
		this.waitingTime = setInterval(function(){
				for(var i = 0;i < loopObj.waitDotLength;++i){
					switch(loopObj.status[i]){
						case 0:
							if(loopObj.timeNow[i] >= 0){
								if(loopObj.timeNow[i] < loopObj.decTime){
									loopObj.Obj[i].style.left = (0 - loopObj.waitDotWidth + loopObj.Vstart*loopObj.timeNow[i] + 0.5*loopObj.a*loopObj.timeNow[i]*loopObj.timeNow[i]) + "px";
									loopObj.Obj[i].style.opacity = loopObj.timeNow[i]/loopObj.decTime;
									loopObj.timeNow[i] += 1;
									break;
								}
								else{
									loopObj.timeNow[i] = 0;
									loopObj.status[i] = 1;
								};
							}
							else{
								++loopObj.timeNow[i];
								break;
							};
						case 1:
							if(loopObj.timeNow[i] < loopObj.conTime){
								loopObj.Obj[i].style.left = (0 - loopObj.waitDotWidth + loopObj.constBegin + loopObj.Vconst*loopObj.timeNow[i]) + "px";
								loopObj.timeNow[i] += 1;
								break;
							}
							else{
								loopObj.timeNow[i] = 0;
								loopObj.status[i] = 2;
							};
						case 2:
							if(loopObj.timeNow[i] < loopObj.accTime){
								loopObj.Obj[i].style.left = (0 - loopObj.waitDotWidth + loopObj.accBegin + loopObj.Vconst*loopObj.timeNow[i] - 0.5*loopObj.a*loopObj.timeNow[i]*loopObj.timeNow[i]) + "px";
								loopObj.Obj[i].style.opacity = 1 - loopObj.timeNow[i]/loopObj.accTime;
								loopObj.timeNow[i] += 1;
								break;
							}
							else{
								if(i === (loopObj.waitDotLength - 1)){
									clearInterval(loopObj.waitingTime);
									setTimeout(loopObj.waitDotMove(),500);
								};
							};
					};
				};
			},30);
	};

	this.setWaitDotLeft = function(){
		for(var i = 0;i < this.waitDotLength;++i){
			this.Obj[i].style.left = (0 - this.waitDotWidth) + "px";
		};
	};

	this.setWaitDotOpacity = function(){
		for(var i = 0;i < this.waitDotLength;++i){
			this.Obj[i].style.opacity = 0;
		};
	};

	this.waitingStop = function(){
		clearInterval(this.waitingTime);
		this.setWaitDotLeft();
		this.setWaitDotOpacity();
	};
};

window.onload = function(){
	var waiting = new waitingDot("waitBox")
	waiting.waitingShow();
};