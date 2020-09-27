# VUE碎知识
## proxy跨域设置
> vue.config.js中可以设置代理，处理跨域,可以设置多个代理。
```js
module.exports = {
    //devserver服务
    devServer: {
        //是否自动打开浏览器
        open: true,
        // port: 8081,
        // host:getIp(), 暂时注释 运行后可在命令行工具中选择ip地址打开
        //代理服务
        proxy: {
            '/api': {
            target: '<url>',
            ws: true,
            changeOrigin: true,
            },
        },
    }
},


 proxy: {
    '/handler': {
        target: 'https://activity....',
        ws: true,
        changeOrigin: true,
    },
    '/api': {
        target: 'https://file....',
        ws: true,
        changeOrigin: true,
    },
    '/Pages': {
        target: 'https://app....',
        ws: true,
        changeOrigin: true,
    },
},


```

## beforeRouteEnter,beforeRouteLeave
```js
beforeRouteEnter(to,from,next){
    //获取不到this，可以通过vm进行获取，此时修改this的某个属性值会被activated，mounted内的修改覆盖。
    next(vm){

    }
    
}

beforeRouteLeave(to,from,next){
    //在leave内改变页面跳转
    if(to.path=='/claimsStep1'){
        this.$router.go(-2)
    }else{
        next()
    }

}

```

## 页面title设置  
  
Vue是一个单页面应用，每个路由都想要有不同的title。  
  
在客户端app内，H5是嵌套在客户端webview页内，客户端的UpdateWebTitel方法，设置的是webview的title。  
  
webview内的页面A，跳转页面B，对客户端来说这两个页面其实是同一个webview。如果A页面没有使用UpdateWebTitel，B页面使用了UpdateWebTitel('我是B页面')，首次打开A页面 webview的title取的是A页面的document.title："我是A页面"；跳转B页面后 webview的title，通过UpdateWebTitel设置成了“我是B页面”，从B页面返回A页面后，由于没有再次调用UpdateWebTitel方法，此时的title还是“我是B页面”。因此在客户端内嵌的title需要通过app.UpdateWebTitel进行设置。  
  
```javascript  
//routers.js 修改路由配置  
  
{  
 path: '/replenish',  
 name: 'replenish',  
 meta: {  
 title:'补充照片资料',  
 keepAlive:false  
 },  
 component: () => import('../pages/replenish.vue')  
 },  
  
//main.js 设置标题  
  
router.beforeEach((to,from,next)=>{  
 if(to.meta.title){  
 document.title = to.meta.title  
 if(isApp){  
 app.app.UpdateWebTitel(to.meta.title);//app设置title方法  
 }  
 }  
 next()  
})  
```
## keep-alive
这是keepalive可以使页面记住缓存，返回页面时保留数据，符合大多提交资料得项目需求。
但是keepalive:true也有很多的坑：
### 页面只触发一次mounted，
重新入页面也不会触发，除非是刷新页面。
activated每次进入页面都会触发，可以配合使用beforeRouteEnter进行使用。

### 嵌套路由keep-alive:true 失效
当页面是多级嵌套路由，路由a设置了keepalive，路由b没有设置keepalive，a跳转b时会导致keep-alive失效。因此使用keep-alive要使用一级路由。
或者在router里将要跳转的页面配置多个路由，放到与a同一层级下。
```javascript
{
    path:'/A',
    component:A,
    meta:{
        keepAlive:true
    }
},
{
    path:'/order',
    component:Order,
    children:[
        {
            path:'/B',
            component:B,
        }
    ]
},
{
    path:'/B1',
    component:B,
}

```

##防抖和节流
### 防抖（debounce）
触发高频事件后 n 秒内函数只会执行一次，如果 n 秒内高频事件再次被触发，则重新计算时间
常用场景：输入时进行检索，当用户输入无操作多少ms之后再请求接口，渲染请求结果

使用lodash实现
[官方链接](https://www.lodashjs.com/docs/lodash.debounce)
```vue
<template>
<div class="page">
<input type='text' @input="inpTxt" />
</div>
</template>
<script>
import _ from 'lodash';
export default{
    data:()=>{
        return{

        }
    },
    methods:{
        inpTxt(e){
            this.inpVal=e.val.replace(/[^\d]/ig,'')
            // inpVal do something
            ...
            //请求检索
            this.getData();
        },
        getData:_.debounce(function(){
           ajax.get();
        },600,{
            leading:false
        }),

    }
}
</script>
```

### 节流（thorttle）
高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执行频率

常用场景：抢购页面，点击购买按钮，点击之后在固定时间内点击其实是无效的，点击之后超过一定时间点击才能触发。

### 区别
防抖动是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行。
