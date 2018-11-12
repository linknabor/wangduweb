 var o;
avalon.ready(function() {
	function getUserInfo() {
        var n = "GET",
        a = "userInfo",
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
			o.user = n.result;
			if(common.hasRegister()) {
				location.href="index.html";
			}
        },
        r = function() {};
        common.invokeApi(n, a, i, null, e, r)
    }
	
	function getComeFrom(){
		o.comeFrom=getUrlParam("comeFrom");
	}
	
	function simpleRegister() {
    	var n = "POST",
        a = "simpleRegister",
        i = {
    			mobile:o.user.tel,
    			name:o.user.name,
    			yzm:o.captcha
    		},
        e = function(n) {
    		updateUserStatus(n.result);
    		console.log("success:" + JSON.stringify(n));
    		
    		var page = "";		    	
			
			var forwardPage = "";
			
			if(o.comeFrom){
				forwardPage = o.comeFrom;
			} else {
				forwardPage = MasterConfig.C('basePageUrl')+"person/index.html";
			}
			
			if (page) {
				location.href = page+"?comeFrom="+forwardPage;
			}else{
				alert("注册成功。");
				location.href = forwardPage;
			}
    		
//    		var isInAct = "";
//    		function sendMsg(){
//				
//				var n = "GET",
//	    		a = "sendNotification",
//	    		i = null,
//	    		e = function(n) {
//	    			isInAct = n.result;
//	    			var page = "";
//		    		if("true"==isInAct){
//		    			page = MasterConfig.C('basePageUrl')+"wuye/act.html";
//		    		}
//					
//					var forwardPage = "";
//					
//					if(o.comeFrom){
//		        		forwardPage = o.comeFrom;
//		        	} else {
//		        		forwardPage = MasterConfig.C('basePageUrl')+"person/index.html";
//		        	}
//					
//					if (page) {
//						location.href = page+"?comeFrom="+forwardPage;
//					}else{
//						alert("注册成功。");
//						location.href = forwardPage;
//					}
//	    		},
//	    		r = function() {
//					if(o.comeFrom){
//		        		location.href = o.comeFrom;
//		        	} else {
//		        		location.href = MasterConfig.C('basePageUrl')+"person/index.html";
//		        	}
//	    		};
//	    		common.invokeApi(n, a, i, null, e, r)
//	    		
//			}
//    		sendMsg();
			
        },
        r = function(n) {
        	commonui.hideAjaxLoading();
    		$("#zzmb").hide();
    		o.isClick = false;
        	alert(n.message==null?"验证码不正确或信息保存失败，请重试！":n.message);
        };
        common.invokeApi(n, a, i, null, e, r)
    }
	function yzmreq(){
    	var n = "POST",
        a = "getyzm",
        i = {mobile:o.user.tel},
        e = function(n) {
			console.log(JSON.stringify(n));
			o.yzmtime = 60;
			var tt=setInterval("updateBtn()",1000);
			var ss = setTimeout(function(){clearInterval(tt);}, 61*1000);
        },
        r = function() {
			alert("验证码已下发，请查收短信");
			o.yzmtime = 60;
        	o.yzmstr="重新获取";
        };
        common.invokeApi(n, a, i, null, e, r)
    }
	
    o = avalon.define({
        $id: "root",
        comeFrom:"",
        isClick: false,
        
        user:{},
        save:function(){
        	if(!(/^1[3-9][0-9]\d{4,8}$/.test(o.user.tel))) {
        		alert("请填写正确的手机号！");
        		return;
        	}
        	if(o.captcha=='') {
    			alert('请输入验证码！');
    			return;
    		}
        	
        	commonui.showAjaxLoading();
    		$("#zzmb").show();
        	if($(window).height()>$(document).height()){
        		$(".zzmb").height($(window).height());
        	}else{
        		$(".zzmb").height($(document).height());
        	}
        	if (o.isClick == true) {
				alert("请勿重复提交。");
			}
        	o.isClick = true;
        	simpleRegister();
        },
        
        
        yzmtime : 60,
        yzmstr:"获取验证码",
        captcha: '',
        directSave: true,//使用该属性改变页面的按钮状态和提示信息的显示或者隐藏
        getCaptcha: function() {
        	var reg = /^1[3-9][0-9]\d{8}$/;
	       	if (!reg.test(o.user.tel)) {
	       	     alert("请输入正确的手机号");
	       	     return;
	       	};
	       	if(o.yzmstr=="获取验证码"||o.yzmstr=="重新获取"){
	       		o.yzmstr="获取中";
	       		yzmreq();
	       	}
        }
    });
    
    getComeFrom();
    getUserInfo();

	avalon.scan(document.body),
    FastClick.attach(document.body),
    common.setTitle("用户注册");
});

function updateBtn(){
	o.yzmstr=o.yzmtime+"秒后重新获取";
	console.log(o.yzmstr);
	o.yzmtime--;
	if(o.yzmtime<=0){
		o.yzmstr="重新获取";
	}
}