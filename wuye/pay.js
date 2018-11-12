avalon.ready(function() {
	var page = 1;
	var normalPage = 1;
	var carnormalPage = 1;
	var housenormalPage = 1;
	var today = new Date();
	var threemonthago = (new Date(today.getTime()-92*24*3600000)).format('yyyy-MM-dd');
	var halfyearbefore = (new Date(today.getTime()-183*24*3600000)).format('yyyy-MM-dd');
	var oneyearbefore = (new Date(today.getTime()-365*24*3600000)).format('yyyy-MM-dd');
	
	function quickPayBillList(){
		var n = "GET",
        a = "quickPayBillList/"+o.stmtId+"/"+page+"/"+o.totalCount,
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
			if(n.result!=null) {
	            o.quickbills = n.result.bill_info;
	            o.permit_skip_pay=n.result.permit_skip_pay;
	            o.totalCount = n.result.total_count;
	            o.totalNotPay = n.result.total_not_pay;
	            o.ruleId = n.result.park_discount_rule_conf;
	            o.rule = n.result.park_discount_rule;
	            o.pay_least_month = n.result.pay_least_month;
	            o.reduceMode = n.result.reduce_mode;
	            buildRuleDisplay(o.ruleId, o.rule);
	            
	            if(o.quickbills==null||o.quickbills.size()==0){
	            	alert("没有查到对应账单，请确认账单号是否正确！");
	            }
	            page++;
			} else {
				o.quickbills = [];
				alert("没有查到对应账单，请确认账单号是否正确！");
			}
        },
        r = function() {
        	alert("获取支付记录失败！");
			o.quickbills = [];
        };
        common.invokeApi(n, a, i, null, e, r)
	}
	
	function buildRuleDisplay(rule_id, rule){
		
		if ("0"==rule_id) {
			o.ruleDisplay = "";
			return;
		}
		
		var ruleArr = null;
		if (rule) {
			ruleArr = rule.split("-");
		}
		
		if ("1"==rule_id) {
			o.ruleDisplay = "物业优惠：停车费每满"+ruleArr[0]+"月，减免"+ruleArr[1]+"月";
		} else if("2"==rule_id) {
			o.ruleDisplay = "缴停车费满"+ruleArr[0]+"月，每月账单减免"+ruleArr[1]+"元";
		}
		
	}
	
    function queryBillList(){
		var n = "GET",
        a = "billList?startDate="+o.startDate+"&endDate="+o.endDate +"&payStatus=02&currentPage="+normalPage+"&totalCount="+o.totalCountNormal,
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
		
			if(n.result!=null) {
	            o.bills = n.result.bill_info;
	            o.carbills = n.result.car_bill_info;
	            o.permit_skip_pay=n.result.permit_skip_pay;
	            o.permit_skip_car_pay = n.result.permit_skip_car_pay;
	            o.ruleId = n.result.park_discount_rule_conf;
	            o.rule = n.result.park_discount_rule;
	            buildRuleDisplay(o.ruleId, o.rule);
	            o.totalCountNormal = n.result.total_count;
				o.cartotalCountNormal = n.result.bills_size;
				o.pay_least_month = n.result.pay_least_month;
				o.totalNotPay = n.result.total_not_pay;
				o.reduceMode = n.result.reduce_mode;
				
				o.old_bill_id = n.result.old_bill_id;
				o.old_bill_price = n.result.old_bill_price;
				o.old_bill_date = n.result.old_bill_date;
				o.old_cell_addr = n.result.old_cell_addr;
				//if(o.tabs[2].active && o.cartotalCountNormal==0){
				//	o.hint = "缴纳停车费需要先绑定房屋哦。  请在  “社区物业-->我是业主” 中进行绑定。"
				//}
			} else {

				//if(o.tabs[2].active){
				//	o.hint = "缴纳停车费需要先绑定房屋哦。  请在  “社区物业-->我是业主” 中进行绑定。"
				//}
				o.bills = [];
			}
			normalPage++;
			carnormalPage++;
        },
        r = function() {
        	alert("获取账单记录失败！");
	        o.bills = [];
        };
        common.invokeApi(n, a, i, null, e, r)
	}
    var o = avalon.define({
        $id: "root",
        tabs: [
            {
                name: '帐单缴费',
                active: true
            },
            {
                name: '查询缴费',
                active: false
            },
            {
                name: '物业缴费',
                active: false
            }
        ],
        stmtId:"",
        quickbills:[],
        quickpermit_skip_pay:1,
        park:'',
        hint:'',
        ruleDisplay:'',
        ruleId: '0',
        rule:'',
        startDate:"",
        endDate:"",
        totalCount:0,
        totalNotPay:0,
        totalCountNormal:0,
		cartotalCountNormal:0,
		housetotalCountNormal:0,
		price:0.00,
		carprice:0.00,
		quickprice:0.00,
		quicktotalPrice: 0.00,
		totalPrice: 0.00,
		celltotalPrice: 0.00,
		cartotalPrice:0.00,
        bills: [],
        carbills: [],
        permit_skip_pay:1,
        permit_skip_car_pay:1,
        pay_least_month:0,
        old_bill_id: '',
        old_bill_price: 0.00,
		old_bill_date: '',
		old_cell_addr: '',
        currentPage:'wuye',
        sect_id:'',
        build_id:'',
        unit_id:'',
        house_id:'',
        sect: [],
        build: [],
        unit: [],
        house: [],
        oldbillSelected:"",
        sectSelected:"",
        buildSelected:"",
        unitSelected:"",
        houseSelected:"",
        reduceMode:1,	//四舍五入模式，记账时总金额四舍五入，0表示没有此功能，1表示四舍五入至元，2表示四舍五入至角，3表示自由调价
        dropdownCollapsed: true,
        selectedDropdown: '',
        quickselectedAll: false,
        carselectedAll: false,
        selectedAll: false,
        cellselectedAll: false,
        cellbills:[],
        oldhouseId:'',
        changeTab: function(idx) {
        	
            for (var i = 0, len = o.tabs.length; i < len; i++) {
                o.tabs[i].active = false;
            }
            o.tabs[idx].active = true;
            hasNext=true;
            isloadPage=false;
            if (o.tabs[1].active) {
            	getSect();
            }
			//if(o.tabs[2].active && o.cartotalCountNormal==0){
			//	o.hint = "缴纳停车费需要先绑定房屋哦。  请在  “社区物业-->我是业主” 中进行绑定。"
			//}
        },
        /**账单**/
        dropdowns: [
            {
                name: '近三个月账单',
                startDate: threemonthago
            },
            {
                name: '近半年账单',
                startDate: halfyearbefore
            },
            {
                name: '近一年账单',
                startDate: oneyearbefore
            },
            {
                name: '全部账单',
                startDate: ''//根据需要传给后台的查询参数修改这些value
            }
        ],
        toggleDropdown: function() {
            o.dropdownCollapsed = !o.dropdownCollapsed;
        },
        selectDropdown: function(idx) {
            o.selectedDropdown = o.dropdowns[idx];
            //根据选择的筛选条件刷新列表数据
            if (o.startDate!=o.dropdowns[idx].startDate) {
            	o.startDate=o.dropdowns[idx].startDate;
            	queryBillList();
            }
        },
        /**账单**/
        
        /**快捷**/
        scan: function() {
        	wx.scanQRCode({
        	    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        	    scanType: ["barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        	    success: function (res) {
        	    	var rs = res.resultStr;
        	    	if(rs.indexOf('CODE')>=0) {
        	    		rs = rs.split(',')[1];
        	    	}
	        	    o.stmtId = rs; // 当needResult 为 1 时，扫码返回的结果
	        	},
	        	fail: function (res) {
	        		alert("网络不稳定 ，请刷新重试！");
	        	}
        	});
        },
        submit: function() {
        	if(o.stmtId!=""&&o.stmtId.length!=18){
        		alert("请输入正确的账单号！");
        		return;
        	}
        	page = 1;
        	quickPayBillList();
        },
        
        /*绑定房屋支付--选择账单 */
        select: function(idx) {
        	
        	if (o.bills[idx].pay_status!="02") {
        		return;
        	}
        	var price = 0;
        	if(o.quickpermit_skip_pay==1) {/*不可跳 必须连续*/
        		for (var i = 0; i <= idx; i++) {
        			o.bills[i].selected=true;
        			price+=parseFloat(o.bills[i].fee_price);
                }
        		for (var i = idx+1; i < o.bills.length; i++) {
        			o.bills[i].selected=false;
                }
        		o.selectedAll = idx == o.bills.length-1;
        	} else {
        		o.bills[idx].selected = !o.bills[idx].selected;
                var selectedAll = true;
                
                for (var i = 0, len = o.bills.length; i < len; i++) {
                    selectedAll &= o.bills[i].selected;
                    price+=o.bills[i].selected?parseFloat(o.bills[i].fee_price):0;
                }
                o.selectedAll = selectedAll;
        	}
        	o.totalPrice=price.toFixed(2);
        },
        /*绑定房屋支付--选择账单 */
        cellselect: function(idx) {
        	
        	if (o.cellbills[idx].pay_status!="02") {
        		return;
        	}
        	var price = 0;
        	if(o.quickpermit_skip_pay==1) {/*不可跳 必须连续*/
        		for (var i = 0; i <= idx; i++) {
        			o.cellbills[i].selected=true;
        			price+=parseFloat(o.cellbills[i].fee_price);
                }
        		for (var i = idx+1; i < o.cellbills.length; i++) {
        			o.cellbills[i].selected=false;
                }
        		o.cellselectedAll = idx == o.cellbills.length-1;
        	} else {
        		o.cellbills[idx].selected = !o.cellbills[idx].selected;
                var cellselectedAll = true;
                
                for (var i = 0, len = o.cellbills.length; i < len; i++) {
                	cellselectedAll &= o.cellbills[i].selected;
                    price+= o.cellbills[i].selected?parseFloat(o.cellbills[i].fee_price):0;
                }
                o.cellselectedAll = cellselectedAll;
        	}
        	o.celltotalPrice = price.toFixed(2);
        },
        /*绑定房屋支付--全选  start */
        toggleSelectedAll: function() {
            o.selectedAll = !o.selectedAll;
            for (var i = 0, len = o.bills.length; i < len; i++) {
                o.bills[i].selected = o.selectedAll;
            }
            
            if (!o.selectedAll) {
        		o.totalPrice = 0.00;
            } else {
            	var total = 0.00;
            	for (var i=0;i<o.bills.length;i++) {
            		if (o.bills[i].selected == true && o.bills[i].pay_status=="02") {
            			total+=parseFloat(o.bills[i].fee_price);
            		}
            	}
            	o.totalPrice = total.toFixed(2);
            }
        },
        /*绑定房屋支付--全选  start */
        celltoggleSelectedAll: function() {
            o.cellselectedAll = !o.cellselectedAll;
            for (var i = 0, len = o.cellbills.length; i < len; i++) {
                o.cellbills[i].selected = o.cellselectedAll;
            }
            
            if (!o.cellselectedAll) {
        		o.celltotalPrice = 0.00;
            } else {
            	var total = 0.00;
            	for (var i=0;i<o.cellbills.length;i++) {
            		if (o.cellbills[i].selected == true && o.cellbills[i].pay_status=="02") {
            			total+=parseFloat(o.cellbills[i].fee_price);
            		}
            	}
            	o.celltotalPrice = total.toFixed(2);
            }
        },
        /*停车费支付--选择账单*/
        carselect: function(idx) {
        	
        	if (o.carbills[idx].pay_status!="02") {
        		return;
        	}
        	var price = 0;
        	if(o.permit_skip_car_pay==1) {/*不可跳 必须连续*/
        		for (var i = 0; i <= idx; i++) {
        			o.carbills[i].selected=true;
        			price+=parseFloat(o.carbills[i].fee_price);
                }
        		for (var i = idx+1; i < o.carbills.length; i++) {
        			o.carbills[i].selected=false;
                }
        		o.carselectedAll = idx == o.carbills.length-1;
        	} else {
        		o.carbills[idx].selected = !o.carbills[idx].selected;
                var selectedAll = true;
                
                for (var i = 0, len = o.carbills.length; i < len; i++) {
                    selectedAll &= o.carbills[i].selected;
                    price+=o.carbills[i].selected?parseFloat(o.carbills[i].fee_price):0;
                }
                o.carselectedAll = selectedAll;
        	}
        	o.cartotalPrice=price.toFixed(2);
        },
        /*停车费支付--全选、反选*/
        cartoggleSelectedAll: function() {
            o.carselectedAll = !o.carselectedAll;
            for (var i = 0, len = o.carbills.length; i < len; i++) {
                o.carbills[i].selected = o.carselectedAll;
            }
            
            if (!o.carselectedAll) {
        		o.cartotalPrice = 0.00;
            } else {
            	var total = 0.00;
            	for (var i=0;i<o.carbills.length;i++) {
            		if (o.carbills[i].selected == true && o.carbills[i].pay_status=="02") {
            			total+=parseFloat(o.carbills[i].fee_price);
            		}
            	}
            	o.cartotalPrice = total.toFixed(2);
            }
        },
        /*快捷支付--选择账单*/
        quickselect: function(idx,service_fee_name) {
        	
        	if (o.quickbills[idx].pay_status!="02") {
        		return;
        	}
        	if (service_fee_name=='公共车位停车费' || service_fee_name=='固定车位停车费') {
        		o.permit_skip_car_pay=1;
        		if(o.permit_skip_car_pay==1) {/*不可跳 必须连续*/
        			checkPark(idx);
        		} else {
        			elseCheckPark(idx);
        		}
        	} else { 
        		/*物业费选择 */
        		if(o.quickpermit_skip_pay==1) {/*不可跳 必须连续*/
        			checkPark(idx);
            		o.quickselectedAll = idx == o.quickbills.length-1;
            	} else {
            		elseCheckPark(idx);
            	}
        	}
        },
        /*快捷支付--全选、反选*/
        quicktoggleSelectedAll: function() {
        	
            o.quickselectedAll = !o.quickselectedAll;
            for (var i = 0, len = o.quickbills.length; i < len; i++) {
                o.quickbills[i].selected = o.quickselectedAll;
            }
            if(!o.quickselectedAll){	//全部反选
        		o.quicktotalPrice = 0.00;
            }else{
            	var total = 0.00;
            	for (var i=0;i<o.quickbills.length;i++) {
            		if (o.quickbills[i].selected == true  && o.quickbills[i].pay_status=="02") {
            			total+=parseFloat(o.quickbills[i].fee_price);
            		}
            	}
            	o.quicktotalPrice = total.toFixed(2);
            }
            
        },
        
        pay: function(billList) {
        	var bills = "";
        	var pay_addr = "";
        	var total = 0.00;
        	var total_pay = 0.00;
        	var sel_not_pay_count = 0; //已选账单中未付账单的数量
        	var sel_bill_arr = new Array();
            for (var i = 0, len = billList.length; i < len; i++) {
            	if (billList[i].is_onlinepay=='false') {
            		alert("您所在小区仅能查询物业账单，缴费请到小区物业管理处办理。");
            		return false;
            	}
                if (billList[i].selected && billList[i].pay_status=="02") {
                	bills+=billList[i].bill_id+",";
        			total+=parseFloat(billList[i].fee_price);
                	total_pay = total.toFixed(2);
                	
                	var ret = jQuery.inArray(billList[i].service_fee_cycle, sel_bill_arr);
                	if (-1==ret) {
                		sel_bill_arr.push(billList[i].service_fee_cycle);
                		sel_not_pay_count++;
                	}
                	
                }
            }
            if(bills == "") {
            	alert("请选择需要缴费的账单！");
            	return;
            }
            
            //校验选择的账单是否达到可以支付的账单月份数量， pay_least_month代表至少需要支付的月份数。此值默认为0，不进行校验
            if (o.pay_least_month>0) {
            	 if (o.pay_least_month>sel_bill_arr.length) {
            		 //当前选中的未支付账单如果少于总的未支付账单数据
            		 if (sel_not_pay_count < o.totalNotPay) {
         				alert("请至少选择"+o.pay_least_month+"个月的账单进行支付。");
         				return false;
         			}
     			}
			}
            var pay_addr = billList[0].pay_cell_addr;
            var url = MasterConfig.C("basePageUrl")+"paymentdetail.html?billIds="+bills+
            	"&stmtId="+o.stmtId+"&payAddr="+escape(pay_addr)+"&totalPrice="+total_pay+"&reduceMode="+o.reduceMode;
            
            //var url = "../paymentdetail.html?billIds="+bills+
        	//"&stmtId="+o.stmtId+"&payAddr="+escape(pay_addr)+"&totalPrice="+total_pay+"&reduceMode="+o.reduceMode;
            
            window.location.href = url;
        }
    });
    
    /*
     * 1.判断用户是否为注册用户，如为注册用户，则走正常缴费流程。如果不为注册用户则跳转到注册页面。
     */
    function checkUserRegister(){
    	common.checkRegisterStatus();
    }
    
    function checkPark(idx)
    {
    	for (var i = 0; i <= idx; i++) {
			if (o.quickbills[i].pay_status=="02") {
				if (o.quickbills[i].service_fee_name!='公共车位停车费' && o.quickbills[i].service_fee_name!='固定车位停车费') {
					if(!o.quickbills[idx].selected) {	//选中
						if (!o.quickbills[i].selected) {
							o.quicktotalPrice = parseFloat(o.quicktotalPrice) + parseFloat(o.quickbills[i].fee_price);
							o.quicktotalPrice = parseFloat(o.quicktotalPrice).toFixed(2);
							o.quickbills[i].selected=true;
						}
					} else {	//反选
						if(i==idx) {
							o.quicktotalPrice-=parseFloat(o.quickbills[idx].fee_price);
							o.quicktotalPrice = parseFloat(o.quicktotalPrice).toFixed(2);
							o.quickbills[idx].selected=false;
						}
					}
				}
			}
        }
    	for (var i = idx+1; i < o.quickbills.length; i++) {
			if (o.quickbills[i].pay_status=="02") {
				if (o.quickbills[i].service_fee_name!='公共车位停车费' && o.quickbills[i].service_fee_name!='固定车位停车费') {
					if (o.quickbills[i].selected) {
						o.quicktotalPrice-=parseFloat(o.quickbills[i].fee_price);
						o.quicktotalPrice = parseFloat(o.quicktotalPrice).toFixed(2);
					}
					o.quickbills[i].selected=false;
				}
			}
        }
    }
    
    function elseCheckPark(idx)
    {
    	o.quickbills[idx].selected = !o.quickbills[idx].selected;
        var selectedAll = true;
        
        for (var i = 0, len = o.quickbills.length; i < len; i++) {
        	if (o.quickbills[i].pay_status=="02") {
        		selectedAll &= o.quickbills[i].selected;
        		o.quicktotalPrice+=o.quickbills[i].selected?parseFloat(o.quickbills[i].fee_price):0;
        	}
        }
        o.quickselectedAll = selectedAll;
    }
    
    var loadheight = $('#indexDiv').height(),hasNext=true,isloadPage=false;
    $(window).scroll(function (event) {
        loadheight = $('#indexDiv').height();
        var st = $(window).scrollTop();
        var hook=loadheight-st;

		var is_active = o.tabs[0].active;
		var is_cell_active = o.tabs[1].active;
		var tmp = page;
		if (is_cell_active) {
			tmp = housenormalPage
//		} else if(is_active) {
		} else {
			tmp = normalPage;
		}
		
		if(hook<800&&hasNext&&!isloadPage&&tmp>1){
            isloadPage=true;
            commonui.showAjaxLoading();
            
            if(is_active){
            	loadNextPage();
            }else {
            	var is_flag = o.tabs[2].active;
				var is_check_flag = o.tabs[1].active;
            	if (is_flag) {
            		loadNextPageNormal();
            	} else if(is_check_flag && o.house_id !="") {
            		loadNextPageNormalHouse();
            		o.oldhouseId = o.house_id;
            	} else {
					loadNextPageNormalCar();
				}
			}
        }
    })

    function loadNextPage(){
    	
    	var n = "GET",
        a = "quickPayBillList/"+o.stmtId+"/"+page+"/"+o.totalCount,
        i = null,
        e = function(n) {
    		if(n.result == null || n.result.bills_size==0) {
                hasNext=false;
                isloadPage = false;
            	commonui.showMessage("没有更多啦");
            	commonui.hideAjaxLoading();
    		} else {
    			o.quickbills= o.quickbills.concat(n.result.bill_info);
                isloadPage = false;
                commonui.hideAjaxLoading();
    		}
    		page++;
        },
        r = function() {
        	isloadPage = false;
        	commonui.showMessage("加载账单信息失败");
        	commonui.hideAjaxLoading();
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    
    function loadNextPageNormal(){
    	
    	var n = "GET",
        a = "billList?startDate="+o.startDate+"&endDate="+o.endDate +"&payStatus=02&currentPage="+normalPage+"&totalCount="+o.totalCountNormal,
        i = null,
        e = function(n) {
    		if(n.result==null) {
                hasNext=false;
                isloadPage = false;
            	commonui.showMessage("没有更多啦");
            	commonui.hideAjaxLoading();
    		} else {
    			o.bills= o.bills.concat(n.result.bill_info);
                isloadPage = false;
                commonui.hideAjaxLoading();
    		}
    		normalPage++;
        },
        r = function() {
        	isloadPage = false;
        	commonui.showMessage("加载账单信息失败");
        	commonui.hideAjaxLoading();
        };
        common.invokeApi(n, a, i, null, e, r)
    }

	function loadNextPageNormalHouse(){
    	
    	var n = "GET",
        a = "billList?startDate="+o.startDate+"&endDate="+o.endDate +"&payStatus=02&currentPage="+housenormalPage+"&totalCount="+o.housetotalCountNormal+"&house_id="+o.house_id,
        i = null,
        e = function(n) {
    		if(n.result == null || n.result.bills_size==0) {
                hasNext=false;
                isloadPage = false;
            	commonui.showMessage("没有更多啦");
            	commonui.hideAjaxLoading();
    		} else {
    			if (o.oldhouseId == o.house_id) {
    				o.cellbills= o.cellbills.concat(n.result.bill_info);
    			} else {
    				o.cellbills= n.result.bill_info;
    			}
    			o.housetotalCountNormal = n.result.bills_size;
				o.pay_least_month = n.result.pay_least_month;
	            o.reduceMode = n.result.reduce_mode;
	            buildRuleDisplay(o.ruleId, o.rule);
                isloadPage = false;
                commonui.hideAjaxLoading();
    		}
    		housenormalPage++;
        },
        r = function() {
        	isloadPage = false;
        	commonui.showMessage("加载账单信息失败");
        	commonui.hideAjaxLoading();
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    
    function loadNextPageNormalCar(){
    	
    	var n = "GET",
        a = "billList?startDate="+o.startDate+"&endDate="+o.endDate +"&payStatus=02&currentPage="+carnormalPage+"&totalCount="+o.cartotalCountNormal,
        i = null,
        e = function(n) {
    		if(n.result==null) {
                hasNext=false;
                isloadPage = false;
            	commonui.showMessage("没有更多啦");
            	commonui.hideAjaxLoading();
    		} else {
    			o.carbills= o.carbills.concat(n.result.car_bill_info);
                isloadPage = false;
                commonui.hideAjaxLoading();
    		}
    		carnormalPage++;
        },
        r = function() {
        	isloadPage = false;
        	commonui.showMessage("加载账单信息失败");
        	commonui.hideAjaxLoading();
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    
    function change2parkTab(){
    	o.park = getUrlParam("park");
    	if(o.park==null) {
    		o.currentPage = "wuye";
    	} else {
    		o.currentPage = "park";
    	}
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
    
    o.$watch("sectSelected", function (id) {
		o.sect_id = id;
		getCellMng(o.sect_id, "", "", '03');
		getCellMng(o.sect_id, "0", "", '02');
		getCellMng(o.sect_id, "0", "0", '01');
    })
    o.$watch("buildSelected", function (id) {
    	o.build_id = id;
    	getCellMng(o.sect_id, o.build_id, "", '02');
    	getCellMng(o.sect_id, o.build_id, "0", '01');
    })
    o.$watch("unitSelected", function (id) {
    	o.unit_id = id;
    	if (o.build_id=='') {
    		o.build_id = '0';
		}
    	getCellMng(o.sect_id, o.build_id, o.unit_id, '01');
    })
    o.$watch("houseSelected", function (id) {
    	o.oldhouseId = o.house_id;
    	o.house_id = id;
    	commonui.showAjaxLoading();
    	if (o.oldhouseId != o.house_id) {
    		o.cellbills= [];
    		housenormalPage = 1;
    		hasNext=true;
    	}
    	loadNextPageNormalHouse();
    })
    
    function getCellMng(sect_id,build_id,unit_id,data_type)
	{
    	commonui.showAjaxLoading();
    	
		var n = "GET",
        a = "getcellbyid?sect_id="+sect_id+"&build_id="+build_id+"&unit_id="+unit_id+"&data_type="+data_type,
        i = null,
        e = function(n) {
			o.cellbills= [];
			if ("03"==data_type) {
				o.build = n.result.build_info;
				o.unit = [];
				o.house = [];
			} else if("02"==data_type) {
				o.unit = n.result.unit_info;
				o.house = [];
			} else if("01"==data_type) {
				o.house = n.result.house_info;
			}
			isloadPage = false;
            commonui.hideAjaxLoading();
        },
        r = function() {
        	if ("03"==data_type) {
				o.build = [];
				o.unit = [];
				o.house = [];
			} else if("02"==data_type) {
				o.unit = [];
				o.house = [];
			} else if("01"==data_type) {
				o.house = [];
			}
        	isloadPage = false;
        	commonui.hideAjaxLoading();
        };
        common.invokeApi(n, a, i, null, e, r)
	}
    change2parkTab();
	initWechat(['scanQRCode']);
	checkUserRegister();
    queryBillList();
	avalon.scan(document.body);
    //share.default_send();
    FastClick.attach(document.body); 
    checkFromShare();
});