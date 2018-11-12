
avalon.ready(function() {
	function query(){
		common.invokeApi("GET","pageconfig/coupons",null,null,function(n){
			o.banner = n.result.topPage;
			o.coupons=n.result.coupons;
		},function(){
			alert("页面获取信息错误，请稍后重试！");
		})
	}
    var o = avalon.define({
        $id: "root",
        banner:'',
        coupons:[],
        gotoCouponDetail:function(idx) {
        	location.href=o.coupons[idx].url;
        }
    });
    avalon.scan(document.body);
    query();
    common.setTitle("红包大派送");
    checkFromShare();
});