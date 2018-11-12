/**
 * 
 */
avalon.ready(function() {
	
	function getStopCarAmt()
	{
		var n = "POST",
        a = "stopcar/tempcar/"+o.device_no,
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
			if(n.result!=null) {
				o.water_id = n.result.temp_park_fee_water_id;
            	o.car=n.result;
			}else
            {
				o.water_id="";
            	o.car = [];
				alert("没有可付停车费账单，请确认或重新扫码！");
            }
        },
        r = function() {
        	alert("获取停车记录失败！");
			o.stopCarAmt = [];
        };
        common.invokeApi(n, a, i, null, e, r)
	}
	
	function payAction() {
		
		var fact = parseFloat(o.car.fee_price);
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
        a = "pay/temppaycar/"+o.water_id,
        i = null,
        e = function(n) {
            wx.chooseWXPay({
                "timestamp":n.result.timestamp,
                "nonceStr":n.result.noncestr,
                "package":n.result.packageValue,
                "signType":n.result.signtype,
                "paySign":n.result.paysign,
          	    success: function (res) {
          	    	console.log(JSON.stringify(res));
        			var forwardUrl = MasterConfig.C("basePageUrl");
        			
        			alert("支付成功。");
        			forwardUrl += "scancode/backScanPayOk.html?car_no="+n.result.car_no+"&car_in_date="+
        			n.result.car_in_date+"&car_out_date="+n.result.car_out_date+"&fee_price="+n.result.fee_price;
        			location.href = forwardUrl;
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

	var o = avalon.define({
		$id : "root",
		car : "",
		water_id:"",
		bg_img: '../static/images/community/bg_publish.jpg',
		device_no: getUrlParam("device_no"),
		isPaying: false,
		factPrice:0.00,
		packageId:"",
		
		submit: function() {
        	if(o.water_id == ""){
        		alert("无法获取支付记录");
        		return;
        	}
        	if(o.isPaying){
        		alert("订单处理中，请勿重复提交！");
        		return;
        	}
        	payAction();
        }
        
	});
	
	function getDeviceNo()
	{
		o.device_no=getUrlParam("device_no");
	}
	
	
	getDeviceNo();
	getStopCarAmt();
    avalon.scan(document.body);
    //share.default_send();
    FastClick.attach(document.body);
    checkFromShare();
    
});