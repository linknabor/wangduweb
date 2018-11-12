var o;
function chooseAddress(address){
	if(address){
		o.address=address;
	}
	o.currentPage='main';
}
function getShipFee(amount) {
    if(!o.shipFeeTpl.fee){
        return 0;
    }
    if(o.shipFeeTpl.freeLimit<=amount) {
        return 0;
    }
    if(o.address&&o.shipFeeTpl.freeRegionIds&&o.shipFeeTpl.freeRegionIds.size>0){
        if($.inArray(o.address.provinceId,o.shipFeeTpl.freeRegionIds)
            ||$.inArray(o.address.cityId,o.shipFeeTpl.freeRegionIds)
            ||$.inArray(o.address.countyId,o.shipFeeTpl.freeRegionIds)
            ||$.inArray(o.address.xiaoquId,o.shipFeeTpl.freeRegionIds)){
                return 0;
            }
    }
    return o.shipFeeTpl.fee;
}
function computeAmount(){
    
    o.shipFeeAmount = getShipFee(o.amount);
    o.realamount = o.amount + o.shipFeeAmount;
	couponUtil.filterCouponByAmount(o.realamount);
    o.couponNum = couponUtil.getCouponNum();
    if(o.coupon.amount&&!couponUtil.canUse(o.coupon,o.realamount)){
        o.coupon = {};
    }
    
    o.realamount = o.coupon.amount ? o.realamount - o.coupon.amount : o.realamount;
    if(o.realamount<=0){
        o.realamount=0.01;
    }
    o.amountStr = o.realamount.toFixed(2);
}
function queryCoupon() {
	
	commonui.showAjaxLoading();
	$("#zzmb").show();
	if($(window).height()>$(document).height()){
		$(".zzmb").height($(window).height());
	}else{
		$(".zzmb").height($(document).height());
	}
    common.invokeApi("GET", "coupon/valid4HomeCart", null, null, function(n){
    	console.log(JSON.stringify(n));
        
		couponUtil.setupCoupons(n.result);
    	o.couponNum=couponUtil.getCouponNum();
        commonui.hideAjaxLoading();
        $("#zzmb").hide();
    	
    }, function(n){
    	commonui.hideAjaxLoading();
        $("#zzmb").hide();
    	alert('获取现金券信息失败！');
    });
}
avalon.ready(function(){
	function initOrder(){
		var n="GET",
		a="home/viewCartWithAddr",
		i=null,
		
		e=function(n){
			if(!n.result.address){
				o.address = {};
			} else {
				o.address=n.result.address;
				o.freight=n.result.freight;
				
			}
			if(!n.result.shipFee){
			    o.shipFeeTpl = {};
			} else {
			    o.shipFeeTpl = n.result.shipFee;
			}
			
			o.orderlist=n.result.cart.items;
			for(var i=0;i<o.orderlist.length;i++){
				o.amount+=o.orderlist[i].count*o.orderlist[i].price;
			}
            computeAmount();
		},
		r=function(){
            o.orderlist = [];
		};
		common.invokeApi(n, a, i, null, e, r)
	}
	function createOrder() {
		var order = {};
		order.couponId = o.coupon.id;
		order.addressId = o.address.id;
		order.reqTime = o.requireDate;
		order.memo = o.memo;
		if(!order.addressId||order.addressId<=0) {
			alert("请选择地址");
			return;
		}
		if(!order.reqTime){
			alert("请选择服务时间！");
			return;
		}
		o.paying = true;
		common.invokeApi("POST","yunxiyi/createOrder",order,null,function(n){
			o.orderId = n.result.id;
        	requestPay();
		},function(n){
			alert(n.message==null?"下单失败，请稍后重试！":n.message);
			o.paying=false;
		});
		
	}
	function requestPay() {
		
		initWechat(['chooseWXPay']);
		commonui.showAjaxLoading();
		$("#zzmb").show();
		if($(window).height()>$(document).height()){
    		$(".zzmb").height($(window).height());
    	}else{
    		$(".zzmb").height($(document).height());
    	}
		common.invokeApi("POST", "/yunxiyi/pay/"+o.orderId, null, null, function(n) {
        	wx.chooseWXPay({
              "timestamp":n.result.timestamp,
              "nonceStr":n.result.nonceStr,
              "package":n.result.pkgStr,
              "signType":n.result.signType,
              "paySign":n.result.signature,
        	   success: function (res) {
        	   	   common.invokeApi("GET", "/yunxiyi/notifyPayed/"+o.orderId);
        	        // 支付成功后的回调函数
        		   alert("下单成功！");
		    	   location.href="home/xiyi/success.html?oId="+o.orderId;
        	   },
	        	fail:function(res) {
	     	    	alert(JSON.stringify(res));
	     	    	o.paying=false;
		        	commonui.hideAjaxLoading();
		        	$("#zzmb").hide();
	      	    },
	      	    cancel:function(res){
					console.log(JSON.stringify(n));
					o.paying=false;
			        commonui.hideAjaxLoading();
			        $("#zzmb").hide();
				}
        	});
        }, function(n) {
        	
        	commonui.hideAjaxLoading();
	        $("#zzmb").hide();
        	alert(n.message==null?"支付请求失败，请稍后重试！":n.message);
        	o.paying=false;
        })
    };
	o = avalon.define({
		$id:"root",
		currentPage:"main",
		paying:false,
		address:{
		},
		freight:0,
		amount:0,
		realamount:0,
		amountStr:0,
		memo:"",
		coupon:{},
		shipFeeTpl:{},
		shipFeeAmount:0,
		couponNum:0,
		requireDate:'',
        showAddress:function(){
        	common.checkRegisterStatus();
        	addrUtil.chooseAddress(function(addr){
                o.currentPage="main";
                o.address=addr;
            });
            o.currentPage="";
        },
        showCoupons:function(){
        	o.currentPage="";
            couponUtil.showCouponList(function(coupon){
                o.currentPage="main";
                o.coupon = coupon == null ? null : coupon;
                o.couponDesc= coupon == null ? '未使用' : "￥"+coupon.amount+"元";
                computeAmount();
            });
        },
		orderlist:[],
		showMemo:function(){
			showDialog("备注","填写备注信息",o.memo,function(content){
				o.memo = content;
			},null);
		},
		pay:function(){
			
			if(o.paying){
				alert("提交中，请稍后再试！");
				return;
			}
			if(o.orderId>0) {
				requestPay();
			} else {
				createOrder();
			}
		}
	});

	avalon.scan(document.body);
	initOrder();
	queryCoupon();
	
	$('#datetimepicker2').datetimepicker({
    	onChangeDateTime:function(x){
    		var dt = x.dateFormat('Y-m-d H:i');
    		var time = x.getTime()-new Date().getTime();
    		if(time<0||time>3600000*24*7) {
    			alert("服务时间只能选择今天之后7天");
    		} else if(time<14400000) {
    			alert("您必须提前四个小时下单!");
    		} else if(o.requireDate!=dt){
    			o.requireDate=dt;
    		}
    	},
    	allowTimes:['10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00'],
    	lang:'ch',
    	format:'Y-m-d H:i',
    	formatDate:'Y-m-d H:i'
    });
    $('#timetaker').click(function(){
    	$('#datetimepicker2').datetimepicker('show');
    });
})