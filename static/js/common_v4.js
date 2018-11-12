var MasterConfig = function() {
    var t = {
                
        baseUrl: "https://www.e-shequ.com/dhzj3/wechat/hexie/wechat/",
        basePageUrl:"https://www.e-shequ.com/dhzj3/weixin/",
        appId: "wxe8dea53aad1a93b9",
        
        oauthUrl: "https://open.weixin.qq.com/connect/oauth2/authorize?",
        oauthUrlPostFix:"&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect",
		oauthUrlPostSilent:"&response_type=code&scope=snsapi_base&state=123#wechat_redirect",
        bindAppId: "wxe8dea53aad1a93b9",
        
		payPageFolder:"https://www.e-shequ.com/pay/",
        payPageSuffix:"zj3",		//hexie

        baidu_map_key:"RUWUgrEEF5VjoaWsstMMZwOD",
        shop_name: "东湖e家园",
        
        is_debug:true,
       
    },
    
    e = {};
    return e.C = function(e) {
        return t[e]
    },
    e
} ();
var Config = function() {
    var t = {
        download: {
        },
        pullload_text: {
            load_text: "正在玩命的加载...",
            no_orders: "没有更多的订单了...",
            no_tuan_orders: "没有更多的团订单了...",
            no_goods: "更多新品正在陆续推出..."
        },
        user_info: {
            avatar: "https://www.e-shequ.com/dhzj3/weixin/static/images/logo.jpg",
            nickname: "游客",
            levelname: "普通会员"
        },
        user_level:{
            0 : "普通会员",
            1 : "钻石会员",
            2 : "大楼VIP"
        },
        coupon:{
            seedImg:"https://www.e-shequ.com/dhzj3/weixin/static/img/banner/banner_market_shuiguo.jpg"
        }
    },
    e = {};
    return e.C = function(e) {
        return t[e]
    },
    e
} ();

