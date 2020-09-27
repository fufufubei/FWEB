// const NavConfig =require( '../../navConfig');
const {list} = require('../../dir')
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
        nav:list,
        sidebar:'auto',
        lastUpdated:'Last Updated'
    },
    displayAllHeaders:true,
    // sidebar: "auto",
    sidebar:"auto",
    plugins: [
        "vuepress-plugin-cat",
    ]
}