avalon.ready(function() {
		function getRuleId(){
			o.ruleId=getUrlParam("ruleId");
		}
	    function createOrder() {
	    	o.submiting=true;
	        var n = "POST",
	        a = "/gaofei/createGaofeiYuyueOrder/"+o.addr.checkedAddress.id,
	        i = {
	        		serviceTypeName:"高尔夫上门教学98元",
	        		paymentType:1,//微信支付
	        		prices:"98",
//	        		strGaofeiAddr:"上海市杨浦区国顺东路410号2楼158",
	        		expectedTime:o.servicedate,
	        	},
	        e = function(n) {
	        	window.location.href=MasterConfig.C('basePageUrl')+"tohomebuy.html?ruleId=" + o.ruleId + "&yuyueOrderId=" + n.result.id + "&addressId=" + o.addr.checkedAddress.id + "&expectedTime=" + o.servicedate;
	        },
	        r = function() {
		    	o.submiting=false;
				alert("网络异常，请稍后重试！");
	        };
	        common.invokeApi(n, a, i, null, e, r)
	    }
    o = avalon.define({
        $id: 'root',
        addr:addrModel,
        location:"",
        control:{
        	currentPage:"main",
         },
        ruleId:0,//fix me
        customerName:'',
        customerTel:'',
        servicedate:"",
        submiting:false,
        golist:function(){
        	location.href="../index.html?type="+6;
        },
        submit: function() {
        	if(o.submiting){
        		alert("预约信息正在上传，请勿重复提交！");
        		return;
        	}
        	var d = /\d{4}-\d{2}-\d{2}/;
          	if(o.servicedate==''||!d.test(o.servicedate)){
          		alert("请选择服务时间！");
          		return;
          	}
          	if(o.addr.checkedAddress==null||o.addr.checkedAddress.id==null){
        		alert("请选择服务地址！");
        		return;
        	}
        	createOrder();
        },
    });
    
    if(checkCodeAndLogin()){
    	queryAddress();
    }
    
    o.$watch("location", function(t) {
        if(o.location!=null && o.location.length>=2) {
        	getSuggestion(o.addr.city.name,o.location);
        }
    });

 	getRuleId();
    avalon.scan(document.body);
//  FastClick.attach(document.body);
    common.setTitle("高尔夫上门教学98元");
    $('#datetimepicker2').datetimepicker({
    	minDate:0,
    	lang:'ch',
    	timepicker:false,
    	format:'Y-m-d',
    	formatDate:'Y-m-d'
    });
    $('#timetaker').click(function(){
    	$('#datetimepicker2').datetimepicker('show');
    });
});