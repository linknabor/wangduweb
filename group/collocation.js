var o;
avalon.ready(function() {

    function getParam(){
    	o.collId=getUrlParam("collId");
    	o.ruleId=getUrlParam("ruleId");
    }
	function getCollocation() {
        var n = "GET",
        a = "collocation/" + o.collId,
        i = null,
        e = function(n) {
			o.collocation = n.result;
			resetItems();
        },
        r = function(n) {
        	alert(n.message==null?"获取优惠组合信息失败！":n.message);
        };
        common.invokeApi(n, a, i, null, e, r)
    }
	function resetItems(){
		o.mainItem={id:0};
		o.otherItems=[];
		for(var i=0;i<o.collocation.products.length;i++){
			if(o.collocation.products[i].salePlanId==o.ruleId) {
				o.mainItem=o.collocation.products[i];
				o.mainItem.count=1;
			} else {
				var item = o.collocation.products[i];
				item.count=0;
				item.selected=false;
				o.otherItems.push(item);
			}
		}
		if(o.mainItem.id==0){
			o.mainItem=o.otherItems.pop();
		}
		o.refreshAmountCount();
	}
	function createOrder(){
		var items = [];
		var amount = o.mainItem.count*o.mainItem.price;
		items.push({
			collocationId:o.collId,
			ruleId:o.mainItem.salePlanId,
			orderType:o.collocation.salePlanType,
			count:o.mainItem.count
			});
		for(var i=0;i<o.otherItems.length;i++){
    		if(o.otherItems[i]!=null&&o.otherItems[i].selected){
    			items.push({
	    				collocationId:o.collId,
	    				ruleId:o.otherItems[i].salePlanId,
	    				orderType:o.collocation.salePlanType,
	    				count:o.otherItems[i].count
    				});
    		}
    	}
        common.invokeApi("POST", "collocation/saveToCart", {items:items}, null, function(n) {
				location.href="../multibuy.html";
	        }, function(n) {
	        	alert(n.message==null?"下单失败，请稍后重试！":n.message);
	        });
	}
    o = avalon.define({
        $id: "root",
        collId:0,
        ruleId:0,
        collocation:{
        },
        mainItem:{
        },
        otherItems:[],
        totalCount:1,
        totalAmount:0,
        disCountAmount:0,
        logisticeFee:0,
        needPayPrice:0,
        showDiscountTitle:false,
        
        minusMainCount:function(){
        	if(o.mainItem.count>1) {
        		o.mainItem.count--;
        		o.refreshAmountCount();
        	}
        },
        addMainCount:function(){
        	if(o.mainItem.limitNumOnce==null||o.mainItem.limitNumOnce==0||o.mainItem.count<o.mainItem.limitNumOnce) {
        		//o.mainItem.count++;
        		o.mainItem.count = o.mainItem.count+1;
        		o.refreshAmountCount();
        	}
        },
        minusCount:function(idx){
        	if(o.otherItems[idx].count>0) {
        		o.otherItems[idx].count--;
        		o.otherItems[idx].selected=(o.otherItems[idx].count>0);
        		o.refreshAmountCount();
        	}
        },
        addCount:function(idx){
        	if(o.mainItem.limitNumOnce==null||o.otherItems[idx].count<o.otherItems[idx].limitNumOnce) {
        		o.otherItems[idx].count++;
        		o.otherItems[idx].selected=true;
        		o.refreshAmountCount();
        	} else if(o.otherItems[idx].count==o.otherItems[idx].limitNumOnce){
        		if(!o.otherItems[idx].selected){
            		o.otherItems[idx].selected=true;
            		o.refreshAmountCount();
        		} else {
        			alert("该商品限购"+o.otherItems[idx].limitNumOnce+"件！");
        		}
        	}
        },
        getTotalCount:function(){
        	var count = o.mainItem.count;
        	for(var i=0;i<o.otherItems.length;i++){
        		if(o.otherItems[i]!=null&&o.otherItems[i].selected){
        			count+=o.otherItems[i].count;
        		}
        	}
        	return count;
        },
        getAmount:function(){
        	var amount = o.mainItem.count*o.mainItem.price;
        	for(var i=0;i<o.otherItems.length;i++){
        		if(o.otherItems[i]!=null&&o.otherItems[i].selected){
        			amount+=o.otherItems[i].count*o.otherItems[i].price;
        		}
        	}
    		return amount.toFixed(2);
    	},
    	selectItem:function(idx){
    		o.otherItems[idx].selected=!o.otherItems[idx].selected;
    		if(!o.otherItems[idx].selected){
    			o.otherItems[idx].count=0;
    		}else {
    			o.otherItems[idx].count=1;
    		}
    		o.refreshAmountCount();
    	},
    	minusAble:function(idx){
    		return o.otherItems[idx]!=null&&o.otherItems[idx].count>1;
    	},
    	refreshAmountCount:function(){
    		o.totalCount = o.getTotalCount();
    		o.totalAmount = o.getAmount();

    		var discountTime = Math.floor(o.totalAmount/o.collocation.satisfyAmount);
			o.disCountAmount = (o.collocation.discountAmount * discountTime).toFixed(2);
			if (isNaN(o.disCountAmount)) {
				o.disCountAmount=0;
			}
    		if(o.collocation.freeShipAmount > 0 && o.totalAmount-o.disCountAmount>=o.collocation.freeShipAmount){
    			o.logisticeFee=0;
    		} else {
    			o.logisticeFee=o.collocation.shipAmount;
    		}
    		if((o.totalAmount-o.disCountAmount)>0) {
                o.needPayPrice=(o.totalAmount-o.disCountAmount).toFixed(2);
    		} else {
    		    o.needPayPrice = "0.01";
    		}
    	},
    	gotoDetail:function(idx){
    		location.href="onsaledetail.html?ruleId="+o.otherItems[idx].salePlanId;
    	},
    	pay:function(){
    		createOrder();
    	}
    });

    avalon.scan(document.body);

    getParam();
    getCollocation();
    
    var loadheight = $('#notice_line').height();
    $(window).scroll(function (event) {
        loadheight = $('#notice_line').height();
        var st = $(window).scrollTop();
        if(loadheight-st>0 && o.showDiscountTitle) {
        	o.showDiscountTitle = false;
        	$("#discount_title").animate({top:'-30px'});
        } else if(loadheight-st<0 && !o.showDiscountTitle) {
        	o.showDiscountTitle = true;
        	$("#discount_title").animate({top:'0px'});
        }
    });
    checkFromShare();
});