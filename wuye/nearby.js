function n() {
        var n = "GET",
        a = "userInfo",
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
			// 百度地图API功能
			var map = new BMap.Map("allmap");            // 创建Map实例
			map.centerAndZoom(new BMap.Point(n.result.longitude, n.result.latitude));
			var local = new BMap.LocalSearch(map, {
			  renderOptions:{map: map, autoViewport:true}
			});
			local.searchNearby(["派出所","幼儿园","医院","街道"],n.result.province+n.result.city+n.result.xiaoquName,3000);
        },
        r = function() {
			console.log(JSON.stringify(n));
			alert("获取您的小区信息异常，请稍后查看！");
        };
        common.invokeApi(n, a, i, null, e, r)
    }
if(common.hasRegister()){
	n();
} else {
	alert("请先登录或完善个人信息！");
	location.back(-1);
}

