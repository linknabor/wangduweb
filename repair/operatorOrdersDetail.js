avalon.ready(function() {

	initWechat(['previewImage']);
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
		var orderId = getUrlParam('oId');
	    common.invokeApi("GET", "operator/repair/query/repairId/"+orderId, null, null, function(n){
	    	var order = n.result;
	    	o.typeName = typeConfig[order.repairType][0];
	    	o.typeImg = typeConfig[order.repairType][1];
	    	o.imgUrlList = order.imgUrlList;
	    	o.commentImgUrlList = order.commentImgUrlList;
	    	o.item=order;
	    }, function(n){
	    	if(n.errorCode==9999){
	    		alert(n.message);
	    		location.href="operatorOrders.html";
	    	} else {
	    		alert("获取维修信息失败，请去维修记录中查看！");
	    	}
	    });
	}
    var o = avalon.define({
        $id: "root",
        item:{},
        typeName:"",
        typeImg:"",
        imgUrlList:[],
        commentImgUrlList:[],
        finish:function(){
        	common.invokeApi("GET", "operator/repair/finish/"+o.item.id, null, null, function(n){
                location.href = "operatorRepairSuccess.html?oId="+getUrlParam('oId');
    	    }, function(n){
    	    	alert("系统异常，请稍后重试！");
    	    });
        },
        accept:function(){
        	if(confirm("确定要抢下该单吗？")){
        		common.invokeApi("GET", "operator/accept/"+o.item.id, null, null, function(n){
                    location.href = "operatorRepairSuccess.html?oId="+getUrlParam('oId');
        	    }, function(n){
        	    	alert("系统异常，请稍后重试！");
        	    });
        	}
        },
        deleteOrder:function(){
        	if(confirm("确定要删除该订单吗？")){
        		common.invokeApi("GET", "operator/repair/delete/"+o.item.id, null, null, function(n){
                    location.href = "operatorOrders.html";
        	    }, function(n){
        	    	alert("系统异常，请稍后重试！");
        	    });
        	}
        },
        showPhoto:function(idx){
        	wx.previewImage({
        	    current: o.imgUrlList[idx], // 当前显示图片的http链接
        	    urls: o.imgUrlList // 需要预览的图片http链接列表
        	});
        }
    });
    avalon.scan(document.body);
    queryOrder();
});