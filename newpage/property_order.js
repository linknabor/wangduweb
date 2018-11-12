var o;
avalon.ready(function(){
	o = avalon.define({
		$id:"root",
		model:{
			addname:"什么小区",
			address:"上海市 浦东新区 社么路 多少号",
			orderlist:[
				{name:"物业管理费",time:"2016年3月30日",price:"100"},
				{name:"电梯水泵费",time:"2016年3月30日",price:"100"},
				{name:"乱七八糟费",time:"2016年3月30日",price:"100"},
				{name:"垃圾收容费",time:"2016年3月30日",price:"100"},
				{name:"停车费",time:"2016年3月30日",price:"100"},
				{name:"安全管理费",time:"2016年3月30日",price:"100"},
				{name:"杂七杂八费",time:"2016年3月30日",price:"100"},
			]
		}
	})
	
	avalon.scan(document.body)
})