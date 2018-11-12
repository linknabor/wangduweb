avalon.ready(function() {
    function n() {
        var n = "GET",
        a = "userInfo",
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
			o.user = n.result;
            o.user.headimgurl = "" != n.result.name ? n.result.headimgurl: Config.C("user_info").avatar;
            o.user.name = "" != n.result.name ? n.result.name: Config.C("user_info").nickname;
            o.user.level = Config.C("user_level")[n.result.level];
			o.user.officeTel = n.result.officeTel;
        },
        r = function() {
			console.log(JSON.stringify(n));
			o.user={};
			o.user.headimgurl = Config.C("user_info").avatar,
			o.user.name = Config.C("user_info").nickname,
			o.user.level = Config.C("user_info").levelname
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    var a = 0,
    o = avalon.define({
        $id: "root",
        user: {
        	headimgurl:"",/**默认头像*/
        	name:"",
        	level:"",
        	zhima:"0",
        	lvdou:"0",
        	couponCount:0,
			officeTel:0
        },

		//fix me
        myOrderNum:1,
        myYuyueNum:2,
        mySubjectNum:3,
        myGroupNum:4,
        jumpto:function(url){
        	window.location.href=url;
        },
        gotoAddress:function(){
        	if(common.hasRegister()){
            	location.href=MasterConfig.C('basePageUrl')+"person/addresses.html?v=20151217";
        	} else {
        		location.href=MasterConfig.C('basePageUrl')+"person/register.html?v=20151217";
        	}
        },
        gotoEdit:function(){
        	if(common.hasRegister()){
            	location.href=MasterConfig.C('basePageUrl')+"person/bindphone.html?v=20151217";
        	} else {
        		location.href=MasterConfig.C('basePageUrl')+"person/register.html?v=20151217";
        	}
        },
        coupons:function(){
        	location.href=MasterConfig.C('basePageUrl')+"person/coupons.html";
        }
    });
    
    //更新红包状态
	function updateCouponStatus(){
		
		var n = "GET",
        a = "updateCouponStatus",
        i = null,
        e = function(n) {
            console.log(JSON.stringify(n));
        },
        r = function() {

        };
        common.invokeApi(n, a, i, null, e, r)
		
	}

    n();
    updateCouponStatus();
    avalon.scan(document.body);
    initWechat(['onMenuShareTimeline','onMenuShareAppMessage']);
    initShareConfig("我的社区，我的家，我在东湖e家园！",MasterConfig.C("basePageUrl")+"person/index.html?v=20160301",MasterConfig.C("basePageUrl")+"/static/images/share_logo4.png","东湖e家园，我的生活管家");
    FastClick.attach(document.body);
    common.setTitle("个人中心");
});