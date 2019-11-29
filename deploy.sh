#自动部署脚本
set -e
#构建
yarn build

#导航栏构建输出目录
cd docs/.vuepress/dist

git init

git add -A

git commit -m 'deploy'

# git push -f git@github.com:fufufubei/FWEB.git master:gh-pages
git push -f https://${access_token}@github.com:fufufubei/FWEB.git master:gh-pages
cd -