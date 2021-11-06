# vue3-deno-blog-system

## Abstract

心血来潮花大半个月写的博客系统(样式借鉴了几个著名的主题)，还有很多想弄的功能没弄。

Front: vue3+naiveui+...

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

![](./img/home.png)

![](./img/home1.png)

### 时间线

![](./img/timeline.png)

### 留言

![](./img/barrage.png)

### 图片墙

![](./img/photo.png)

### 友链

![](./img/links.png)

### 关于

![](./img/about.png)

### 登录

![](./img/login.png)

### 博客详情

![](./img/blog.png)

### 后台

#### 基础信息

![](./img/baseinfo.png)

#### 博客管理

![](./img/blogs.png)

#### 弹幕管理

![](./img/barrages.png)

#### 图片墙管理

![](./img/photos.png)

#### 友链管理

![](./img/cmslinks.png)

#### 编辑博客

![](./img/cmsblog.png)

### 移动端

![](./img/mobile1.png)

![](./img/mobile2.png)

![](./img/mobile3.png)

## TODO

- [ ] seo 优化？(slug?)

- [ ] tsx/jsx 重构？

- [ ] nodejs/ssm 后台？

- [ ] 进一步封装优化？

...

Welcome to fork and pull request.
