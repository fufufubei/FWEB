# 常用命令


## 回滚
### 中断合并
合并的时候，出现冲突，但是没有解决冲突，没有进行提交时，放弃合并
```
    git merge --abort
```
![示例图片](/FWEB/images/study/git00.png)

### 撤销合并
如果已经合并了代码，但是合并完成发现这是一个错误的合并；
        C6与C4进行合并后

![示例图片](/FWEB/images/study/git01.png)

#### 方案1：

```
    git reset --hard HEAD
    # 或者使用更精准的指定回滚到某一次的commit上面
    git reset --hard commit_id
```
使用命令查看当前的提交状态：
```
    git log --graph --oneline
```

![示例图片](/FWEB/images/study/git02.png)

执行git reset --hard 3144260之后。可以看到master已经回退了

![示例图片](/FWEB/images/study/git03.png)
![示例图片](/FWEB/images/study/git04.png)

#### 方案2：

git reset命令是使HEAD节点指向曾经提交的一个节点上，但是有时候想要保留每一个操作，我们可以使用git revert命令，它会创建新的提交，并撤销合并的内容。
```
    git revert -m 1 HEAD
```
![示例图片](/FWEB/images/study/git05.png)
![示例图片](/FWEB/images/study/git06.png)
### 最后
这里主要就是说合并出错的时候怎么办。
还没commit：git merge --abort ，丢弃正在进行的合并
已经commit：

- git revert -m 1 HEAD 新建一个commit，并且回到合并之前的状态
- git reset --hard commit_id 回退到指定的commit节点
