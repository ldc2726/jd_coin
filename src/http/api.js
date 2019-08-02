import './axios'
import {$get,$post} from './http.js'


export const getHisCoin = (params) =>{//历史数据
  let url = '/gw/generic/hj/h5/m/historyPrices';
  return $get(url,params)
}

export const getLastCoin=(params) =>{//实时数据
  let url ='/gw/generic/hj/h5/m/latestPrice';
  return $get(url,params)
 
}

export const getToday=(params)=>{//当天数据
  let url = '/gw/generic/hj/h5/m/todayPrices';
  params = {reqData:{}};
  return $get(url,params)
}

export const getNews=(params)=>{//新闻
  let url = '/gw/generic/jimu/h5/m/recommendArticle';
  return $get(url,params)
}

export const getReview=(params)=>{//评论
  let url = '/gw/generic/jimu/h5/m/listComment';
  return $get(url,params)
}

export const getpageId=(params)=>{//获取活动，banner，推荐页面，猜测动态的pageId
  let url = '/gw/generic/hj/h5/m/getWaterfallsFlowForH5';
  params={reqData:{"pageRequest":{"pageId":145}}}
  return $get(url,params)
}

export default {
  getHisCoin,
  getLastCoin,
  getNews,
  getReview,
  getToday,
  getpageId
}

