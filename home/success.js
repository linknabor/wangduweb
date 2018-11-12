avalon.ready(function() {
	function getOrderId(){
		o.orderId=getUrlParam("orderId");
	}
    function query() {
        var n = "GET",
        a = "yuyueOrders/"+o.orderId,
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
            o.order = n.result;
            if(o.order == null || o.order.id == null){
            	if(confirm("获取预约信息失败，返回到家首页！")){
    				location.href="index.html";
    			};
            }
        },
        r = function() {
        	if(confirm("获取预约信息失败，返回到家首页！")){
				location.href="index.html";
			};
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    var o = avalon.define({
        $id: "root",
        order:{},
        orderId:""
    });
    getOrderId();
    query();
    avalon.scan(document.body);
    //share.default_send(),
    FastClick.attach(document.body);
});