 	//上方滚动条
 	window.onload = function(){
 		function getStyle(obj,style) {  
			if(obj.currentStyle) {  
				return obj.currentStyle[style];  
			}else{  
				return getComputedStyle(obj)[style];  
			}  
		}
 		var p = document.getElementsByClassName('p')[0];
 		//console.log(p);
 		var time = setInterval(function(){
 			var now = parseInt(getStyle(p,'left'));//获取当前位置
 			//console.log(now);
 			if(now ==-350){
 				p.style.left = '850px';
 			}else{
 				p.style.left = now-3+'px';
 			}
 		},80);

 	}
	//下边循环滚动图
	var box = document.getElementById('box');
	var oNavlist = document.getElementById('nav').children;
	var slider = document.getElementById('slider');
	var left = document.getElementById('left');
	var right = document.getElementById('right');
	var index = 1;
	var timer;
	var isMoving = false;
	//轮播下一张
	function next(){
		if(isMoving){//消除连续点击影响
			return;//不再执行下边代码
		}
		isMoving = true;
		index++;
		navStyle();
		animate(slider,{left:-1200*index},function(){
			if(index === 6){
				slider.style.left = "-1200px";
				index = 1;
			}
			isMoving = false;
		});
	}
	function prev(){
		if(isMoving){
			return;
		}
		isMoving = true;
		index--;
		navStyle();
		animate(slider,{left:-1200*index},function(){
			if(index === 0){
				slider.style.left = "-6000px";
				index = 5;
			}
			isMoving = false;9
		});
		
	}
	var timer = setInterval(next,3000);
	//鼠标划入清定时器
	box.onmouseover = function(){
			animate(left,{opacity:50});
			animate(right,{opacity:50});
			clearInterval(timer);
		}
	//鼠标划出开定时器
	box.onmouseout = function(){
		animate(left,{opacity:0});
		animate(right,{opacity:0});
		timer = setInterval(next,3000);
	}
	right.onclick = next;
	left.onclick = prev;

	for(var i = 0;i<oNavlist.length;i++){
		oNavlist[i].idx = i;
		oNavlist[i].onclick = function(){
			index = this.idx + 1;
			navStyle();
			animate(slider,{left:-1200*index})
		}
	}
	//小按钮样式改变
	function navStyle(){
		for(var i = 0;i<oNavlist.length;i++){
			oNavlist[i].className = '';
			oNavlist[i].style.color = '';
			if(i === 0){//第一个标签数字一直为红色
				oNavlist[i].style.color = 'red';
			}
		}
		if(index > 5){
			oNavlist[0].style.color = 'white';
			oNavlist[0].className = 'active';

		}else if(index === 0){
			oNavlist[4].style.color = 'white';
			oNavlist[4].className = 'active';
		}else{
			oNavlist[index-1].className = 'active';
			oNavlist[index-1].style.color = 'white';
		}
		 
	}