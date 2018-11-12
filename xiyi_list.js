var o;
function gotoPage(pageUrl) {
	location.href=pageUrl;
}
avalon.ready(function(){
	function requestPay(idx,event) {
        common.invokeApi("POST", "/yunxiyi/pay/"+o.orderList[idx].id, null, null, function(n) {
        	wx.chooseWXPay({
              "timestamp":n.result.timestamp,
              "nonceStr":n.result.nonceStr,
              "package":n.result.pkgStr,
              "signType":n.result.signType,
              "paySign":n.result.signature,
        	   success: function (res) {
        	   	   common.invokeApi("GET", "/yunxiyi/notifyPayed/"+o.orderList[idx].id);
        		   o.orderList[idx].statusStr="已支付";
        		   o.orderList[idx].status=2;
        	   }
        	});
        }, function(n) {
		    alert(n.message?"支付请求失败，请稍后重试！":n.message);
        });
        event.stopPropagation();
    };
	o = avalon.define({
		$id:"root",
		orderList:[],
		inited:false,
		gotoDetail:function(idx) {
			if(o.orderList[idx].status<8){
				location.href="xiyi_detail.html?oId="+o.orderList[idx].id;
			}
		},
		pay:requestPay,
		cancel:function(idx,event){
			common.invokeApi("POST","yunxiyi/bill/"+o.orderList[idx].id+"/cancel",null,null,function(n){
				o.orderList[idx].status=8;
				o.orderList[idx].statusStr="已取消";
			},function(n){
				alert(n.message?"订单取消失败，请稍后重试！":n.message);
			});
			event.stopPropagation();
		}
	});
	initWechat(['chooseWXPay','onMenuShareTimeline','onMenuShareAppMessage']);
	avalon.scan(document.body);
	common.invokeApi("POST","yunxiyi/bills/0",null,null,function(n){
		o.orderList=n.result;
		o.inited = true;
	},function(n){
		o.inited = true;
		alert("订单数据获取失败，请稍后重试！");
	})
    
})
