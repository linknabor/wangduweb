avalon.ready(function() {
	function getOrderId(){
		o.orderId=getUrlParam("orderId");
	}
	function getGroupState(){
		if(o.order.groupStatus == 1){
			return "拼单中";
		}else if(o.order.groupStatus == 2){
			return "拼单完成";
		}else if(o.order.groupStatus == 3){
			return "拼单失败";
		}else if(o.order.groupStatus == 4){
			return "意向达成";
		}else if(o.order.groupStatus == 5){
			return "待拼单";
		}
	}
	function getTimeStr(){
		if(o.order.receiveTimeType == 0){
			return "工作日";
		}else if(o.order.receiveTimeType == 1){
			return "节假日";
		}else if(o.order.receiveTimeType == 2){
			return "任何时间";
		}
	}
    function getOrder() {
        var n = "GET",
        a = "getOrder/"+o.orderId,
        i = null,
        e = function(n) {
            console.log(JSON.stringify(n));
            o.order = n.result;
            o.timeStr = getTimeStr();
			o.groupStatusStr = getGroupState();
        },
        r = function() {
        	alert("获取订单信息失败！");
        	location.href="orders.html";
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    function pay(order) {
    	var n = "GET",
        a = "/requestPay/"+order.id,
        i = null,
        e = function(n) {
        	wx.chooseWXPay({
              "timestamp":n.result.timestamp,
              "nonceStr":n.result.nonceStr,
              "package":n.result.pkgStr,
              "signType":n.result.signType,
              "paySign":n.result.signature,
        	    success: function (res) {
                  	notifyPaySuccess();
                  	order.status=1;
        	    }
        	});
        },
        r = function() {
			alert("支付请求失败，请稍后重试！");
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    function notifyPaySuccess() {
    	var n = "GET",
        a = "notifyPayed/"+o.order.id,
        i = null,
        e = function(n) {},
        r = function() {};
        common.invokeApi(n, a, i, null, e, r)
    }
    function orderCancel(order) {
    	var n = "GET",
        a = "/cancelOrder/"+order.id,
        i = null,
        e = function(n) {
           order.status=2;
           order.statusStr="已取消";
           alert("订单已取消");
        },
        r = function() {
			alert("支付取消失败，请稍后重试！");
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    function orderConfirm(order) {
    	var n = "GET",
        a = "/signOrder/"+order.id,
        i = null,
        e = function(n) {
           order.status=6;
           order.statusStr="已签收";
        },
        r = function() {
			alert("支付签收失败，请稍后重试！");
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    function updateLeftTime(){
    	o.groupLeftTime=getLeftTimeFormat(o.group.leftSeconds--);
    }
    var o = avalon.define({
        $id: "root",
        orderId:"",
        order:{},
        group:{},
        groupStatusStr:"",
        timeStr:"",
    	gotoGroupDetail:function(order){
    		window.location.href = "group/rgroupinvite.html?ruleId="+ order.groupRuleId + "&share=1";
    	},
        orderPay: function(order) {
			pay(order);
        },
        orderCancel: function(order) {
			if(confirm("确认要取消该订单？")){
				orderCancel(order);
			}
        },
        comment:function(order){
        	window.location.href="group/comment.html?orderId="+order.id;
        },
        orderConfirm:function(order){
        	if(confirm("确定要已收货？")){
        		orderConfirm(order);
        	}
        },
	    checkLogisics: function(order){
	    	var  logisticName = escape(order.logisticName);
			location.href = "logistics.html?com=" + logisticName+"&nu="+order.logisticNo; 
	    },
        groupLeftTime:"已结束"
    });

    initWechat(['chooseWXPay']) ;
    getOrderId();
    getOrder();
    avalon.scan(document.body);
    //share.default_send();
    FastClick.attach(document.body);
	common.setTitle("订单详情");
});