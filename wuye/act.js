avalon.ready(function() {
	
	function getUserPayType(){
		
		o.forwardPage = getUrlParam("comeFrom");
	}

    var o = avalon.define({
        $id: "root",
        forwardPage: "",
        
        goback:function(){
        	location.href = o.forwardPage;
        },
    
    	viewAnnoucement: function(){
    		location.href = MasterConfig.C("basePageUrl")+"wuye/message.html?messageId=14";
    	}
        
    });

    function showContent(){
    	
    	var content = "您将获得由东湖e家园赠送的10元代金券一张。";
    	var p = "<p>"+content+"</p>";
    	$("#content").html(p);
    
    }
    
    getUserPayType();
    showContent();
    avalon.scan(document.body);
    common.setTitle("用户注册成功");
    FastClick.attach(document.body);
});