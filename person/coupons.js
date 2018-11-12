avalon.ready(function() {
    function q() {
        common.invokeApi("GET", "couponSummary", null, null, function(n) {
        	o.summary = n.result;
        }, function() {
        	alert("获取现金券信息失败！");
        });
    }
    var o = avalon.define({
        $id: "root",
        summary:{validCount:0,validCoupons:[],invalidCoupons:[],invalidCount:0},
        coupon:{},
        invalidPage:0,
        moreInvalid:true,
        showdetail:false,
        hideDetail:function(){
        	o.showdetail=false;
        },
        showDetailCoupon:function(index,valid) {
        	if(valid) {
        		o.coupon=o.summary.validCoupons[index];
        		o.showdetail=true;
        	} else {
        		o.coupon=o.summary.invalidCoupons[index];
        		o.showdetail=true;
        	}
        },
        gotoSales:function(){
        	if(o.coupon.suggestUrl!=null&&o.coupon.suggestUrl!="") {
            	location.href=o.coupon.suggestUrl;
        	} else {
            	location.href="../group/onsalesindex.html";
        	}
        },
        moreCoupon:function(){
        	common.invokeApi("GET", "invalidCoupons/"+o.invalidPage, null, null, function(n) {
        		if(n.result&&n.result.length>0){
                	o.summary.invalidCoupons=n.result;
                	o.invalidPage++;
        		} else {
        			o.moreInvalid=false;
        			alert("已显示全部现金券！");
        		}
            }, function() {
            	alert("获取现金券信息失败！");
            });
        }
    });
    q();
    avalon.scan(document.body);
    common.setTitle("我的现金券");
});