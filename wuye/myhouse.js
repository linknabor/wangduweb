avalon.ready(function() {
	function query() {
        var n = "GET",
        a = "hexiehouses",
        i = null,
        e = function(n) {
            o.houses = n.result;
        },
        r = function() {
			o.houses = [];
        };
        common.invokeApi(n, a, i, null, e, r)
    }
	function getHouse(){
		if(o.stmtId=="" && o.house_id=="")
		{
			alert("请输入账单号或选择要绑定的房屋");
			return;
		}
		var n = "GET",
        a = "hexiehouse?stmtId="+o.stmtId+"&house_id="+o.house_id,
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
			if(n.result == null) {
				alert("没有查到信息，请确认账单号是否正确！");
			} else {
	            o.choosedhouse = n.result;
	            o.currentPage = "chooseHouse";
			}
        },
        r = function() {
        	console.log(JSON.stringify(n));
			o.choosedhouse = {};
        };
        common.invokeApi(n, a, i, null, e, r)
	}
	function deleteHouse(house){
		var n = "GET",
        a = "hexiehouse/delete/"+house.mng_cell_id,
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
            o.houses.remove(house)
            alert("删除房子成功。");
        },
        r = function() {
			alert("删除房子失败！");
        };
        common.invokeApi(n, a, i, null, e, r)
	}
	function addHouse(){
		
		var n = "POST",
        a = "addhexiehouse?stmtId="+o.stmtId+"&houseId="+o.choosedhouse.mng_cell_id,
        i = o.choosedhouse,
        e = function(n) {
			o.choosedhouse={};
			alert("添加房屋成功。");
			query();
			o.currentPage = "main";
			o.sect = [];
			o.build = [];
			o.unit = [];
			o.house = [];
			o.house_id = "";
        },
        r = function(n) {
			alert(n.message);
        };
        common.invokeApi(n, a, i, null, e, r)
	}
	
	function getSect()
	{
		var n = "GET",
        a = "getSect",
        i = null,
        e = function(n) {
            o.sect = n.result;
        },
        r = function() {
			o.sect = [];
        };
        common.invokeApi(n, a, i, null, e, r)
	}
	
    o = avalon.define({
        $id: "root",
        tabs: [
               {
                   name: '扫码绑定',
                   active: true
               },
               {
                   name: '选房屋绑定',
                   active: false
               }
           ],
        sect_id:'',
        build_id:'',
        unit_id:'',
        house_id:'',
        sect: [],
        build: [],
        unit: [],
        house: [],
        sectSelected:"",
        buildSelected:"",
        unitSelected:"",
        houseSelected:"",
        stmtId:"",
        currentPage:"main",
        currentStatus:"get",
        bg_img:'../static/img/bg/bg_nohouse.jpg',
        choosedhouse:{},
		houses:[],
        deleteHouse : function(house) {
        	if(confirm('确认删除该房子？')){
        		deleteHouse(house);
    		};
        },
        scan: function() {
        	wx.scanQRCode({
        	    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        	    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        	    success: function (res) {
        	    	var rs = res.resultStr;
        	    	if(rs.indexOf('CODE')>=0) {
        	    		rs = rs.split(',')[1];
        	    	}
	        	    o.stmtId = rs; // 当needResult 为 1 时，扫码返回的结果
	        	}
        	});
        },
        confirmAddHouse:function() {
            if(confirm('确认添加房子吗?')){
				 addHouse();
    		}
        },
        toAddHouse:function(){
        	o.currentPage = "addHouse";
        },
        getHouse: function() {
        	if(o.stmtId!=""&&o.stmtId.length!=18){
        		alert("请输入正确的账单号！");
        		return;
        	}
        	getHouse();
        },
        changeTab: function(idx) {
            for (var i = 0, len = o.tabs.length; i < len; i++) {
                o.tabs[i].active = false;
            }
            o.tabs[idx].active = true;
            o.stmtId = "";
        }
    });
	
    function getCellMng(sect_id,build_id,unit_id,data_type)
	{
		var n = "GET",
        a = "getcellbyid?sect_id="+sect_id+"&build_id="+build_id+"&unit_id="+unit_id+"&data_type="+data_type,
        i = null,
        e = function(n) {
			if("03"==data_type)
			{
				o.build = n.result.build_info;
			}else if("02"==data_type)
			{
				o.unit = n.result.unit_info;
			}else if("01"==data_type)
			{
				o.house = n.result.house_info;
			}
        },
        r = function() {
        	if("03"==data_type)
			{
				o.build = [];
			}else if("02"==data_type)
			{
				o.unit = [];
			}else if("01"==data_type)
			{
				o.house = [];
			}
        };
        common.invokeApi(n, a, i, null, e, r)
	}
    
	o.$watch("sectSelected", function (id) {
		o.sect_id = id;
		getCellMng(o.sect_id,o.build_id,o.unit_id,'03');
		getCellMng(o.sect_id,o.build_id,o.unit_id,'02');
		getCellMng(o.sect_id,o.build_id,o.unit_id,'01');
    })
    o.$watch("buildSelected", function (id) {
    	o.build_id = id;
    	getCellMng(o.sect_id,o.build_id,o.unit_id,'02');
    })
    o.$watch("unitSelected", function (id) {
    	o.unit_id = id;
    	getCellMng(o.sect_id,o.build_id,o.unit_id,'01');
    })
    o.$watch("houseSelected", function (id) {
    	o.house_id = id;
    })
    
    query();
	getSect();
    initWechat(['scanQRCode']);
    avalon.scan(document.body),
    //share.default_send(),
    FastClick.attach(document.body),
    common.setTitle("我是业主");
    checkFromShare();
});