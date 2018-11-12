avalon.ready(function() {
	function getCurrentType(){
		o.currentType=getUrlParam("type");
		if(o.currentType) {
			getServiceByServiceType(o.currentType);
		}
	}
	function getServiceByServiceType(serviceType) {
        var n = "GET",
        a = "toHome/service/"+serviceType,
        i = null,
        e = function(n) {
            o.services = n.result;
        },
        r = function() {
    		alert("网络异常，请稍后重试！");
            o.services = [];
        };
        common.invokeApi(n, a, i, null, e, r)
    }

    o = avalon.define({
        $id: "root",
        services:[],
        currentType:0
    });

	getCurrentType();
    initWechat(['onMenuShareTimeline','onMenuShareAppMessage']);
    initShareConfig("点亮生活，尽在东湖e家园！",MasterConfig.C("basePageUrl")+"home/index.html?v=20160229",MasterConfig.C("basePageUrl")+"/static/images/share_home.jpg","");
    avalon.scan(document.body),
    FastClick.attach(document.body),
    common.setTitle("生活服务");
    checkFromShare();
});