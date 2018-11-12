var o;

function chooseCoupon(coupon) {
	
	if(coupon == null) {
		o.model.coupon=null;
		o.model.couponAmout = 0.00;
		o.model.couponDesc = '未使用';
		o.model.couponId = "";
	} else {
		o.model.coupon = coupon;
		o.model.couponAmout = coupon.amount;
		o.model.couponDesc = "￥"+coupon.amount+"元";
		o.model.couponId = coupon.id;
	}
	computeAmount();
	o.currentPage='main';
}

function computeAmount(){
	
	var total = parseFloat(o.totalPrice);
	var couponPrice = 0;
	if(o.model.couponAmout==null||o.model.couponAmout=="undefined"){
		couponPrice = 0;
		o.model.couponAmout = 0;
	}else {
		couponPrice = o.model.couponAmout;
	}
	if(couponPrice>0){
		total= total - couponPrice;
		if(total < 0){
			total = 0;
		}
		o.factPrice = total.toFixed(2);
	}else{
		o.factPrice = o.totalPrice;
	}
	
	calcReduceAmt();
	$("#zzmb").hide();
}

/**
 * 计算减免金额
 */
function calcReduceAmt(){
	
	var ori_price = o.factPrice;
	var reduced_amt = 0;
	var reduce_rate = 0;
	if ("0" == o.reduceMode) {	//不减免
		return;
	}else if ("1" == o.reduceMode) {	//四舍五入至元
		reduce_rate = "1";
		reduced_amt=Math.round(ori_price*reduce_rate)/reduce_rate;
		o.hasReduce = "1";
	}else if ("2" == o.reduceMode) {	//表示四舍五入至角
		reduce_rate = "10";
		reduced_amt=Math.round(ori_price*reduce_rate)/reduce_rate;
		o.hasReduce = "1";
	}else {
		return;
	}
	o.factPrice = reduced_amt.toFixed(2);
	o.reduceAmt = parseFloat(o.totalPrice) - parseFloat(o.factPrice);
	o.reduceAmt = o.reduceAmt.toFixed(2);
}

