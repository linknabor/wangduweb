var o;
function chooseAddress(address){
	if(address){
		o.checkedAddress=address;
	}
	o.currentPage='main';
}
function chooseCoupon(coupon) {
	if(coupon == null) {
		o.coupon=null;
		o.couponDesc = '未使用';
	} else {
		o.coupon = coupon;
		o.couponDesc = "￥"+coupon.amount+"元";
	}
	computeAmount();
	o.currentPage='main';
}
function computeAmount(){
	filterCouponByAmount(1000);
	o.couponNum=getCouponNum();
}
avalon.ready(function() {

    
	function queryCoupon() {
        common.invokeApi("GET", "coupon/valid/1/12", null, null, function(n){
        	setupCoupons(n.result);
			computeAmount();
        	o.couponNum=getCouponNum();
        }, function(n){alert('获取现金券信息失败！')});
	}
	
    o = avalon.define({
        $id: "root",
        currentPage:"main",

		address:{},
    	couponNum:0,
    	coupon:null,
    	couponDesc:'未使用',
        showAddress:function(){
        	o.currentPage='addresses';
        	initAddressList();
        },
        showCoupons:function(){
        	o.currentPage='coupons';
        },
        checkedAddress:{}
    });


    avalon.scan(document.body);
    if(common.checkRegisterStatus()) {
    	queryCoupon();
    }
});