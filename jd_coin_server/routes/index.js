var express = require('express');
var router = express.Router();
var config = require('./../config')
var $get = require('./../http/axios')
var schedule = require('node-schedule');
const ChatBot = require('dingtalk-robot-sender');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function scheduleCronstyle(){//定时任务，每天9点，清空最大最小金额提醒
  schedule.scheduleJob('0 0 9 * * *', function(){
    config.maxPrice = config.max
    config.minPrice = config.min
  }); 
}

scheduleCronstyle();

function times(){//定时任务，检查是否提醒
    var url = `${config.url}/gw/generic/hj/h5/m/latestPrice` //接口地址
    $get(url,{ reqData: {} }).then((response) => {
        let price = response.data.resultData.datas.price;
        console.log(price)
        let url ='http://193.112.104.226:3000'
        let DingHtml = `黄金实时价格${price}元/g,已经达到你设置的提醒价格，赶紧去看看吧！\n访问地址：${url}`
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
        }
        if(price -config.maxPrice>0.5){
            config.maxPrice = price;
        }else if(config.minPrice-price > 0.5){
            config.minPrice = price
        }
        clearTimeout(time);
        time = null;
        if(time == null){
            time = setTimeout(times,3000)
        }
    }).catch((e) => {
        console.log(e)
    })
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
module.exports = router;
