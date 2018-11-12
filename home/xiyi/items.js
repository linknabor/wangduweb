var o;
avalon.ready(function(){
	function reduceVal(idx){
		if(o.items[idx].count<=0){
			o.items[idx].count==0;
		}else{
			o.items[idx].count--;
			o.carNum--;
			o.totals-=o.items[idx].price;
		}
		updateAmountShow();
	}
	function addVal(idx){
		o.items[idx].count++;
		o.carNum++;
		o.totals+=o.items[idx].price;
		updateAmountShow();
	}
	function updateAmountShow(){
		if(o.totals&&o.totals>0){
			o.totalStr = o.totals.toFixed(2);
		} else {
			o.totalStr = "0.0";
		}
	}
	function initItems(){
		var region = getCookie("regionId");
		if(!region){region=19;}
		common.invokeApi("GET", "yunxiyi/serviceItems/"+region+"/"+getUrlParam("type"), null, null, function(n){
			o.items=n.result.items;
			o.type=n.result.type;
		}, function(n){
			console.log(JSON.stringify(n));
		});
	}
	function putToCart(){
		if(o.carNum<=0){
			alert("请选择需要清洗的衣物类型！");
			return;
		}
		var items = [];
		for(var i=0;i<o.items.length;i++){
			if(o.items[i].count>0) {
				items.push({serviceId:o.items[i].id,count:o.items[i].count});
			}
		}
		common.invokeApi("POST", "home/putToCart", {"items":items}, null, function(n){
			location.href="../../xiyi_pay.html";
		}, function(n){
			
		});
	}
	o = avalon.define({
		$id:"root",
		type:{},
		items:[],
		carNum:0,
		totals:0,
		totalStr:"0.0",
		reduce: reduceVal,
		add: addVal,
		putToCart:putToCart
	})
	
	avalon.scan(document.body);
	initItems();
})
