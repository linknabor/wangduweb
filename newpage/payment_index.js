var o;
avalon.ready(function(){
	o = avalon.define({
		$id:"root",
		model:{
			xiaoquname:"一个小区",
			xiaoquadd:"这里是地址 而且很长很长很长很长很长很长很长很长很长",
			paylist:[
				{id:1,code:"2016452312",time:"2016年3月3日 16:00"},
				{id:2,code:"2016452434",time:"2016年3月3日 15:00"},
				{id:3,code:"2016452343",time:"2016年3月3日 14:00"},
				{id:4,code:"2016452387",time:"2016年3月3日 13:00"},
				{id:5,code:"20164523838",time:"2016年3月3日 12:00"}
			]
		}
	})
	
	avalon.scan(document.body);
})
