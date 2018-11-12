avalon.ready(function() {
	
	function getAnnoucementList(){
		
		var n = "POST",
        a = "annoucement/getAnnoucementList/",
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
			o.annoucements = n.result;
			o.annoucement_count = n.result.length;
			
        },
        r = function() {
        	//alert("加载消息失败！");
        };
        common.invokeApi(n, a, i, null, e, r)
	}
	
	function refreshImages(threadId, index){
		
		var n = "GET",
        a = "thread/getImgDetail/"+threadId+"/"+index;
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
			var map = n.result;
			var url = map.imgUrl;
			var width = map.width;
			var height = map.height;
			
			var srcWidth = 0;
			var srcHeight = 0;
			
			if(""!=width&&"undefined"!=width){
				srcWidth = parseInt(width);
			}else{
				alert("请检查图片是否上传成功。");
			}
			
			if(""!=height&&"undefined"!=height){
				srcHeight = parseInt(height);
			}else{
				alert("请检查图片是否上传成功。");
			}
			
			var html = "<div id=\"imgDetail\" style=\"align:center\"><img src=\""+url+"\"/></div>";
			
			$("#zzmb").show("slow");
			
			$("#divconf").html(html);
        	$("#divconf").show("slow");
        	
        	if($(window).height()>$(document).height()){
        		$(".zzmb").height($(window).height());
        	}else{
        		$(".zzmb").height($(document).height());
        	}
        	
        	var screenHeight = $(window).height();
        	var screenWidth = $(window).width();
        	
        	var adjHeight = 0;	//缩放调整后图片高度
        	var adjWidth = 0;	//缩放调整后图片宽度
        	
        	var top = 0;
        	
        	/*
        	 * 图片展示一共三种情况
        	 * 1.横图，即图片宽度>图片高度，则宽度取100%，高度等比缩放
        	 * 2.纵图，即图片宽度<=图片高度，这其中又分2种情况
        	 * 1)图片横向宽度撑满后（即宽取屏幕宽度），高度等比缩放后>屏幕高度的
        	 * 2)图片横向宽度撑满后，高度等比缩放后<=屏幕高度的
        	 */
        	
        	//情况1，横图
        	if(srcWidth>srcHeight){
        		if(srcWidth>screenWidth){
        			adjHeight = screenWidth/srcWidth*srcHeight;
        			adjWidth = screenWidth;
        		}else{
        			adjHeight = srcHeight;
        			adjWidth = screenWidth;
        		}
        	}else if(srcWidth<=srcHeight){
        		if(srcWidth>screenWidth){
        			adjHeight = screenWidth/srcWidth*srcHeight;
        			if(adjHeight>screenHeight){
        				adjWidth = screenHeight/srcHeight*srcWidth;
        				adjHeight = screenHeight
        			}else{
        				adjWidth = screenWidth;
        			}
        		}else{
        			if(srcHeight>screenHeight){
        				adjWidth = screenHeight/srcHeight*srcWidth;
        				adjHeight = screenHeight
        			}
        		}
        	}
        	
        	var top = screenHeight/2 - adjHeight/2;
        	
//        	alert("screenHeight:"+screenHeight);
//        	alert("adjHeight:"+adjHeight);
//        	alert("top:"+top);
        	$("#divconf").css("top", top);
        	$("#divconf").css("left", "0");
			
        },
        r = function() {
        	//alert("加载消息失败！");
        };
        common.invokeApi(n, a, i, null, e, r)
	}
	
	var o = avalon.define({
		$id : "root",
		annoucements : [],
		bg_img: '../static/images/community/bg_publish.jpg',
		annoucement_count:0,
		
		gotoDetail:function(annoucementId){
        	//location.href="annocementDetail.html?annoucementId="+annoucementId;
			if(annoucementId==1){
				location.href="annoucementDetail.html";
			}else {
				location.href="annoucementDetail"+annoucementId+".html";
			}
        },
        
        viewSrcImg:function(annoucementId, index){
        	
        	//http://7xkdq7.com1.z0.glb.clouddn.com/20150916_190936_15_2?imageView2/1/w/94/h/94
        	refreshImages(threadId, index);
        },
        
        hideImg: function(){
        	
        	$("#zzmb").hide("slow");
        	$("#divconf").hide("slow");
        },
        
        gotoindex: function(){
        	
        	location.href="../wuye/index.html";
        }
        
	});
	getAnnoucementList();
    avalon.scan(document.body),
    //share.default_send(),
    FastClick.attach(document.body),
    common.setTitle("社区公告");
});