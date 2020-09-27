//自动生成目录
const path = require('path');
const fs = require('fs');
const ora = require('ora');

const chalk = require('chalk');
const spinner = ora(`${chalk.blue('抓取md文件中')}`);
const navList=[
    {name:'Basis',title:'基础'},
    {name:'Frame',title:'框架'},
    {name:'MiniProject',title:'小程序'},
    {name:'Study',title:'学习项'},
];
spinner.start();
let list=[{
    text:'首页',link:'/'
}];
navList.forEach((item)=>{
    let moduleRootPath= path.join(__dirname,'docs/',item.name);
    let data=getNavList(moduleRootPath);
    data=Object.assign({},data,{text:item.title});
    list.push(data)
})
function getNavList(dirpath, data = {},type) {
    if(fs.readdirSync(dirpath).length){
        data.items=[];
    }else{
        data={text:dirpath.split(path.sep).slice(-1)[0]}
    }
    let fileList = fs.readdirSync(dirpath).filter((file)=>{
        return fs.statSync(path.join(dirpath, file)).isDirectory()
    });
    fs.readdirSync(dirpath).forEach(($one)=>{
        if($one.indexOf('.md')!=-1){
            let itemsOne={
                text:$one.replace(/.md/ig,''),
                link:path.join(dirpath,$one).split(path.sep).join('/').split("docs")[1].replace(/README.md/ig,'').replace(/readme.md/ig,'')
            }
            data=Object.assign({},data,{text:dirpath.split(path.sep).slice(-1)[0]});    
            data.items.push(itemsOne)
        }
        if(fileList.length>0){
            if(fs.lstatSync(path.join(dirpath,$one)).isDirectory()){
                data.items.push(getNavList(path.join(dirpath,$one),{},1))
            }
        }
    })
    return data;
}

spinner.text = chalk.blue('md文件写入docs文件夹成功');
spinner.succeed();
module.exports={
    list
}