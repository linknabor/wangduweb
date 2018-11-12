function getLeftTimeFormat(iRemain){
    if(iRemain > 0){
        var iDay=parseInt(iRemain/86400);
        iRemain%=86400;

        var iHour=parseInt(iRemain/3600);
        iRemain%=3600;

        var iMin=parseInt(iRemain/60);
        iRemain%=60;

        var iSec=iRemain;
        
        var resStr = "剩";
        if(iDay!=0){
            resStr+=iDay+"天";
            if(iHour!=0){
                resStr+=iHour+"小时";
            }
            return resStr;
        } else if(iHour!=0){
            resStr+=iHour+"小时";
            if(iMin!=0){
                resStr+=iMin+"分";
            }
            return resStr;
        } else {
            if(iMin!=0){
                resStr+=iMin+"分";
            }
            if(iSec!=0){
                resStr+=iSec+"秒";
            }
            return resStr;
        }
    }else{
        return "已结束";
    }
}

function getLeftTimeFormat2(iRemain){
    if(iRemain > 0){
        var iDay=parseInt(iRemain/86400);
        iRemain%=86400;
        
        var iHour=parseInt(iRemain/3600);
        iRemain%=3600;

        var iMin=parseInt(iRemain/60);
        iRemain%=60;

        var iSec=parseInt(iRemain);
        
        var resStr = "剩余  ";
        if(iDay>0) {
            resStr += iDay+"天 "
        }
        if(iDay<=0&&iHour<=0) {
        } else if(iHour<10){
            resStr += "0"+iHour+":"
        } else {
            resStr += iHour+":"
        }
        
        if(iMin<10){
            resStr += "0"+iMin+":"
        } else {
            resStr += iMin+":"
        }
        
        if(iSec<10){
            resStr += "0"+iSec;
        } else {
            resStr += iSec;
        }
        return resStr + " 结束";
    }else{
        return "已结束";
    }
}
function drawProcess(canvas,x,y,radius,process,backColor,proColor,fontColor){
    if(process == undefined || process == null) {
        return;
    }
    if (canvas.getContext) {
        var cts = canvas.getContext('2d');
    }else{
        return;
    }
    
    //画圆
    cts.beginPath();  
    // 坐标移动到圆心  
    cts.moveTo(x, y);  
    // 画圆,圆心是24,24,半径24,从角度0开始,画到2PI结束,最后一个参数是方向顺时针还是逆时针  
    cts.arc(x, y, radius, 0, Math.PI * 2, false);  
    cts.closePath();  
    cts.fillStyle = backColor;  
    cts.fill();

    //画扇形
    cts.beginPath();  
    // 画扇形的时候这步很重要,画笔不在圆心画出来的不是扇形  
    cts.moveTo(x, y);  
    // 跟上面的圆唯一的区别在这里,不画满圆,画个扇形  
    cts.arc(x, y, radius, Math.PI * 1.5, Math.PI * 1.5 +  Math.PI * 2 * process / 100, false);  
    cts.closePath();  
    cts.fillStyle = proColor;  
    cts.fill(); 
    
    //填充背景白色
    cts.beginPath();  
    cts.moveTo(x, y); 
    cts.arc(x, y, radius - (radius * 0.04), 0, Math.PI * 2, true);  
    cts.closePath();
    cts.fillStyle = 'rgba(255,255,255,1)';  
    cts.fill(); 

    // 画一条线  
    cts.beginPath();  
    cts.arc(x, y, radius-(radius*0.04), 0, Math.PI * 2, true);  
    cts.closePath();  
    // 与画实心圆的区别,fill是填充,stroke是画线  
    cts.strokeStyle = backColor;  
    cts.stroke();  
      
    //在中间写字 
    cts.font = "8pt Arial";  
    cts.fillStyle = fontColor;  
    cts.textAlign = 'center';  
    cts.textBaseline = 'middle';  
    cts.moveTo(x, y-7);  
    cts.fillText(process+"%", x, y-7);  
    
    cts.moveTo(x, y+7);  
    var statusStr = process<100?"进行中":"已成团";
    cts.fillText(statusStr, x, y+7);  
    
    var circleX = x + Math.sin(Math.PI * 2 * process / 100) * (radius-1.6);
    var circleY = y - Math.cos(Math.PI * 2 * process / 100) * (radius-1.6);
    cts.beginPath();  
    cts.moveTo(circleX, circleY); 
    cts.arc(circleX, circleY, 3, 0, Math.PI * 2, true);  
    cts.closePath();
    cts.fillStyle = proColor;  
    cts.fill(); 
}
Date.prototype.format = function(fmt){ 
      var o = {   
        "M+" : this.getMonth()+1,               
        "d+" : this.getDate(),                   
        "h+" : this.getHours(),                 
        "m+" : this.getMinutes(),              
        "s+" : this.getSeconds(),                
        "q+" : Math.floor((this.getMonth()+3)/3), 
        "S"  : this.getMilliseconds()          
      };   
      if(/(y+)/.test(fmt))   
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
      for(var k in o)   
        if(new RegExp("("+ k +")").test(fmt)) 
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ?
                         (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
     return fmt;   
} 