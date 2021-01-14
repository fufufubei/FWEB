# Taro使用遇见问题
## 事件绑定
```js

<View onClick={this.hand()}>带括号事件会直接调用执行</View>
<View onClick={this.hand}>事件内获取不到this</View>
<View onClick={this.hand.bind(this)}>通过绑定this</View>
<View onClick={this.hand.bind(this,'data')}>传参</View>
<View onClick={()=>{this.hand()}}></View>

hand(type){
    console.log(type)
}

```
## Input组件
`<Input/>` 组件标签写成了小写` <input/>`， 在ios端输入拼音时 value错乱多出好多字母。类似于输入 ‘jinshui(金水)’，输入框变成了‘jjinsshshu...’


## request formdata格式
[参考链接：](https://developers.weixin.qq.com/community/develop/article/doc/0000cc0e5bc5d093c6f8be17254c13)
请求不支持formData格式，如果需要使用formData格式可以手动拼接.
比如要传递单数是 name=张三；正常的传递方式是
```js
let query={name:'张三',age:20};
let formData = new FromData();
formData.append('name',query.name);
formData.append('age',query.age);
```
使用taro手动拼接：
```js
    let query={name:'张三',age:20};
    const boundary=`----FooBar${new Date().getTime()}`;
    let str='\r\n--'+boundary+
        '\r\nContent-Disposition: form-data; name=\"name\"'+
        '\r\n'+
        '\r\n'+query.name+
        '\r\n--'+boundary;

    Taro.request({
        url:'http://userweb.uupt.com/api/...',
        method:"POST",
        credentials:'include',
        dataType:'json',
        connection:'close',
        header:{
          "Accept":"application/json",
          "Content-Type":`multipart/form-data; boundary=${boundary}`
        },
        data:str,
        success:($res)=>{

        }
    })

```
封装
```js
    let query={name:'张三',age:20};
    const boundary=`----FooBar${new Date().getTime()}`;
    createFormData(query,boundary){
        let result = '';
        for(let i in query,){
            result+='\r\n--'+boundary+
            '\r\nContent-Disposition: form-data; name=\"'+i+'\"'+
            '\r\n'+
            '\r\n'+query[i];
        }
        if(result){
            result+= '\r\n--'+boundary;
        }
        return result;

    }
    Taro.request({
        url:'http://userweb.uupt.com/api/...',
        method:"POST",
        credentials:'include',
        dataType:'json',
        connection:'close',
        header:{
          "Accept":"application/json",
          "Content-Type":`multipart/form-data; boundary=${boundary}`
        },
        data:createFormData(query,boundary),
        success:($res)=>{

        }
    })  


```
## 

<div class='card'>
    <div class='box' v-for='i in arr'  @click='hand(i)'>{{i}}</div>
</div>

<script>
export default{
    data(){
        return{
            arr:['aaa','bbb']
        }
    },
    methods:{
        hand(item){
            alert(item)
        }
    }
}
</script>
<style >
.card{
    background:#b8d8f9;
}
.box{
    font-size:18px;
    line-height:36px;
    border-bottom:1px solid #fff;
    padding:20px;
}
.box:last-child{
    border:none;
}
</style>