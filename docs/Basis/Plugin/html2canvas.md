## html2canvas 
> 需求：前端绘制海报图片，将海报保存进行传播。
 方法 canvas绘制海报，然后再将canvas生成图片。直接canvas进行绘制图片太过复杂。可以通过html2canvas进行绘制海报。

[html2canvas官方文档](http://html2canvas.hertzen.com/getting-started)

### 安装
```
npm i html2canvas --save
```
### 引用
```javascript
import html2canvas from 'html2canvas';

let dom=document.getElementById('canvas-dom');
html2canvas(dom).then((canvas)=>{
    document.body.appendChild(canvas);
    canvas.id='my-canvas';
    let myCanvas = document.getElementsByTagName('canvas')[0];
    let fullQuality = myCanvas.toDataURL("image/jpeg", 1.0);
    console.log(fullQuality)
});
```

### 拓展-常见问题
- **Q1：一般页面展示的和想要生成的海报可能不太一样，比如：**
![]()

    A1：实现方案：分别两个div，div1用来页面展示，div2用来绘制canvas生成图片。

- **Q2：生成的图片模糊。**

    A2：涉及到图片的不要用background，将图片放到img标签内，使用定位放到对应位置。

- **Q3：生成的图片有白边。**

    A3：通过html2canvas参数设置canvas的宽高，及背景色。
```javascript
let W=document.querySelector("#canvas-dom").innerWidth||document.querySelector("#canvas-dom").clientWidth;
let H=document.querySelector("#canvas-dom").innerHeight||document.querySelector("#canvas-dom").clientHeight;
html2canvas(document.querySelector("#canvas-dom"),{
    backgroundColor:null,
    width:W,//设置canvas尺寸与所截图尺寸相同，防止白边
    height:H,//防止白边
}).then((canvas)=>{})
```

- **Q4: 如果生成的内容包含的有线上图片，会遇到跨域问题。**
    
    A4：html2canvas有几个参数设置跨域
    ```javascript
         html2canvas(document.querySelector("#canvas-dom"),{
            logging: false,
            useCORS: true,
            allowTaint: false,

            backgroundColor:null,
            width:W,//设置canvas尺寸与所截图尺寸相同，防止白边
            height:H,//防止白边
        }).then((canvas)=>{
            document.body.appendChild(canvas);
            canvas.id='my-canvas';
            let myCanvas = document.getElementsByTagName('canvas')[0];
            let fullQuality = myCanvas.toDataURL("image/jpeg", 1.0);
        }).catch((err)=>{
            console.log("err1",err)
        });
    ```

- **Q5：canvas绘制时不能使用线上图片，可以先将图片转换成base64或者blob**

    A5：本来使用的是XMLHttpRequest,在安卓手机上不支持。最后换用了canvas转。**还有一种情况将图片使用以下方法装换的时候，一直报跨域。最后是运维将站点进行设置允许跨域。**
    ```javascript
       /* 安卓无效 */
        getImage (url) {
            const that=this;
            var xhr = new XMLHttpRequest();
            xhr.open('get', url, true);
            xhr.responseType = 'blob'; 
            xhr.onload = function () {
                if (this.status == 200) {
                    that.yearInfo.Photo=URL.createObjectURL(this.response);
                    that.canvasImg();
                }
            };
            xhr.send();
        },
        /* 都可使用 */
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
                //绘制canvas
            }
        },
    ```

### 完整代码
```js
<tempalte>
<div class='page'>
    <div class='page-show'>页面展示内容 <img :src='img'/></div>
    <div class='page-canvas' id='canvas-dom'>canvas绘制内容 <img :src='img'/></div>
    <img class='saveImg' :src='saveImg' />
</div>
</template>
<script>
import html2canvas from 'html2canvas';
export default {
    data(){
        return{
            saveImg:'',
            img:'https://.....',
        }
    },
    created(){
        this.getBase64(this.img);
    },
    methods:{
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
                that.img=dataURL;
                that.canvasImg();
            }
        },
        /* 绘制分享图 */
        canvasImg(){
            this.uPop.loading();
            document.getElementById('my-canvas') && document.getElementById('my-canvas').remove();
            let W=document.querySelector("#canvas-dom").innerWidth||document.querySelector("#canvas-dom").clientWidth;
            let H=document.querySelector("#canvas-dom").innerHeight||document.querySelector("#canvas-dom").clientHeight;
            setTimeout(()=>{
                html2canvas(document.querySelector("#canvas-dom"),{
                        logging: false,
                    useCORS: true,
                    allowTaint: false,
                    // backgroundColor :null,
                    width:W,//设置canvas尺寸与所截图尺寸相同，防止白边
                    height:H,//防止白边
                }).then((canvas)=>{
                    document.body.appendChild(canvas);
                    canvas.id='my-canvas';
                    let myCanvas = document.getElementsByTagName('canvas')[0];
                    let fullQuality = myCanvas.toDataURL("image/jpeg", 1.0);
                    this.saveImg=fullQuality;
                    this.uPop.close();
                }).catch(()=>{
                    this.uPop.msg('图片生成失败')
                    this.uPop.close();
                });
            },300)
        },
    }
}
</script>
```


