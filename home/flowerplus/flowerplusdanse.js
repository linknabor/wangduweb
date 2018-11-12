avalon.ready(function() {
		function getRuleId(){
			o.ruleId=getUrlParam("ruleId");
		}
		function checkFlowerPlusOrderAndCount() {
	        var n = "GET",
	        a = "flowerPlus/checkByRule/" + o.ruleId,
	        i = null,
	        e = function(n) {
			    createOrder();
	        },
	        r = function(n) {
				alert(n.message);
	        	location.href="../index.html";
	        };
	        common.invokeApi(n, a, i, null, e, r)
	    }
	    function createOrder() {
	    	o.submiting=true;
	        var n = "POST",
	        a = "flowerPlus/createFasuperOrder/"+o.addr.checkedAddress.id,
	        i = {
	        		serviceTypeName:"单色鲜花体验活动",
	        		paymentType:1,
	        		prices:"19.9",
//	        		cycleTime:o.pinci, //配送周期
	        		ruleId:o.ruleId,
	        		paymentType:1,//微信支付
	        		serviceIsSingle:o.serviceIsSingle,
	        		expectedTime:o.pinci
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
        ruleId:0, //fix me
        serviceIsSingle:1,// 单次
        golist:function(){
        	location.href="../index.html?type="+1;
        },
        submiting:false,
        servicedate:"",
        modalShown: false,
        /**显示选择配送周期*/
         pinciPicker: [
          {
              name: '2015-12-05',
              value: 0,
          },
          {
              name: '2015-12-07',
              value: 1,
          }
      ],
        showModal: function() {
          o.modalShown = true;
      },
      confirmPinci:function(i){
    	  o.pinci="";
          o.pinci=o.pinciPicker[i].name;
    	  o.modalShown = false;
      },
      /*************************/
        submit: function() {
        	if(o.submiting){
        		alert("预约信息正在上传，请勿重复提交！");
        		return;
        	}
//        	var d = /\d{4}-\d{2}-\d{2}/;
//        	if(o.servicedate==''||!d.test(o.servicedate)){
//        		alert("请选择配送时间！");
//        		return;
//        	}
			if(o.pinci=="请选择"){
				alert("请选择配送时间");
				return;
			}
        	if(o.addr.checkedAddress==null||o.addr.checkedAddress.id==null){
        		alert("请选择配送地址！");
        		return;
        	}
        	checkFlowerPlusOrderAndCount();
        },
      

        pinci:"请选择",
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
    common.setTitle("【FlowerPlus】19.9元单束单色鲜花体验，11月30日截止");
    checkFromShare();
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