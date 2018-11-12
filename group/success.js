avalon.ready(function() {
	function getOrderId(){
		o.orderId=getUrlParam("orderId");
		o.type=getUrlParam("type");
	}
	function notifyPaySuccess() {
        common.invokeApi("GET", "notifyPayed/"+o.orderId, null, null, function(n) {
    	}, function() {
    		
    	});
    }
	function initShareSetting(order){
		var title = order.productName;
		var link=MasterConfig.C('basePageUrl')+"group/onsalesindex.html";
		if(order.orderType==4){
			link=MasterConfig.C('basePageUrl')+"group/rgroupinvite.html?ruleId="+order.groupRuleId;
		}else if(order.orderType==0&&order.groupId!=0){
			link=MasterConfig.C('basePageUrl')+"group.html?groupId="+order.groupId;
		}

		var desc="分享给小伙伴们一个超赞的限时特惠活动！";
		var img=order.productPic;
		if(order.seedStr!=null&&order.seedStr!=''){
			title = "东湖e家园专享现金券";
			desc="分享给小伙伴们一个超赞的购物现金券！";
			img=MasterConfig.C('basePageUrl')+"static/images/coupon_share_icon.jpg"
			link=MasterConfig.C('basePageUrl')+"coupon.html?o="+order.seedStr;
		}
		initShareConfig(title,link,img,desc);
	}
    function query() {
        var n = "GET",
        a = "getOrder/"+o.orderId,
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
            o.order = n.result;
            if(o.order == null || o.order.id == null){
            	if(confirm("获取订单信息失败")){
		        	if(o.type==4){
		        		location.href="rgroups.html";        		
		        	}else if(o.type==3){
		        		location.href="onsalesindex.html";
		        	}else if(o.type==5){
		        		location.href="../home/index.html?v=20160229";
		        	}else{
		        		location.href="onsalesindex.html";     		
		        	}
    			}
            } else {
				initShareSetting(o.order);
			}
        },
        r = function() {
        	if(confirm("获取订单信息失败")){
		        	if(o.type==4){
		        		location.href="rgroups.html";        		
		        	}else if(o.type==3){
		        		location.href="onsalesindex.html";
		        	}else if(o.type==5){
		        		location.href="../home/index.html?v=20160229";
		        	}else{
		        		location.href="onsalesindex.html";     		
		        	}
			};
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    var o = avalon.define({
        $id: "root",
        order:{seedStr:""},
        orderId:"",
        coupon:{id:0},
        goback:function(){
        	if(o.type==4){
        		location.href="rgroups.html";
        	}else if(o.type==3){
        		location.href="onsalesindex.html";
        	}else if(o.type==5){
        		location.href="../home/index.html?v=20160229";
        	}else{
        		location.href="onsalesindex.html";
        	}
        }
    });
    getOrderId();
    notifyPaySuccess();
    query();
    initWechat(['onMenuShareTimeline','onMenuShareAppMessage']);
    
    avalon.scan(document.body);
});