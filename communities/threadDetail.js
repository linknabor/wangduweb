avalon.ready(function()	{
	
	var o = avalon.define({
		
		$id : "root",
		bg_img: '../static/img/bg/bg_orders.jpg',
		threadId : '',
		thread : {},
		comments : [],
		comments_count : 0,
		commentContent : '',
		is_owner:'',
		imgUrls: [],
		thumbnailurls: [],
		
		showInput: function(){
			//var height = document.body.clientHeight;
			//alert(height);
			//var windowHeight = document.documentElement.clientHeight;
			//document.body.style.height = windowHeight + 'px';
		},
	
		saveComment: function(){
			
			if(o.commentContent==""){
				alert("回复内容不为空。");
				return false;
			}
			
			saveComment();
			
		},
		
		delThread: function(){
			
			delThread();
		},
		
		delComment: function(comment){
			
			delComment(comment);
		},
		
		 viewSrcImg:function(threadId, index){
	        	
        	//http://7xkdq7.com1.z0.glb.clouddn.com/20150916_190936_15_2?imageView2/1/w/94/h/94
        	refreshImages(threadId, index);
        },
        
        hideImg: function(){
        	
        	$("#zzmb").hide("slow");
        	$("#divconf").hide("slow");
        },
	
	});
	
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
	
	function updateUnreadComments(){
     	var n = "POST",
         a = "thread/updateUnreadComment/"+o.thread.userId+"/"+o.thread.threadId,
         i = null,
         e = function(n) {
 			console.log(JSON.stringify(n));
         },
         r = function() {
         	//alert("加载消息失败！");
         };
         common.invokeApi(n, a, i, null, e, r)
     	
     }
	
	function getThreadId(){
		o.threadId=getUrlParam("threadId");
		getThread();
	}
	
	function getThread() {
		var n = "POST",
	    a = "thread/getThreadByThreadId",
	    i = {
				threadId:o.threadId,
			},
	    e = function(n) {
			console.log("success:" + JSON.stringify(n));
			o.thread = n.result;
			o.comments = o.thread.comments;
			o.comments_count = o.comments.length;
			o.imgUrls = o.thread.imgUrlLink;
			o.thumbnailurls = o.thread.thumbnailLink;
			updateUnreadComments();
	    },
	    r = function(n) {
	    	alert(n.message==null?"获取信息失败，请重试！":n.message);
	    };
	    common.invokeApi(n, a, i, null, e, r)
	}
	
	function saveComment(){
		
		var n = "POST",
	    a = "thread/addComment",
	    i = {
				commentContent : o.commentContent,
				threadId : o.threadId
				
			},
	    e = function(n) {
			console.log("success:" + JSON.stringify(n));
			//o.currentPage = "addThread";
			o.comments.push(n.result);
			$("#input").find("textarea").val("");
			
	    },
	    r = function(n) {
	    	alert(n.message==null?"发布信息保存失败，请重试！":n.message);
	    };
	    common.invokeApi(n, a, i, null, e, r)
	    
	    
	}
	
	function delThread(){
		
		var n = "POST",
	    a = "thread/deleteThread",
	    i = {
				threadId : o.threadId
				
			},
	    e = function(n) {
			console.log("success:" + JSON.stringify(n));
			alert("删除成功。");
			location.href="index.html";
		},
	    r = function(n) {
	    	alert(n.message==null?"发布信息保存失败，请重试！":n.message);
	    };
	    common.invokeApi(n, a, i, null, e, r)
	    
	    
	}
	
	function delComment(comment){
		
		var n = "POST",
	    a = "thread/deleteComment",
	    i = {
				commentId : comment.commentId,
				threadId: comment.threadId
				
			},
	    e = function(n) {
			console.log("success:" + JSON.stringify(n));
			o.comments.remove(comment);
			
		},
	    r = function(n) {
	    	alert(n.message==null?"发布信息保存失败，请重试！":n.message);
	    };
	    common.invokeApi(n, a, i, null, e, r)
	    
	    
	}

	
	getThreadId();
	avalon.scan(document.body);
    //share.default_send();
    FastClick.attach(document.body);
})