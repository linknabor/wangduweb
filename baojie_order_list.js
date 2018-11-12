avalon.ready(function() {
	function query(){
		common.invokeApi("GET","/baojie/query/"+o.page,null,null,function(n) {
			console.log(JSON.stringify(n));
			o.bills=n.result;
			o.page++;
        },
		function() {
        })
	}
	function requestPay(idx) {
        common.invokeApi("POST", "baojie/pay/"+o.bills[idx].id, null, null, function(n) {
            wx.chooseWXPay({
              "timestamp":n.result.timestamp,
              "nonceStr":n.result.nonceStr,
              "package":n.result.pkgStr,
              "signType":n.result.signType,
              "paySign":n.result.signature,
               success: function (res) {
                   common.invokeApi("GET", "baojie/notifyPayed/"+o.bills[idx].id);
                   alert("支付成功！");
                   o.bills[idx].statusStr="已支付";
        		   o.bills[idx].status=2;
               }
            });
        }, function(n) {
            alert(n.message==null?"支付请求失败，请稍后重试！":n.message);
            o.paying=false;
        })
    }
	var o = avalon.define({
        $id: "root",
    	bills:[],
    	bg_img:'static/img/bg/bg_orders.jpg',
        page:0,
        gotoPay:function(idx,event){
            requestPay(idx);
            event.stopPropagation();
        },
        cancel:function(idx,event){
         	common.invokeApi("post","/baojie/cancel/"+o.bills[idx].id,null,null,function(n){
				o.bills[idx].statusStr="已取消";
				o.bills[idx].status=8;
			},function(){
				alert(n.message?"订单取消失败，请稍后重试！":n.message);
			})
         	event.stopPropagation();
         	
        },
        contact:function(event){
            localtion.href="tel:021-50876295";
            event.stopPropagation();
        },
		gotoDetail:function(idx){
            var bill = o.bills[idx];
            location.href="home/baojie1/richang_order_detail.html?billId="+bill.id;
        }
	});
	query();
	avalon.scan(document.body);
	initWechat(['chooseWXPay']);
    common.setTitle("订单列表");
});