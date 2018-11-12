
function queryAddress(suc) {
    var n = "GET",
    a = "addresses",
    i = null,
    e = suc,
    r = function(n) {
    	alert(n.message==''?"获取地址失败！":n.message);
    };
    common.invokeApi(n, a, i, null, e, r)
}

/****支付下单**********/
function createOrder4Pay(order,suc,fai) {
    var n = "POST",
    a = "createOrder",
    i = order,
    e = function(n) {
    	suc(n);
    	requestPay(n.result.id);
    },
    r = function(n) {
		alert(n.message==null?"订单创建失败，请稍后重试！":n.message);
		fai(n);
    };
    common.invokeApi(n, a, i, null, e, r)
}

function requestPay(orderId) {
	var n = "GET",
    a = "requestPay/"+orderId,
    i = null,
    e = function(n) {
    	wx.chooseWXPay({
          "timestamp":n.result.timestamp,
          "nonceStr":n.result.nonceStr,
          "package":n.result.pkgStr,
          "signType":n.result.signType,
          "paySign":n.result.signature,
    	    success: function (res) {
    	        // 支付成功后的回调函数
              	notifyPaySuccess(orderId);
    	    }
    	});
    },
    r = function(n) {
    	alert(n.message==''?"支付请求失败，请稍后重试！":n.message);
    };
    common.invokeApi(n, a, i, null, e, r)
}
function notifyPaySuccess(orderId) {
	var n = "GET",
    a = "notifyPayed/"+orderId,
    i = null,
    e = function(n) {
		location.href=MasterConfig.C("basePageUrl")+"group/success.html?orderId="+orderId;
	},
    r = function() {
		alert("订单处理中，请稍后查看状态！")
	};
    common.invokeApi(n, a, i, null, e, r)
}
/****支付下单**********/