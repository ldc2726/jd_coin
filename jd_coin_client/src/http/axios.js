
import axios from 'axios';
axios.defaults.baseURL = process.env.publicPath;//
/**
 * 请求拦截操作
 */
axios.interceptors.request.use(config =>{
    return config
},error => {
    return Promise.reject(error)
})
/**
 * 响应拦截操作
 */
axios.interceptors.response.use(response => {
    switch(response.data.code){
        case 410:

            break
        case 413:

            break
        case 411:

            break
    }
    return response.data
},error => {
    return Promise.reject(error)
})

