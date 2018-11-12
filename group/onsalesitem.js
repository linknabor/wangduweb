
       	    	
avalon.ready(function() {
	var firstQuery = true;
	var page = 0;
	function getCurrentType(){
		o.currentType=getUrlParam("type");
		query();
	}
	function getBannerType() {
        common.invokeApi("GET", "banner/6", null, null, function(n) {
            o.banners = n.result;
        }, null);
        common.invokeApi("GET", "banner/5", null, null, function(n) {
            o.titles = n.result;
        },null);
    }
    function query() {
    	if(o.currentType == null) {
    		o.currentType = 100;
    	}
        var n = "GET",
        a = "onsales/"+o.currentType+"/"+page,
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
            o.temais = n.result;
            if(firstQuery) {
       	    	commonui.initPage();
       	    	firstQuery = false;
            } else {
            	commonui.hideAjaxLoading();
            }
            page++;
        },
        r = function() {
			o.temais = [];
       	    if(firstQuery) {
       	    	commonui.initPage();
       	    	firstQuery = false;
            } else {
            	commonui.hideAjaxLoading();
            }
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    var o = avalon.define({
        $id: "root",
        temais: [],
        currentType:7,
        banners:[],
        titles:[],
        queryProducts:function(type){
        	if(o.currentType == type){
        		return;
        	}
        	o.currentType = type;
            commonui.showAjaxLoading();
            page=0;
            hasNext=true;
            isloadPage = false;
        	query();
        }
    });
    if(checkCodeAndLogin()){
		getCurrentType();
    }
	getBannerType();
    avalon.scan(document.body);
    common.setTitle("社区集市");
    FastClick.attach(document.body);
    checkFromShare();
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
        a = "onsales/"+o.currentType+"/"+page,
        i = null,
        e = function(n) {
    		if(n.result.length==0) {
                hasNext=false;
                isloadPage = false;
            	commonui.showMessage("没有更多啦");
            	commonui.hideAjaxLoading();
    		} else {
    			o.temais= o.temais.concat(n.result);
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
});