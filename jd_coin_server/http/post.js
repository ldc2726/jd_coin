var axios = require('axios')
const $post = (url,data={})=>{
    return axios({
        url:url,
        method:'post',
        data:data
    })
}
module.exports = $post;