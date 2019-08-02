import axios from 'axios'
export const $post = (url,data)=>{
  return axios({
    url: url,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Content-Length': 40
    }
  })
}

export const $get = (url,params={})=>{
  return axios({
    url:url,
    params:params,
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      // 'Content-Length': 65
    }
  })
}