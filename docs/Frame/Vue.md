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

