
require('babel-register')({
  presets: ['env']
});
var express = require('express')
var axios = require('axios')
var app = express()
var apiRoutes = express.Router();
var apiList = require('./src/http/express.js')



module.exports = {
  baseUrl: process.env.NODE_ENV === "production" ? "./" : "/",
  // funDebug:process.env.NODE_ENV === "production" ?"development":"production",
  outputDir: "dist",
  assetsDir: "assets",
  filenameHashing: true,
  lintOnSave: true,
  productionSourceMap: false,
 css:{
  // modules:false,
  // extract:true,
  sourceMap:false,
},
// transpileDependencies: ['*'],
  devServer: {
    before(apiRoutes){
      
      for(let item in apiList){
        apiList[item](apiRoutes)
      }
      app.use('/api', apiRoutes);
    },
    port: 8080, // 端口号
    disableHostCheck: true,
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器
    // proxy:'https://ms.jr.jd.com'
  }
}