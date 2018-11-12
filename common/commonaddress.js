/** 添加地址 */
function queryAddress() {
    var n = "GET",
    a = "addresses",
    i = null,
    e = function(n) {
        o.addr.addresses = n.result;
        defaultAddress();
    },
    r = function(n) {
    	alert("获取地址信息失败！");
		o.addr.addresses = [];
    };
    common.invokeApi(n, a, i, null, e, r)
}

function defaultAddress() {
//	alert("defaultAddress....");
	if (o.addr.addresses.length > 0) {
		for (var i = 0; i < o.addr.addresses.length; i++) {
//			/alert("o.addr.addresses:"+o.addr.addresses);
			if (o.addr.addresses[i].main) {
			    //alert("o.addr.addresses[i]:"+o.addr.addresses[i]);

//				alert("o.addr.checkedAddress+"+o.addr.checkedAddress);
				if(typeof(o.model)!="undefined"){
					o.model.address = o.addr.addresses[i];
					
				}else{
					o.addr.checkedAddress = o.addr.addresses[i];
				}

				return;
			}
		}
	}
}
function getRegions(type,id,sucfun,errfun) {
	o.addr.currentRegionType=type;
	var n = "GET",
    a = "regions/" +type+"/"+id,
    i = null;
    common.invokeApi(n, a, i, null, sucfun, errfun)
}

function updateRegion(region) {
	var e = function(n) {
		console.log("success:" + JSON.stringify(n));
		o.addr.provinces = n.result;
		o.addr.regions = o.addr.provinces;
    },
    r = function(n) {
		alert("网络异常，请稍后重试！");
    };
	if(!region){
		if(o.addr.provinces.length==0) {
			getRegions(1,1,e,r);
		} else {
			o.addr.regions = o.addr.provinces;
		}
	} else {
		if(region.regionType == 1){
			if(o.addr.province.id != region.id ||o.addr.citys.length==0) {
				e = function(n) {
					o.addr.citys = n.result;
					o.addr.regions = o.addr.citys;
					o.addr.currentRegionType=2;
			    },
		        getRegions(region.regionType+1,region.id,e,r);
			} else {
				o.addr.regions = o.addr.citys;
				o.addr.currentRegionType=2;
			}
			o.addr.province = region;
		} else if(region.regionType == 2) {
			if(o.addr.city.id != region.id ||o.addr.countys.length==0) {
				e = function(n) {
					o.addr.countys = n.result;
					o.addr.regions = o.addr.countys;
					o.addr.currentRegionType=3;
			    },
		        getRegions(region.regionType+1,region.id,e,r);
			} else {
				o.addr.regions = o.addr.countys;
				o.addr.currentRegionType=3;
			}
			o.addr.city = region;
		} else if(region.regionType == 3) {
			o.addr.county = region;
			o.addr.distinct=o.addr.province.name+o.addr.city.name+o.addr.county.name;
			o.addr.selectRegion = false;
		}
	}
}
function saveAddress() {
	var n = "POST",
		a = "addAddress",
		i = {
			provinceId: o.addr.province.id,
			province: o.addr.province.name,
			cityId: o.addr.city.id,
			city: o.addr.city.name,
			countyId: o.addr.county.id,
			county: o.addr.county.name,
			xiaoquName: o.addr.xiaoquName,
			receiveName: o.addr.receiveName,
			detailAddress: o.addr.xiaoquAddress + o.addr.homeAddress,
			amapId: o.addr.amapId,
			amapDetailAddr: o.addr.xiaoquAddress,
			tel: o.addr.tel
		},
    e = function(n) {
		console.log("success:" + JSON.stringify(n));
		o.addr.addresses.push(n.result);
		o.addr.checkedAddress=n.result;
        o.control.currentPage = "main";
    },
    r = function(n) {
    	alert(n.message==null?"地址保存失败，请重试！":n.message);
    };
    common.invokeApi(n, a, i, null, e, r)
}

/** 添加地址[end] */

