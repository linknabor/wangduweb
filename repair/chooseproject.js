var typeConfig={
    	1:["浴室维修","images/icon_btn_yushiweixiu_03.png"],
    	2:["厨房维修","images/icon_btn_chufangweixiu_03.png"],
    	3:["客厅卧室维修","images/icon_btn_ketingweixiu_03.png"],
    	4:["强弱电维修","images/icon_btn_qiangruodianweixiu_03.png"],
    	5:["门窗维修","images/icon_btn_menchuanweixiu_03.png"],
        6:["其它维修","images/icon_btn_qitaweixiu_03.png"],
        7:["家电","images/icon_btn_jiadian.png"]
    };
avalon.ready(function() {
    function queryProjects() {
    	var type = getUrlParam("repairType");
    	if(!type){
    		type = 1;
    	}
	    o.typeName = typeConfig[type][0];
		o.typeImg = typeConfig[type][1];
        common.invokeApi("GET", "repair/projects/"+type, null, null, function(n) {
            o.projects = n.result;
        },  function() {
            console.log(JSON.stringify(n));
            alert("获取项目失败，请稍后重试！");
        });
    }
    var o = avalon.define({
        $id: "root",
        typeImg:'',
        typeName:'',
        projects: [
        ]
    });
    avalon.scan(document.body);
    queryProjects();
});