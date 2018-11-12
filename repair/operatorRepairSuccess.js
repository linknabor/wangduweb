avalon.ready(function() {
	var typeConfig={
    	1:["浴室维修","images/icon_btn_yushiweixiu_03.png"],
    	2:["厨房维修","images/icon_btn_chufangweixiu_03.png"],
    	3:["客厅卧室维修","images/icon_btn_ketingweixiu_03.png"],
    	4:["强弱电维修","images/icon_btn_qiangruodianweixiu_03.png"],
    	5:["门窗维修","images/icon_btn_menchuanweixiu_03.png"],
    	6:["其它维修","images/icon_btn_qitaweixiu_03.png"],
        7:["家电","images/icon_btn_jiadian.png"]
    };
	function queryOrder(){
		o.orderId = getUrlParam('oId');
	    common.invokeApi("GET", "operator/repair/query/repairId/"+o.orderId, null, null, function(n){
	    	o.repairOrder = n.result;
	    	o.typeName = typeConfig[o.repairOrder.repairType][0];
	    	if(n.result.opStatus == 2){
	    		o.title="抢单成功";
	    		o.desc="恭喜你抢到了一份维修订单";
	    	}
	    	if(n.result.payType == 1) {
	    		o.payTypeName="微信支付";
	    	}
	    }, function(n){
	    	alert("获取成功列表信息失败，请去维修记录中查看！");
	    });
	}

    var o = avalon.define({
        $id: "root",
        title:"维修成功",
        desc:"感谢您让居民生活变得更美好",
        orderId:0,
        typeName:"",
        payTypeName:"现金支付",
        repairOrder:{publicProject:false},
        goback:function(){
        	location.href = "operatorOrders.html";
        },
        goDetail:function(){
        	location.href = "operatorOrdersDetail.html?oId="+o.orderId;
        }
    });
    avalon.scan(document.body);
	queryOrder();
});