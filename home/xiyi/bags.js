var o;

avalon.ready(function(){
	function getInfo(){
		if(getUrlParam("type")==201){
			o.unit="袋";
		}
		var region = getCookie("regionId");
		if(!region){region=19;}
		var n="GET",
		a="yunxiyi/serviceItems/"+region+"/"+getUrlParam("type"),
		i=null,
		e=function(n){
			o.washbags=n.result.items;
			o.type = n.result.type;
		},
		r=function(){
			console.log(JSON.stringify(n));
		};
		common.invokeApi(n, a, i, null, e, r)
	}
	function putToCart(){
		if(o.carNum<=0){
			alert("请选择需要清洗的衣物类型！");
			return;
		}
		var items = [];
		for(var i=0;i<o.washbags.length;i++){
			if(o.washbags[i].count>0) {
				items.push({serviceId:o.washbags[i].id,count:o.washbags[i].count});
			}
		}
		common.invokeApi("POST", "home/putToCart", {"items":items}, null, function(n){
			//location.href="../../xiyi_pay.html";
			var url = MasterConfig.C("payPageFolder")+MasterConfig.C("payPageSuffix");
            url += "xiyi_pay.html";
            url += "?basePageUrl="+escape(MasterConfig.C("basePageUrl"));
			location.href = url;

		}, function(n){
			
		});
	}
	function reduceVal(idx){
		if(o.washbags[idx].count<=0){
			o.washbags[idx].count==0;
		}else{
			o.washbags[idx].count--;
			o.carNum--;
			o.totals-=o.washbags[idx].price;
		}
		updateAmountShow();
	}
	function addVal(idx){
		o.washbags[idx].count++;
		o.carNum++;
		o.totals+=o.washbags[idx].price;
		updateAmountShow();
	}
	function updateAmountShow(){
		if(o.totals&&o.totals>0){
			o.totalStr = o.totals.toFixed(2);
		} else {
			o.totalStr = "0.0";
		}
	}
	o = avalon.define({
		$id:"root",
		type:{},
		washbags:[],
		carNum:0,
		totals:0,
		totalStr:"0.0",
		reduce:function(index){
			reduceVal(index);
		},
		unit:"件",
		add:function(index){
			addVal(index);
		},
		toShopCart:putToCart
	});
	
	getInfo();
	avalon.scan(document.body);
})