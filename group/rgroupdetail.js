var o;
avalon.ready(function() {

	function updateLeftTime(){
		if(o.rule.leftSeconds > 0){
			o.finished = false;
			o.rule.leftSeconds=o.rule.leftSeconds-1;
			var iRemain = o.rule.leftSeconds;
			var days=parseInt(iRemain/86400);
			o.left.days = days<10?"0"+days:days;
			iRemain%=86400;

			var hours=parseInt(iRemain/3600);
			o.left.hours = hours<10?"0"+hours:hours;
			iRemain%=3600;

			var minitus = parseInt(iRemain/60);
			o.left.minitus = minitus<10?"0"+minitus:minitus;
			iRemain%=60;

			o.left.seconds=iRemain<10?"0"+iRemain:iRemain;
		}else{
			o.finished = true;
		}
    }
	

    function query() {
        var n = "GET",
        a = "getRgroupRule/" + o.ruleId,
        i = null,
        e = function(n) {
			o.rule = n.result;
			product(o.rule.productId);
       	    commonui.initPage();
            setInterval(updateLeftTime,1000);
        },
        r = function(n) {
        	alert(n.message==null?"获取团购信息失败！":n.message);
       	    commonui.initPage();
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    function product(productId) {
        var n = "GET",
        a = "getProduct/" + productId,
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
			o.product = n.result;
		    setTimeout(initSwipe,1000);
			initShareConfig(o.rule.name,MasterConfig.C("basePageUrl")+"group/rgroupdetail.html?ruleId="+o.ruleId,o.product.smallPicture,"快来参加东湖e家园的优惠商品抢购吧");
        },
        r = function(n) {
			console.log("error");
			alert(n.message==null ?"获取产品信息失败！":n.message);
        };
        common.invokeApi(n, a, i, null, e, r)
    }
	function drawItem(process) {
        drawProcess($("#processImg canvas")[0],35,35,30,process,'#E5E2DD','#FF8A00','#FF8A00');
    }
    
	function getMessageId(){
		o.ruleId=getUrlParam("ruleId");
	}
	

    o = avalon.define({
        $id: "root",
        ruleId:"",
        product: {
        	pictureList:[]
        },
        rule:{
        	currentNum:0
        },
        finished:false,
        left:{
        	days:"0",
        	hours:"0",
        	minitus:"0",
        	seconds:"0"
        },
        drawP:function(process){
        	drawItem(process);
        	return "";
        },
        showDetail: false,
        toggleDetail: function() {
            o.showDetail = !o.showDetail;
        },
        goclassify:function(){
        	location.href="rgroups.html?type="+o.rule.productType;
        },
        buy:function(){

        	if(common.checkRegisterStatus()&&o.rule.id){
        		location.href="../buy.html?type=4&ruleId="+o.rule.id;
        	}
        },
        golist:function(){
        	location.href="rgroups.html";
        },
        gotosgrouprulr:function(){
        		location.href=MasterConfig.C('basePageUrl')+"group/sgrouprule.html";
        }
    });

    avalon.scan(document.body);
    getMessageId();
    if(o.ruleId != ""){
    	query();
        checkFromShare(4,o.ruleId);
    }
    initWechat(['onMenuShareTimeline','onMenuShareAppMessage']);    
    checkCodeAndLogin();
    FastClick.attach(document.body);
});