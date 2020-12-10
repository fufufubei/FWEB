# 在Vue.js内使用Mixin
> 个人理解：Mixin相当于一个公共文件，里面包含方法、生命周期；引入mixin文件的多个页面都可以调用minxin中的方法和生命周期。相当于将mixin插入到页面之前，先执行mixin再执行页面内的调用。
如果遇到冲突，比如调用了同一个方法名，但是在minxin内和页面内两个方法是不一样的，mixin内的方法会被替换成页面内的方法，mixin执行一次，页面执行一次。

使用场景：

1，有两个弹窗，样式功能都不同，一个是提交信息弹窗，一个是结果展示弹窗。都是通过调用toggleShow()进行显示。
```javascript
    const comit={
        data(){
            return{
                isShowing:false
            }
        },
        methods:{
            toggleShow(){
                this.isShowing=!this.isShowing;
            }
        }
    }

    const result = {
        data(){
            return{
                isShowing:false
            }
        },
        methods:{
            toggleShow(){
                this.isShowing=!this.isShowing;
            }
        }
    }
```
使用mixin进行修改
```javascript
    //mixin/toggle.js
    export const toggle = {
        data(){
            return{
                isShowing:false
            }
        },
        methods:{
            toggleShow(){
                this.isShowing=!this.isShowing;
            }
        }
    }

```

```javascript
    import {toggle} from './mixin/toggle'
    const comit={
        data(){
            return{
                isShowing:false
            }
        },
        mixins:[toggle]
        methods:{
            
        }
    }

    const result = {
        data(){
            return{
                
            }
        },
        mixins:[toggle]
        methods:{
            
        }
    }

```