var addrModel={
	checkedAddress:{},
	receiveName:"",
	tel:"",
	distinct:"",
	currentRegionType:1,
	selectRegion:false,
	
	backRegion:function(regionType){
		if(regionType==1){
			o.addr.currentRegionType=regionType;
			if(o.addr.provinces.length<=0){
				updateRegion();
			} else {
				o.addr.regions=o.addr.provinces;
			}
		} else if(regionType==2){
			if(o.addr.province!={}){
				o.addr.currentRegionType=regionType;
				updateRegion(o.addr.province);
			}
		}
	},
    currentRegion:{},
    
    regions:[],
    provinces:[],
    citys:[],
    countys:[],
    
    province:{},
    city:{},
    county:{},
    
    
    xiaoquName:'',
	addresses:[],
	toAddAddress : function(){
        o.control.currentPage = "addAddressForm";
    },
	check: function(address) {
    	o.addr.checkedAddress = address;
        o.control.currentPage = "main";
    },
    isChecked:function(address) {
    	if(!o.addr.checkedAddress){
    		return false;
    	}
    	return o.addr.checkedAddress.id == address.id;
    },
    chooseRegion:function(){
    	o.addr.selectRegion = !o.addr.selectRegion;
    	if(o.addr.selectRegion) {
    		o.addr.currentRegionType=1;
    		updateRegion();
    	}
    },
    updateRegion:updateRegion,
    regionAreaHeight:function(num){
    	return (parseInt(num/4)+1)*40+4;
    },
	showAddress: function() {
		if(common.checkRegisterStatus()){
			o.control.currentPage = 'addrlist';
		       if (o.addr.addresses.length == 0) {
			       queryAddress();
		        }
        	}
	},
    /**使用高德推荐*/
    location:'',
    amapId:"",
    xiaoquAddress:"",
    homeAddress:"",
    suggestion:{},
    suggestions:[],
    showLocation:function(){
    	if(o.addr.city.name == null||o.addr.county.name==null||o.addr.province.name==null) {
    		alert('请先选择你所在的区域！');
    		return;
    	}
    	o.addr.suggestions=[];
    	o.control.currentPage = "location";
    },
    chooseLocation:function(suggestion){
    	o.addr.suggestion = suggestion;
    	o.addr.suggestions=[];
    	o.location = suggestion._name;
    	o.addr.amapId=suggestion._id;
    	o.addr.xiaoquAddress=suggestion.detailaddress;
    },
    submitLocation: function() {
        o.addr.xiaoquName = o.location;
//  	o.addr.detailAddress=o.detaillocation;
    	o.control.currentPage = "addAddressForm";
    },
    cancelLocation:function() {
        o.location = '';
		o.control.currentPage = "addAddressForm";
    },
    /**使用高德推荐*/
    
    addAddress:function(){
    	if(o.addr.province.name==null||o.addr.city.name==null||o.addr.county.name==null){
    		alert("请选择地址！");
    		return;
    	}
    	if(o.addr.xiaoquAddress==""||o.addr.receiveName==""||o.addr.tel==""||o.addr.xiaoquName==""){
    		alert("请填写完整相关信息！");
    		return;
    	}
    	if(!(/^1[3-9][0-9]\d{4,8}$/.test(o.addr.tel))) {
    		alert("请填写正确的手机号！");
    		return;
    	}
    	saveAddress();
    }
}
;

function getSuggestion(city,keyword) {
	var n = "GET",
    a = "amap/"+city+"/"+keyword,
    i = null,
    e = function(n) {
		console.log("success:" + JSON.stringify(n));
		o.addr.suggestions =n.result;
    },
    r = function() {
		console.log("error:" + a);
		o.addr.suggestions=[];
    };
    common.invokeApi(n, a, i, null, e, r)
}
function locationUpdate(t) {
	if(!t){
		return;
	}
	if(o.addr.city.name == null||o.addr.county.name == null||o.addr.city.name == ""||o.addr.county.name == "") {
		alert('请先选择你所在的区域！');
		return;
	}
    if(o.location!=null && o.location.length>=2 && o.location!=o.addr.suggestion._name) {
    	getSuggestion(o.addr.city.name,o.location);
    }
}
