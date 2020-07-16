## ios文字两端对齐兼容
在ios，两端对齐无效
```css
p{
    text-align:justify;
}
```
兼容写法：
```css
p {                 
     height: 32/@rem;                   
     text-align: justify;
     &:after {
         display: inline-block;
         width: 100%;
         content: '';
     }
}
```

## iphone 6plue 在微信打开网页，overflow:scroll; 页面卡住不能滚动。
给overflow:scroll内的添加一个 height：101%的子元素；
<!-- ![示例图片](/FWEB/images/css1.png) -->