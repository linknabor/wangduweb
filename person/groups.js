avalon.ready(function() {
	function updateLeftTime(){
		for(var i=0;i<o.groups.length; i++){
			if(o.groups[i].leftTime > 0){
		    o.groups[i].leftTime=o.groups[i].leftTime-1;
		  }
		}
    }
	function getLeftTimeFormat(iRemain){
		if(iRemain > 0){
			var iDay=parseInt(iRemain/86400);
			iRemain%=86400;

			var iHour=parseInt(iRemain/3600);
			iRemain%=3600;

			var iMin=parseInt(iRemain/60);
			iRemain%=60;

			var iSec=iRemain;
			return "剩"+iDay+"天"+iHour+"小时"+iMin+"分"+iSec+"秒"+"结束";
		}else{
			return " ";
		}
	}
	function getGroupStatus(i){
		if(o.groups[i]==undefined || o.groups[i]==null){
			return "";
		}
		if(o.groups[i].status == 1){
			return "正在进行"+ o.groups[i].usedNum+"/"+o.groups[i].ruleNum;
		}else if(o.groups[i].status == 2){
			return "拼单完成";
		}else if(o.groups[i].status == 3){
			return "拼单失败";
		}else if(o.groups[i].status == 4){
			return "意向达成";
		}
	}
    function q() {
    	if(o.isFirst&&o.myGroups.length!=0) {
    		o.groups=o.myGroups;
    	}
    	if(!o.isFirst&&o.joinGroups.length!=0) {
    		o.groups=o.joinGroups;
    	}
        var n = "GET",
        a = "group/"+o.isFirst,
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
            o.groups = n.result;
            if(o.isFirst){
            	o.myGroups = n.result;
            } else {
            	o.joinGroups = n.result;
            }
            o.groupsNum = n.result.length;
        },
        r = function() {
			console.log(JSON.stringify(n));
			o.groups = [];
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    var o = avalon.define({
        $id: "root",
        bg_img:'../static/img/bg/bg_groups.jpg',
        groupsNum: 1,
        tabs: [
            {
                name: '发起的拼单',
                active: true
            },
            {
                name: '参与的拼单',
                active: false
            }
        ],
        isFirst:true,
        changeTab: function(idx) {
        	o.groups=[];
            for (var i = 0, len = o.tabs.length; i < len; i++) {
                o.tabs[i].active = false;
            }
            o.tabs[idx].active = true;
            if(o.tabs[0].active == true){
            	o.isFirst=true;
            }else{
            	o.isFirst=false;
            }
            q();
        },
        leftTimeStrs:function(i){
        	if(o.groups[i]!=undefined&& o.groups[i]!=null && o.groups[i].status==1){
    			return getLeftTimeFormat(o.groups[i].leftTime);
        	} else {
        		return " ";
        	}
        },
        statusStrs:function(i){
        	return getGroupStatus(i);
        },
        dateTimeStrs:function(i){
        	if(o.groups[i]==undefined || o.groups[i]==null){
    			return "";
    		}
        	if(o.groups[i].first == true){
        		return (new Date(o.groups[i].createDate)).format('yyyy-MM-dd hh:mm');
        	}else{
        		return (new Date(o.groups[i].createDate)).format('yyyy-MM-dd hh:mm');
        	}
        },
        creatorName:function(i){
        	if(o.groups[i]==undefined || o.groups[i]==null){
    			return "";
    		}
        	if(o.groups[i].first == true){
        		return "我";
        	}else{
        		return o.groups[i].ownerName;
        	}
        },
        groups:[],
        myGroups: [],
        joinGroups:[],
        gotoGroupDetail:function(group){
        	location.href="../group.html?groupId="+group.id+"&share=1";
        }
    });
    q();
    avalon.scan(document.body);
    setInterval(updateLeftTime,1000);
    //share.default_send();
    FastClick.attach(document.body);  
    common.setTitle("我的拼单");
});