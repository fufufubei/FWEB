### 图片格式转换

- **file文件上传**
> axios上传file文件,需要修改请求头，headers: { "Content-Type": "multipart/form-data" },
[参考链接](https://www.jianshu.com/p/9c708a47d8a5)
```js
    /* 上传file文件 */
    upload(){
        //上传图片
        let file=this.base64URLtoFile('bass64图片...','save.png');
        var form = new FormData();
        form.append("file", file);

        this.$post('https://files.uupt.com/u/fileupload.ashx',form,{headers:{
            "Content-Type": "multipart/form-data"
        }}).then((res)=>{
            console.log(res)
            this.uPop.close();
        }).catch((err)=>{
            this.uPop.msg('图片生成失败~')
            this.uPop.close();
        })
    }
```
- **base64转file**
```js
    base64URLtoFile(base64Data, filename){
        var arr = base64Data.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    },
```

- **线上图片转base64**
```js
getBase64 (img) { // 转一张图片编码
    const that=this;
    var image = new Image()
    image.crossOrigin = '' // 解决跨域问题
    image.src = img
    image.onload = function () {
        let canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        let context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        let dataURL = canvas.toDataURL() // 得到图片的base64编码数据
        console.log(dataURL)
    }
},
```

- **线上图片转blob**
> 在安卓手机4.0之后无效
```js
getImage (url) {
    const that=this;
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'blob'; 
    xhr.onload = function () {
        if (this.status == 200) {
            let img=URL.createObjectURL(this.response);
            console.log(img)
        }
    };
    xhr.send();
},
```
