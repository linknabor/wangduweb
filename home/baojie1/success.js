avalon.ready(function() {
	function getBillId(){
		o.billId=getUrlParam("oId");
	}
	function query(){
		common.invokeApi("GET","/baojie/get/"+o.billId,null,null,
		function(n){
			console.log(JSON.stringify(n));
			o.bill=n.result;
		},
		function(){
			alert('获取订单信息失败，返回首页！')
	    });
	}
		
		var o = avalon.define({
        $id: "root",
    	bill:{},
        billId:"",
		});
	getBillId();
	query();
	avalon.scan(document.body);
    common.setTitle("预约成功");
});