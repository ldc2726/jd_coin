var axios = require('axios')
const $get = (url,params={})=>{
return axios({
    url:url,
    params:params,
    headers: {
    referer: 'https://m.jdjygold.com/finance-gold/msjgold/homepage?orderSource=7',  //指定referer
    host: 'ms.jr.jd.com' //指定主机名
    },
})
}
module.exports = $get;