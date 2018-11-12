avalon.ready(function() {
	var firstQuery = true;
	var page = 0;
	function initShareSetting(){
		var title = "社区团购";
		var link=MasterConfig.C('basePageUrl')+"group/rgroups.html";
		var img=MasterConfig.C("basePageUrl")+"static/images/share_tuan.jpg";
		var desc="【东湖e家园】为您提供精选商品，团购比特卖更优惠哦！";
		initShareConfig(title,link,img,desc);
	}
    function query() {
        var n = "GET",
        a = "rgroups/"+page,
        i = null,
        e = function(n) {
            o.rgroups = n.result;
            if(firstQuery) {
       	    	commonui.initPage();
       	    	firstQuery = false;
            } else {
            	commonui.hideAjaxLoading();
            }
            page++;
        },
        r = function() {
			o.rgroups = [];
            if(firstQuery) {
       	    	commonui.initPage();
       	    	firstQuery = false;
            } else {
            	commonui.hideAjaxLoading();
            }
        };
        common.invokeApi(n, a, i, null, e, r)
    }
	function updateLeftTime(){		
		for(var i=0;i<o.rgroups.length; i++){
			if(o.rgroups[i]!=null&&o.rgroups[i].leftTime > 0){
			    o.rgroups[i].leftTime=o.rgroups[i].leftTime-1;
		    }
		}
    }
    function drawItem(item,process) {
    	drawProcess($("#products canvas")[item],35,35,28,process,'#E5E2DD','#FF8A00','#FF8A00');
    }
    var o = avalon.define({
        $id: "root",
        rgroups: [],
        drawP:function(item,process){
        	console.log("---->"+item+":"+process );
        	drawItem(item,process);
        	return "";
        },
        leftTimeStrs:function(i){
        	if(o.rgroups[i]!=null) {
				return getLeftTimeFormat2(o.rgroups[i].leftTime);
        	} else {
        		return "";
        	}
        },
        gotosgrouprulr:function(){
        	location.href=MasterConfig.C('basePageUrl')+"group/sgrouprule.html";
        }
    });
    avalon.scan(document.body);
    initWechat(['onMenuShareTimeline','onMenuShareAppMessage']);
    common.setTitle("社区团购");
    if(checkCodeAndLogin()){
    	setInterval(updateLeftTime,1000);
        checkFromShare();
        query();
    }
    FastClick.attach(document.body);

	initShareSetting();
    
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
        a = "rgroups/"+page,
        i = null,
        e = function(n) {
    		if(n.result==null||n.result.length==0) {
                hasNext=false;
            	commonui.showMessage("没有更多啦");
            	commonui.hideAjaxLoading();
    		} else {
                isloadPage = false;
                commonui.hideAjaxLoading();
    			o.rgroups = o.rgroups.concat(n.result);
    		}
    		
    		page++;
        },
        r = function() {
        	isloadPage = false;
        	commonui.showMessage("加载团购信息失败");
        	commonui.hideAjaxLoading();
        };
        common.invokeApi(n, a, i, null, e, r)
    }
});