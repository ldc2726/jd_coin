# jd_coin
此项目抓取的京东金融的黄金数据，方便实时观看大盘数据，以及简单的黄金金额计算。

#简单介绍
此项目共计分为客户端和服务端两部分，客户端可直接运行无需借助server端代码.
但是在build打包之后，就需要后端server的代码,由于最近jd后台数据跟新，加上了referer限制，简单的代理不能满足我们的需求，所以要通过数据转接的方式获取数据.
前端代码采用了vue-cli3的脚手架构建，后端则是基于nodejs的express框架.
