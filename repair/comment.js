var repairId = getUrlParam("oId");
var uploadImgMap = {};
avalon.ready(function() {
	function sendComment() {
		var imgUrls="";
		for(var k in uploadImgMap) {
			imgUrls += uploadImgMap[k]+",";
		}
        var i = {
        	repairId:repairId,
			commentQuality:o.commentQuality,
			commentAttitude:o.commentAttitude,
			commentService:o.commentService,
			comment:o.comment,
			commentImgUrls:imgUrls
        };
        common.invokeApi("POST", "repair/comment", i, null, function(n) {
            console.log(JSON.stringify(n));
            window.location.href="ordersDetail.html?oId="+repairId;
        }, function() {
            alert("评论失败，请稍后重试！");
        })
    }
    var o = avalon.define({
        $id: "root",
        photos: [],
        
		commentQuality:5,
		commentAttitude:5,
		commentService:5,
		comment:"",
		
        qualityClick: function(param){
			o.commentQuality = param;//记录当前打分
		},
		attitudeClick: function(param){
			o.commentAttitude = param;//记录当前打分
		},
		serviceClick: function(param){
			o.commentService = param;//记录当前打分
		},
        focus: function() {
			this.focus();
	    },
        storeComment: function() {
            o.comment = this.innerHTML;
        },
        submit: function() {
            console.log(o.comment);
            if(o.comment==""||o.comment.length<5){
            	alert("评论字数不能小于5个！");
            	return;
            }
            if(o.comment.length>400){
            	alert("评论字数不能大于400！");
            	return;
            }
            sendComment();
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
			        for(var i=0;i<localIds.length;i++){
			        	if(o.photos.length==6){
			        		alert("最多只能上传6张图片");
			        		break;
			        	}
			        	var ig = {imgUrl:localIds[i]};
			        	o.photos.push(ig);
			        	o.uploadImg(localIds[i]);
			        }
			    }
			});
		},
		uploadImg:function(localId){
			wx.uploadImage({
			    localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
			    isShowProgressTips: 1, // 默认为1，显示进度提示
			    success: function (res) {
			        uploadImgMap[localId] = res.serverId; // 返回图片的服务器端ID
			    }
			});
			
		}
    });
    avalon.scan(document.body);
	initWechat(['chooseImage','previewImage','uploadImage','downloadImage']);
});