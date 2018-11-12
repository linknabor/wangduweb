avalon.ready(function() {

	var today = new Date();
	var threemonthago = (new Date(today.getTime()-92*24*3600000)).format('yyyy-MM-dd');
	var halfyearbefore = (new Date(today.getTime()-183*24*3600000)).format('yyyy-MM-dd');
	var oneyearbefore = (new Date(today.getTime()-365*24*3600000)).format('yyyy-MM-dd');
    function query() {
        var n = "GET",
        a = "paymentHistory?startDate="+o.startDate,
        i = null,
        e = function(n) {
            console.log(JSON.stringify(n));
            o.paymentHises=n.result;
            if(o.paymentHises.length==0){
            	o.currentpage='empty';
            } else {
            	o.currentpage='list';
            }
        },
        r = function() {
            o.currentpage='empty';
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    function getDetail(waterId){
    	var n = "GET",
        a = "queryPaymentDetail/"+waterId,
        i = null,
        e = function(n) {
            console.log(JSON.stringify(n));
			o.currentpage='detail';
			o.payInfo=n.result;
            o.payInfofee_data=n.result.fee_data;
        },
        r = function() {
            alert(n.message==''?"获取缴费记录失败！":n.message);
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    var o = avalon.define({
        $id: "root",
        startDate:'',
        paymentHises: [],
        paymentDetail:{},
        currentpage:'list',
        showDetail:function(idx){
        	if(o.paymentHises[idx].trade_water_id == o.payInfo.trade_water_id){
        		o.currentpage='detail';
        	} else {
        		o.payInfo={};
        		getDetail(o.paymentHises[idx].trade_water_id);
        	}
        },
        payInfo:{},
        payInfofee_data:[],
        back:function(){
        	o.currentpage='list';
        },
        dropdownCollapsed: true,
        selectedDropdown: '',
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
            if(o.startDate!=o.dropdowns[idx].startDate){
            	o.startDate=o.dropdowns[idx].startDate;
            	query();
            }
        }
    });
    query();
    avalon.scan(document.body);
    //share.default_send();
    FastClick.attach(document.body);  
});