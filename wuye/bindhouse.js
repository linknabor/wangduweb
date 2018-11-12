avalon.ready(function() {
    function queryBillList(){
		var n = "GET",
        a = "hexiehouses",
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
			o.houses = n.result
        },
        r = function() {
        	alert("获取房产记录失败！");
        };
        common.invokeApi(n, a, i, null, e, r)
	}
    function getHouse(){
		var n = "GET",
        a = "hexiehouse/"+o.stmtId,
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
            o.searchedhouse = n.result;
            o.canAddhouse = true;
        },
        r = function() {
			o.searchedhouse = {};
			o.canAddhouse = false;
        };
        common.invokeApi(n, a, i, null, e, r)
	}
	function deleteHouse(){
		var n = "GET",
        a = "hexiehouse/delete/"+o.checkedHouse.mng_cell_id,
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
            o.houses.remove(o.checkedHouse);
        },
        r = function() {
			alert("删除房子失败！");
        };
        common.invokeApi(n, a, i, null, e, r)
	}
	function addHouse(){
		var n = "GET",
        a = "addhexiehouse/"+o.stmtId+"/"+o.searchedhouse.mng_cell_id,
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
			o.houses.push(o.searchedhouse);
			o.searchedhouse={};
			o.canAddhouse=false;
        },
        r = function() {
			alert("添加房子异常，请稍后重试！");
        };
        common.invokeApi(n, a, i, null, e, r)
	}
    var o = avalon.define({
        $id: "root",
        tabs: [
            {
                name: '我的房子',
                active: true
            },
            {
                name: '绑定房子',
                active: false
            }
        ],
        changeTab: function(idx) {
            for (var i = 0, len = o.tabs.length; i < len; i++) {
                o.tabs[i].active = false;
            }
            o.tabs[idx].active = true;
        },
        stmtId:"",
        checkedHouse:{},
        searchedhouse:{},
        canAddhouse:false,
        houses: [
        ],
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
        submit: function() {
        	if(o.stmtId!=""&&o.stmtId.length!=18){
        		alert("请输入正确的账单号！");
        		return;
        	}
        	getHouse();
        },
        addHouse:function(){
        	addHouse();
        },
        deleteHouse:function(){
        	if(!o.checkedHouse.mng_cell_id) {
        		alert("请选择要删除的房子！");
        		return;
        	}
        	deleteHouse();
        },
        select: function(idx) {
            o.items[idx].selected = !o.items[idx].selected;
            var selectedAll = true;
            for (var i = 0, len = o.items.length; i < len; i++) {
                selectedAll &= o.items[i].selected;
            }
            o.selectedAll = selectedAll;
        },
        check: function(house) {
        	o.checkedHouse = house;
        },
        isChecked:function(house) {
        	return o.checkedHouse.mng_cell_id == house.mng_cell_id;
        }
    });
    queryBillList();
    initWechat(['scanQRCode']);
    avalon.scan(document.body);
    //share.default_send();
    FastClick.attach(document.body);  
});