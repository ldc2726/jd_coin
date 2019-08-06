import './axios'
import {$getClient} from './http.js'


export const getHisCoin = (params) =>{//历史数据
  let url = '/getHisCoin';
  return $getClient(url,params)
}

export const getLastCoin=(params) =>{//实时数据
  let url ='/getLastCoin';
  return $getClient(url,params)
 
}

export const getToday=(params)=>{//当天数据
  let url = '/getToday';
  params = {reqData:{}};
  return $getClient(url,params)
}

export const getNews=(params)=>{//新闻
  let url = '/getNews';
  return $getClient(url,params)
}

export const getReview=(params)=>{//评论
  let url = '/getReview';
  return $getClient(url,params)
}

export const getpageId=(params={})=>{//获取活动，banner，推荐页面，猜测动态的pageId
  let url = '/getpageId';
  return $getClient(url,params)
}
export const DingDing=(params={})=>{//dingding设置提醒金额
  let url = '/dingding';
  return $getClient(url,params)
}

export default {
  getHisCoin,
  getLastCoin,
  getNews,
  getReview,
  getToday,
  getpageId,
  DingDing
}

