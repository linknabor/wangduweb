var o;
avalon.ready(function(){
	function modelstyle(){
		$(".model").css("height",$(window).height());
	}
	function closeBox(){
		o.modelBox="list";
	}
	function showBox(){
		o.modelBox="show";
	}
	function choseType(idx){
		o.titlecontent=o.fbtype[idx];
		o.modelBox="list";
	}
	o = avalon.define({
		$id:"root",
		model:{},
		titlecontent:"反馈对象：",
		fbtype:["物业","居委会","东湖e家园"],
		modelBox:"list",
		closebox:function(){
			closeBox();
		},
		showbox:function(){
			showBox();
		},
		chosetype:function(index){
			choseType(index);
		}
	})
	
	modelstyle();
	avalon.scan(document.body);
})