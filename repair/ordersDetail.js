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
		var orderId = getUrlParam('oId');
	    common.invokeApi("GET", "repair/query/"+orderId, null, null, function(n){
	    	var order = n.result;
	    	o.typeName = typeConfig[order.repairType][0];
	    	o.typeImg = typeConfig[order.repairType][1];
	    	o.imgUrlList = order.imgUrlList;
	    	o.commentImgUrlList = order.commentImgUrlList;
	    	if(order.operatorTel!=null&&order.operatorTel!=""){
	    		o.oTel="tel:"+order.operatorTel;
	    	}
	    	if(order.payType==1){
        		o.payTypeName="微信支付";
	    	}
	    	o.item=order;
	    }, function(n){
	    	alert("获取维修信息失败，请去维修记录中查看！");
	    });
	}
    var o = avalon.define({
        $id: "root",
        item:{},
        typeName:"",
        typeImg:"",
        payTypeName:"现金支付",
        oTel:"#",
        imgUrlList:[],
        commentImgUrlList:[],
        cancel:function(){
            location.href = "cancelOrders.html?oId="+getUrlParam('oId');
        },
        finish:function(){
        	if(confirm("确认完工后，进入付费操作")){
        		common.invokeApi("GET", "repair/finish/"+o.item.id, null, null, function(n){
                    location.href = "../repairPay.html?oId="+o.item.id;
        	    }, function(n){
        	    	alert("系统异常，请稍后重试！");
        	    });
        	}
        },
        deleteOrder:function(){
        	if(confirm("确认删除该维修单？")){
        		common.invokeApi("GET", "repair/delete/"+o.item.id, null, null, function(n){
                    location.href = "myRepair.html";
        	    }, function(n){
        	    	alert("系统异常，请稍后重试！");
        	    });
        	}
        },
        comment:function(){
        	location.href = "comment.html?oId="+o.item.id;;
        },
        back:function(){
        	location.href = "myRepair.html";
        },
        showPhoto:function(idx){
        	wx.previewImage({
        	    current: o.imgUrlList[idx], // 当前显示图片的http链接
        	    urls: o.imgUrlList // 需要预览的图片http链接列表
        	});
        },
        showCommentPhoto:function(idx){
        	wx.previewImage({
        		current: o.commentImgUrlList[idx], // 当前显示图片的http链接
        		urls: o.commentImgUrlList // 需要预览的图片http链接列表
        	});
        }
    });
    avalon.scan(document.body);
    queryOrder();
});