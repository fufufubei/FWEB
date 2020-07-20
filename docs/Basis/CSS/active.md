# iOS :active设置不生效问题
在一次使用:active伪类时发现：在iOS手机上，active添加的样式没有生效。
需要给要触发的标签绑定touchstart事件，如果不想精确到某一个元素直接加到body上也是可以的。

**原因：**
元素在按压态/点击态时会使用 :active伪类 来设置特定的样式，这个操作在PC/Android上都没有问题，但 iOS上的点击事件click是模拟出来的，在iOS上使用 :active 伪类 需要设置一个touch事件，这样元素的:active伪类才能被正确触发。
```javascript
document.body.addEventListener('touchstart',function(){});
```