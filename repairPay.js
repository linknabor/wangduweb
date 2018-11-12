var o;
var repairOrderId = getUrlParam("oId");
avalon.ready(function() {
	
    function onlinePay() {
    	o.paying=true;
    	var n = "POST",
        a = "repair/pay",
        i = {orderId:repairOrderId,amount:o.amount},
        e = function(n) {
        	wx.chooseWXPay({
              "timestamp":n.result.timestamp,
              "nonceStr":n.result.nonceStr,
              "package":n.result.pkgStr,
              "signType":n.result.signType,
              "paySign":n.result.signature,
        	   success: function (res) {
        	        // 支付成功后的回调函数
        		   alert("维修单支付成功！");
		    	   location.href=MasterConfig.C("basePageUrl")+"repair/comment.html?oId="+repairOrderId;
        	   }
        	});
        },
        r = function(n) {
        	alert(n.message==null?"支付请求失败，请稍后重试！":n.message);
        	o.paying=false;
        };
        common.invokeApi(n, a, i, null, e, r)
    }
	o = avalon.define({
		$id: "root",
		amount:"",
		paying:false,
		storeMemo:function(){
			o.amount=this.innerText;
		},
		onlinePay:function(){
			if(!repairOrderId||repairOrderId<=0){
				alert("页面错误，请到详情页重新发起支付！");
				return;
			}
			var amount = o.amount;
			if(amount==''||isNaN(amount)){
			  alert("请输入正确的金额");
			  return;
			}
			onlinePay();
		},
		offlinePay:function(){
			if(o.amount==''){ alert("请填写维修费用！"); return; }
			if(isNaN(o.amount)){ alert("请填写正确的维修费用！"); return; }
			if(confirm("确定已现金支付给维修人员！")){
				var i = {orderId:repairOrderId,amount:o.amount.trim()};
				common.invokeApi("POST", "repair/payOffline", i, null, function(t){
					alert("维修单已确认！");
			    	location.href="repair/comment.html?oId="+repairOrderId;
				},  function(t){
					alert("信息提交异常，请稍后重试！");
				});
			}
        	
		}
		
    });
    avalon.scan(document.body);
    initWechat(['chooseWXPay','onMenuShareTimeline','onMenuShareAppMessage']);
});