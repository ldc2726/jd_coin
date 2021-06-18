import axios from 'axios'

export const $post = (url,data)=>{
  return axios({
    url: url,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Content-Length': 40,
      'Host': 'ms.jr.jd.com',
      
    }
  })
}

export const $get = (url,params={})=>{
  return axios({
    url:url,
    params:params,
    headers: {
      referer: 'https://m.jdjygold.com/finance-gold/msjgold/homepage?orderSource=7',  //指定referer
      host: 'ms.jr.jd.com' //指定主机名
    },
  })
}

export const $getClient = (url,params={})=>{
  return axios({
    url:url,
    params:params
  })
}