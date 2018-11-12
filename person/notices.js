avalon.ready(function() {
	var page = 1;
	 function query() {
        var n = "GET",
        a = "notices/"+page,
        i = null,
        e = function(n) {
            o.notices = n.result;
            page ++;
       	    commonui.initPage();
        },
        r = function() {
            o.notices = [];
       	    commonui.initPage();
        };
        common.invokeApi(n, a, i, null, e, r)
    }
	function read(notice) {
        var n = "GET",
        a = "notices/read/"+notice.id,
        i = null,
        e = function(n) {
        },
        r = function() {
        };
        common.invokeApi(n, a, i, null, e, r);
        notice.readed=true;
    }
	 
    var o = avalon.define({
        $id: "root",
        notices:[],
        gotoDetail:function(notice){
        	read(notice);
        	if(notice.noticeType==1){
        		//订单
        		location.href="../orderdetail.html?orderId="+notice.bizId;
        	} else if(notice.noticeType==2){
        		//评论
        	} else if(notice.noticeType==3){
        		//团购
        		location.href="../rgroupdetail.html?groupId="+notice.bizId;
        	} else if(notice.noticeType==4){
        		//系统推送
        	} else if(notice.noticeType==5){
        		//预约
        	}
        }
    });
    avalon.scan(document.body);
    query();
    FastClick.attach(document.body);  
    common.setTitle("我的消息");
    
    


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
    	var n = "GET",
        a = "notices/"+page,
        i = null,
        e = function(n) {
    		if(n.result.length==0) {
                hasNext=false;
            	commonui.showMessage("没有更多啦");
            	commonui.hideAjaxLoading();
    		} else {
    			o.notices= o.notices.concat(n.result);
                isloadPage = false;
                commonui.hideAjaxLoading();
    		}
    		page++;
        },
        r = function() {
            //o.notices = [];
        	isloadPage = false;
        	commonui.showMessage("加载信息失败");
        	commonui.hideAjaxLoading();
        };
        common.invokeApi(n, a, i, null, e, r)
    }
});