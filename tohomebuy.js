var o;
function chooseCoupon(coupon) {
	if(coupon == null) {
		o.model.coupon=null;
		o.model.couponDesc = '未使用';
	} else {
		o.model.coupon = coupon;
		o.model.couponDesc = "￥"+coupon.amount+"元";
	}
	o.control.currentPage='main';
}
avalon.ready(function() {
	function getParam(){
		o.model.ruleId=getUrlParam("ruleId");
		o.yuyueOrderId=getUrlParam("yuyueOrderId");
		o.addressId=getUrlParam("addressId");
		o.model.expectedTime=getUrlParam("expectedTime");
	}
	function getAddress(){
		var n="GET",
		a = "address/query/"+o.addressId,
		i = null,
        e = function(n) {
			o.model.address = n.result;
    	},
        r = function() {
    		alert("网络异常，请稍后再试！")
    	};
        common.invokeApi(n, a, i, null, e, r)
	}
	function queryBuyInfo(){
		var n = "GET",
        a = "queryBuyInfo/"+o.model.type+"/"+o.model.ruleId,
        i = null,
        e = function(n) {
			console.log("success:" + JSON.stringify(n));
			o.model.product = n.result.product;
			o.model.rule = n.result.rule;
			initWechat(['chooseWXPay']);
			queryCoupon();
    	},
        r = function() {
    		alert("订单处理中，请稍后再试！")
    	};
        common.invokeApi(n, a, i, null, e, r)
	}
	//检查预约单和订单是否关联，防止重复支付
	function checkYuyueOrder(){
		var n = "GET",
        a = "yuyueOrder/checkYuyueOrder/"+o.yuyueOrderId,
        i = null,
        e = function(n) {
			o.serviceOrderId = n.result.serviceOrderId;
			console.log("success:" + JSON.stringify(n));
    	},
        r = function() {
    		alert("该订单已重复提交,请重新下单！");
 			location.href=MasterConfig.C("basePageUrl")+"home/index.html?v=20160229";
    	};
        common.invokeApi(n, a, i, null, e, r)
	}
	function setYuyueOrder(){
		var n = "GET",
        a = "yuyueOrder/setServiceOrderId/"+o.yuyueOrderId+"/"+o.model.order.id,
        i = null,
        e = function(n) {
			console.log("success:" + JSON.stringify(n));
			requestPay();
    	},
        r = function() {
    		alert("该订单已重复提交,请重新下单！");
 			location.href=MasterConfig.C("basePageUrl")+"home/index.html?v=20160229";
    	};
        common.invokeApi(n, a, i, null, e, r)
	}
	function createOrder(order) {
    	o.control.paying=true;
    	if(o.model.order!={}&&o.model.order.id>0) {
    		requestPay();
    	}
    	if(o.serviceOrderId > 0){
    		o.model.order.id=o.serviceOrderId;
    		requestPay();
    	}else{
	        var n = "POST",
	        a = "createOrder",
	        i = order,
	        e = function(n) {
	        	o.model.order = n.result;
	        	setYuyueOrder();
	        },
	        r = function(n) {
				alert(n.message==null?"订单创建失败，请稍后重试！":n.message);
				o.control.paying=false;
	        };
	        common.invokeApi(n, a, i, null, e, r)	
    	}
    }
    
    function requestPay() {
    	var n = "GET",
        a = "/requestPay/"+o.model.order.id,
        i = null,
        e = function(n) {
        	wx.chooseWXPay({
              "timestamp":n.result.timestamp,
              "nonceStr":n.result.nonceStr,
              "package":n.result.pkgStr,
              "signType":n.result.signType,
              "paySign":n.result.signature,
        	   success: function (res) {
        	        // 支付成功后的回调函数
        		   alert("下单成功！");
 			   	   location.href=MasterConfig.C("basePageUrl")+"group/success.html?orderId="+o.model.order.id + "&type="+o.model.type;
        	   }
        	});
        },
        r = function(n) {
        	alert(n.message==null?"支付请求失败，请稍后重试！":n.message);
        	o.control.paying=false;
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    function notifyPaySuccess() {
    	var n = "GET",
        a = "notifyPayed/"+o.model.order.id,
        i = null,
        e = function(n) {
    		location.href=MasterConfig.C("basePageUrl")+"group/success.html?orderId="+o.model.order.id;
    	},
        r = function() {
    		alert("订单处理中，请稍后查看状态！")
    		//location.href=MasterConfig.C("basePageUrl")+"group/success.html?orderId="+o.orderId;
    	};
        common.invokeApi(n, a, i, null, e, r)
    }
    
	function queryCoupon() {
        common.invokeApi("GET", "coupon/valid/5/"+o.model.ruleId, null, null, function(n){
        	setupCoupons(n.result);
        	computeCoupon();
        }, function(n){alert('获取现金券信息失败！')});
	}
	function computeCoupon(){
		var am = o.model.rule.price*o.model.count;
		filterCouponByAmount(am);
		o.model.couponNum=getCouponNum();
	}
    o = avalon.define({
        $id: "root",
        addressId:"",
        yuyueOrderId:"",
        control:{
        	currentPage:"main",
        	paying:false
        },
        serviceOrderId:0,
        model:{
        	type:5,/*到家服务*/
        	expectedTime:"",
        	ruleId:"",
        	product: {},
        	rule:{limitNumOnce:10,price:0},
        	address:{},
        	count:1,
        	order:{},
        	amount:0,
        	
        	

        	couponNum:0,
        	coupon:null,
        	couponDesc:'未使用'
        },
        op:{
        	getAmount:function(){
        		var am = o.model.rule.price*o.model.count;
        		return am;
        	},
	        pay: function() {
	        	if(o.control.paying){
	        		alert("订单处理中，请勿重复提交！");
	        		return;
	        	}
	        	var order = {
	        			orderType:o.model.type,
	        			productId:o.model.product.id,
	        			ruleId:o.model.rule.id,
	        			count:o.model.count,
	        			serviceAddressId:o.addressId,
	        			memo:o.model.comment,
	        			receiveTimeType:0
	        	 };
	        	if(o.model.coupon != null) {
	        		order.couponId=o.model.coupon.id;
	        	}
	        	createOrder(order);
	        },
	        showCoupons:function(){
	        	o.control.currentPage='coupons';
	        },
	        storeMemo: function() {
	            o.model.comment = this.innerHTML;
	        },
	        focus: function() {
	            this.focus();
	        }
        },

    });

    avalon.scan(document.body);
    if(checkCodeAndLogin()) {
    	getParam();
    	getAddress();
    	checkYuyueOrder();
        if(o.model.ruleId&&o.model.type){
			queryBuyInfo();
        }
        
    }
    FastClick.attach(document.body);
});