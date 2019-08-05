// var express = require('express');
// var apiRoutes = express.Router();
// var $get = require('http')
import {$get} from './http.js'
let configUrl = 'https://ms.jr.jd.com'
// export const getLastCoin=(params) =>{//实时数据
//     let url ='/gw/generic/hj/h5/m/latestPrice';
//     return $get(url,params)
// }

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


module.exports= {
    getToday,
    getLastCoin,
    getHisCoin,
    getNews,
    getReview,
    getpageId
}
    
