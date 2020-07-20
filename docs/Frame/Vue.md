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
