var o;
function queryProject(){
	o.projectId = getUrlParam('projectId');
    common.invokeApi("GET", "repair/project/"+o.projectId, null, null, function(n){
    	o.projectName = n.result.project.name;
    	if(n.result.address){
    		o.address=n.result.address;
    	}
    }, function(n){
    	alert("获取项目信息失败");
    });
}
function chooseAddress(address){
	if(address){
		o.address=address;
	}
	o.currentPage='main';
}
var uploadImgMap = {};
avalon.ready(function() {
	initWechat(['chooseImage','previewImage','uploadImage','downloadImage']);
    o = avalon.define({
        $id: "root",
        address: {},
        currentPage:"main",
        storeMemo: function () {
            o.memo = this.innerHTML;
        },
        photos: [
        ],
        assignTitle:'智能推荐',
        projectName:'',
        assignType:2,
        requireDate:"",
        memo: "",
        projectId:0,
        showAddress:function(){
        	o.currentPage='addresses';
        	initAddressList();
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
			        }
			        o.uploadImg(localIds,0);
			    }
			});
		},
		uploadImg:function(localIds,idx){
			if(localIds.length-1<idx||!localIds[idx]){
				return;
			}
			var localId = localIds[idx];
			wx.uploadImage({
			    localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
			    isShowProgressTips: 1, // 默认为1，显示进度提示
			    success: function (res) {
			        uploadImgMap[localId] = res.serverId; // 返回图片的服务器端ID
			        o.uploadImg(localIds,idx+1);
			    }
			});
			
		},
		focus:function(){
			this.focus();
		},
		submit:function(){
			var data = {};
			var imgUrls = "";
			for(var k in uploadImgMap) {
				imgUrls += uploadImgMap[k]+",";
			}
			data.imgUrls= imgUrls;
			data.projectId = o.projectId;
			data.addressId = o.address.id;
			data.assignType = o.assignType;
			data.memo = o.memo;
			data.requireDateStr = o.requireDate;
			if(o.requireDate==''){alert("请选择预约维修时间");return;}
			if(o.address=={}){alert("请选择服务的地址");return;}
			if(!o.projectId||o.projectId==0){alert("页面异常，请重新选择项目后重试！");return;}
			common.invokeApi("POST", "repair", data, null, function(n){
		    	location.href="submitSuccess.html?oId="+n.result;
		    }, function(n){
		    	alert("失败");
		    });
		},
        
        /** 选择服务对象 */
        teamChooser: {
            teamPicker: [
                {
                    name: '智能推荐',
                    value: 1,
                    checked: true
                },
                {
                    name: '离我最近',
                    value: 2,
                    checked: false
                },
                {
                    name: '服务最好',
                    value: 3,
                    checked: false
                },
                {
                    name: '物业优先',
                    value: 4,
                    checked: false
                }
            ],
            modalShown: false,
            showModal: function () {
                o.teamChooser.modalShown = true;
            },
            hideModal: function (e) {
                if ('modal-mask' === e.target.className) {
                    o.teamChooser.modalShown = false;
                }
            },
            selectTeam: function (idx) {
                for (var i = 0, len = o.teamChooser.teamPicker.length; i < len; i++) {
                    o.teamChooser.teamPicker[i].checked = false;
                }
                o.teamChooser.teamPicker[idx].checked = true;
                o.assignTitle = o.teamChooser.teamPicker[idx].name;
                o.assignType = o.teamChooser.teamPicker[idx].value;
                o.teamChooser.modalShown = false;
            }
        }
    });
    avalon.scan(document.body);
    common.checkRegisterStatus();
    queryProject();
    $('#datetimepicker2').datetimepicker({
    	onChangeDateTime:function(x){
    		var dt = x.dateFormat('Y-m-d H:i');
    		if(o.requireDate!=dt){
    			o.requireDate=dt;
    		}
    	},
    	allowTimes:['9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'],
    	lang:'ch',
    	format:'Y-m-d H:i',
    	formatDate:'Y-m-d H:i'
    });
    $('#timetaker').click(function(){
    	$('#datetimepicker2').datetimepicker('show');
    });
});