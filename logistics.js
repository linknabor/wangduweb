avalon.ready(function() {
	function getLogisticsParams(){
		o.com=getUrlParam("com");
		o.com = unescape(o.com);
		o.nu=getUrlParam("nu");
		
		if(""!=o.nu){
			queryLogisticsInfo();
		}else{
			o.logisticsinfo.hasInfo="0";
			commonui.initPage();
		}
	}
    function queryLogisticsInfo() {
        var n = "GET",
        a = "logistics/"+o.nu +"/"+o.com,
        i = null,
        e = function(n) {
            o.logisticsinfo = n.result;
            o.logisticsinfo.hasInfo="1";
            commonui.initPage();
        },
        r = function(n) {
        	commonui.initPage();
        	if(n==null||n.message==null){
        		alert("查询快递异常，请稍后再试！");
        	}else{
        		alert(n.message);
        	}
        	
        };
        common.invokeApi(n, a, i, null, e, r)
    }

    var o = avalon.define({
        $id: "root",
        com:'',
        nu:'',
	logisticsinfo:{}
    });
    
    getLogisticsParams();
    avalon.scan(document.body),
	common.setTitle("物流信息");
});