# learn

### 这是一个Vue,node,mongodb打造的代理商城项目

>前端技术栈 vue vue-router vuex axios elmeent-ui echart mavon-editor

>后端技术栈 express mongoose express-promise-router

>功能：登录、注册、商品列表、商品详情、新闻列表、新闻详情、帮助文档、用户发货、数据统计，以及对商品、新闻、文档、整站设置的增删查改等操作

> 2018-4-25 新增完成管理员权限的功能

[线上体验地址](http://193.112.196.222:8088)

### 部分页面阅览

首页

![image](https://github.com/lyttonlee/pic/blob/master/1.png?raw=true)

![index.gif](https://github.com/lyttonlee/pic/blob/master/index.gif?raw=true)

## 使用
#### 本项目使用前后端分离
1、 在本地安装mongodb,并启动

2、 clone 服务端代码到本地

[服务端server](https://github.com/lyttonlee/express-server-for-learn.git)

``` bash
# clone server
git clone https://github.com/lyttonlee/express-server-for-learn.git

# install
npm i

# start
npm start
```
3、 clone 前端代码到本地

``` bash
# clone clent
git clone https://github.com/lyttonlee/learn.git

# install
npm i

# start
npm start
# 或者
npm run dev

# build
npm run build
```

4、 注意

> 如果要打包后测试，请将api中的 api.js 以及 adminapi.js 中的


```
let base = '/learn'
改为
let base = ''
```
5、 如何进入后台管理

> 因为没有在页面上显示后台管理员登录的地址，所以需要你自己输入地址
/adminlogin ------> 管理员登录地址
/admin -----> 如果没有管理员登录会重定向到管理员登录页面
/addadminer  ------> 你可以自己创建一个管理员账号,然后登录




For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
