var o;
avalon.ready(function(){
	function modelstyle(){
		$(".model").css("height",$(window).height());
	}
	function editHouse(){
		o.checkicon="show";
		o.edithouse="list";
		o.canceledit="show";
		o.deletehouse="show";
		o.addhouse="list";
	}
	function cancelEdit(){
		o.checkicon="list";
		o.edithouse="show";
		o.canceledit="list";
		o.deletehouse="list";
		o.addhouse="show";
	}
	function deleteHouse(){
		o.modelBox="show";
	}
	function cancelYes(){
		
	}
	function cancelNo(){
		o.modelBox="list";
	}
	o = avalon.define({
		$id:"root",
		model:[
				{xiaoquname:"甲小区",xiaoquadd:"上海市 杨浦区 城市概念 隆昌路619号 10203室",sqm:"80㎡",checked:true},
				{xiaoquname:"乙小区",xiaoquadd:"上海市 杨浦区 城市概念 隆昌路619号 10203室",sqm:"70㎡",checked:true},
				{xiaoquname:"丙小区",xiaoquadd:"上海市 杨浦区 城市概念 隆昌路619号 10203室",sqm:"30㎡",checked:true},
				{xiaoquname:"丁小区",xiaoquadd:"上海市 杨浦区 城市概念 隆昌路619号 10203室",sqm:"10㎡",checked:true},
				{xiaoquname:"丁小区",xiaoquadd:"上海市 杨浦区 城市概念 隆昌路619号 10203室",sqm:"10㎡",checked:true},
				{xiaoquname:"丁小区",xiaoquadd:"上海市 杨浦区 城市概念 隆昌路619号 10203室",sqm:"10㎡",checked:true},
			],
		checkicon:"list",
		edithouse:"show",
		addhouse:"show",
		canceledit:"list",
		deletehouse:"list",
		modelBox:'list',
		edit:function(){
			editHouse();
		},
		cancel:function(){
			cancelEdit()
		},
		add:function(){
			
		},
		delhouse:function(){
			deleteHouse();
		},
		cancelyes:function(){
			cancelYes();
		},
		cancelno:function(){
			cancelNo();
		}
	})
	modelstyle();
	avalon.scan(document.body);
})