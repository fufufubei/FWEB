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
    let data=getCurPackage(moduleRootPath);
    data=Object.assign({},data,{text:item.title});
    list.push(data)
})
function getCurPackage(dirpath, data = {}) {
    let itemsOne=[];
    let fileList = fs.readdirSync(dirpath).filter((file)=>{
        return fs.statSync(path.join(dirpath, file)).isDirectory()
    });
    fs.readdirSync(dirpath).forEach(($one)=>{

        if($one.indexOf('.md')!=-1){
            itemsOne.push({
                text:$one.replace(/.md/ig,''),
                link:path.join(dirpath,$one).split(path.sep).join('/').split("docs")[1].replace(/README.md/ig,'').replace(/readme.md/ig,'')
            })
        }
    })
    if(itemsOne.length){
        data=Object.assign({},{text:'二级目录',items:itemsOne});
    }
    if(fileList.length==0){
        //应该是获取该文件下的所有md文件  如果还有文件夹，还需要再把非文件夹的问价push进去---待处理
        return data;
    }
    let items=[];

    //二级目录 
    fileList.forEach(($module)=>{
        let childFilePath=path.join(dirpath,'/',$module)
        let fileListChild=fs.readdirSync(childFilePath).filter((file)=>{
            return fs.statSync(path.join(childFilePath, file)).isDirectory()
        })
        let itemsTwo={
            text:$module,
            items:[]
        };
        fs.readdirSync(childFilePath).forEach(($two)=>{
            if($two.indexOf('.md')!=-1){
                itemsTwo.items.push({
                    text:$two.replace(/.md/ig,''),
                    link:path.join(childFilePath,$two).split(path.sep).join('/').split("docs")[1].replace(/README.md/ig,'').replace(/readme.md/ig,'')
                })
            }
        })
        // if(itemsTwo.length){
            items.push(itemsTwo);
            data = Object.assign({},data,{items})
        // }
        if(fileListChild.length==0){
            return data
        }
        fileListChild.forEach(($file)=>{//如果还有文件夹，还需要再把非文件夹的问价push进去---待处理
            items.push({
                text:file.replace(/.md/ig,''),
                link:path.join(childFilePath, $file).split(path.sep).join('/').split("docs")[1].replace(/README.md/ig,'').replace(/readme.md/ig,'')
            })
        })
    })
    data = Object.assign({},data,{items})
    return data
}

spinner.text = chalk.blue('md文件写入docs文件夹成功');
spinner.succeed();
module.exports={
    list
}