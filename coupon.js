var o;
avalon.ready(function() {
	var seedStr;
    function fetchSeed(seedStr) {
        common.invokeApi("GET", "couponSeed/"+seedStr, null, null,  function(n) {
        	if(n.result!=null) {
        		o.seed = n.result.seed;
        		o.coupons = n.result.coupons;
        		if(o.seed.canUse) {
        			if(n.result.coupon != null){
	            		o.coupon = n.result.coupon;
	            		o.fetched = true;
	            		o.covered = false;
        			} else {
	            		o.fetched = false;
	            		o.covered = true;
        			}
        		} else {
        			var c = {};
        			c.title = n.result.seed.title;
        			c.empty = true;
        			c.amount = '';
        			o.couponMsg = "已抢完";
            		o.coupon = c;
            		o.fetched = true;
	            	o.covered = false;
        		}
        		if(o.seed.userImgUrl == null){
        			o.seed.userImgUrl = Config.C('user_info').avatar;
        		}
        		if(o.seed.seedImg == null || o.seed.seedImg =='') {
        			o.seed.seedImg = Config.C('coupon').seedImg;
        		}
        	} else {
            	alert("该现金券不存在或已领完！");
            	location.href="group/onsalesindex.html";
        	}
        }, function(){
        	alert("获取现金券信息失败！");
            location.href="group/onsalesindex.html";
        });
    }
    function getSeedStr(){
    	seedStr = getUrlParam("o");
    	fetchSeed(seedStr);
	}
    o = avalon.define({
        $id: "root",
        seed:{},
        coupon:{},
        coupons:[],
        fetched:false,
        couponMsg:"",
        covered:true,
        gotoSales:function(){
        	if(o.coupon.suggestUrl!=null&&o.coupon.suggestUrl!="") {
            	location.href=o.coupon.suggestUrl;
        	} else {
            	location.href="group/onsalesindex.html";
        	}
        },
        fetchCoupon:function(){
		    if(!common.checkRegisterStatus()) {
		    	return;
		    }
        	commonui.loadingPage();
        	common.invokeApi("GET", "coupon/draw/"+seedStr, null, null,  function(n) {
	    		if(n.result != null) {
	        		o.coupon = n.result;
	    		} else {
	    			var c = {};
	    			c.title = o.seed.title;
	    			c.empty = true;
	    			c.amount = '';
	    			o.couponMsg = "已抢完";
	        		o.coupon = c;
	        		o.fetched = true;
	    		}
	            o.covered = false;
    			commonui.initPage();
	        }, function(){
	        	alert("领取现金券失败，请稍后重试！");
	            o.covered = false;
    			commonui.initPage();
	        });
        }
    });

    avalon.scan(document.body);
        initWechat(['onMenuShareTimeline','onMenuShareAppMessage']);
    	getSeedStr();
		initShareConfig("约惠春天，我给您发红包啦！",
				MasterConfig.C("basePageUrl")+"coupon.html?o="+seedStr,
				MasterConfig.C("basePageUrl")+"static/images/coupon_share_icon.jpg",
				"东湖e家园在线支付可抵扣，各种优惠享不停！");
        checkFromShare();
    commonui.initPage();
});