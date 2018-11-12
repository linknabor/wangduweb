avalon.ready(function() {
	function quickPayBillList(){
		var n = "GET",
        a = "quickPayBillList/"+o.stmtId,
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
            o.quickbills = n.result.bill_info;
        },
        r = function() {
        	alert("获取支付记录失败！");
			o.quickbills = [];
        };
        common.invokeApi(n, a, i, null, e, r)
	}
    function queryBillList(){
		var n = "GET",
        a = "billList?startDate="+o.startDate+"&endDate="+o.endDate +"&payStatus=02",
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
            o.bills = n.result.bill_info;
        },
        r = function() {
        	alert("获取账单记录失败！");
	        o.bills = [];
	        o.selectedBills =[];
        };
        common.invokeApi(n, a, i, null, e, r)
	}
    var o = avalon.define({
        $id: "root",
        tabs: [
            {
                name: '快捷缴费',
                active: true
            },
            {
                name: '账单缴费',
                active: false
            }
        ],
        stmtId:"",
        startDate:"",
        endDate:"",
        changeTab: function(idx) {
            for (var i = 0, len = o.tabs.length; i < len; i++) {
                o.tabs[i].active = false;
            }
            o.tabs[idx].active = true;
        },
        quickbills:[],
        dropdownCollapsed: true,
        selectedDropdown: '',
        dropdowns: [
            {
                name: '近三个月账单',
                value: '3m'//根据需要传给后台的查询参数修改这些value
            },
            {
                name: '近半年账单',
                value: '6m'//根据需要传给后台的查询参数修改这些value
            },
            {
                name: '近一年账单',
                value: '12m'//根据需要传给后台的查询参数修改这些value
            },
            {
                name: '全部账单',
                value: 'all'//根据需要传给后台的查询参数修改这些value
            }
        ],
        toggleDropdown: function() {
            o.dropdownCollapsed = !o.dropdownCollapsed;
        },
        selectDropdown: function(idx) {
            o.selectedDropdown = o.dropdowns[idx];
            //根据选择的筛选条件刷新列表数据
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
        submit: function() {
        	if(o.stmtId!=""&&o.stmtId.length!=18){
        		alert("请输入正确的账单号！");
        		return;
        	}
        	quickPayBillList();
        },
        bills: [
        ],
        selectedBills:[],
        select: function(idx) {
            o.bills[idx].selected = !o.bills[idx].selected;
            var selectedAll = true;
            for (var i = 0, len = o.bills.length; i < len; i++) {
                selectedAll &= o.bills[i].selected;
            }
            o.selectedAll = selectedAll;
        },
        selectedAll: false,
        toggleSelectedAll: function() {
            o.selectedAll = !o.selectedAll;
            for (var i = 0, len = o.items.length; i < len; i++) {
                o.items[i].selected = o.selectedAll;
            }
        },
        totalPrice: 360,
        pay: function() {
        	window.location.href="paymentdetail.html";
        }
    });
    initWechat(['chooseWXPay']) ;
    queryBillList();
    avalon.scan(document.body);
    //share.default_send();
    FastClick.attach(document.body);  
});