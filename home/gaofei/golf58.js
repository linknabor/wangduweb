avalon.ready(function() {
		function getRuleId(){
			o.ruleId=getUrlParam("ruleId");
		}
	    function createOrder() {
	    	o.submiting=true;
	        var n = "POST",
	        a = "/gaofei/createGaofeiExperienceOrder",
	        i = {
	        		serviceTypeName:"高尔夫(成人)体验课58元",
	        		paymentType:1,
	        		prices:"58",
	        		expectedTime:o.servicedate,
	        		strGaofeiAddr:"上海市杨浦区国顺东路410号2楼158",
	        		strName:o.customerName,
	        		strMobile:o.customerTel
	        	},
	        e = function(n) {
	        	window.location.href=MasterConfig.C('basePageUrl')+"tohomebuy.html?ruleId=" + o.ruleId + "&yuyueOrderId=" + n.result.id + "&addressId=7038&expectedTime=" + o.servicedate;
	        },
	        r = function() {
		    	o.submiting=false;
				alert("网络异常，请稍后重试！");
	        };
	        common.invokeApi(n, a, i, null, e, r)
	    }
    o = avalon.define({
        $id: 'root',
        ruleId:0,//fix me
        customerName:'',
        customerTel:'',
        addresses:[],
        address:{},
        servicedate:"",
        //增加诊所信息
//      clinics:[
//	        {
//	        	clinicName:"上海市沪雅口腔门诊部",
//	        	clinicAddr:"杨浦区平凉路2631号",
//	        	clinicTel:"021-60545020"
//	        }
//      ],
        clinic:{},
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
        	if(o.customerName == null || o.customerName == ''){
        		alert("请填写预约人姓名");
        		return;
        	}
        	if(!(/^1[3-9][0-9]\d{4,8}$/.test(o.customerTel))) {
        		alert("请填写正确的手机号！");
        		return;
        	}
        	createOrder();
        },
//      isChecked:function(clinic) {
//      	return o.clinic == clinic;
//      },
//      check: function(clinic) {
//      	o.clinic = clinic;
//      	o.currentPage='main';
//      },
        selectRegister:function(){
        	if(common.checkRegisterStatus()){
        	}
        },
        currentPage:"main"
    });
    if(checkCodeAndLogin()){
    }

 	getRuleId();
    avalon.scan(document.body);
//  FastClick.attach(document.body);
    common.setTitle("高尔夫（成人）体验课58元");
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