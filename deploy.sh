#自动部署脚本

#构建
npm run build

#导航栏构建输出目录
cd docs/.vuepress/dist

git init

git add -A

git commit -m 'deploy'

git push -f git@github.com:fufufubei/FWEB.git master:gh-pages