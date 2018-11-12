/**
 * 使用说明：
 * 1. 选中的回调为chooseAddress(address) 需要调用方实现
 * 2. 使用需要先初始化地址initAddressList
 * 3. 不包含获取默认地址，建议在页面中直接获取
 */
var address_root;

var provinces=[],citys=[],countys=[];
/** 查询地址 */
function initAddressList() {
	if(address_root.addresses.length>0){return;}
    common.invokeApi("GET", "addresses", null, null, function(n) {
        address_root.addresses = n.result;
    }, function(n) {
    	alert("获取地址信息失败！");
		address_root.addresses = [];
    });
}
/** 查询区域 */
function getRegions(type,id) {
	address_root.currentRegionType=type;
    common.invokeApi("GET", "regions/" +type+"/"+id, null, null, function(n) {
		address_root.regions = n.result;
    }, function(n) {
		alert("获取区域信息失败，请稍后重试！");
    })
}
/** 选中区域 */
function changeRegionView(regionType,regionId,regionName) {
	if(!regionType){
		if(provinces.length==0) {
			getRegions(1,1);
		} else {
			address_root.regions = provinces;
		}
	} else {
		if(regionType == 1){
			if(address_root.submitAddress.provinceId != regionId ||citys.length==0) {
		        getRegions(2,regionId);
			} else {
				address_root.regions = citys;
			}
			address_root.submitAddress.province = regionName;
			address_root.submitAddress.provinceId = regionId;
			address_root.currentRegionType=2;
		} else if(regionType == 2) {
			if(address_root.submitAddress.cityId != regionId ||countys.length==0) {
		        getRegions(3,regionId);
			} else {
				address_root.regions = countys;
			}
			address_root.submitAddress.city = regionName;
			address_root.submitAddress.cityId = regionId;
			address_root.currentRegionType=3;
		} else if(regionType == 3) {
			address_root.submitAddress.county = regionName;
			address_root.submitAddress.countyId = regionId;
			address_root.distinct=address_root.submitAddress.province+address_root.submitAddress.city+address_root.submitAddress.county;
			address_root.selectRegion = false;
		}
	}
}
/** 保存地址 */
function saveAddress() {
	var addr = {};
	addr.receiveName=address_root.submitAddress.receiveName;
	addr.tel=address_root.submitAddress.tel;
	addr.provinceId=address_root.submitAddress.provinceId;
	addr.province=address_root.submitAddress.province;
	addr.cityId=address_root.submitAddress.cityId;
	addr.city=address_root.submitAddress.city;
	addr.countyId=address_root.submitAddress.countyId;
	addr.county=address_root.submitAddress.county;
	addr.xiaoquName=address_root.submitAddress.xiaoquName;
	addr.detailAddress=address_root.submitAddress.amapDetailAddr+address_root.submitAddress.homeAddress;
	addr.amapDetailAddr=address_root.submitAddress.amapDetailAddr;
	addr.amapId=address_root.submitAddress.amapId;
    common.invokeApi("POST", "addAddress", addr, null, function(n) {
		address_root.addresses.push(n.result);
		address_root.checkedAddress=n.result;
        address_root.addrPage = "list";
    }, function(n) {
    	alert(n.message==null?"地址保存失败，请重试！":n.message);
    });
}
/** 保存地址 */
function getSuggestion() {
    common.invokeApi("GET", "amap/"+address_root.submitAddress.city+"/"+address_root.suggestLocation, null, null, function(n) {
		address_root.suggestions =n.result;
    }, function() {
		address_root.suggestions=[];
    });
}

/** 添加地址[end] */
function initAddresses(){
	address_root = avalon.define({
        $id: "address_root",
        addrPage:"list",
        
        
		addresses:[],
        checkedAddress:{},
        
		distinct:"",
		
        submitAddress:{
        	receiveName:"",
			tel:"",
			provinceId:0,province:"",
			cityId:0,city:"",
			countyId:0,county:"",
			xiaoquName:"",
			amapId:0,
			amapDetailAddr:"",
			homeAddress:""
        },
		
		currentRegionType:1,
		selectRegion:false,
		
	    regions:[],
	    
		toAddAddress : function(){
	        address_root.addrPage = "form";
	    },
		check: function(address) {
	    	address_root.checkedAddress = address;
	        chooseAddress(address);
	    },
	    isChecked:function(address) {
	    	return address_root.checkedAddress&&address_root.checkedAddress.id == address.id;
	    },
	    showRegion:function(){
	    	address_root.selectRegion = !address_root.selectRegion;
	    	if(address_root.selectRegion) {
	    		changeRegionView();
	    	}
	    },
	    updateRegion:function(region){
	    	changeRegionView(region.regionType,region.id,region.name);
	    },
	    regionAreaHeight:function(num){
	    	return (parseInt(num/4)+1)*40+4;
	    },
	    
	    /**使用高德推荐*/
	    suggestLocation:'',
	    suggestion:{},
	    suggestions:[],
	    
	    showLocation:function(){
	    	if(address_root.submitAddress.city == ""||address_root.submitAddress.county==""||address_root.submitAddress.province=="") {
	    		alert('请先选择你所在的区域！');
	    		return;
	    	}
	    	address_root.suggestions=[];
	    	address_root.addrPage = "xiaoquForm";
	    },
	    chooseLocation:function(suggestion){
	    	address_root.suggestion = suggestion;
	    	address_root.suggestions=[];
	    	address_root.suggestLocation = suggestion._name;
	    },
	    submitLocation: function() {
	        address_root.submitAddress.xiaoquName = address_root.suggestLocation;
	    	address_root.submitAddress.amapId=address_root.suggestion._id;
	    	address_root.submitAddress.amapDetailAddr=address_root.suggestion.detailaddress;
	    	address_root.addrPage = "form";
	    },
	    cancelLocation:function() {
	        address_root.suggestLocation = '';
			address_root.addrPage = "form";
	    },
	    /**使用高德推荐*/
	    
	    addAddress:function(){
	    	if(address_root.submitAddress.province==""||address_root.submitAddress.city==""||address_root.submitAddress.county==""){
	    		alert("请选择地址！");
	    		return;
	    	}
	    	if(address_root.submitAddress.amapDetailAddr==""||address_root.submitAddress.receiveName==""
	    		||address_root.submitAddress.tel==""||address_root.submitAddress.homeAddress==""){
	    		alert("请填写完整相关信息！");
	    		return;
	    	}
	    	if(!(/^1[3-9][0-9]\d{4,8}$/.test(address_root.submitAddress.tel))) {
	    		alert("请填写正确的手机号！");
	    		return;
	    	}
	    	saveAddress();
	    }
    });
    avalon.scan(document.getElementById('address_root'));
    address_root.$watch("suggestLocation", function(t){
        if(address_root.suggestLocation.length>=2 && address_root.suggestLocation!=address_root.suggestion._name) {
        	getSuggestion();
        }
    });
}
avalon.ready(function(){
	initAddresses();
});


