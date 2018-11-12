var o;
avalon.ready(function(){
//	计算总价函数
	function addTotals(){
		for(var i=0;i<o.model.orderlist.length;i++){
			o.totals+=o.model.orderlist[i].price;
		}
	}
	o = avalon.define({
		$id:"root",
		model:{
			xiaoquname:"某某小区",
			xiaoquadd:"这是小区的地址，必须要很长很长很长很长很长很长很长",
			paytime:"2016年4月1日 16:00",
			paytype:"微信支付",
			orderlist:[
				{id:1,name:"物业管理费",time:"2016年4月1日 16:00",price:100},
				{id:1,name:"杂七杂八费",time:"2016年4月1日 16:00",price:120},
				{id:1,name:"乱七八糟费",time:"2016年4月1日 16:00",price:130},
				{id:1,name:"乱七八糟费",time:"2016年4月1日 16:00",price:130},
			]
		},
		totals:0,
	})
	addTotals();
	avalon.scan(document.body)
})