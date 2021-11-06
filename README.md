# vue3-deno-blog-system

## Abstract

心血来潮花大半个月写的博客系统(样式借鉴了几个著名的主题)，还有很多想弄的功能没弄。

Front:  vue3+naiveui+...

Back: deno+mysql+...

## Project build

```
1. npm run build
2. copy ./build/* -> ./server/public/
3. copy ./server/* -> your vps
4. config: docker-compose.yml
   service.blog.environment
5. docker-compose up -d(如果有报错，建议docker-compose up查看报错，修改后docker-compose up --build)
6. docker ps
   docker exec -it {mysql container id} /bin/bash
   mysql -uroot -p
   > use blog;
   > source /presetdb/blog.bd;
7. 访问http://[your-vps]:16666
```

## Preview

[demo](http://aurora20.nbsps.top:16666/)

### 首页

![](https://pic.imgdb.cn/item/6186b1452ab3f51d918ee420.jpg)

![](https://pic.imgdb.cn/item/6186b1692ab3f51d918f16a1.jpg)

### 时间线

![](https://pic.imgdb.cn/item/6186b17d2ab3f51d918f3192.jpg)

### 留言

![](https://pic.imgdb.cn/item/6186b1a62ab3f51d918f6726.jpg)

### 图片墙

![](https://pic.imgdb.cn/item/6186b3952ab3f51d91924a45.jpg)

### 友链

![](https://pic.imgdb.cn/item/6186b20b2ab3f51d918fff87.jpg)

### 关于

![](https://pic.imgdb.cn/item/6186b3bc2ab3f51d91927c3b.jpg)

### 登录

![](https://pic.imgdb.cn/item/6186b2462ab3f51d91905e8e.jpg)

### 博客详情

![](https://pic.imgdb.cn/item/6186b4112ab3f51d9192f24e.jpg)

### 后台

#### 基础信息

![](https://pic.imgdb.cn/item/6186b2c12ab3f51d9191098d.jpg)

#### 博客管理

![](https://pic.imgdb.cn/item/6186b2a02ab3f51d9190dda7.jpg)

#### 弹幕管理

![](https://pic.imgdb.cn/item/6186b2d92ab3f51d91912b7d.jpg)

#### 图片墙管理

![](https://pic.imgdb.cn/item/6186b2f72ab3f51d919156e5.jpg)

#### 友链管理

![](https://pic.imgdb.cn/item/6186b4482ab3f51d919339e1.jpg)

#### 编辑博客

![](https://pic.imgdb.cn/item/6186b3402ab3f51d9191ce0c.jpg)

### 移动端

![](https://pic.imgdb.cn/item/6186b4822ab3f51d9193870e.jpg)

![](https://pic.imgdb.cn/item/6186b4a92ab3f51d9193b740.jpg)

![](https://pic.imgdb.cn/item/6186b4c82ab3f51d9193e55d.jpg)

## TODO

  - [ ] seo优化？(slug?)

  - [ ] tsx/jsx重构？

  - [ ] nodejs/ssm后台？

  - [ ] 进一步封装优化？

...

Welcome to fork and pull request. 
