avalon.ready(function() {
	function getMessageId(){
		o.orderId=getUrlParam("orderId");
	}
	function n() {
        var n = "GET",
        a = "getOrder/"+o.orderId,
        i = null,
        e = function(n) {
            console.log(JSON.stringify(n));
            o.order = n.result;
        },
        r = function() {
            alert("获取订单信息失败！");
        };
        common.invokeApi(n, a, i, null, e, r)
    }
	function sendComment() {
        var n = "POST",
        a = "comment",
        i = {
        		orderId:o.order.id,
        		productId:o.order.productId,
        		productName:o.order.productName,
        		anonymous:o.anonymous,
        		serviceNo:o.serverNo,
        		productNo:o.productNo,
        		logisticNo:o.logisticNo,
        		comments:o.comment
        },
        e = function(n) {
            console.log(JSON.stringify(n));
            alert("评价成功！");
            window.location.href="../orders.html";
        },
        r = function() {
            alert("评价失败，请稍后重试！");
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    var o = avalon.define({
        $id: "root",
        orderId: '',
        order: {},
        comment: '',
        anonymous: false,
        serverNo:5,
        productNo:5,
        logisticNo:5,
        getServerStar:function(idx) {
        	if(o.serverNo<idx){
        		return "../static/img/icon_star.png";
        	} else {
        		return "../static/img/icon_star_red.png";
        	}
        },
        serverClick: function(param){
			o.serverNo = param;//记录当前打分
		},
		getProductStar:function(idx) {
        	if(o.productNo<idx){
        		return "../static/img/icon_star.png";
        	} else {
        		return "../static/img/icon_star_red.png";
        	}
        },
		productClick: function(param){
			o.productNo = param;//记录当前打分
		},
		getLogisticStar:function(idx) {
        	if(o.logisticNo<idx){
        		return "../static/img/icon_star.png";
        	} else {
        		return "../static/img/icon_star_red.png";
        	}
        },
		logisticClick: function(param){
			o.logisticNo = param;//记录当前打分
		},
        toggleCheckbox: function() {
            o.anonymous = !o.anonymous;
        },
        focus: function() {
			var val = this.innerText;
			var len = val.length;
			var $this = this;
			if(len != 0){
				$this = this.firstChild;
			}
			var range = document.createRange();
			range.setStart($this, len);
			range.setEnd($this, len);
			window.getSelection().addRange(range);
			if(len != 0){
				$this.parentNode.focus();
			}else{
				$this.focus();
			}
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
        }
    });
    getMessageId();
    if(o.orderId!=''){
    	n();
    }
    avalon.scan(document.body);
    //share.default_send();
    FastClick.attach(document.body);  
});