//countdown by jun 2017/9/4
//v1.0
//支持倒计时和过去时间累计，单位为：天、时、分、秒
//如需定义样式，使用以下选择器：
//.countdown .countdown-num  //数字样式
//.countdown .countdown-lab	 //标签样式
//使用方法：$("#xxx").countDown(date,[isCountdown]);
(function($){
	if(!($ && $.fn)){
		console.error('jQuery未引入。 --countdown');
		return;
	}
	document.write("<style>.countdown-num{float:left;background:black;color:white;padding:5px;}.countdown-lab{float:left;padding:5px;color:#a0a0a0;}</style>");
	//$date：指定一个日期
	//$isCountdown：是否为倒计时（true:距离这个时间还有多久，false:这个时间已过去多久）
    $.fn.countDown=$.fn.countDown||function($date,$isCountdown){
        var nums=[];
        function setValue(vals){
            for(var i=0,ci;ci=vals[i];i++){
                nums[i].set(ci);
            }
        }
        //时间差值转换
        var time=$date.getTime()- new Date().getTime();
        if($isCountdown) time=-time;
        function getValues(){
            if(time<=0)return ['0','0','0','0'];
            var vals=[];
            vals.push(''+Math.floor(time/(24*60*60*1000)));
            vals.push(''+Math.floor((time%(24*60*60*1000))/(60*60*1000)));
            vals.push(''+Math.floor((time%(60*60*1000))/(60*1000)));
            vals.push(''+Math.floor(time%(60*1000)/1000));
            return vals;
        }
        //初始化设置
        this.addClass("countdown");
        var vals = getValues();
        var labs=['天','时','分','秒'];
        for(var i=0,ci;ci=vals[i];i++){
            nums.push(new num(ci,$("<div class='countdown-num'></div>").appendTo(this)[0]));
            $("<span class='countdown-lab'>"+labs[i]+"</span>").appendTo(this);
        }
        $("<div style='clear:both;'></div>").appendTo(this);
        //循环设置
        var st = setInterval(function(){
            time+=($isCountdown?1000:-1000);
            if(time<=0){
                clearInterval(st);
            }
            setValue(getValues());
        },1000);
    }
    //代表一个数字类
     function num(curVal,dom){
            this.val=curVal;
            this.dom=dom;
            this.dom.style.position='relative';
            this.dom.style.overflow='none';
            this.render();
        }
        num.prototype.render=function () {
            var val = this.val;
            if(val.length<2)val='0'+val;
            this.dom.innerText=val;
        }
        num.prototype.set=function(val){
            if(val!=this.val){
                this.val=val;
                this.render();
            }
        }
})(window.jQuery);