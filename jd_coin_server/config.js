let config = {
    url:'https://ms.jr.jd.com',
    max:360,
    min:345,
    maxPrice : 359.5,
    minPrice : 345,
    webhook1:'https://oapi.dingtalk.com/robot/send?access_token=cbc4533e181282fedc9c7ee74db78eb9f1bc8923d4be798eb3d50af046461f72',
    dingUser:[
        "18521786936", 
        // "18336570444"
    ],
    qywx:'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=bbb4e3c1-ece7-4792-a356-63fc8d2c343f',
    subscribeJJ:[//订阅的基金编号
        '161726',
        '011206',
        '004241',
        '004997'
    ]

}
module.exports = config;