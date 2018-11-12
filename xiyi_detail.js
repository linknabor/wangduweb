var o;
avalon.ready(function(){
	function requestPay(orderId) {
        common.invokeApi("POST", "/yunxiyi/pay/"+orderId, null, null, function(n) {
        	wx.chooseWXPay({
              "timestamp":n.result.timestamp,
              "nonceStr":n.result.nonceStr,
              "package":n.result.pkgStr,
              "signType":n.result.signType,
              "paySign":n.result.signature,
        	   success: function (res) {
        	   	   common.invokeApi("GET", "/yunxiyi/notifyPayed/"+orderId);
        	        // 支付成功后的回调函数
        		   alert("支付成功！");
        		   o.bill.status=2;
        	   }
        	});
        }, function(n) {
        	alert(n.message==null?"支付请求失败，请稍后重试！":n.message);
        })
    };
	o = avalon.define({
		$id:"root",
		bill:{},
		cancelOrder:function(){
			common.invokeApi("POST","yunxiyi/bill/"+getUrlParam("oId")+"/cancel",null,null,function(n){
				o.bill.status=8;
			},function(){
				alert("订单取消失败，请稍后重试！");
			})
		},
		sign:function(){
			common.invokeApi("POST","yunxiyi/bill/"+getUrlParam("oId")+"/signed",null,null,function(n){
				o.bill.status=7;
			},function(){
				alert("订单签收失败，请稍后重试！");
			})
		},
		pay:function(){
			requestPay(getUrlParam("oId"));
		}
	});
	initWechat(['chooseWXPay','onMenuShareTimeline','onMenuShareAppMessage']);
	
	avalon.scan(document.body);
	common.invokeApi("POST","yunxiyi/bill/"+getUrlParam("oId"),null,null,function(n){
		o.bill=n.result;
	},function(){
		alert("订单数据获取失败，请稍后重试！");
	})
})