# `mini-cli`

> TODO: description

## tips

- simple-git才是git下载代码的仓库
  - simple-get是封装的http
  - vue cli里使用的好像不是 simple-git，后续再研究下他们的
  - 目前下载仓库时，没有loading，不友好，也没有一些其他提示，TODO

- [x] 通过 `.npmrc` 配置仓库的rigistry源
- [x] simple-git 已经正常下载
- [ ] 添加下载 loading 以及其他提示
  - [x] 用户初始化时，肯定是在某个空文件下，因此根目录在次，CWD是指在执行Node.js脚本时，当前脚本所处的目录路径，比如在 ~ 家目录执行，则就是家目录
  - [x] 当下载失败时，创建的文件夹有的还会自动删除
  - [x] 创建之前，先判断文件夹是否存在，如果存在提示用户如何操作
    - [x] 通过 `fs.readdirSync(path)` 判断文件夹里是否有文件，以及 `fs.statSync(path).isDirectory()` 是否为文件夹
    - [ ] fs 模块常见的用法
    - [ ] 如果已经存在，需要再提示用户如何操作
  - [x] 下载时，显示的进度条样式和文案可以自定义，很多库都是相互关联的，比如 `progress-estimator` 里的 spinner 使用的是 `cli-spinners`
    - [x] 还可以使用各种emoji
    - [ ] loading 的大概原理梳理

- [ ] 观察其他cli库里如何使用 git下载工具的
## Usage

```
const miniCli = require('mini-cli');

// TODO: DEMONSTRATE API
```
