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