avalon.ready(function() {
	
	function getUserPayType(){
		
		o.userPayType=getUrlParam("userPayType");
		o.payAddr = getUrlParam("payAddr");
		o.payAddr = unescape(o.payAddr);
		o.totalPrice = getUrlParam("totalPrice");
		
	}

    var o = avalon.define({
        $id: "root",
        userPayType:'1',
        payAddr:'',
        totalPrice:0.00,
        
        goback:function(){
        	location.href = MasterConfig.C("basePageUrl")+"wuye/index.html";
        },
    
    	viewAnnoucement: function(){
    		location.href = MasterConfig.C("basePageUrl")+"communities/annoucementDetail2.html";
    	}
        
    });

    function showContent(){
    	
    	var content = "";
    	if(o.userPayType=="0"){	//新用户手册支付
    		
    		content = "您将获得由东湖e家园赠送的价值79元单品种鲜花一束及“为颠覆传统而生”的贝思客蛋糕35元现金券一张。具体活动规则及赠品信息详见“社区公告”。";
    	
    	}else if (o.userPayType=="1") {	//老用户首次支付
    		
    		content = "您将获得由东湖e家园赠送的价值9.8元黑龙江五常稻花香大米试吃装（1斤装）一包及“为颠覆传统而生”的贝思客蛋糕35元现金券一张。具体活动规则及赠品信息详见“社区公告”。";
		
    	}else if (o.userPayType=="2") {	//老用户非首次支付
			
    		content = "您将获得由东湖e家园赠送的 “为颠覆传统而生”的贝思客蛋糕35元现金券一张。具体活动规则及赠品信息详见“社区公告”。";
    		
		}
    	var p = "<p>"+content+"</p>";
    	$("#content").html(p);
    
    }
    
    getUserPayType();
    showContent();
    avalon.scan(document.body);
    FastClick.attach(document.body);
});