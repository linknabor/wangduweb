 var o;
avalon.ready(function() {
	function query() {
        var n = "GET",
        a = "addresses",
        i = null,
        e = function(n) {
            o.addresses = n.result;
            common.checkRegisterStatus();
        },
        r = function(n) {
        	alert("获取地址信息失败！");
			o.addresses = [];
        };
        common.invokeApi(n, a, i, null, e, r)
    }
	function deleteAddress(addr) {
    	var n = "POST",
        a = "address/delete/" +addr.id,
        i = null,
        e = function(n) {
			console.log("success:" + JSON.stringify(n));
			o.addresses.remove(addr);
        },
        r = function(n) {
        	alert(n.message==null?"删除地址失败！":n.message);
        };
        common.invokeApi(n, a, i, null, e, r)
    }
	function setDefalutAddress(addr) {
    	var n = "POST",
        a = "address/default/" +addr.id,
        i = null,
        e = function(n) {
			for(var idx in o.addresses) {
				if(o.addresses[idx].id == addr.id) {
					o.addresses[idx].main=true;
				} else {
					o.addresses[idx].main=false;
				}
			}
			updateCurrentAddrId(addr.id);
        },
        r = function() {
        	alert("设置默认地址失败！");
        };
        common.invokeApi(n, a, i, null, e, r)
    }
	
	function getComeFrom(){
		o.comeFrom=getUrlParam("comeFrom");
	}
	
	function saveAddress() {
    	var n = "POST",
        a = "addAddress",
        i = {
    			provinceId:o.province.id,province:o.province.name,
    			cityId:o.city.id,city:o.city.name,
    			countyId:o.county.id,county:o.county.name,
//    			xiaoquName:o.xiaoquName,
    			xiaoquName:o.chooseLocationName,
    			receiveName:o.receiveName,
    			detailAddress:o.xiaoquAddress+o.homeAddress,
    			amapId:o.amapId,
    			amapDetailAddr:o.xiaoquAddress,
    			tel:o.tel,
    			main:o.isDefault
    		},
        e = function(n) {
			console.log("success:" + JSON.stringify(n));
			o.currentPage = "list";
			o.addresses.push(n.result);
        },
        r = function(n) {
        	alert(n.message==null?"地址保存失败，请重试！":n.message);
        };
        common.invokeApi(n, a, i, null, e, r)
    }
	function getSuggestion(city,keyword) {
    	var n = "GET",
        a = "amap/"+city+"/"+keyword,
        i = null,
        e = function(n) {
			console.log("success:" + JSON.stringify(n));
			o.suggestions =n.result;
        },
        r = function() {
			console.log("error:" + a);
			o.suggestions=[];
        };
        common.invokeApi(n, a, i, null, e, r)
    }
	function getRegions(type,id,sucfun,errfun) {
		o.currentRegionType=type;
    	var n = "GET",
        a = "regions/" +type+"/"+id,
        i = null;
        common.invokeApi(n, a, i, null, sucfun, errfun)
    }
	function updateRegion(region) {
		var e = function(n) {
			console.log("success:" + JSON.stringify(n));
			o.provinces = n.result;
			o.regions = o.provinces;
        },
        r = function(n) {
			alert("网络异常，请稍后重试！");
        };
		if(!region){
			if(o.provinces.length==0) {
				getRegions(1,1,e,r);
			} else {
				o.regions = o.provinces;
			}
		} else {
			if(region.regionType == 1){
				if(o.province.id != region.id ||o.citys.length==0) {
					e = function(n) {
						o.citys = n.result;
						o.regions = o.citys;
						o.currentRegionType = 2;
				    },
			        getRegions(region.regionType+1,region.id,e,r);
				} else {
					o.regions = o.citys;
						o.currentRegionType = 2;
				}
				o.province = region;
			} else if(region.regionType == 2) {
				if(o.city.id != region.id ||o.countys.length==0) {
					e = function(n) {
						o.countys = n.result;
						o.regions = o.countys;
						o.currentRegionType = 3;
				    },
			        getRegions(region.regionType+1,region.id,e,r);
				} else {
					o.regions = o.countys;
						o.currentRegionType = 3;
				}
				o.city = region;
			} else if(region.regionType == 3) {
				o.county = region;
				o.distinct=o.province.name+o.city.name+o.county.name;
				o.selectRegion = false;
			}
		}
	}
	
    
    o = avalon.define({
        $id: "root",
        addresses:[],
        checkedAddress:{},
        
        comeFrom:"",
        
        currentPage : "list",
        toAddAddress : function(){
        	if(common.checkRegisterStatus()){
            	o.currentPage = "editform";
        	}
        },
        chooseRegion:function(){
        	o.currentRegionType=1;
        	o.selectRegion = !o.selectRegion;
        	if(o.selectRegion) {
        		updateRegion();
        	}
        },
		backRegion:function(regionType){
			if(regionType==1){
				o.currentRegionType=regionType;
				if(o.provinces.length<=0){
					updateRegion();
				} else {
					o.regions=o.provinces;
				}
			} else if(regionType==2){
				if(o.province!={}){
					o.currentRegionType=regionType;
					updateRegion(o.province);
				}
			}
		},
        showLocation:function(){
        	if(o.province.name==null||o.city.name==null||o.county.name==null){
        		alert('请先选择你所在的区域！');
        		return;
        	}
        	o.suggestions=[];
        	o.currentPage = "location";
        },
        submitLocation: function() {
            console.log(o.location)
            o.chooseLocationName = o.location;
        	o.currentPage = "editform";
        },
        selectRegion:false,
        selectXiaoqu:false,
        distinct:"",
        amapId:"",
        xiaoquAddress:"",
        homeAddress:"",
        location:"",
        detaillocation:'',
        
        currentRegionType:1,
        regions:[],
        currentRegion:{},
        provinces:[],
        citys:[],
        countys:[],
        
        province:{},
        city:{},
        county:{},

        chooseLocationObj:{},
        chooseLocationName:"",
        
        isDefault:false,
 //     addAmapAddrStatus:false,
        detailAddress:"",
        amapAddress:"",
        receiveName:"",
        tel:"",
        xiaoquName:"",
        suggestion:{},
        suggestions:[],
//      locationNeedSuggest:true,
        usesuggest:false,
        deleteAddress : function(addr) {
        	if(confirm('确认删除该地址？')){
        		deleteAddress(addr);
    		};
        },
        toggleSwitch: function() {
            o.isDefault = !o.isDefault;
        },
        addAddress:function(){
        	if(o.province.name==null||o.city.name==null||o.county.name==null){
        		alert("请选择地址！");
        		return;
        	}
        	if(o.xiaoquAddress==""||o.receiveName==""||o.tel==""||o.chooseLocationName==""){
        		alert("请填写完整相关信息！");
        		return;
        	}
        	if(!(/^1[3-9][0-9]\d{4,8}$/.test(o.tel))) {
        		alert("请填写正确的手机号！");
        		return;
        	}
        	saveAddress();
        },
        setDefaultAddress:function(){
        	if(!o.checkedAddress){
        		alert("请选择一个地址！");
        		return;
        	}
        	if(!o.checkedAddress.main) {
        		if(confirm("设为默认地址？")){
        			setDefalutAddress(o.checkedAddress);
        		}
        	} else {
        		alert("已经是默认地址了！");
        	}
        },
        check: function(address) {
        	o.checkedAddress = address;
        },
        isChecked:function(address) {
        	return o.checkedAddress.id == address.id;
        },
        updateRegion:updateRegion,
        
        jumpto:function(url){
        	window.location.href=url;
        },
        chooseLocation:function(suggestion){
//        	o.locationNeedSuggest=false;
        	o.selectXiaoqu = false;
        	o.usesuggest=true,
        	o.suggestion = suggestion;
        	o.suggestions=[];
        	o.location = suggestion._name;
        	o.amapId = suggestion._id;
        	o.xiaoquAddress = suggestion.detailaddress;
        },
        cancelLocation: function() {
            o.location = '';
            o.amapId = '';
        },
        confirmAndBack:function(){
        	if(o.comeFrom!=null&&o.comeFrom!=''){
        		window.location.href=o.comeFrom;
        	} else {
        		window.location.href="index.html";
        	}
        },
        directSave: true//使用该属性改变页面的按钮状态和提示信息的显示或者隐藏
    });

   o.$watch("location", function(t) {
        if(o.location!=null && o.location.length>=2) {
        	getSuggestion(o.city.name,o.location);
        }
    })
    query();
    getComeFrom();
    avalon.scan(document.body),
    //share.default_send(),
    FastClick.attach(document.body),
    common.setTitle("地址信息");
});
