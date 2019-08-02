
// vue.config.js 配置说明
//官方vue.config.js 参考文档 https://cli.vuejs.org/config/#global-cli-config
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
    port: 8080, // 端口号
    disableHostCheck: true,
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器
    proxy:'https://ms.jr.jd.com'
  }
}