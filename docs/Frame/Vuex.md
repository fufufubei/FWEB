### getters
相当于store内的computed，对store.data的属性进行计算，返回一个新的属性
```jabascript

state:{
    list:[1,2,3,4]
}
getters:{
    getNum:state=>{
        return state.list.filter(item => item>2)
    },
    getNumLength:(state,getters)=>{
        return getters.getNum.length
    }

}
store.getters.getNum //[3,4]
store.getters.getNumLength //2

```
#### mapGetters


### Mutation
mutation用于修改store内的状态
```javascript
state:{
    count:1
},
mutation:{
    increment(state){
        state.count++
    }
}
//调用
store.commit('increment')

```
Mutation必须是他同步函数

#### mapMutations

### Action
Action类似于mutation，不同在于：
- Action提交的是mutation，而不是直接变更状态
- Action可以包含任意异步操作

Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。当我们在之后介绍到 Modules 时，你就知道 context 对象为什么不是 store 实例本身了。

```javascript
state:{
    count:1
},
mutation:{
    increment(state){
        state.count++
    }
}，
action:{
    increment(context){
        context.commit('increment')
    },
    //或者
    increment ({ commit }) {
        commit('increment')
    }
    //异步
    incrementAsync({commit}){
        setTimeout(()=>{
            commit('increment')
        },1000)

    }
}
//调用
store.dispatch('increment')
```
#### mapActions