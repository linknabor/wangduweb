var orderId = getUrlParam("oId");
avalon.ready(function() {
    common.invokeApi("POST", "/yunxiyi/notifyPayed/"+orderId);
	common.invokeApi("POST","yunxiyi/bill/"+orderId,null,null,function(n){
		o.bill=n.result;
	},function(){
		alert("订单数据获取失败，请稍后重试！");
	})
    var o = avalon.define({
        $id: "root",
        bill:{},
        gotoBack:function(){
        	location.href="../index.html";
        }
    });
    
    avalon.scan(document.body);
});