avalon.ready(function() {
	
	function getBillId(){
		o.billId=getUrlParam("billIds");
		o.stmtId=getUrlParam("stmtId");
		o.payAddr=getUrlParam("payAddr");
		o.payAddr = unescape(o.payAddr);
		o.totalPrice=getUrlParam("totalPrice");
		o.reduceMode=getUrlParam("reduceMode");
		
	}
	function payAction() {
		
		var fact = parseFloat(o.factPrice);
		if(fact< 0.001){
			alert("实际支付金额为0。");
			return false;
		}
		
		commonui.showAjaxLoading();
		$("#zzmb").show();
    	if($(window).height()>$(document).height()){
    		$(".zzmb").height($(window).height());
    	}else{
    		$(".zzmb").height($(document).height());
    	}
		o.isPaying = true;
        var n = "POST",
        a = "getPrePayInfo?billId="+o.billId+"&stmtId="+o.stmtId+"&couponUnit="+o.model.couponAmout+
        	"&couponNum=1&couponId="+o.model.couponId+"&mianBill="+o.mianBill+"&mianAmt="+o.mianAmt+"&reduceAmt="+o.reduceAmt,
        i = null,
        e = function(n) {
            //alert(JSON.stringify(n));
        	o.userPayType = n.result.user_pay_type;
        	o.tradeWaterId = n.result.trade_water_id;
        	o.packageId = n.result.packageId;

			wx.config({
    		    appId: n.result.appid, // 必填，公众号的唯一标识
    		    timestamp: n.result.timestamp , // 必填，生成签名的时间戳
    		    nonceStr: n.result.noncestr, // 必填，生成签名的随机串
    		    signature: n.result.paysign,// 必填，签名，见附录1
    		    jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    		});

            wx.chooseWXPay({
                "timestamp":n.result.timestamp,
                "nonceStr":n.result.noncestr,
                "package":n.result.packageValue,
                "signType":n.result.signtype,
                "paySign":n.result.paysign,
				"appId":n.result.appid,
          	    success: function (res) {
                	notifyPaySuccess();
          	    },
          	    fail:function(res) {
          	    	alert(JSON.stringify(res));
			        	o.isPaying = false;
			        	commonui.hideAjaxLoading();
			        	$("#zzmb").hide();
          	    },
          	    cancel:function(res){
					console.log(JSON.stringify(n));
					o.isPaying = false;
			        commonui.hideAjaxLoading();
			        $("#zzmb").hide();
				}
          	    
          	});
            

        },
        r = function(n) {
        	console.log(JSON.stringify(n));
        	if(n.message != '' || n.message != "undefined"){
        		alert(n.message);
        	}else{
            	alert("获取支付信息失败，请稍后再试！");
            }
        	
        	o.isPaying = false;
        	commonui.hideAjaxLoading();
        	$("#zzmb").hide();
        };
        common.invokeApi(n, a, i, null, e, r)
    }

	//更新红包状态
	function updateCouponStatus(){
		
		$("#zzmb").show();
    	if($(window).height()>$(document).height()){
    		$(".zzmb").height($(window).height());
    	}else{
    		$(".zzmb").height($(document).height());
    	}
		
		var n = "GET",
        a = "updateCouponStatus",
        i = null,
        e = function(n) {
            console.log(JSON.stringify(n));
            queryCoupons();
        },
        r = function(n) {
        	queryCoupons();
        	$("#zzmb").hide();
        };
        common.invokeApi(n, a, i, null, e, r)
		
	}
	
    function getDetailInfo() {
        var n = "GET",
        a = "getBillDetail?billId="+o.billId+"&stmtId="+o.stmtId,
        i = null,
        e = function(n) {
            console.log(JSON.stringify(n));
            o.payInfo=n.result;
            o.payInfofee_data=n.result.fee_data;
            if (!n.result.mianBill) {
	            if(o.mianBill==""){	
	            	o.mianBill = '0';
				}else {
					o.mianBill = n.result.mianBill;
				}
            }
            o.mianAmt = n.result.mianAmt;
            var totalPrice = parseFloat(o.totalPrice)-parseFloat(o.mianAmt);
            o.totalPrice = totalPrice.toFixed(2);
        },
        r = function() {
            alert("获取支付信息失败，请稍后再试！");
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    
    function notifyPaySuccess() {
    	var reqUrl = "noticePayed?billId="+o.billId+"&stmtId="+o.stmtId+"&tradeWaterId="+o.tradeWaterId+"&packageId="+o.packageId+"&feePrice="+o.totalPrice+"&bind_switch="+o.bind_switch;
    	if(o.model.coupon!=null){
    		if(o.model.couponAmout!=0){
    			reqUrl += "&couponId="+o.model.coupon.id;
    		}
    	}
    	var n = "POST",
        a = reqUrl;
        i = null,
        e = function(n) {
    		console.log(JSON.stringify(n));
			var forwardUrl = MasterConfig.C("basePageUrl");
			
			alert("支付成功。");
			forwardUrl += "wuye/paymentquery.html";
			location.href = forwardUrl;
			
//    		if (""!=o.userPayType&&"undefined"!=o.userPayType) {	//有大米赠送活动的
//    			if("9"==o.userPayType){
//    				
//    				function sendCoupons4WuyePay() {
//    			        var n = "GET",
//    			        a = "sendCoupons4WuyePay?tradeWaterId="+o.tradeWaterId+"&feePrice="+o.factPrice,
//    			        i = null,
//    			        e = function(n) {
//    			            console.log(JSON.stringify(n));
//    			            forwardUrl += "wuye/successCoupon.html?userPayType="+o.userPayType+"&payAddr="+escape(o.payAddr)+"&totalPrice="+o.factPrice;
//    			            location.href = forwardUrl;
//    			        },
//    			        r = function() {
//    			            alert("获取支付信息失败！");
//    			        };
//    			        common.invokeApi(n, a, i, null, e, r)
//    			    }
//    				sendCoupons4WuyePay();
//    				
//    			}else{
//    				forwardUrl += "wuye/success.html?userPayType="+o.userPayType+"&payAddr="+escape(o.payAddr)+"&totalPrice="+o.totalPrice;
//    			}
//				
//			}else{
//				alert("支付成功。");
//				forwardUrl += "wuye/paymentquery.html";
//				location.href = forwardUrl;
//			}
    	},
        r = function() {
    		o.isPaying=false;
    		alert("支付情况未知，请稍后查询。");
    	};
        common.invokeApi(n, a, i, null, e, r)
    }
    
    function queryCoupons(){
    	
    	var n = "GET",
        a = "getCouponsPayWuYe",
        i = null,
        e = function(n) {
            console.log(JSON.stringify(n));
            setupCoupons(n.result);
			computeAmount();
        	o.model.couponNum=getCouponNum();
        },
        r = function() {
            alert("获取现金券失败，请稍后再试！");
        };
        common.invokeApi(n, a, i, null, e, r)
    	
    }
    
    
    o = avalon.define({
        $id: "root",
        billId:'',
        stmtId:'',
        isPaying: false,
        userPayType: '',
        payAddr: '',
        currentPage: "main",
        totalPrice: 0.00,
        tradeWaterId:'',
        packageId:'',
        factPrice:0.00,
        mianBill:'',
        mianAmt:0.00,
        reduceMode:0,
        hasReduce:0,
        reduceAmt:0.00,
        
        model:{
        	couponNum:0,
        	coupon:null,
        	couponDesc:'未使用',
        	couponAmount: 0,
        	couponId:""
        },
        
        pay: function() {
        	
        	if(o.isPaying){
        		alert("订单处理中，请勿重复提交！");
        		return;
        	}
        	if(o.billId==''){
        		alert('订单信息获取失败，请返回重新获取！');
        		o.isPaying = false;
        		return;
        	}
        	payAction();
        },
        
        showCoupons:function(){
        	if(o.model.couponNum==0){
        		return false;
        	}
        	o.currentPage='coupons';
        },
        bind_switch:"1",
        CheckBoxSelected:function(obj,flag){
			var boxArray = document.getElementsByName("flag");
			for(var i=0;i<=boxArray.length-1;i++){
				if(boxArray[i]==obj && obj.checked){
					boxArray[i].checked = true;
					o.bind_switch = flag;
				}else{
					boxArray[i].checked = false; 
				}
			}
        },
        
        payInfo:{},
        payInfofee_data:[]
        
    });
    //n();
    getBillId();
    //initWechat(['chooseWXPay']) ;
    getDetailInfo();
    updateCouponStatus();
    avalon.scan(document.body);
    //share.default_send();
    FastClick.attach(document.body);  
});