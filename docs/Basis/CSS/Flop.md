
## 翻转卡片兼容
本来是正常的翻转功能，过了一段时间释然发现线上的翻转出了问题，经过调试发现：反转后要隐藏的那一面没有隐藏掉，hidden失效了。
```css
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
```
完整代码如下：
```html
<div class="f-cards-item" v-for="item in 3" :key="item" >
    <div class="f-in"></div>
    <img class="f-out" :src="imgSrc" alt="">
</div>
```
```css
    .f-cards-item{
        height: 100%;
        width: 160px;
        border-radius: 8px;
        perspective: 1000;

        -webkit-perspective: 1000px;
        position: relative;
        transition: all 0.5s linear;
        -webkit-transition: all 0.5s linear;
        transform-style: preserve-3d;
        -webkit-transform-style: preserve-3d; 
        transform-origin: 50% 50%;
        -webkit-transform-origin: 50% 50%;

        img{
          position: absolute;
          left: 0;
          top: 0;
        }

        .f-out{
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        
          transform: rotateY(0deg);
          -webkit-transform: rotateY(0deg);
        }
        .f-in{
          width: 100%;
          height: 100%;
          transform: rotateY(180deg);
          -webkit-transform: rotateY(180deg);
          background: url('../assets/img/card_in.png') no-repeat;
          background-size: 100% 100%;
          overflow: hidden;
        }
    }

    /* 翻转后样式 */
    .f-cards-item.turnover{
        transform: rotateY(180deg);
        -webkit-transform: rotateY(180deg);
    }

```
修改后新加代码
```css
    .f-out{
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        /* 新增 */
        -webkit-transform-style: preserve-3d; 
        transform-style: preserve-3d;

        transform: rotateY(0deg);
        -webkit-transform: rotateY(0deg);
    }
```


