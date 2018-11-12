avalon.ready(function() {
    function query(){
        common.invokeApi("GET","banner/12",null,null,function(n) {
            console.log(JSON.stringify(n));
            o.banners = n.result;
            initSwiper();
        },
        function() {
        })
    }
    var o = avalon.define({
        $id: "root",
        banners:[],
        prompt:false,
        prompts:function(){ 
            o.prompt = true; 
        },
        prompth:function(){
        	o.prompt =false;
        },
    });
    query();
    avalon.scan(document.body);
    common.setTitle("保洁");
});