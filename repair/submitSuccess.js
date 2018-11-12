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
	    common.invokeApi("GET", "repair/query/"+o.orderId, null, null, function(n){
	    	o.repairOrder = n.result;
	    	o.typeName = typeConfig[o.repairOrder.repairType][0];
	    }, function(n){
	    	alert("获取成功列表信息失败，请去维修记录中查看！");
	    });
	}

    var o = avalon.define({
        $id: "root",
        typeName:"",
        orderId:0,
        repairOrder:{publicProject:false},
        goback:function(){
        	location.href = "../wuye/index.html";/**"ordersDetail.html?oId="+o.orderId;*/
        }
    });
    avalon.scan(document.body);
	queryOrder();
});