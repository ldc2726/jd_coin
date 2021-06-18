
//http://fund.10jqka.com.cn/data/client/myfund/161726
//https://gz-fund.10jqka.com.cn/?module=api&controller=index&action=chart&info=vm_fd_JSG267&start=0930&_=1623997633309c
var config = require('./../config')
var $post = require('./../http/post')
var $get = require('./../http/JJGET')
function getJJCoin(){
    try {
        config.subscribeJJ.map(item=>{
            $get(`http://fund.10jqka.com.cn/data/client/myfund/${item}`).then((response) => {
                console.log(response.data.data[0].hqcode)
                const hqCode = response.data.data[0].hqcode
                const hqname = response.data.data[0].name
                $get(`https://gz-fund.10jqka.com.cn/?module=api&controller=index&action=chart&info=vm_fd_${hqCode}&start=0930&_=${new Date().getTime}`).then(res=>{
                    let data = res.data.split(';')
                    data = data[data.length-1].split(',')
                    let datas ={
                        "msgtype": "markdown",
                        "markdown": {
                            "content": `基金名称：${hqname} \n数据更新时间：${data[0].slice(0,2)+":"+data[0].slice(2)} \n开盘价：<font color=\"warning\">${data[2]}元</font> \n实时报价：<font color=\"warning\">${data[1]}元</font> \n估算净值：${((data[1]-data[2])/data[2]*100).toFixed(2)}%`
                        }
                    };
                    $post(`${config.qywx}`,datas).then((response) => {
                        // res.json(response.data)
                    }).catch((e) => {
                        console.log(e)
                    })
                })
            })
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports = getJJCoin;
