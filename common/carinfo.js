function updateColour(id) {
	o.car.colour = o.car.carColours[id].colour;
}

function updatePlateProvince(id){
	o.car.plateProvince = o.car.plateProvinces[id].province;
}

function queryUserCarInfo() {
    var n = "GET",
    a = "userCarInfos",
    i = null,
    e = function(n) {
        o.car.usercarinfos = n.result;
        getdefaultUserCarInfo();
    },
    r = function(n) {
    	alert("获取车辆信息信息失败！");
		o.car.usercarinfos = [];
    };
    common.invokeApi(n, a, i, null, e, r)
}

function getdefaultUserCarInfo(){
	if(o.car.usercarinfos.length > 0){
		for(var i=0; i<o.car.usercarinfos.length; i++){
			if(o.car.usercarinfos[i].main){
				o.car.checkedUserCarInfo = o.car.usercarinfos[i];
				return;
			}
		}
	}
}

function saveUserCarInfo() {
	var n = "POST",
    a = "addUserCarInfo",
    i = {
    		brandName:o.car.brandName,
    		modelName:o.car.modelName,
    		colour:o.car.colour,
    		year:"",
    		plateProvince:o.car.plateProvince,
    		plateNumber:o.car.plateNumber
		},
    e = function(n) {
		console.log("success:" + JSON.stringify(n));
		o.car.usercarinfos.push(n.result);
		o.car.checkedUserCarInfo=n.result;
        o.control.currentPage = "main";
    },
    r = function(n) {
    	alert(n.message==null?"车辆信息保存失败，请重试！":n.message);
    };
    common.invokeApi(n, a, i, null, e, r)
}

function getBrandName() {
    var n = "GET",
    a = "userCarInfo/getBrandName",
    i = null,
    e = function(n) {
        o.car.carBrandNames = n.result;
    },
    r = function() {
    	alert("获取车辆品牌失败，请稍后再试");
    };
    common.invokeApi(n, a, i, null, e, r)
}

function getModelName() {
    var n = "GET",
    a = "userCarInfo/getModelName/"+o.car.brandName,
    i = null,
    e = function(n) {
        o.car.carModelNames = n.result;
    },
    r = function() {
    	alert("获取车辆型号失败，请稍后再试");
    };
    common.invokeApi(n, a, i, null, e, r)
}

var carModel={
	//var
	saveCarInfo:true,
	showPlateProvince:false,
	showColour:false,
    colour:"",
    plateProvince:"沪",
    plateNumber:"",
    brandName:"",
    modelName:"",
	carBrandNames:[],
	carModelNames:[],
	usercarinfos:[],
	checkedUserCarInfo:{},
	firstLetters:[
		["A","B","C","D","E","F"],
		["G","H","I","J","K","L"],
		["M","N","O","P","Q","R"],
		["S","T","U","V","W","X"],
		["Y","Z","","","",""]
	],
	carColours:[
		{colour:"黑色"},
		{colour:"白色"},
		{colour:"红色"},
		{colour:"蓝色"},
		{colour:"银灰色"},
		{colour:"深灰色"},
		{colour:"黄色"},
		{colour:"绿色"},
		{colour:"香槟色"},
		{colour:"橙色"},
		{colour:"粉色"},
		{colour:"紫色"},
		{colour:"巧克力色"},
		{colour:"其他"}
	],
	plateProvinces:[
		{province:"沪"},
		{province:"京"},
		{province:"渝"},
		{province:"川"},
		{province:"津"},
		{province:"冀"},
		{province:"豫"},
		{province:"云"},
		{province:"辽"},
		{province:"黑"},
		{province:"湘"},
		{province:"皖"},
		{province:"鲁"},
		{province:"新"},
		{province:"苏"},
		{province:"浙"},
		{province:"赣"},
		{province:"鄂"},
		{province:"桂"},
		{province:"甘"},
		{province:"晋"},
		{province:"蒙"},
		{province:"陕"},
		{province:"吉"},
		{province:"鄂"},
		{province:"闽"},
		{province:"贵"},
		{province:"粤"},
		{province:"青"},
		{province:"藏"},
		{province:"宁"},
		{province:"琼"}
	],
	//function
	check: function(usercarinfo) {
    	o.car.checkedUserCarInfo = usercarinfo;
        o.control.currentPage = "main";
    },
	toAddUserCarInfo : function(){
        o.control.currentPage = 'addusercarinfoform';
    },
    addCarInfo:function(){
    	if(o.car.brandName == "" || o.car.modelName == ""){
    		alert("请选择车辆信息");
    		return;
    	}
    	if(o.car.colour == ""){
    		alert("请选择车辆颜色");
    		return;
    	}
    	if(o.car.plateProvince == "" || o.car.plateNumber == ""){
    		alert("请选择和填写车牌信息");
    		return;
    	}
    	saveUserCarInfo();
    },
    chooseCarColour:function(){
    	o.car.saveCarInfo = false;
    	o.car.showPlateProvince = false;
    	o.car.showColour = true;
    },
    chooseCarPlateProvince:function(){
    	o.car.saveCarInfo = false;
    	o.car.showColour = false;
    	o.car.showPlateProvince = true;
    },
    chooseCarBrand:function(){
    	o.control.currentPage='carbrandinfo';
		getBrandName();
    },
    chooseCarModel:function(bandName){
    	o.control.currentPage='carmodelinfo';    	
		o.car.brandName=bandName;
		getModelName();
    },
    updateCarModel:function(modelName){
    	o.control.currentPage='addusercarinfoform'; 
		o.car.modelName = modelName;
    }, 
    showCarInfo:function(){
    	o.control.currentPage='usercarinfolist';
		if(o.car.usercarinfos.length==0) {
			queryUserCarInfo();
		}
    },
    updateColour:function(id){
    	o.car.showPlateProvince = false;
    	o.car.showColour = false;
    	o.car.saveCarInfo = true;
    	updateColour(id);
    },
    updatePlateProvince:function(id){
    	o.car.showPlateProvince = false;
    	o.car.showColour = false;
    	o.car.saveCarInfo = true;
    	updatePlateProvince(id);
    }
};
