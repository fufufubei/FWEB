module.exports={
    title:'个人主页',
    descripiton:'',
    themeConfig:{
        repo:'https://github.com/fufufubei/FWEB',
        base:'/FWEB/',
        nav:[
            {
                text:'首页',link:'/'
            },
            {
                text:'子级',link:'/sec/one'
            }
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
        sidebar:[['/one','GoOne'],['/two','GoTwo'],['/sec/one','GoSec']],
    }
}