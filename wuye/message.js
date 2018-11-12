avalon.ready(function() {
	function getMessageId(){
		o.messageId=getUrlParam("messageId");
	}
	
	function query()
	{
		if(o.messageId==null || o.messageId=="")
		{
			queryMessage();
		}else
		{
			showMessage();
		}
	}
	function queryMessage(){
		common.invokeApi("GET","getmessages",null,null,function(n){
			if(n.result!=null)
			{
				o.message=n.result;
			}else
			{
				alert("信息未发布！");
				location.href="../home/index.html";;
    			return;
			}
		},function(){
			alert("页面获取信息错误，请稍后重试！");
		})
	}
	
	function showMessage() {
		var n = "GET",
        a = "messageDetail/"+o.messageId,
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
	        o.message = n.result;
        },
        r = function() {
        	alert("加载消息失败！");
        };
        common.invokeApi(n, a, i, null, e, r)
	}
	
    o = avalon.define({
        $id: "root",
        message:{},
        messageId:"",
        feedbacks:[],
        content:""
    });
    getMessageId();
    query();
    avalon.scan(document.body),
    FastClick.attach(document.body),
    common.setTitle("");
    checkFromShare();
});