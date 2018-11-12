var o;
avalon.ready(function(){
	function modelstyle(){
		$(".model").css("height",$(window).height());
	}
	function bigImg(idx){
		
	}
	function screenInfo(){
		o.modelBox1="show";
	}
	function releaseInfo(){
		o.modelBox2="show";
	}
	function closeBox(){
		o.modelBox1="list";
		o.modelBox2="list";
	}
	function toAll(){
		o.modelBox1="list";
	}
	function toXiaoqu(){
		o.modelBox1="list";
	}
	
	o = avalon.define({
		$id:"root",
		model:[
			{
				id:1,
				headimg:"../static/images/coupon_share_icon.jpg",
				username:"向某某",
				xiaoquname:"某某1小区",
				time:"15分钟前",
				infotype:2,
				title:"今晚打1老虎",
				price:"￥1200",
				imglist:["../static/images/coupon_share_icon.jpg","../static/images/coupon_share_icon.jpg","../static/images/coupon_share_icon.jpg"],
				content:"这里是文案内容，而且会很长，这里是文案内容，而且会很长，这里是文案内容，而且会很长，这里是文案内容，而且会很长，这里是文案内容，而且会很长，这里是文案内容，而且会很长，这里是文案内容，而且会很长，这里是文案内容，而且会很长，",
				pinglun:125,
				liulan:653,
				dianzan:485,
			},
			{
				id:1,
				headimg:"../static/images/coupon_share_icon.jpg",
				username:"徐某某",
				xiaoquname:"某某2小区",
				time:"16分钟前",
				infotype:1,
				title:"今晚打2老虎",
				imglist:["../static/images/coupon_share_icon.jpg",],
				content:"这里是文案内容，而且会很长，这里是文案内容，而且会很长，这里是文案内容，而且会很长，这里是文案内容，而且会很长，这里是文案内容，而且会很长，这里是文案内容，而且会很长，这里是文案内容，而且会很长，这里是文案内容，而且会很长，",
				pinglun:125,
				liulan:653,
				dianzan:485,
			},
			{
				id:1,
				headimg:"../static/images/coupon_share_icon.jpg",
				username:"陈某某",
				xiaoquname:"某某3小区",
				time:"21分钟前",
				infotype:3,
				title:"今晚打3老虎",
				price:"￥1200",
				imglist:["../static/images/coupon_share_icon.jpg","../static/images/coupon_share_icon.jpg"],
				content:"这里是文案内容，而且会很长，这里是文案内容，而且会很长，这里是文案内容，而且会很长，这里是文案内容，而且会很长，这里是文案内容，而且会很长，这里是文案内容，而且会很长，这里是文案内容，而且会很长，这里是文案内容，而且会很长，",
				pinglun:125,
				liulan:653,
				dianzan:485,
			}
		],
		xianhua:"list",
		ershou:"show",
		linli:"list",
		modelBox1:"list",
		modelBox2:"list",
		screeninfo:function(){
			screenInfo();
		},
		releaseinfo:function(){
			releaseInfo();
		},
		closebox:function(){
			closeBox();
		},
		toall:function(){
			toAll();
		},
		toxiaoqu:function(){
			toXiaoqu();
		},
		bigimg:function(index){
			bigImg(index);
		},
	})
	modelstyle();
	avalon.scan(document.body);
})