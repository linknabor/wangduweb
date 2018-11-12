var uploadModule = {
    token: null,
    hasUploadToken: false,
    getUploadToken: function() {
    	common.invokeApi("GET", "api/qiniu/token", null, null, function(n){
    		uploadModule.token = n.result;
            uploadModule.hasUploadToken = true;
        }, function(n){
        	alert("暂时无法上传图片");
        });
    },
    initToken:function(){
    	if(!uploadModule.token) {
	    	uploadModule.getUploadToken();
    	}
    },
    uploadFile: function(file, callback, key) {
        
        var formData = new FormData();
        formData.append('token', uploadModule.token);
        formData.append('file', file);
        if (typeof key !== 'undefined') {
            formData.append('key', key);
        }
        common.invokeApi("GET", "api/qiniu/token", null, null, function(n){
    		uploadModule.token = n.result;
            uploadModule.hasUploadToken = true;
        }, function(n){
        	alert("暂时无法上传图片");
        });
        jQuery.ajax({
            url: 'http://upload.qiniu.com',
            type: 'post',
            data: formData,
            processData : false,
            /**必须false才会自动加上正确的Content-Type*/
            contentType : false,
            success: function(responseText) {
            	callback('http://7xkdq7.com1.z0.glb.clouddn.com/' + responseText.key);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
            	console.log("文件上传失败");
            	alert("一个文件上传失败");
            	callback('');
            }
        });
    },

    uploadFiles: function(files, callback) {
        var uploadedCount = 0,
            urlMap = {};

        files.forEach(function(file) {
        	console.log("上传文件"+file.name);
            uploadModule.uploadFile(file, function(url) {
                urlMap[file.name] = url;
                ++uploadedCount === files.length && callback(urlMap);
            });
        });
    }
};