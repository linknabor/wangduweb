var o;
avalon.ready(function(){
	function queryBanner(){
		common.invokeApi("GET","pageconfig/xiyi",null,null,function(n){
			o.banners = n.result;
			initSwiper();
		},function(){
			//alert("页面获取信息错误，请稍后重试！");
		})
	}
	function getMianCity(){
		o.maincity=o.cities[0];
		var duration = new Date().getTime()/1000 + 3600*24*30;
		setCookie("regionId", o.cities[0].id, duration);
	}
	function choseCity(){
		if(o.currentPage=="show"){
			o.currentPage="list"
		}else if(o.currentPage=="list"){
			o.currentPage="show"
		};
	}
	function choseMain(index){
		o.maincity=o.cities[index];
		var duration = new Date().getTime()/1000 + 3600*24*30;
		setCookie("regionId", o.cities[index].id, duration);
		o.currentPage="list";
		getInfo();
	}
	function getInfo(){
		var n="GET",
		a="/yunxiyi/serviceTypes/"+o.maincity.id,
		i=null,
		e=function(n){
			o.washindex=n.result;
		},
		r=function(){
			console.log(JSON.stringify(n));
		};
		common.invokeApi(n, a, i, null, e, r)
	}
	o = avalon.define({
		$id:"root",
		washindex:[],
		cities:[
			{id:19,name:"上海"},
			{id:2,name:"北京"}
		],
		maincity:{},
		currentPage:"list",
		chosecity:function(){
			choseCity();
		},
		chosemain:function(idx){
			choseMain(idx);
		},
		showXiyiItem:function(idx) {
			/*
			if(idx == 204){
				alert("该服务即将开通，敬请期待！");
				return;
			}
			*/
			location.href="bags.html?type="+idx;
		},
		banners:[]
	})

	getMianCity();
	getInfo();
	queryBanner();
	avalon.scan(document.body);

})