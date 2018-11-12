avalon.ready(function() {
	function getBannerType() {
        var n = "GET",
        a = "banners",
        i = null,
        e = function(n) {
			 o.banners = n.result.titles;
			 o.activebanner = n.result.activities;
			 o.brand_icon = n.result.brands;
			 o.productbanner = n.result.product;
			 initSwiper();
    	     commonui.initPage();
        },
        r = function() {
    		alert("获取banner异常");
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    var o = avalon.define({
        $id: "root",
        
        productbanner:[],
        brand_icon:[],
        
        banners:[],
        activebanner:[],
        gotoPage:function(idx){
        	location.href=o.productbanner[idx].bannerUrl;
        }
    });
	getBannerType();
    avalon.scan(document.body);
    common.setTitle("社区集市");
    initWechat(['onMenuShareTimeline','onMenuShareAppMessage']);
    initShareConfig("生鲜、水果、美食、零食、红酒、蛋糕...每周惊喜，尽在东湖e家园社区集市！",MasterConfig.C("basePageUrl")+"group/onsalesindex.html?v=20160229",MasterConfig.C("basePageUrl")+"/static/images/share_logo2.png","原产地直供，订单采摘，享更多优惠，体验品质生活");
    FastClick.attach(document.body);
    checkFromShare();
});