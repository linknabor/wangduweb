/**
 * 1. 红包由外部设置setupCoupons(coupons),
 * 2. 需实现红包选中回调chooseCoupon(coupon)
 * 3. 可使用filterCouponByAmount进行金额过滤
 * 4. 可使用getCouponNum获取红包个数
 */
var coupon_root;
function setupCoupons(coupons) {
	coupon_root.coupons= coupons;
	coupon_root.allCoupons = coupons;
}
function getCouponNum(){
	return coupon_root.coupons.length;
}
function filterCouponByAmount(amount) {
	var c = [];
	for(var i=0;i<coupon_root.allCoupons.length;i++){
		if(coupon_root.allCoupons[i].usageCondition<=amount){
			c.push(coupon_root.allCoupons[i]);
		}
	}
	coupon_root.coupons= c;
}
function initCoupons(){
	coupon_root = avalon.define({
        $id: "coupon_root",
        selectedIndex:-1,
        coupons:[
        ],
        allCoupons:[],
        chooseCoupon:function(index){
        	if(coupon_root.selectedIndex != index){
            	coupon_root.selectedIndex = index;
        	} else {
        		coupon_root.selectedIndex = -1;
        	}
        },
        confirm:function(){
        	if(coupon_root.selectedIndex < 0 || coupon_root.selectedIndex>=coupon_root.coupons.length){
        		chooseCoupon(null);
        	} else {
        		chooseCoupon(coupon_root.coupons[coupon_root.selectedIndex]);/*使用处需要实现该方法*/
        	}
        }
    });
    avalon.scan(document.getElementById('coupon_root'));
}
avalon.ready(function(){
	initCoupons();
});
    
