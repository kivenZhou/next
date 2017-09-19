# 基于next.js的react集成方案


## 实现上拉加载下拉刷新功能，个人感觉antd-mobile上面的这一块在移动端用处还是挺多的，所以抽时间写个dome存起来

下载项目到本地:

```bash
$ git clone https://github.com/kivenZhou/next.git
```

切换到目录并运行:

```bash
$ npm install
$ npm run dev
```

## 目录结构

```bash
--header
  --consumeHead.js (单个工程的公共头部   注：可以用来加载不同工程的样式)
  

--components
  --consume (单个工程的组件存放文件夹，这里consume代表一个工程名)
  
  
--pages
  --consume (工程路由文件夹，如果同时进行两个工程，可以另外创建一个不同的文件夹)
  --_document.js  
  --index.js  （这里可以作为每个工程的入口，方便快速进入不同工程）
  
  
--server  (这里是发送请求的文件夹，相当于angular里面的server层)
  --api.js  (这里是配置接口信息的地方)
  --cFetch.js （这里是封装的fetch方法）
  --index.js  （参数等请求都在这里面写）
  
  
--static  (静态文件夹)


--tool  （所有工程通用的方法，例如获取cookie，时间转换等）

```
