## 监听页面滚动
> 对overflow:scroll;元素 监听scroll事件，
- 对滚动的临界值进行判断。横向滚动用width、left；纵向滚动用height、top。
```javascript
<div class="kind-scroll" @scroll='handelscroll'>
...左右滚动区域
<div>

handelscroll(){
    //滚动到距离右侧边缘30像素时触发
    if (event.srcElement.scrollLeft + event.srcElement.offsetWidth > event.srcElement.scrollWidth - 30) {
        this.swiperIsEnd=true;
    }else{
        this.swiperIsEnd=false;
    }
}

```
## 滚动到指定位置
> 通常我们需要页面滚动到指定位置，
```javascript
    /* 无缓动 */
    document.querySelector('.wrap').scrollTop = 0;

    /* 显示在可视区域 */
    document.querySelector('.wrap').scrollIntoView();

    /* 
     * 滚动到指定位置
     * x-coord 是文档中的横轴坐标。
     * y-coord 是文档中的纵轴坐标。
     * options 是一个包含三个属性的对象:
     * top 等同于  y-coord
     * left 等同于  x-coord
     * behavior  类型String,表示滚动行为,支持参数 smooth(平滑滚动),instant(瞬间滚动),默认值auto,实测效果等同于instant
    */
    document.querySelector('.wrap').scrollTo(x-coord,y-coord,options);

    /* 
     * 手写 缓动效果
     * dom:监听滚动的元素，val：位置；width、left对应横向滚动。height，top对应纵向滚动。
    */
    scrollSmoothTo(scrollDom,0)；

    scrollSmoothTo  (dom,val) {
        let maxVal=dom.scrollWidth-dom.offsetWidth;
        let position=val>maxVal?maxVal:val;
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(callback, element) {
                return setTimeout(callback, 17);
            };
        }
        // 当前滚动高度
        var scrollLeft = dom.scrollLeft;
        // 滚动step方法
        var step = function () {
            // 距离目标滚动距离
            var distance = position - scrollLeft;
            // 目标滚动位置
            scrollLeft = scrollLeft + distance / 5;
            if (Math.abs(distance) < 1) {
                dom.scrollTo(position,0 );
            } else {
                dom.scrollTo(scrollLeft,0);
                requestAnimationFrame(step);
            }
        };
        step();
    },
```



