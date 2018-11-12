avalon.ready(function() {
	function getOrderId(){
		o.orderId=getUrlParam("orderId");
		o.productType=getUrlParam("productType");
		console.log("o.orderId="+o.orderId+"o.productType="+o.productType);
	}
    function query() {
        var n = "GET",
        a = "yuyueOrders/"+o.orderId,
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
            o.order = n.result;
            if(o.order == null || o.order.id == null){
            	if(confirm("获取订单信息失败，返回拼单首页！")){
    				location.href="index.html";
    			};
            }else{
            	queryAddInfo();
            }
        },
        r = function() {
        	if(confirm("获取订单信息失败，返回拼单首页！")){
				location.href="index.html";
        	};
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    function queryAddInfo() {
        var n = "GET",
        a = "yuyueOrders/"+o.productType+"/"+o.orderId,
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
            o.orderAddInfos = n.result;
            if(o.orderAddInfos == null){
            	if(confirm("获取订单补充信息信息失败，返回拼单首页！")){
    				location.href="index.html";
    			};
            }
        },
        r = function() {
        	if(confirm("获取订单补充信息失败，返回拼单首页！")){
				location.href="index.html";
        	};
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    var o = avalon.define({
        $id: "root",
        productType:0,//0:阿姨来了；1：尚匠洗车；2；flowerPlus
        pictureSrc:function(productName){
        	if(productName == null) 
        		return "../static/images/home/ayilaile/jiawuyuan.jpg";
        	if(productName.indexOf("家务员")>=0)
        		return "../static/images/home/ayilaile/jiawuyuan.jpg";
        	else if(productName.indexOf("育儿嫂")>=0)
        		return "../static/images/home/ayilaile/yuer.jpg";
        	else if(productName.indexOf("月嫂")>=0)
        		return "../static/images/home/ayilaile/yuesao.jpg";
        	else if(productName.indexOf("临时小时工")>=0)
        		return "../static/images/home/ayilaile/linshi.jpg";
        	else if(productName.indexOf("包月小时工")>=0)
        		return "../static/images/home/ayilaile/baoyue.jpg";
        	else if(productName.indexOf("老人")>=0)
        		return "../static/images/home/ayilaile/yanglao.jpg";
			else if(productName.indexOf("口腔")>=0)
        		return "../static/images/home/small/yuyue_small_huyaoral_58.jpg";
        	else if(productName.indexOf("89元上门")>=0)
        		return "http://7xkdq7.com1.z0.glb.clouddn.com/Fh40U5yuoUJgXlNi5uVbuLvCCzVH";
        	else if(productName.indexOf("18元全车上门美容")>=0)
        		return "../static/images/home/small/yuyue_small_fasuper_18.png";
        	else if(productName.indexOf("60元内饰")>=0)
        		return "../static/images/home/small/yuyue_small_fasuper_60.jpg";
        	else if(productName.indexOf("100元内饰")>=0)
        		return "../static/images/home/small/yuyue_small_fasuper_100.jpg";
        	else if((productName.indexOf("98元鲜花包月"))>=0 ||(productName.indexOf("108元鲜花包月"))>=0)
        		return "../static/images/home/small/yuyue_small_flowerplus_danse.jpg";
        	else if(productName.indexOf("混合鲜花")>=0)
        		return "../static/images/home/small/yuyue_small_flowerplus_hunhe.jpg";
        	else if(productName.indexOf("情人节臻爱玫瑰礼盒399元-厄瓜多尔进口玫瑰")>=0)
        		return "http://7xnqht.com2.z0.glb.qiniucdn.com/FtVCMNG-XCjJhxRe37wyUByoTmUH";
        	else if(productName.indexOf("【九曳】108元单束礼品鲜花—玫瑰系列（送花瓶）")>=0)
                return "http://7xnqht.com2.z0.glb.qiniucdn.com/FpP00NFlfepLfNrWKBJJP1z65P-a";
            else if(productName.indexOf("【九曳】78元单束礼品鲜花—康乃馨系列（送花瓶）")>=0)
                return "http://7xnqht.com2.z0.glb.qiniucdn.com/FotvfP9ObZPqxFhuuffgxi83MjL-";
            else if(productName.indexOf("【九曳】128元单束礼品鲜花—郁金香系列（送花瓶）")>=0)
                return "http://7xnqht.com2.z0.glb.qiniucdn.com/FnwPiJ3TEiPWr_iiN2XeTkA75JO4";
            else if(productName.indexOf("【博彦专享】98鲜花包月（不含花瓶）")>=0)
                return "http://7xnqht.com2.z0.glb.qiniucdn.com/Ft938gqke4n1WnweKeX1lxCdTMas";
            else if(productName.indexOf("鲜花")>=0)
                return "http://7xnqht.com2.z0.glb.qiniucdn.com/Ft938gqke4n1WnweKeX1lxCdTMas";
        	else
        		return "";
        },
        order:{},
        orderAddInfos:[],
        orderId:0
    });
	getOrderId();
    query();
    avalon.scan(document.body);
    //share.default_send(),
    FastClick.attach(document.body);
});