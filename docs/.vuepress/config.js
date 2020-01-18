module.exports={
    base:'/FWEB/',
    title:'FB',
    descripiton:'积累',
    host:'192.168.6.120',
    port:'1000',
    themeConfig:{
        logo:'/images/logo.jpg',
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
                        link:"/Basis/Plugin/html2canvas.md"
                    }
                ]
            },
           
        ],
        sidebar:'auto',
        // sidebar:{
        //     '/Frame/':['','/Vue','/React'],
        //     '/MiniProject/':['weixin','baidu'],
        //     '/Basis/':['JS','CSS'],
        //     '/':[
        //         '',
        //         'contact',
        //         'about'
        //     ]
        // },
        lastUpdated:'Last Updated'
    },
    plugins: [
        "vuepress-plugin-cat",
    ]
}