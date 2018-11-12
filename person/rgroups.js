avalon.ready(function() {
	function queryGroups(){
		var n = "GET",
        a = "myRgroups",
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
            o.groups = n.result;
       	    commonui.initPage();
        },
        r = function() {
			console.log(JSON.stringify(n));
			o.groups = [];
       	    commonui.initPage();
        };
        common.invokeApi(n, a, i, null, e, r)
	}
    var o = avalon.define({
        $id: "root",
        groups:[
        {
        	productName:"xxx",
        	status:1,
        	orderId:10
        }
        ],
    	statusStrs:function(i){
    		if(o.groups[i].status == 1) {
    			return "已支付";
    		}
    		return o.groups[i].productName;
    	},
    	leftTimeStrs:function(i){
    		if(i==0){
    			return "XDLSD"
    		}
    	},
    	gotoOrderDetail:function(i){
    		location.href = ""+o.groups[i].orderId
    	}
    });
    avalon.scan(document.body);
    queryGroups();
    //setInterval(updateLeftTime,1000);
    //share.default_send();
    FastClick.attach(document.body);  
    common.setTitle("我的团购");
});