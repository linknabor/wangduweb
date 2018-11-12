var o;
avalon.ready(function(){
	function noticeShow(){
		o.noticePage="show";
		o.infoPage="list";
		$(".btn2").addClass("select");
		$(".btn1").removeClass("select")
	}
	function infoShow(){
		o.noticePage="list";
		o.infoPage="show";
		$(".btn1").addClass("select");
		$(".btn2").removeClass("select")
	}
	o = avalon.define({
		$id:"root",
		model:{
			infolist:[
				{
					headimg:"../static/img/icon_xiyi.png",
					name:"居委会",
					time:"2016.3.30 16:00",
					title:"这里是一个标题",
					conImg:"../static/img/bg_share_courtesy card.png",
					content:"这里肯定会有好多内容这里肯定会有好多内容这里肯定会有好多内容这里肯定会有好多内容这里肯定会有好多内容这里肯定会有好多内容这里肯定会有好多内容这里肯定会有好多内容这里肯定会有好多内容",
					pinglun:123,
					liulan:234,
					dianzan:345,
				},
				{
					headimg:"../static/img/icon_xianhua.png",
					name:"居委会",
					time:"2016.3.30 16:00",
					title:"这里是一个标题",
					conImg:"../static/img/icon_zhuangxiuweixiu.png",
					content:"这里肯定会有好多内容",
					pinglun:123,
					liulan:234,
					dianzan:345,
				},
			],
			noticelist:[
				{
					headimg:"../static/img/icon_xianhua.png",
					name:"居委会",
					time:"2016.3.30 16:00",
					title:"这里是一个标题",
					conImg:"../static/img/icon_zhuangxiuweixiu.png",
					content:"这里肯定会有好多内容",
					pinglun:123,
					liulan:234,
					dianzan:345,
				},
				{
					headimg:"../static/img/icon_xiyi.png",
					name:"居委会",
					time:"2016.3.30 16:00",
					title:"这里是一个标题",
					conImg:"../static/img/bg_share_courtesy card.png",
					content:"这里肯定会有好多内容",
					pinglun:123,
					liulan:234,
					dianzan:345,
				},
			]
		},
		noticePage:"list",
		infoPage:"show",
		noticeshow:function(){
			noticeShow();
		},
		infoshow:function(){
			infoShow();
		},
	})
	
	avalon.scan(document.body)
})