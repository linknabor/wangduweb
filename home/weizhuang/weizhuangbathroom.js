avalon.ready(function() {
		
	    function createOrder() {
	    	o.submiting=true;
	        var n = "POST",
	        a = "weizhuang/createWeiZhuangYuyueOrder/"+o.addr.checkedAddress.id,
	        i = {
	        		serviceTypeName:"浴室换新服务",
	        		paymentType:0,
	        		prices:"100元起",
	        		customerMemo:o.requirement,
	        		expectedTime:o.servicedate
	        	},
	        e = function(n) {
				alert("预约成功，我们会尽快与您联系确认！");
	        	window.location.href=MasterConfig.C('basePageUrl')+"home/success.html?orderId="+n.result.id;
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
        requirement:"",
        location:"",
         control:{
        	currentPage:"main",
         },
        ruleId:0, //fix me
        serviceIsSingle:0,// 周期
       
        golist:function(){
        	location.href="../index.html?type="+4;
        },
        editRequire:function(){
        	o.control.currentPage='requirement';
        },
        selectRegion:false,

       
        /** 添加地址 */
        submiting:false,
        servicedate:"",
      /*************************/
        submit: function() {
        	if(o.submiting){
        		alert("预约信息正在上传，请勿重复提交！");
        		return;
        	}
          	var d = /\d{4}-\d{2}-\d{2}/;
          	if(o.servicedate==''||!d.test(o.servicedate)){
          		alert("请选择配送时间！");
          		return;
          	}
        	if(o.addr.checkedAddress==null||o.addr.checkedAddress.id==null){
        		alert("请选择配送地址！");
        		return;
        	}
        	createOrder();
        },
        backtoform:function(){
        	o.control.currentPage='main';
        },
        storeContent: function() {
            o.requirement = this.innerHTML;
            this.innerHTML = o.requirement;
        },
        focus: function() {
 			var val = this.innerText;
			var len = val.length;
			var $this = this;
			if(len != 0){
				$this = this.firstChild;
			}
			var range = document.createRange();
			range.setStart($this, len); 
			range.setEnd($this, len);
			window.getSelection().addRange(range);
			if(len != 0){
				$this.parentNode.focus();
			}else{
				$this.focus();
			}
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
    avalon.scan(document.body);
    common.setTitle("浴室换新服务");
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