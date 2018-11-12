avalon.ready(function() {
	
    	
//	var imgLink = Qiniu.imageView2({
//		mode: 3,  // 缩略模式，共6种[0-5]
//		w: 100,   // 具体含义由缩略模式决定
//		h: 100,   // 具体含义由缩略模式决定
//		q: 100,   // 新图的图像质量，取值范围：1-100
//		format: 'png'  // 新图的输出格式，取值范围：jpg，gif，png，webp等
//	}, key);
	
	
	function getCommunityInfo(){
		
		var n = "POST",
        a = "communityInfo/getCommunityInfo/",
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
			o.infos = n.result;
			o.info_count = n.result.length;
			
        },
        r = function() {
        	//alert("加载消息失败！");
        };
        common.invokeApi(n, a, i, null, e, r)
	}
	
	
	var o = avalon.define({
		$id : "root",
		infos : [],
		bg_img: '../static/images/community/bg_publish.jpg',
		info_count:0,
		
	});
	
	getCommunityInfo();
    avalon.scan(document.body),
    //share.default_send(),
    FastClick.attach(document.body),
    common.setTitle("百事通");
});