avalon.ready(function() {
	
    	
//	var imgLink = Qiniu.imageView2({
//		mode: 3,  // 缩略模式，共6种[0-5]
//		w: 100,   // 具体含义由缩略模式决定
//		h: 100,   // 具体含义由缩略模式决定
//		q: 100,   // 新图的图像质量，取值范围：1-100
//		format: 'png'  // 新图的输出格式，取值范围：jpg，gif，png，webp等
//	}, key);
	
	var firstQuery = true;
	var page = 0;
	
	function getThreadsList(){
		
		var filter = $("#filtersect").val();
		if(""==filter){
			filter="n";
		}
		var n = "POST",
        a = "thread/getThreadList/"+filter+"/"+page,
        i = {
			threadCategory :o.category,
			filter : filter
		},
        e = function(n) {
			console.log(JSON.stringify(n));
			o.threads = n.result[0];
			o.userSectId = n.result[1];
			o.threads_count = n.result[0].length;
			if(firstQuery) {
       	    	commonui.initPage();
       	    	firstQuery = false;
            } else {
            	commonui.hideAjaxLoading();
            }
            page++;
			
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
        	var hasLeft = false;
        	
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
        			hasLeft = true;
        			adjHeight = srcHeight;
        			adjWidth = srcWidth;
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
        	var left = 0;
        	if(hasLeft){
        		left = screenWidth/2 - adjWidth/2;
        	}
        	
//        	alert("screenHeight:"+screenHeight);
//        	alert("adjHeight:"+adjHeight);
//        	alert("top:"+top);
        	$("#divconf").css("top", top);
        	$("#divconf").css("left", left);
			
        },
        r = function() {
        	//alert("加载消息失败！");
        };
        common.invokeApi(n, a, i, null, e, r)
	}
	
	var o = avalon.define({
		$id : "root",
		threads : [],
		bg_img: '../static/images/community/bg_publish.jpg',
		threads_count:0,
		category: '',
		imgUrls: [],
		previewLink: [],
		categoryCN: '',
		userSectId: 0,
		
		gotoDetail:function(threadId){
        	location.href="threadDetail.html?threadId="+threadId;
        },
        
        publicnew:function(){
        	if(o.userSectId ==0 || o.userSectId=='' || o.userSectId==null)
        	{
        		alert("您暂未绑定房屋，请前往“我是业主”\r\n进行操作，感谢！");
        		return;
        	}else
        	{
        		location.href="addThread.html?category="+o.category;
        	}
        },
        
        viewSrcImg:function(threadId, index){
        	
        	//http://7xkdq7.com1.z0.glb.clouddn.com/20150916_190936_15_2?imageView2/1/w/94/h/94
        	refreshImages(threadId, index);
        },
        
        hideImg: function(){
        	
        	$("#zzmb").hide("slow");
        	$("#divconf").hide("slow");
        },
        
        shiftMenu1: function(){
        	$(".category_sub_main_sec").show();
        	$(".category_sub_main").hide();
        	$(".left_arr").hide();
        	$(".right_arr").show();
        },
        
        shiftMenu2: function(){
        	$(".category_sub_main_sec").hide();
        	$(".category_sub_main").show();
        	$(".right_arr").hide();
        	$(".left_arr").show();
        },
        
        filtersect: function(){
        	
        	var filter = $("#filtersect").val();
        	if(""==filter || "n"==filter){
        		$("#circle").hide();
            	$("#solid_circle").show();
            	$("#filtersect").val("y");
        	}else if("y"==filter){
        		$("#circle").show();
            	$("#solid_circle").hide();
            	$("#filtersect").val("n");
        		
        	}
        	getThreadsList();
        },
        
        gotoComment: function(threadId){
        	
        	location.href="threadDetail.html?threadId="+threadId;
        },
        
        gotoindex: function(){
        	
        	location.href="../wuye/index.html";
        }
        
	});
	
	function getCategoryType(){
		o.category=getUrlParam("category");
		o.categoryCN="管家服务";
		
		/*if("1"==o.category){
			o.categoryCN="户外活动";
		}else if("2"==o.category){
			o.categoryCN="宠物宝贝";
		}else if("3"==o.category){
			o.categoryCN="吃货天地";
		}else if("4"==o.category){
			o.categoryCN="二手市场";
		}else if("5"==o.category){
			o.categoryCN="亲子教育";
		}else if("6"==o.category){
			o.categoryCN="运动达人";
		}else if("7"==o.category){
			o.categoryCN="社区杂谈";
		}else if("8"==o.category){
			o.categoryCN="都市丽人";
		}else{
			o.categoryCN="管家服务";
		}*/
	}
	
	function setCategory(){
		
		var ca = o.category;
		if ("1"==ca||"2"==ca||"3"==ca||"4"==ca) {
			$(".category_sub_main_sec").hide();
        	$(".category_sub_main").show();
        	$(".right_arr").hide();
        	$(".left_arr").show();
		}else{
			$(".category_sub_main_sec").show();
        	$(".category_sub_main").hide();
        	$(".left_arr").hide();
        	$(".right_arr").show();
		}
		
	}
	
	function getScreenWidth(){
		
		var client = document.body.clientWidth;
		
	}
	
	/**
	 * 得到函数调用者
	 * @returns
	 */
	function getEvent(){ 
		if(window.ActiveXObject)//判断浏览器是否属于IE
	    {
			return event;
	    }else{
			func = getEvent.caller; 
			while (func != null) { 
				var t = func.arguments[0]; 
				if (t && (t + "").indexOf("Event") >= 0) 
					return t; 
				func = func.caller 
			} 
			return func;
	    }
	}
	
	
	var loadheight = $('#indexDiv').height(),hasNext=true,isloadPage=false;
    $(window).scroll(function (event) {
        loadheight = $('#indexDiv').height();
        var st = $(window).scrollTop();
        var hook=loadheight-st;
        if(hook<800&&hasNext&&!isloadPage){
            isloadPage=true;
            commonui.showAjaxLoading();
            loadNextPage();
        }
    })

    function loadNextPage(){
    	
    	var filter = $("#filtersect").val();
		if(""==filter){
			filter="n";
		}
    	var n = "POST",
        a = "thread/getThreadList/"+filter+"/"+page
        i = {
			threadCategory :o.category,
			filter : filter	
    	},
        e = function(n) {
    		if(n.result[0].length==0) {
                hasNext=false;
                isloadPage = false;
            	commonui.showMessage("没有更多啦");
            	commonui.hideAjaxLoading();
    		} else {
    			o.threads= o.threads.concat(n.result[0]);
    			o.userSectId = n.result[1];
                isloadPage = false;
                commonui.hideAjaxLoading();
    		}
    		page++;
        },
        r = function() {
        	isloadPage = false;
        	commonui.showMessage("加载特卖信息失败");
        	commonui.hideAjaxLoading();
        };
        common.invokeApi(n, a, i, null, e, r)
    }
	
	getCategoryType();
	getThreadsList();
//	setCategory();
    avalon.scan(document.body),
    //share.default_send(),
    FastClick.attach(document.body),
    common.setTitle(o.categoryCN);
});