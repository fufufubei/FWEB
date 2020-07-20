## ios文字两端对齐兼容
在ios，两端对齐无效
```css
p{
    text-align:justify;
}
```
兼容写法：
```css
p {                 
     height: 32/@rem;                   
     text-align: justify;
     &:after {
         display: inline-block;
         width: 100%;
         content: '';
     }
}
```

## iphone 6plue 在微信打开网页，overflow:scroll; 页面卡住不能滚动。
给overflow:scroll内的添加一个 height：101%的子元素；
![示例图片](/FWEB/images/css/css1.gif)
![示例图片](/FWEB/images/css/css1.png)



## 输入框问题

### 实现textarea自动撑高

通过将textarea的value插入到pre标签内，由pre标签的高度撑开文本域。

```html
<div class="text-area">
    <textarea placeholder="请详细描述事故过程" maxlength="350" v-model="claimsInfo.accidentDesc" ></textarea>
    <pre>{{claimsInfo.accidentDesc}}</pre>
</div>

<style>
.text-area{
    position: relative;
    width: 100%;
    height: 100%;
    padding-bottom: 20px;
    pre {
        display: block;
        visibility: hidden;
        white-space: pre-wrap;
        word-wrap: break-word;
        margin: 0;
        color: #333;
        font-size: 26px;
        line-height: 40px;
        min-height: 120px;
    }
    textarea{
        width: 100%;
        height: 100%;
        background: transparent;
        outline: none;
        resize: none;
        color: #333;
        font-size: 26px;
        line-height: 40px;
        position:absolute;
        top: 0;
        left:0;
    }
}
</style>
```

### input设置disabled或者readOnly时，在ios系统上字体和背景色都变的很浅。

```css
input[disabled]{
    -webkit-text-fill-color:black; 
    -webkit-opacity:1; opacity: 1;
}

input[readOnly]{
    -webkit-text-fill-color:black; 
    -webkit-opacity:1; opacity: 1;
}
```

如上设置之后，发现placeholder的样式失效了，这时候还需要单独给disbled的placeholder单独设置：

```css
input:disabled::-webkit-input-placeholder{
    font-size: 28px;
    line-height: 40px;
    color: #C1C1C1;
    -webkit-text-fill-color:#C1C1C1;
}
```


### input设置readyonly后，在ios浏览器和ie9以下，input还能聚焦。

* 方法一： 使用disabled属性代替；
    
* 方法二：聚焦时马上失去焦点
    
    ```javascript
      <input type="text" readonly unselectable="on" onfocus="this.blur()" value="点我啊"/>
      //或
      $('input[readonly]').on('focus', function() {       
         $(this).trigger('blur'); 
      });
    ```
    

### 输入框输 入过滤

input 的type有text，number，tel等类型。当我们需要输入手机号时，只需要输入数字，这时候可能会选择number类型，但是 **使用number类型，maxlength就会失效， 使用tel就能实现调起数字键盘并且保证maxlength可用。**

即使调起了数字键盘，会发现标点符号还是可以输入，可以使用正则过滤；

```html
//只能输入数字
<input type="tel" placeholder="请输入手机号" v-model="mobile" @input="mobile=mobile.replace(/[^\d]/ig,'')" maxlength="11">

//只能输入数字，字母
<input type="text" id='invitationCode' maxlength="5" v-model="InvitationCode" @input="InvitationCode=InvitationCode.replace(/[^\w]/ig,'')">
```