var axios = require('axios')
const $get = (url,params={})=>{
return axios({
    url:url,
    params:params,
    headers: {
    },
})
}
module.exports = $get;