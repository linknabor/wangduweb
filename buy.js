var o;
function chooseCoupon(coupon) {
	if(coupon == null) {
		o.model.coupon=null;
		o.model.couponDesc = '未使用';
	} else {
		o.model.coupon = coupon;
		o.model.couponDesc = "￥"+coupon.amount+"元";
	}
	computeAmount();
	o.control.currentPage='main';
}
function computeAmount(){
	var pa,pf,a,ta;
	pa = o.model.rule.price*o.model.count
	pf = o.model.count<o.model.rule.freeShippingNum ? o.model.rule.postageFee : 0;
	a = pa + pf;

	filterCouponByAmount(a);
	o.model.couponNum=getCouponNum();
	if(o.model.coupon == null) {
		ta = a;
	} else if(o.model.coupon.usageCondition>a){
		o.model.coupon = null;
	} else if(o.model.coupon.amount>0){
		ta = a - o.model.coupon.amount;
	}
	o.model.productAmount = pa.toFixed(2);
	o.model.postFee = pf.toFixed(2);
	o.model.amount = a.toFixed(2);
	if(ta>0) {
        o.model.totalAmount = ta.toFixed(2);
	} else {
	    o.model.totalAmount = "0.01";
	}
}
avalon.ready(function() {

	function getTypeAndId(){
		o.model.ruleId=getUrlParam("ruleId");
		o.model.type=getUrlParam("type");
	}
	function queryBuyInfo(){
		var n = "GET",
        a = "queryBuyInfo/"+o.model.type+"/"+o.model.ruleId,
        i = null,
        e = function(n) {
			console.log("success:" + JSON.stringify(n));
			o.model.product = n.result.product;
			o.model.rule = n.result.rule;
			if(n.result.address){
				o.addr.checkedAddress = n.result.address;
			}
			computeAmount();
            initWechat(['chooseWXPay','onMenuShareTimeline','onMenuShareAppMessage']);
    	},
        r = function() {
    		alert("订单处理中，请稍后再试！")
    		//location.href=MasterConfig.C("basePageUrl")+"group/success.html?orderId="+o.orderId;
    	};
        common.invokeApi(n, a, i, null, e, r)
	}
	function createOrder(order) {
    	o.control.paying=true;
    	if(o.model.order!={}&&o.model.order.id>0) {
    		requestPay();
    		return;
    	}
        var n = "POST",
        a = "createOrder",
        i = order,
        e = function(n) {
        	o.model.order = n.result;
        	requestPay();
        },
        r = function(n) {
			alert(n.message==null?"订单创建失败，请稍后重试！":n.message);
			o.control.paying=false;
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    
    function requestPay() {
    	
    	initWechat(['chooseWXPay','onMenuShareTimeline','onMenuShareAppMessage']);
    	
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
    		location.href=MasterConfig.C("basePageUrl")+"orderdetail.html?orderId="+o.model.order.id;
    		//location.href=MasterConfig.C("basePageUrl")+"group/success.html?orderId="+o.orderId;
    	};
        common.invokeApi(n, a, i, null, e, r)
    }
	function queryCoupon() {
        common.invokeApi("GET", "coupon/valid/"+o.model.type+"/"+o.model.ruleId, null, null, function(n){
        	setupCoupons(n.result);
			computeAmount();
        	o.model.couponNum=getCouponNum();
        }, function(n){alert('获取现金券信息失败！')});
	}
	
    o = avalon.define({
        $id: "root",
        control:{
        	currentPage:"main",
        	paying:false
        },
        location:'',
        detaillocation:'',
        model:{
        	type:3,/**默认特卖*/
        	ruleId:"",
        	product: {},
        	rule:{limitNumOnce:10,price:0},
        	address:{},
        	count:1,
        	order:{},
        	couponNum:0,
        	coupon:null,
        	couponDesc:'未使用',
        	productAmount:0,
        	postFee:0,
        	amount:0,
        	totalAmount:0,
        	comment:"",
        	receiveTimeType:2
        },
        op:{
        	minusCount: function() {
	            o.model.count > 1 && --o.model.count && computeAmount();
	        },
	        addCount: function() {
	        	if(o.model.count < o.model.rule.limitNumOnce){
	        		++o.model.count;
	        		computeAmount();
	        	}else{
	        		alert("最多能购买"+o.model.rule.limitNumOnce+"个");
	        	}
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
	        			serviceAddressId:o.addr.checkedAddress.id,
	        			memo:o.model.comment,
	        			receiveTimeType:o.model.receiveTimeType
	        	 }
	        	;
	        	if(o.model.coupon != null) {
	        		order.couponId=o.model.coupon.id;
	        	}
	        	if(o.addr.checkedAddress==null||o.model.address.id==0){
	        		alert("请选择地址！");
	        		return;
	        	}
	        	createOrder(order);
	        },
	        showAddress:function(){
	        	o.control.currentPage='addrlist';
	        	if(o.addr.addresses.length==0) {
	        		queryAddress();
	        	}
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
        addr:addrModel,
        /** 选择送货日期 */
        datechoooser:{
        	time: '任何时间',
	        comment: '',
	        timePicker: [
	            {
	                name: '工作日',
	                value:0,
	                checked: false,
	            },
	            {
	                name: '节假日',
	                value:1,
	                checked: false
	            },
	            {
	                name: '任何时间',
	                value:2,
	                checked: true
	            }
	        ],
	        modalShown: false,
	        showModal: function() {
	            o.datechoooser.modalShown = true;
	        },
	        hideModal: function(e) {
	            if ('modal-mask' === e.target.className) {
	                o.datechoooser.modalShown = false;
	            }
	        },
	        selectTime: function(idx) {
	            for (var i = 0, len = o.datechoooser.timePicker.length; i < len; i++) {
	                o.datechoooser.timePicker[i].checked = false;
	            }
	            o.datechoooser.timePicker[idx].checked = true;
	            o.datechoooser.time = o.datechoooser.timePicker[idx].name;
	            o.model.receiveTimeType = o.datechoooser.timePicker[idx].value;
	            o.datechoooser.modalShown = false;
	        }
        }
    });

    o.$watch("location", function(t){
    	if(o.addr.city.name == null||o.addr.county.name == null||o.addr.city.name == ""||o.addr.county.name == "") {
    		alert('请先选择你所在的区域！');
    		return;
    	}
        if(o.location!=null && o.location.length>=2 && o.location!=o.addr.suggestion._name) {
        	getSuggestion(o.addr.city.name,o.location);
        }
    });
    avalon.scan(document.body);
    if(common.checkRegisterStatus()) {
    	getTypeAndId();
        if(o.model.ruleId&&o.model.type){
        	queryBuyInfo();
        	queryCoupon();
            checkFromShare(o.model.type,o.model.ruleId);
        }
    }
    FastClick.attach(document.body);
});