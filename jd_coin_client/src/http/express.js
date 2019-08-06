
import {$get} from './http.js'
const ChatBot = require('dingtalk-robot-sender');
let configUrl = 'https://ms.jr.jd.com'
let config = {
    maxPrice : 337,
    minPrice : 315,
    webhook1:'https://oapi.dingtalk.com/robot/send?access_token=cbc4533e181282fedc9c7ee74db78eb9f1bc8923d4be798eb3d50af046461f72',
    dingUser:[
        "18521786936", 
        "18336570444"
    ]

}
const getToday=(apiRoutes)=>{//当天数据
    return apiRoutes.get('/getToday', function (req, res) {
        var url = `${configUrl}/gw/generic/hj/h5/m/todayPrices` //接口地址
        $get(url,req.query).then((response) => {
            res.json(response.data)
        }).catch((e) => {
            console.log(e)
        })
    })
}

const getLastCoin=(apiRoutes) =>{//实时数据
    return apiRoutes.get('/getLastCoin', function (req, res) {
        var url = `${configUrl}/gw/generic/hj/h5/m/latestPrice` //接口地址
        $get(url,req.query).then((response) => {
            let price = response.data.resultData.datas.price;
            let DingHtml = `黄金实时价格${price}元/g,已经达到你设置的提醒价格，赶紧去看看吧！`
            if(price -config.maxPrice>0.5||config.minPrice-price > 0.5){
                const robot = new ChatBot({
                    webhook: config.webhook1
                  });
                  // // 组合 baseUrl 和 acceessToekn
                  let content = DingHtml;
                  let at = {
                    "atMobiles":config.dingUser , 
                    "isAtAll": false
                  };
                  // 快速发送文本消息
                  robot.text(content, at);
                  res.json('ok')
            }
            if(price -config.maxPrice>0.5){
                config.maxPrice = price;
            }else if(config.minPrice-price > 0.5){
                config.minPrice = price
            }
            
            res.json(response.data)
        }).catch((e) => {
            console.log(e)
        })
    })
}
const getHisCoin=(apiRoutes) =>{//历史数据
    return apiRoutes.get('/getHisCoin', function (req, res) {
        var url = `${configUrl}/gw/generic/hj/h5/m/historyPrices` //接口地址
        $get(url,req.query).then((response) => {
            res.json(response.data)
        }).catch((e) => {
            console.log(e)
        })
    })
}
const getNews=(apiRoutes) =>{//新闻
    return apiRoutes.get('/getNews', function (req, res) {
        var url = `${configUrl}/gw/generic/jimu/h5/m/recommendArticle` //接口地址
        $get(url,req.query).then((response) => {
            res.json(response.data)
        }).catch((e) => {
            console.log(e)
        })
    })
}

const getReview=(apiRoutes) =>{//评论
    return apiRoutes.get('/getReview', function (req, res) {
        console.log(req.query,req.url,'请求的params')
        var url = `${configUrl}/gw/generic/jimu/h5/m/listComment` //接口地址
        console.log(url)
        $get(url,req.query).then((response) => {
            res.json(response.data)
        }).catch((e) => {
            console.log(e)
        })
    })
}

const getpageId=(apiRoutes) =>{//获取活动，banner，推荐页面，猜测动态的pageId
    return apiRoutes.get('/getpageId', function (req, res) {
        var url = `${configUrl}/gw/generic/hj/h5/m/getWaterfallsFlowForH5` //接口地址
        let params={reqData:{"pageRequest":{"pageId":145}}}
        $get(url,params).then((response) => {
            res.json(response.data)
        }).catch((e) => {
            console.log(e)
        })
    })
}
const DingDing=(apiRoutes)=>{//钉钉设置提醒金额
    return apiRoutes.get('/dingding', function (req, res) {
        // 直接使用 webhook
        config.maxPrice = req.query.price;
        config.minPrice = req.query.price;
        res.json('ok');
    })
}


module.exports= {
    getToday,
    getLastCoin,
    getHisCoin,
    getNews,
    getReview,
    getpageId,
    DingDing
}
    
