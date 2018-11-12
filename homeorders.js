avalon.ready(function() {
    function q() {
        var n = "GET",
        a = "yuyueOrders",
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
            o.orders = n.result;
            o.groupsNum = n.result.length;
        },
        r = function() {
			console.log(JSON.stringify(n));
			o.orders = [];
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    function notifyPaySuccess(order) {
    	var n = "GET",
        a = "/notifyPayed/"+order.serviceOrderId,
        i = null,
        e = function(n) {},
        r = function() {};
        common.invokeApi(n, a, i, null, e, r)
    }
    function pay(order) {
    	var n = "GET",
        a = "/requestPay/"+order.serviceOrderId,
        i = null,
        e = function(n) {
        	wx.chooseWXPay({
              "timestamp":n.result.timestamp,
              "nonceStr":n.result.nonceStr,
              "package":n.result.pkgStr,
              "signType":n.result.signType,
              "paySign":n.result.signature,
        	    success: function (res) {
                  	notifyPaySuccess(order);
                  	order.status=1;
                  	order.payStatus=1;
        	    }
        	});
        },
        r = function() {
			alert("支付请求失败，请稍后重试！");
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    function orderCancel(order) {
    	var n = "GET",
        a = "/cancelOrder/"+order.serviceOrderId,
        i = null,
        e = function(n) {
           order.status=5;
           order.payStatus=2;
           alert("服务单已取消");
        },
        r = function() {
			alert("支付取消失败，请稍后重试！");
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    var o = avalon.define({
        $id: "root",
        bg_img:'static/img/bg/bg_yuyue.jpg',
        groupsNum: 1,
        gotoDetail:function(order){
        	location.href="homeorderdetail.html?orderId="+order.id+"&productType="+order.productType;
        },
        orderPay: function(order) {
        	pay(order);
        },
        orderCancel: function(order) {
        	if(confirm("确定要取消该服务？")){
        		orderCancel(order);
        	}
        },
        pictureSrc:function(productName){
        	if(productName == null) 
        		return "http://7xnqht.com2.z0.glb.qiniucdn.com/FvWInw8Dpu3-jTzgnU2Lz78G2Mh1";
        	if(productName.indexOf("家务员")>=0)
        		return "static/images/home/ayilaile/jiawuyuan.jpg";
        	else if(productName.indexOf("育儿嫂")>=0)
        		return "static/images/home/ayilaile/yuer.jpg";
        	else if(productName.indexOf("月嫂")>=0)
        		return "static/images/home/ayilaile/yuesao.jpg";
        	else if(productName.indexOf("临时小时工")>=0)
        		return "static/images/home/ayilaile/linshi.jpg";
        	else if(productName.indexOf("包月小时工")>=0)
        		return "static/images/home/ayilaile/baoyue.jpg";
        	else if(productName.indexOf("老人")>=0)
        		return "static/images/home/ayilaile/yanglao.jpg";
			else if(productName.indexOf("口腔58元体检套餐")>=0)
        		return "static/images/home/small/yuyue_small_huyaoral_58.jpg";
			else if(productName.indexOf("单人口腔洁牙升级套餐")>=0)
        		return "static/images/home/small/yuyue_small_huyaoral_88.jpg";
        	else if(productName.indexOf("89元上门")>=0)
        		return "http://7xkdq7.com1.z0.glb.clouddn.com/Fh40U5yuoUJgXlNi5uVbuLvCCzVH";
        	else if(productName.indexOf("18元全车上门美容")>=0)
        		return "static/images/home/small/yuyue_small_fasuper_18.png";
        	else if(productName.indexOf("60元内饰")>=0)
        		return "static/images/home/small/yuyue_small_fasuper_60.jpg";
        	else if(productName.indexOf("100元汽车内饰")>=0)
        		return "static/images/home/small/yuyue_small_fasuper_100.jpg";
        	else if(productName.indexOf("100元内饰清洗")>=0)
        		return "static/images/home/small/yuyue_small_fasuper_100.jpg";
        	else if(productName.indexOf("19元车身清洗")>=0)
        		return "static/images/home/small/yuyue_small_fasuper_19.jpg";
        	else if(productName.indexOf("58元车身清洗")>=0)
        		return "static/images/home/small/yuyue_small_fasuper_58.jpg";
        	else if(productName.indexOf("88元车身美容套餐")>=0)
        		return "static/images/home/small/yuyue_small_fasuper_88.jpg";
        	else if(productName.indexOf("188元全车美容养护套餐")>=0)
        		return "static/images/home/small/yuyue_small_fasuper_188.jpg";
        	else if(productName.indexOf("119元全车养护套餐")>=0)
        		return "static/images/home/small/yuyue_small_fasuper_119.jpg";
        	else if((productName.indexOf("98元鲜花包月"))>=0 ||(productName.indexOf("118元鲜花包月"))>=0)
        		return "static/images/home/small/yuyue_small_flowerplus_danse.jpg";
        	else if(productName.indexOf("混合鲜花包月")>=0)
        		return "static/images/home/small/yuyue_small_flowerplus_hunhe.jpg";
        	else if(productName.indexOf("单色鲜花体验活动")>=0)
        		return "static/images/home/small/yuyue_small_flowerplus_tiyan_danse.jpg";
        	else if(productName.indexOf("浴室换新服务")>=0)
        		return "static/images/home/small/yuyue_small_weizhuang_bathroom.png";
        	else if(productName.indexOf("厨房换新服务")>=0)
        		return "static/images/home/small/yuyue_small_weizhuang_kitchen.png";
        	else if(productName.indexOf("全屋涂料刷新服务(不铲墙)")>=0)
        		return "static/images/home/small/yuyue_small_weizhuang_paint.jpg";
        	else if(productName.indexOf("全屋涂料刷新服务(铲墙)")>=0)
        		return "static/images/home/small/yuyue_small_weizhuang_wall.jpg";
        	else if(productName.indexOf("398元车载气压按摩靠垫")>=0)
        		return "static/images/home/small/yuyue_small_bovo_baz501.jpg";
        	else if(productName.indexOf("468元车载气压按摩颈腰靠垫")>=0)
        		return "static/images/home/small/yuyue_small_bovo_baz508.jpg";
        	else if(productName.indexOf("788元通用型车载气压按摩座垫")>=0)
        		return "static/images/home/small/yuyue_small_bovo_baz701.jpg";
        	else if(productName.indexOf("988元SUV型车载气压按摩座垫")>=0)
        		return "static/images/home/small/yuyue_small_bovo_baz708.jpg";
        	else if(productName.indexOf("高尔夫(成人)体验课58元")>=0)
        		return "static/images/home/small/yuyue_small_gaofei_golf58.jpg";
        	else if(productName.indexOf("高尔夫(青少年)体验课38元")>=0)
        		return "static/images/home/small/yuyue_small_gaofei_golf38.jpg";
        	else if(productName.indexOf("高尔夫(家庭套餐)体验课108元")>=0)
        		return "static/images/home/small/yuyue_small_gaofei_golf108.jpg";
        	else if(productName.indexOf("高尔夫上门教学98元")>=0)
        		return "static/images/home/small/yuyue_small_gaofei_golf98.jpg";
        	else if(productName.indexOf("畅打月卡不限次数88元")>=0)
        		return "static/images/home/small/yuyue_small_gaofei_golf88.jpg";
        	else if(productName.indexOf("情人节臻爱玫瑰礼盒399元-厄瓜多尔进口玫瑰")>=0)
        		return "http://7xnqht.com2.z0.glb.qiniucdn.com/FtVCMNG-XCjJhxRe37wyUByoTmUH";
        	else if(productName.indexOf("【送花瓶】礼品花束――玫瑰系列")>=0)
        		return "http://7xnqht.com2.z0.glb.qiniucdn.com/FpP00NFlfepLfNrWKBJJP1z65P-a";
        	else if(productName.indexOf("【送花瓶】礼品花束――康乃馨系列")>=0)
        		return "http://7xnqht.com2.z0.glb.qiniucdn.com/FotvfP9ObZPqxFhuuffgxi83MjL-";
        	else if(productName.indexOf("【送花瓶】礼品花束――郁金香系列")>=0)
        		return "http://7xnqht.com2.z0.glb.qiniucdn.com/FnwPiJ3TEiPWr_iiN2XeTkA75JO4";
        	else 
        		return "http://7xnqht.com2.z0.glb.qiniucdn.com/FvWInw8Dpu3-jTzgnU2Lz78G2Mh1";
        },
        orders:[],
        getDateStr:function(idx){
        	return (new Date(o.orders[idx].createDate)).format('yyyy-MM-dd hh:mm');
        }
    });
    q();
    initWechat(['chooseWXPay']) ;
    avalon.scan(document.body);
    //share.default_send();
    FastClick.attach(document.body);  
    common.setTitle("服务订单");
});