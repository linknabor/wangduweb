avalon.ready(function() {
	function getBillId(){
		o.billId=getUrlParam("billId");
	}
	function query(){
	    common.invokeApi("GET","/baojie/get/"+o.billId, null, null, 
	    function(n){
	    	console.log(JSON.stringify(n));
	    	o.bill=n.result;
		}, 
	    function(n){
	    	alert('获取订单信息失败！')
	    });
	}
		
		var o = avalon.define({
        $id: "root",
    	bill:{},
    	addressId:"",
        billId:"",
        contact:function(event){
            localtion.href="tel:021-50876295";
            event.stopPropagation();
        },
		});
		
	
	getBillId();
	query();
	avalon.scan(document.body);
    common.setTitle("日常保洁");
});
//var o;
//avalon.ready(function(){
//	function getBillId(){
//		o.billId=getUrlParam("billId");
//	}
//	function query(){
//	    common.invokeApi("GET","/baojie/get/"+o.billId, null, null, 
//	    function(n){
//	    	console.log(JSON.stringify(n));
//	    	o.bill=n.result;
//		}, 
//	    function(n){
//	    	alert('获取订单信息失败！')
//	    });
//	}
//	
//	o = avalon.define({
//		$id:"root",
//		bill:{},
//		contact:function(event){
//          localtion.href="tel:021-50876295";
//          event.stopPropagation();
//      },
//	});
//	query();
//  avalon.scan(document.body);
//	common.setTitle("日常保洁");
//})