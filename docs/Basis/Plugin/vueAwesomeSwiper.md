# vue-awesome-swiper

## 使用
安装依赖
```
npm install vue-awesome-swiper --save
```
main.js引入安装的依赖
```js
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper);
```
```js
<template>
<div class="slide-list" >
    <swiper ref="swiper" v-if='slideList.length>0&&isRunSwiper' :options="SwiperOption" :class="{'swiper-no-swiping':slideList.length<=1}">
        <swiper-slide v-for="(item,index) in slideList" :key="index" >
           ...
        </swiper-slide>
        <div class="swiper-pagination slide-pagination" v-if='slideList.length>1' slot="pagination"></div>
    </swiper>
</div>
</template>

<script>
export default{
    data:()=>{
        SwiperOption:{
            speed: 800,
            loop: false,
            pagination: {
                el: '.slide-pagination',
            },
            autoplay: {
                disableOnInteraction: false
            },
        },
        isRunSwiper:false
    },
    activated(){
        this.isRunSwiper=false;
        setTimeout(()=>{
            this.isRunSwiper=true;
        },100)
    },
    computed:{
        ...mapGetters([
            'slideList',
        ])
    }
}
        
</script>

```

## 使用时遇到的坑

### 需要刷新一下，页面设置的autoplay和分页swiper-pagination 才会生效

**问题**

首次打开页面，页面只有一个slide是正常展示的，退出页面再次进入页面发，页面silde数量变化了，打开页面slide数量已经更新了，但是autoplay和分页swiper-pagination都没有生效，在当前页面刷新一下才会正常。

**解决方法：**

正常来说slide循环的数据都是当前页面请求数据后赋值的，可以在 swiper添加判断 当slide长度大于0时显示。
```vue
<swiper ref="swiper" v-if='slideList.length>0' :options="SwiperOption">...</swiper>
```
但是在我这个项目中slide的数量不是这个页面请求获取的，可以添加一个延时，通过变量isRunSwiper和slide的数量控制显示。
```vue
<swiper ref="swiper" v-if='slideList.length>0&&isRunSwiper' :options="SwiperOption">...</swiper>
```

