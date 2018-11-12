/**
 * 
 */
avalon.ready(function() {
	
	var o = avalon.define({
		$id : "root",
		bg_img: '../static/images/community/bg_publish.jpg',
		car_no : "",
		car_in_date:"",
		car_out_date: "",
		fee_price:0.00,
        
	});
	
	function getReturn()
	{
		o.car_no=getUrlParam("car_no");
		o.car_in_date=getUrlParam("car_in_date");
		o.car_out_date=getUrlParam("car_out_date");
		o.fee_price=getUrlParam("fee_price");
	}
	
	
	getReturn();
    avalon.scan(document.body);
    //share.default_send();
    FastClick.attach(document.body);
    checkFromShare();
    
});