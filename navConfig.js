let fs = require('fs');
console.log('11111111',fs)

module.exports =[
    {
        text:'首页',link:'/'
    },
    {
        text:'框架',
        items:[
            {
                text:'VUE',
                link:'/Frame/Vue.md'
            },
            {
                text:'React',
                link:'/Frame/React.md'
            },
        ],
    },
    {
        text:'小程序',
        items:[
            {
                text:"微信小程序",
                link:'/MiniProject/weixin',
            },
            {
                text:"百度小程序",
                link:'/MiniProject/baidu'
            }
        ]
    },
    {
        text:'JS/CSS',
        items:[
            {
                text:"JS",
                link:"/Basis/JS/JS.md"
            },
            {
                text:"CSS",
                link:"/Basis/CSS/CSS.md"
            },
            {
                text:"Plugin",
                items:[
                    {
                        text:"html2canvas",
                        link:"/Basis/Plugin/html2canvas.md"
                    },
                    {
                        text:"vue-awesome-swiper",
                        link:"/Basis/Plugin/vueAwesomeSwiper.md"
                    },
                ]
            }
        ]
    },
    {
        text:'学习',
        items:[
            {text:'计划',link:'/Study/plne.md'},
            {text:'总结',link:'/Study/summary.md'},
            {text:'git',link:'/Study/git.md'},
        ]
    }
]
       