function showDialog(title,placeholder,content,onConfirmMsg,onCancelClick){
    if(!placeholder) {
        placeholder = "";
    }
    if(!title) {
        title = "提交内容";
    }
    if(!content){
        content = "";
    }
    var chatHtml = 
            "<div class='weui_mask' id='dialog_overlay'></div>                                                   "
            +"<div class='weui_dialog'>                                                       "
            +"  <div class='dialog_title'>"+title+"</div>                                          "
            +"  <div class='dialog_content'>                                                  "
			+"		<textarea class='dialog_textarea' rows='4' placeholder='"+placeholder+"' id='dialog_content'>"+content+"</textarea>"
            +"  </div>                                                                        "
            +"  <div class='dialog_btn_bar'>                                                  "
            +"      <div class='dialog_btn' id='dialog_cancel'>取消</div>                     "
            +"      <div class='dialog_btn' id='dialog_confirm'>确定</div>                    "
            +"  </div>                                                                        "
            +"</div>                                                                          ";
        
    $("#dialog").html('');
    var loadHtml = "";
    $("#dialog").html(chatHtml);
    $("#dialog_confirm").click(function(){
        if(onConfirmMsg){
            onConfirmMsg($("#dialog_content").val());
        }
        $("#dialog").html('');
    });
    $("#dialog_cancel").click(function(){
        $("#dialog").html('');
        if(onCancelClick){
            onCancelClick();
        }
    });
}
Date.prototype.format = function(fmt){
	  var o = {   
	    "M+" : this.getMonth()+1,               
	    "d+" : this.getDate(),                   
	    "h+" : this.getHours(),                 
	    "m+" : this.getMinutes(),              
	    "s+" : this.getSeconds(),                
	    "q+" : Math.floor((this.getMonth()+3)/3), 
	    "S"  : this.getMilliseconds()          
	  };   
	  if(/(y+)/.test(fmt))   
	    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
	  for(var k in o)   
	    if(new RegExp("("+ k +")").test(fmt)) 
	            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ?
	                     (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
	 return fmt;   
}
function dealWithAjaxData(o, e, i, r) {
    if (common.log(o, e), e.success) {
        i(e);
        return;
    }
    switch ("" + e.errorCode) {
        case "40001":
            reLogin();
            break;
        case "40002":
            toBindLink();
            break;
        case "42032":
            common.wechatAuthorize();
            break;
        default:
            r(e)
            break;
    }
}
function reLogin() {
    setCookie("UID", "", 0),
    common.login(!0)
}
function getCookie(e) {
    return document.cookie.length > 0 && (c_start = document.cookie.indexOf(e + "="), -1 != c_start) ? (c_start = c_start + e.length + 1, c_end = document.cookie.indexOf(";", c_start), -1 == c_end && (c_end = document.cookie.length), unescape(document.cookie.substring(c_start, c_end))) : ""
}
function setCookie(e, o, n) {
    var t = e + "=" + o + "; ",
    i = "";
    null !== n && void 0 !== n && (i = "expires=" + new Date(1e3 * n) + "; "),
    document.cookie = t + i + "path=/"
}
function isWeChatBrowser() {
    var e = navigator.userAgent.toLowerCase();
    return "micromessenger" == e.match(/MicroMessenger/i) ? !0 : !1
}
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
/**微信初始化**/
function initWechat(apis) {
	var n = "POST",
    a = "getUrlJsSign",
    i = {url:window.location.href.split('#')[0]},
    e = function(n) {
		wx.config({
		    appId: n.result.appId, // 必填，公众号的唯一标识
		    timestamp: n.result.timestamp , // 必填，生成签名的时间戳
		    nonceStr: n.result.nonceStr, // 必填，生成签名的随机串
		    signature: n.result.signature,// 必填，签名，见附录1
		    jsApiList: apis // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
    },
    r = function(n) {
    	alert(n.message==''?"获取支付权限失败！":n.message);
    };
    common.invokeApi(n, a, i, null, e, r)
}

function initShareConfig(title,link,img,desc){
	if(link.indexOf(MasterConfig.C("basePageUrl"))>=0
			&&link.indexOf('shareCode')<0
			&&getCookie("shareCode")!=null&&getCookie("shareCode")!=''){
		
		if(link.indexOf('?')<0) {
			link = link +"?";
		}
		if(link.indexOf('?')<link.length-1){
			link = link + "&";
		}
		link = link + "shareCode="+getCookie("shareCode");
	}
	
	wx.ready(function(){
		wx.onMenuShareTimeline({
		    title:title, // 分享标题
		    link:link, // 分享链接
		    imgUrl:img
		});
		wx.onMenuShareAppMessage({
		    title: title, // 分享标题
		    desc: desc, // 分享描述
		    link: link, // 分享链接
		    imgUrl: img
		});
	});
}
function checkFromShare(salePlanType,salePlanId) {
	var shareCode = getUrlParam("shareCode");
	if(shareCode!=null&&shareCode!=''){
		var pobj = {};
		if(salePlanType!=null)pobj.salePlanType=salePlanType;
		if(salePlanId!=null)pobj.salePlanId=salePlanId;
		common.invokeApi("POST",'shared/'+shareCode,pobj,null,function(){
			//common.removeParamFromUrl(["shareCode"]);
		});
	}
}
/**本地没标识或者40001需要重新登录|换号是否还保留cookie*/
function checkCodeAndLogin(){
    var getData = common._GET();
    var b = getData.bind;
    var o = getData.code;
	if(!b&&o){
		common.login();
		return false;
	} else {
		return true;
	}
}
function toBindLink(){
    var p = common.removeParamObject(["from","bind", "code", "share_id", "isappinstalled", "state", "m", "c", "a"]);
    p = common.addParamObject(p,"bind","true");
    var n = location.origin + location.pathname + common.buildUrlParamString(p),
    t = MasterConfig.C("oauthUrl");
    end = MasterConfig.C("oauthUrlPostFix");
    var url = t + "appid=" + MasterConfig.C("bindAppId") + "&redirect_uri=" + encodeURIComponent(n) +end+ "#wechat_redirect";
    console.log(url);
    location.href = url;
}
function checkBindAndBind(){
    var getData = common._GET();
    var b = getData.bind;
    var o = getData.code;
    if(b&&o) {
        common.alert("start api bind"),
        common.invokeApi("POST", "bindWechat/"+MasterConfig.C("bindAppId")+"/" + o, null,
            null,
        function(x) {
            common.alert("api binded")
            location.href = location.origin +common.removeParamFromUrl(["bind","code"]);
        })
    }
}
/**变更才需要重设置*/
function updateUserStatus(user) {
	var duration = new Date().getTime()/1000 + 3600*24*30;
    setCookie("UID", user.uid,  duration);
    setCookie("currentAddrId", user.currentAddrId, duration);
    setCookie("tel", user.tel, duration);
    setCookie("shareCode", user.shareCode, duration);
}
function updateCurrentAddrId(addrId){
	var duration = new Date().getTime()/1000 + 3600*24*30;
    setCookie("currentAddrId", addrId, duration);
}
function isRegisted(){
	var tel = getCookie("tel");
	return tel&&tel!='null';
}

function toRegisterAndBack(){
	var n = location.origin + common.removeParamFromUrl(["from", "bind", "code", "share_id", "isappinstalled", "state", "m", "c", "a"]);
	location.href=MasterConfig.C('basePageUrl')+"person/register.html?comeFrom="+encodeURIComponent(n);
}

AJAXFlag = !0;
var common = {
    isDebug: !1,
    getApi: function(e) {
        var o = parseInt(getCookie("BackendPort"));
        return MasterConfig.C("baseUrl") + (o ? ":" + o: "") + "/" + e;
    },
    invokeApi: function(e, o, n, t, i, r) {
        if (common.alert("url: " + o), AJAXFlag) { (null === t || void 0 === t) && (t = function() {}),
            (null === i || void 0 === i) && (i = function() {}),
            (null === r || void 0 === r) && (r = function() {});
            var a = {
                url: this.getApi(o),
                type: e,
                xhrFields: {
                    withCredentials: !0
                },
                dataType: "json",
                beforeSend: t,
                success: function(e) {
                    common.alert("success data: " + JSON.stringify(e)),
                    dealWithAjaxData(o, e, i, r);
                },
                error: function(e) {
                    common.alert("error data: " + JSON.stringify(e)),
                    commonui.hideAjaxLoading();
                }
            };
            null !== n && void 0 !== n && (a.data = JSON.stringify(n), ("PUT" == e || "POST" == e) && (a.contentType = "application/json; charset=UTF-8")),
            $.ajax(a)
        }
    },
    login: function() {
        var o = this._GET().code;
        if (common.alert("code: " + o), void 0 === o) {
            var n = location.origin + common.removeParamFromUrl(["from","bind", "code", "share_id", "isappinstalled", "state", "m", "c", "a"]),
            t = MasterConfig.C("oauthUrl"),
            end = MasterConfig.C("oauthUrlPostFix");
            location.href = t + "appid=" + MasterConfig.C("appId") + "&redirect_uri=" + encodeURIComponent(n) +end+ "#wechat_redirect"
        } else common.alert("start api login"),
        this.invokeApi("POST", "login/" + o, null,
        function() {
            AJAXFlag = !1
        },
        function(x) {
            updateUserStatus(x.result);
            AJAXFlag = !0,
            location.href = location.origin +common.removeParamFromUrl(["code"]);
        })
    },
    checkRegisterStatus:function(){
        if(!getCookie("UID")){
        	common.login();/**不应该出现*/
        	return false;
        }
        if(!isRegisted()){
        	alert("请先完成注册！");
        	toRegisterAndBack();
        	return false;
        }
    	return true;
    },
    hasRegister:function(){
    	return getCookie("UID")&&isRegisted();
    },
    _GET: function() {
        var e = location.search,
        o = {};
        if ("" === e || void 0 === e) return o;
        e = e.substr(1).split("&");
        for (var n in e) {
            var t = e[n].split("=");
            o[t[0]] = t[1]
        }
        return o.from && delete o.code,
        o
    },
    log: function() {
        for (var e = arguments.length,
        o = 0; e > o; o++) console.log(arguments[o])
    },
    alert: function(e) {
        "" === getCookie("DevDebug") ? console.log(e) : alert(e)
    },
    errorTip: function() {
        var e = '<div class="wrapper"></div><div class="box"><p>请重新刷新</p></div>';
        $("body").prepend(e)
    },
    setTitle: function(e) {
        $("title").text(e)
    },
    addParamObject:function(e, name,value){
        e[name]=value;
        return e;
    },
    removeParamObject:function(e){
        var o = common._GET();
        common.log(o);
        for (var n in e) delete o[e[n]];
        return o;
    },
    removeParamFromUrl: function(e) {
        return location.pathname + common.buildUrlParamString(common.removeParamObject(e));
    },
    buildUrlParamString: function(e) {
        var o = "";
        for (var n in e) o += n + "=" + e[n] + "&";
        o = o.slice(0, o.length - 1);
        var t = "" === o || void 0 === o;
        return t ? "": "?" + o
    },
    wechatAuthorize: function() {
        var e = MasterConfig.C("appId");
        var n = location.origin + common.removeParamFromUrl(["from", "code", "share_id", "isappinstalled", "state", "m", "c", "a"]),
        t = MasterConfig.C("oauthUrl");
        end = MasterConfig.C("oauthUrlPostFix");
        location.href = t + "appid=" + e + "&redirect_uri=" + encodeURIComponent(n) +end+ "#wechat_redirect";
    },
    
    
};

var commonui = {
		initPage:function() {
			if ($("#LoadingBar") != null) {
				$("#LoadingBar").css("display","none");
				$("#fade").css("display","none");
			}
		},
		loadingPage:function() {
			if ($("#LoadingBar") != null) {
				$("#LoadingBar").css("display","block");
				$("#fade").css("display","block");
			}
		},
		showMessage:function(msg) {
			commonui.showMsg(msg, 1500);
		},
		showMsg:function(msg, times) {
			commonui.hideAjaxLoading();
			if ($("#phoneErro") != null) {
				$("#phoneErro").html(msg);
				$("#phoneErro").fadeIn("slow");
				setTimeout('$("#phoneErro").fadeOut("slow")', times);
			}
		},
		showAjaxLoading:function() {
			if ($("#phoneAjax") != null) {
				$("#phoneAjax").removeClass("hidden");
			}
		},
		hideAjaxLoading:function() {
			if ($("#phoneAjax") != null) {
				$("#phoneAjax").addClass("hidden");
			}
		}
}

checkBindAndBind();
checkCodeAndLogin();
common.setTitle(MasterConfig.C("shop_name"));
