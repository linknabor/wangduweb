avalon.ready(function() {
    o = avalon.define({
        $id: "root",
        bg_img:'../static/img/bg/bg_abort.jpg',
    });
    avalon.scan(document.body),
    //share.default_send(),
    FastClick.attach(document.body),
    common.setTitle("关于我们");
});