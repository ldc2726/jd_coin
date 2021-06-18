var express = require('express');
var router = express.Router();
var config = require('./../config')
var $get = require('./../http/axios')
var $post = require('./../http/post')
var schedule = require('node-schedule');
const getJJCoin = require('./jijin')
const ChatBot = require('dingtalk-robot-sender');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function scheduleCronstyle(){//定时任务，每天9点，清空最大最小金额提醒
    try {
        schedule.scheduleJob('0 0 9 * * *', function(){
            config.maxPrice = config.max
            config.minPrice = config.min
        }); 
        schedule.scheduleJob('0 50 14 * * *', function(){
            getJJCoin()
        }); 
        
    } catch (error) {
        console.log(error)
    }
  
}

scheduleCronstyle();

function times(){//定时任务，检查是否提醒
    if(!time){
        time = setTimeout(times,3000)
    }
    try {
        var url = `${config.url}/gw/generic/hj/h5/m/latestPrice` //接口地址
        $get(url,{ reqData: {} }).then((response) => {
            if(!response){
                return;
            }
            if(!response.data){
                return;
            }
            if(!response.data.resultData){
                return;
            }
            if(!response.data.resultData.datas){
                return;
            }
            let price = response.data.resultData.datas.price;
            console.log(price)
            let url ='http://192.168.13.238:5000'
            let DingHtml = `黄金实时价格${price}元/g,已经达到你设置的提醒价格，赶紧去看看吧！\n访问地址：${url}`
            if(price -config.maxPrice>0.5||config.minPrice-price > 0.5){
                //钉钉
                // const robot = new ChatBot({
                //     webhook: config.webhook1
                //   });
                //   // // 组合 baseUrl 和 acceessToekn
                //   let content = DingHtml;
                //   let at = {
                //     "atMobiles":config.dingUser , 
                //     "isAtAll": false
                //   };
                //   // 快速发送文本消息
                //   robot.text(content, at);
                //企业微信
                let datas ={
                    "msgtype": "markdown",
                    "markdown": {
                        "content": `黄金实时价格<font color=\"warning\">${price}元/g</font>,已经达到你设置的提醒价格，赶紧去看看吧！\n访问地址：[点击查看](${url})`
                    },
                };
                $post(`${config.qywx}`,datas).then((response) => {
                    // res.json(response.data)
                }).catch((e) => {
                    console.log(e)
                })
    
    
            }
            if(price -config.maxPrice>0.5){
                config.maxPrice = price;
            }else if(config.minPrice-price > 0.5){
                config.minPrice = price
            }
            clearTimeout(time);
            time = null;
            if(!time){
                time = setTimeout(times,3000)
            }
        }).catch((e) => {
            console.log(e)
        })
    } catch (error) {
        console.log(error)
    }
    
}
var time = setTimeout(times,3000)
router.get('/getToday', function(req, res){//当天数据
    var url = `${config.url}/gw/generic/hj/h5/m/todayPrices` //接口地址
    $get(url,req.query).then((response) => {
        res.json(response.data)
    }).catch((e) => {
        console.log(e)
    })
});

router.get('/getLastCoin', function(req, res){//实时数据
    var url = `${config.url}/gw/generic/hj/h5/m/latestPrice` //接口地址
    $get(url,req.query).then((response) => {
        res.json(response.data)
    }).catch((e) => {
        console.log(e)
    })
});
router.get('/getHisCoin', function(req, res){//历史数据
    var url = `${config.url}/gw/generic/hj/h5/m/historyPrices` //接口地址
    $get(url,req.query).then((response) => {
        res.json(response.data)
    }).catch((e) => {
        console.log(e)
    })
});
router.get('/getNews', function(req, res){//新闻
    var url = `${config.url}/gw/generic/jimu/h5/m/recommendArticle` //接口地址
    $get(url,req.query).then((response) => {
        res.json(response.data)
    }).catch((e) => {
        console.log(e)
    })
});
router.get('/getReview', function(req, res){//评论
    var url = `${config.url}/gw/generic/jimu/h5/m/listComment` //接口地址
    $get(url,req.query).then((response) => {
        res.json(response.data)
    }).catch((e) => {
        console.log(e)
    })
});

router.get('/getpageId', function(req, res){//获取活动，banner，推荐页面，猜测动态的pageId
    var url = `${config.url}/gw/generic/hj/h5/m/getWaterfallsFlowForH5` //接口地址
    let params={reqData:{"pageRequest":{"pageId":145}}}
    $get(url,params).then((response) => {
        res.json(response.data)
    }).catch((e) => {
        console.log(e)
    })
});
router.get('/setDingPrice', function(req, res){//设置提醒的最大最小值
  config.maxPrice = req.query.max
  config.max =req.query.max
  config.minPrice =req.query.min
  config.min =req.query.min
  res.json('ok')
});

router.get('/qywx', function(req, res){//获取活动，banner，推荐页面，猜测动态的pageId
    let data ={
        "msgtype": "text",
        "text": {
            "content": "笑什么笑",
            'mentioned_list':['@陈倩']
        }
   }
    $post(`${config.qywx}`,data).then((response) => {
        res.json(response.data)
    }).catch((e) => {
        console.log(e)
    })
});
module.exports = router;
