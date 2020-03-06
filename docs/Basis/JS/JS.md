## 浮点误差
JavaScript 浮点数运算时经常遇到会 0.000000001 和 0.999999999 这样奇怪的结果
以下帮你解决js四则运算浮点误差

``` js
    let num=5-3.2;
    parseFloat(num.toPrecision(precision))
```

## IE，安卓5.0以下版本promise未定义问题
**解决方案：**
```js
npm install --save-dev babel-polyfill
//在main.js中引入： 
import “babel-polyfill”  
```

## Ios输入框点击不灵敏
**问题描述：**
ios端点击输入框，输入框有时不会获取焦点。
进一步现象：轻点输入框不会获取焦点，如果点重点或者点的时间长一点就可以后去焦点。
**猜测：** fastclick影响
**原因：** Ios 11之后修复了点击300毫秒延迟问题，因此在ios11之后不需要再引入fastclick.js
**解决方案：**
- 方法1：
在node_module里找到fastClick文件，然后找到focus方法，加一句targetElement.focus()方法即可解决!
```js
    /**
    * @param  {EventTarget|Element}  targetElement
    */
        FastClick.prototype.focus  =  function(targetElement) {
        var  length;
        // Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
        if (deviceIsIOS  &&  targetElement.setSelectionRange  &&  targetElement.type.indexOf('date') !==  0  &&  targetElement.type  !==  'time'  &&  targetElement.type  !==  'month') {
            length  =  targetElement.value.length;
            targetElement.setSelectionRange(length, length);
            //兼容ios11以上输入框不容易获取焦点
            targetElement.focus();
        } else {            
            targetElement.focus();
        }
    };
```
- 方法2：
```js
    const str= navigator.userAgent.toLowerCase()
    const ver=str.match(/cpu iphone os (.*?) like mac os/)

    if(!ver){//非IOS系统
        // 引入fastclick 做相关处理
        var  fc = document.createElement("script");
        fc.src = "/js/fastclick.js";
        var  s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(fc, s);
        }else {
        if(parseInt(ver[1])< 11){
        // 引入fastclick 做相关处理
            var  fc = document.createElement("script");
            fc.src = "/js/fastclick.js";
            var  s = document.getElementsByTagName("script")[0];

            s.parentNode.insertBefore(fc, s);  
        }
    }
```
## 移动端页面中固定、绝对定位元素被键盘顶起问题
在移动端项目中，往往会遇到在有输入框的页面中使用固定、绝对定位元素时被键盘顶起问题(安卓机型)，可在DOM加载完毕时执行以下代码:
```js
    if (/Android/.test(navigator.appVersion)) {
        let viewH = document.documentElement.clientHeight || document.body.clientHeight;
        document.getElementsByTagName('html')[0].style.height = `${viewH}px`;
        document.body.style.height = `${viewH}px`;
    }

```

## 微信浏览器H5页面软键盘关闭导致页面空缺的问题
**问题描述：**ios手机微信网页问题
微信6.7.4以后 H5页面里的select,input软键盘弹起的时候页面会上移，软键盘关闭页面不会下移。导致页面空缺了一部分。
微信6.7.3及其它版本不会有这个问题！页面会随着软键盘关闭而下移恢复正常！
**解决方案：**

```js
/**
 * 处理iOS 微信客户端高于6.7.4  键盘收起页面未下移bug
 */
(/iphone|ipod|ipad/i.test(navigator.appVersion)) && document.addEventListener('blur', (e) => {
    // 这里加了个类型判断，因为a等元素也会触发blur事件
    setTimeout(_=>{
        let areafocus = document.querySelectorAll('textarea:focus').length;
        let inputfocus = document.querySelectorAll('input:focus').length;
        if(inputfocus+areafocus==0){
          ['input', 'textarea'].includes(e.target.localName) && document.body.scrollIntoView(false)
        }
      },200)
}, true)
```

## iOS时间戳显示NaN
安卓显示正常，ios 显示的是NaN:

NaN-NaN1-NaN
```js 
new Date('2017-09-18 14:58:32').getTime(); //在ios上拿不到时间戳显示NaN
```
改为：
```js
new Date("2018-02-15 20:30:00".replace(/-/g,'/')).getTime(); // 解决了问题，android 和 ios都正常显示
```