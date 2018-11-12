$(document).ready(function(){
	getCarBrandlist();
	$("select[name='carBrandId']").on("change",getStylelist);
	$("select[name='carStyleId']").on("change",getYearlist);
	$("._baocun").on("click",saveCarInfo);
});
function getCarBrandlist() {
	var n = "GET", 
		a = "carBrandlist", 
		i = null, 
		e = function(data) {
			$("select[name='carBrandId']").empty();
			$("select[name='carBrandId']").append("<option value=''>-请选择-</option>");//因为加的是onchange事件，需要触发
		  	$.each(data.result, function(i, item) {
		        $("select[name='carBrandId']").append("<option value='"+item.brandId+"'>"+item.brandName+"</option>");
		    });
		  	
		  	$("select[name='carStyleId']").empty();
			$("select[name='carYearId']").empty();
		},
		r = function() {
			alert("获取汽车品牌信息异常！")
		};
	common.invokeApi(n, a, i, null, e, r)
}

function getStylelist() {
	var brandId = $("select[name='carBrandId'] option:selected").val();
	$("select[name='carStyleId']").empty();
	$("select[name='carYearId']").empty();
	if(brandId!=""){
		var n = "GET", 
		a = "carStylelist/"+brandId, 
		i = null, 
		e = function(data) {
			$("select[name='carStyleId']").append("<option value=''>-请选择-</option>");//因为加的是onchange事件，需要触发
			$.each(data.result, function(i, item) {
				$("select[name='carStyleId']").append("<option value='"+item.styleId+"'>"+item.styleName+"</option>");
			});
		},
		r = function() {
			alert("获取汽车品牌信息异常！")
		};
		common.invokeApi(n, a, i, null, e, r);
	}
}
function getYearlist() {
	var brandId = $("select[name='carBrandId'] option:selected").val();
	var styleId = $("select[name='carStyleId'] option:selected").val();
	$("select[name='carYearId']").empty();
	if(brandId!="" && styleId!=""){
		var n = "GET", 
		a = "carYearlist/"+brandId+"/"+styleId, 
		i = null, 
		e = function(data) {
			$("select[name='carYearId']").empty();
			$.each(data.result, function(i, item) {
				$("select[name='carYearId']").append("<option value='"+item.yearId+"'>"+item.yearName+"</option>");
			});
		},
		r = function() {
			alert("获取汽车品牌信息异常！")
		};
		common.invokeApi(n, a, i, null, e, r);
	}
}

function saveCarInfo(){
	var brandId = $("select[name='carBrandId'] option:selected").val();
	var styleId = $("select[name='carStyleId'] option:selected").val();
	var yearId = $("select[name='carYearId'] option:selected").val();
	var inputCarStyle = $("input[name='inputCarStyle']").val();
	var licensePlate = $("input[name='licensePlate']").val();
	var licensePlateProvince = $("select[name='licensePlateProvince'] option:selected").val();
	var requireDate = $("input[name='requireDate']").val();
	var formInfo = {
			brandId:brandId,
			styleId:styleId,
			yearId:yearId,
			inputCarStyle:inputCarStyle,
			licensePlate:licensePlate,
			licensePlateProvince:licensePlateProvince,
			requireDate:requireDate
	}
	if(!brandId || brandId==""){
		alert("请选择品牌");
	}else if(!styleId || styleId==""){
		alert("请选择车型");
	}else if(!yearId || yearId==""){
		alert("请选择年款");
	}else if(!licensePlateProvince || licensePlateProvince==""){
		alert("请选择车牌省份");
	}else if(licensePlate==""){
		alert("请填写车牌");
	}else if(requireDate==""){
		alert("请选择预约服务时间");
	}else{
		var n = "POST", 
		a = "saveTempOrderCarInfo", 
		i = formInfo, 
		e = function(n) {
			var ruleId = getUrlParam("ruleId");
//		type=3 表示特卖
			location.href="../buy.html?type=3&ruleId="+ruleId;
		}, r = function(n) {
			alert(n.message == null ? "保存车辆信息失败，请稍后重试！" : n.message);
		};
		common.invokeApi(n, a, i, null, e, r)
		
	}
	
}
function createOrder(order) {
	o.control.paying = true;
	if (o.model.order != {} && o.model.order.id > 0) {
		requestPay();
		return;
	}
	var n = "POST", a = "createOrder", 
	i = order, e = function(n) {
		o.model.order = n.result;
		requestPay();
	}, r = function(n) {
		alert(n.message == null ? "订单创建失败，请稍后重试！" : n.message);
		o.control.paying = false;
	};
	common.invokeApi(n, a, i, null, e, r)
}
