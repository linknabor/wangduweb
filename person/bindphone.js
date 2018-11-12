var o;
avalon.ready(function() {
	function getUserInfo() {
        var n = "GET",
        a = "userInfo",
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
			o.user = n.result;
			o.oriPhone = o.user.tel;
        },
        r = function() {};
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
        r = function(n) {
			alert("验证码获取失败");
			o.yzmtime = 60;
        	o.yzmstr="重新获取";
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    
    function saveInfo(){
    	if(o.user.tel==o.oriPhone){
    		o.captcha='00000';
    	}
    	if(o.captcha!=""&&o.user.tel!=""){
    		var n = "POST",
            a = "savePersonInfo/"+o.captcha,
            i = {
    				name:o.user.name,
    				realName:o.user.realName,
    				tel:o.user.tel,
    				sex:o.user.sex},
            e = function(n) {
    			updateUserStatus(n.result);
    			window.location.href="index.html";
            },
            r = function(n) {
            	alert(n.message==''?"验证码校验失败！":n.message);
            };
            common.invokeApi(n, a, i, null, e, r)
    	}else{
    		alert("请完善输入信息");
    	}
    }
    o = avalon.define({
        $id: "root",
        oriPhone:'',
        yzmtime : 60,
        yzmstr:"获取验证码",
        captcha: '',
        user:{},
		genderPicker: [
		   {
		       name: '男',
		       sex: 1,
		       checked:false
		   },
		   {
		       name: '女',
		           sex: 2,
		           checked:false
		       }
		   ],
		getGender:function(sex){
			   	if(sex==2){
			   		return '女';
			} else if(sex==1){
				return '男';
			} else {
				return '未知';
			}
	   },
	   modalShown: false,
	   showModal: function() {
	       o.modalShown = true;
	       for (var i = 0, len = o.genderPicker.length; i < len; i++) {
	           o.genderPicker[i].checked = false;
	       }
	       o.genderPicker[o.user.sex-1].checked = true;
	   },
	   hideModal: function(e) {
	       if ('modal-mask' === e.target.className) {
	           o.modalShown = false;
	       }
	   },
	   selectGender: function(idx) {
	       for (var i = 0, len = o.genderPicker.length; i < len; i++) {
	           o.genderPicker[i].checked = false;
	       }
	       o.genderPicker[idx].checked = true;
	       o.user.sex = o.genderPicker[idx].sex;
	       o.modalShown = false;
	   },
	   
	   
	   
        getCaptcha: function() {
        	var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
	       	if (!reg.test(o.user.tel)) {
	       	     alert("请输入正确的手机号");
	       	     return;
	       	};
	       	if(o.yzmstr=="获取验证码"||o.yzmstr=="重新获取"){
	       		yzmreq();
	       	}
        },
        save: function() {
        	if(o.user.name==''||o.user.realName==''||o.user.tel==''){
        		alert('请完善个人信息！');
        		return;
        	}
        	if(o.user.tel!=o.oriPhone&&o.captcha==''){
        		alert('请输入验证码！');
        		return;
        	}
        	saveInfo();
        }
    });
    avalon.scan(document.body);
    getUserInfo();
    FastClick.attach(document.body);  
    common.setTitle("编辑个人信息");
    
});

function updateBtn(){
	o.yzmstr=o.yzmtime+"秒后重新获取";
	console.log(o.yzmstr);
	o.yzmtime--;
	if(o.yzmtime<=0){
//		o.yzmbtn="重新获取";
		o.yzmstr="重新获取";
	}
}

