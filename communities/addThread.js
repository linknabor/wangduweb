avalon.ready(function()	{
	
	initWechat(['chooseImage','previewImage','uploadImage','downloadImage']);
	
	wx.ready(function(){

		// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
		console.log("validate succeeded!");
	
	});
	
	wx.error(function(res){

	    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
		console.log("validate failed");
	
	});
	
	
	var o = avalon.define({
		
		$id : "root",
		threadCategory: "",
		threadTitle: "",
		threadContent: "",
		uploadPicId: "",
		addThread:function(){
			
//        	if(o.threadTitle==""){
//        		alert("请填写主题。");
//        		return false;
//        	}

        	if(o.threadContent==""){
        		alert("请填写内容。");
        		return false;
        	}
        	
        	if(o.threadContent.length>200){
        		alert("发布字数不能超过200字。");
        		return false;
        	}
        	
        	var pic_length = $("[name='pics']").length;
        	
        	$("#zzmb").show();
        	if($(window).height()>$(document).height()){
        		$(".zzmb").height($(window).height());
        	}else{
        		$(".zzmb").height($(document).height());
        	}

        	if(pic_length>0){
        	
				uploadToWechat();
			}else{
				saveThread();
			}
			
        },
        
	
		addPic:function(){
			
			wx.chooseImage({
				
			    count: 6, // 默认9
			    // sizeType: ['original', 'compressed']
			    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有 original, compressed
			    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			    success: function (res) {
			        
			    	var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
			        
			        if(localIds.length==0){
			        	alert("未获取图片，请刷新后重新选择图片。");
			        	return false;
			        }
			        
			        var html = "";
			        
			        var pic_length = $("[name='pics']").length;
			        if(pic_length+localIds.length>6){
			        	alert("所选图片超过6张。");
			        	return false;
			        }
			        
			        for(var i=0;i<localIds.length;i++){
			        	html = "<div name='pics' class=\"fl\" style=\"margin-right:5px;\"><img src=\""+localIds[i]+"\" style=\"height:100px;width:90px;\"/></div>"
			        	$("#pic").append(html);
			        }
			        
			        if( pic_length+localIds.length >= 6 ){
			        	$("#add").hide();
			        }
			        
			    }
			});
		}
		
	});
	
	/*
	 * 上传图片到微信
	 */
	function uploadToWechat(){
		
		var i = 0;
		var pics = $("[name='pics']");
		
		function upload(){
			
			var img = pics.eq(i).find("img");
			var id = img.attr("src");
			setTimeout(function(){
				wx.uploadImage({
				    localId: id, // 需要上传的图片的本地ID，由chooseImage接口获得
				    isShowProgressTips: 1, // 默认为1，显示进度提示
				    success: function (res) {
				        var serverId = res.serverId; // 返回图片的服务器端ID
				        o.uploadPicId+=serverId+",";
				        i++;
				        if(i<pics.length){
				        	upload();
				        }else if(i==pics.length){
				        	saveThread();
				        }
				        
				    }
				})
			},50);
			
		}
		upload();
		
	}
	
	function getCategoryType(){
		o.threadCategory=getUrlParam("category");
	}
	
	function saveThread() {
		
		var n = "POST",
	    a = "thread/addThread",
	    i = {
				threadCategory:o.threadCategory,
				threadTitle:o.threadTitle,
				threadContent:o.threadContent,
				uploadPicId:o.uploadPicId
				
			},
	    e = function(n) {
			console.log("success:" + JSON.stringify(n));
			alert("发布成功。");
			location.href="index.html?category="+o.threadCategory;
	    },
	    r = function(n) {
	    	alert(n);
	    };
	    common.invokeApi(n, a, i, null, e, r)
	}

	common.checkRegisterStatus();	//校验用户是否注册
	getCategoryType();
	avalon.scan(document.body);
    //share.default_send();
    FastClick.attach(document.body);
})