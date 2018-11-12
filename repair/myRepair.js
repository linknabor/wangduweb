avalon.ready(function() {
	var typeConfig={
    	1:["浴室维修","images/icon_btn_yushiweixiu_03.png"],
    	2:["厨房维修","images/icon_btn_chufangweixiu_03.png"],
    	3:["客厅卧室维修","images/icon_btn_ketingweixiu_03.png"],
    	4:["强弱电维修","images/icon_btn_qiangruodianweixiu_03.png"],
    	5:["门窗维修","images/icon_btn_menchuanweixiu_03.png"],
    	6:["其它维修","images/icon_btn_qitaweixiu_03.png"],
        7:["家电","images/icon_btn_jiadian.png"]
    };
    function n() {
        common.invokeApi("GET","repair/query", null, null, function(n) {
            console.log(JSON.stringify(n));
            var orders = n.result;
            for(var i in orders){
            	orders[i].typeName = typeConfig[orders[i].repairType][0];
            	orders[i].typeImg = typeConfig[orders[i].repairType][1];
            }
            o.orders = orders;
        }, function(n) {
        	alert("查询维修记录异常，请稍后重试");
            console.log(JSON.stringify(n));
        });
    }
    var o = avalon.define({
        $id: "root",
        orders: [
        ],
        gotoDetail:function(idx){
        	location.href="ordersDetail.html?oId="+o.orders[idx].id;
        }
    });
    avalon.scan(document.body);
    n();
});