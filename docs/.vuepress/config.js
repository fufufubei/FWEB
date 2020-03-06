const NavConfig =require( '../../navConfig');
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
        nav:NavConfig,
        sidebar:'auto',
        lastUpdated:'Last Updated'
    },
    displayAllHeaders:true,
    // sidebar: [
    //     {
    //          title:'',

    //     },

    // ],
    sidebar:"auto",
    plugins: [
        "vuepress-plugin-cat",
    ]
}