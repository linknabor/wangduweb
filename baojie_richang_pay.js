var o; 
var payItem = getUrlParam("item");
avalon.ready(function() {
    function initInfo(){
    	
    	commonui.showAjaxLoading();
    	$("#zzmb").show();

		if($(window).height()>$(document).height()){
			$(".zzmb").height($(window).height());
		}else{
			$(".zzmb").height($(document).height());
		}
    	
        common.invokeApi("GET","baojie/normal/payinfo/"+o.serviceItemId,null,null,function(n) {
           
        	console.log(JSON.stringify(n));
            o.item=n.result.item;
			couponUtil.setupCoupons(n.result.coupons);
			computeAmount();
			if(n.result.address){
				o.address=n.result.address;
            }
			
        	
            commonui.hideAjaxLoading();
            $("#zzmb").hide();
        	
            
        },
        function() {
        	
        	commonui.hideAjaxLoading();
            $("#zzmb").hide();
        	
        })
    }
    function computeAmount(){
        o.amount=o.item.price*o.hours;
        couponUtil.filterCouponByAmount(o.amount);
        o.couponNum = couponUtil.getCouponNum();
        if(o.coupon.amount&&!couponUtil.canUse(o.coupon,o.amount)){
            o.coupon = {};
        }
        o.realMoney = o.coupon.amount ? o.amount - o.coupon.amount : o.amount;
        if(o.realMoney<=0.01) {
        	o.realAmount=0.01
        }else{
        o.realAmount = o.realMoney;
        }
    }
	function createBill() {
	    if(o.billId){
            requestPay();
	    }
		var bill = {};
		bill.serviceItemId=o.serviceItemId;
		bill.couponId = o.coupon.id;
		bill.reqTime = o.requireDate;
		bill.memo = o.memo; 
		bill.addressId = o.address.id;
		bill.count = o.hours;
		bill.itemType = 302;
		if(!bill.addressId||bill.addressId<=0) {
			alert("请选择地址");
			return;
		}
		if(!bill.reqTime){
			alert("请选择服务时间！");
			return;
		}
		o.paying = true;
		common.invokeApi("POST","baojie/normal",bill,null,function(n){
			o.billId = n.result;
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
		
        common.invokeApi("POST", "/baojie/pay/"+o.billId, null, null, function(n) {
            wx.chooseWXPay({
              "timestamp":n.result.timestamp,
              "nonceStr":n.result.nonceStr,
              "package":n.result.pkgStr,
              "signType":n.result.signType,
              "paySign":n.result.signature,
               success: function (res) {
                   common.invokeApi("POST", "baojie/notifyPayed/"+o.billId);
                    // 支付成功后的回调函数
                   alert("下单成功！");
                   location.href="home/baojie1/success.html?oId="+o.billId;
               },fail:function(res) {
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
    }
	o = avalon.define({
        $id: "root",
        page:"main",
        item:"",
    	hours:2,
    	amount:0,
    	serviceItemId:6,
    	realMoney:0,
    	realAmount:0,
    	addhours:function(){
    	    if(!o.hours||o.hours<2){
    	        o.hours=2;
    	    } else {
    	        o.hours+=0.5;
    	    }
    	    computeAmount();
    	},
    	subhours:function(){
    	    if(!o.hours||o.hours<=2){
                o.hours=2;
            } else {
                o.hours-=0.5;
            }
            computeAmount();
    	},
    	showMemo:function(){
            showDialog("备注","填写备注信息",o.memo,function(content){
                o.memo = content;
            },null);
        },
    	memo:"",
        address:{},
        choseAddress:function(){
            addrUtil.chooseAddress(function(addr){
                o.page="main";
                o.address=addr;
            });
            o.page="";
        },
        
		coupon:{},
        couponNum:0,
        showCoupons:function(){
            o.page="";
            couponUtil.showCouponList(function(coupon){
                o.page="main";
                o.coupon=coupon ? coupon : {};
                computeAmount();
            });
        },
        requireDate:'',
        submit:function(){
            createBill();
        }
	});


	avalon.scan(document.body);
	initWechat(['chooseWXPay']);
    common.setTitle("日常保洁支付");
    common.checkRegisterStatus();
    initInfo();
    $('#datetimepicker2').datetimepicker({
        onChangeDateTime:function(x){
            var dt = x.dateFormat('Y-m-d H:i');
            if(o.requireDate!=dt){
                o.requireDate=dt;
            }
        },
        allowTimes:['9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'],
        lang:'ch',
        format:'Y-m-d H:i',
        formatDate:'Y-m-d H:i'
    });
    $('#timetaker').click(function(){
        $('#datetimepicker2').datetimepicker('show');
    });
});