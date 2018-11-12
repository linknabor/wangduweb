avalon.ready(function() {
    function n() {
        var n = "GET",
        a = "orders",
        i = null,
        e = function(n) {
            console.log(JSON.stringify(n));
        },
        r = function() {
            console.log(JSON.stringify(n));
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    var o = avalon.define({
        $id: "root",
        comment: '',
        comments: [
            {
                name: '丽莎',
                time: '2015.06.23 10:23',
                avatar: 'http://www.zhuayoukong.com/images/2015/07/206231065.jpg',
                comment: '丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎'
            },
            {
                name: '丽莎',
                time: '2015.06.23 10:23',
                avatar: 'http://www.zhuayoukong.com/images/2015/07/206231065.jpg',
                comment: '丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎'
            },
            {
                name: '丽莎',
                time: '2015.06.23 10:23',
                avatar: 'http://www.zhuayoukong.com/images/2015/07/206231065.jpg',
                comment: '丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎'
            },
            {
                name: '丽莎',
                time: '2015.06.23 10:23',
                avatar: 'http://www.zhuayoukong.com/images/2015/07/206231065.jpg',
                comment: '丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎'
            },
            {
                name: '丽莎',
                time: '2015.06.23 10:23',
                avatar: 'http://www.zhuayoukong.com/images/2015/07/206231065.jpg',
                comment: '丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎丽莎'
            }
        ],
        submit: function() {
            //在回调中添加评论内容
            o.comments.push({
                name: '丽莎',
                time: '2015.06.23 10:23',//获取服务器返回时间
                avatar: 'http://www.zhuayoukong.com/images/2015/07/206231065.jpg',
                comment: o.comment
            });
            o.comment = '';
        }
    });
    //n();
    avalon.scan(document.body);
    //share.default_send();
    FastClick.attach(document.body);  
});