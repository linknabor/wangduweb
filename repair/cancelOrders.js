var o;
var orderId = getUrlParam('oId');
avalon.ready(function() {
    o = avalon.define({
        $id: "root",
        storeMemo: function () {
            o.cancelReason = this.innerHTML;
        },
        cancelReasonType:1,
        cancelReason: "",
        focus: function() {
            this.focus();
        },
        backPage:function(){
        	location.href="ordersDetail.html?oId="+orderId;
        },
        confirm:function(){
        	var cancelReq = {
        			orderId:orderId,
        	        cancelReasonType:o.cancelReasonType,
        	        cancelReason: o.cancelReason
        	};
        	common.invokeApi("POST", "repair/cancel", cancelReq, null, function(n){
        		alert("维修单已取消");
            	location.href="ordersDetail.html?oId="+orderId;
    	    }, function(n){
    	    	alert("维修单取消失败，请稍后重试！");
    	    });
        },
        reasonPicker: [
           {
               name: '我临时有事',
               value: 1,
               checked: true
           },
           {
               name: '师傅无法上门',
               value: 2,
               checked: false
           },
           {
               name: '其他',
               value: 3,
               checked: false
           }
       ],
       selectTeam: function (idx) {
           for (var i = 0, len = o.reasonPicker.length; i < len; i++) {
               o.reasonPicker[i].checked = false;
           }
           o.reasonPicker[idx].checked = true;
           o.cancelReasonType = o.reasonPicker[idx].value;
       }
    });

    avalon.scan(document.body);
});