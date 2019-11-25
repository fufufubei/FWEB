module.exports={
    base:'/FWEB/',
    title:'FB',
    descripiton:'积累',
    themeConfig:{
        logo:'./public/images/icon1.png',
        repo:'https://github.com/fufufubei/FWEB',
        base:'/FWEB/',
        nav:[
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
                text:'小技巧',link:'/sec/one'
            },
           
        ],
        // sidebar:{
        //     '/':[
        //         'one',
        //         'two'
        //     ],
        //     '/sec/':[
        //         'one'
        //     ]
        // },
        // sidebar:[['/one','GoOne'],['/two','GoTwo'],['/sec/one','GoSec']],
        sidebar:'auto',
        lastUpdated:'Last Updated'
    },
    plugins: [
        "vuepress-plugin-cat",
    ]
}