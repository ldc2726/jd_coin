<template>
  <div class="home">
    <!-- aside -->
    <aside>
      <div class="aside_top"></div>
      <div class="aside_right"></div>
      <div class="aside_from">
        <div v-for="item in 4" :key="item" :class="'aside_bg_small'+item"></div>
        <div class="aside_title">黄金计算工具</div>
        <div class="aside_input">
          <div>持仓(选填):</div>
          <input type="text" v-model="input1" placeholder="已经持仓的克数">
        </div>
        <div class="aside_input">
          <div>已购金额(选填):</div>
          <input type="text" v-model="input2" placeholder="已经购买的总金额">
        </div>
        <div class="aside_input">
          <div>计划买入:</div>
          <input type="text" v-model="input3" placeholder="计划买入金额">
        </div>
        <div class="btn"><a href="javascript:;"  @click="submit">submit</a></div>
      </div>

      <div class="result">
        <div class="result_head">计算结果分析</div>
        <div class="result_content">
          <div v-html="htmls"></div>
        </div>
      </div>
    </aside>
    <!-- section -->
    <section>
      <div class="header">
        <div class="head"></div>
      </div>
      <!-- echarts -->
      <div class="echart">
        <div class="echarts_photo1"></div>
        <div class="echarts_photo2"></div>
        <div class="echarts_photo3"></div>
        <div class="echarts_photo4"></div>
        <div class="exponent">
          <div class="prices" v-if="selectT==='s'">实时金价：<span>{{price}}</span></div>
          <div class="prices" v-else-if="selectT==='w'">近一周：<span>{{range}}</span></div>
          <div class="prices" v-else-if="selectT==='m'">近一月：<span>{{range}}</span></div>
          <div class="prices" v-else-if="selectT==='q'">近三月：<span>{{range}}</span></div>
          <div class="prices" v-else>近一年：<span>{{range}}</span></div>
          <!-- <div>
            <span class="exponent_one"></span>
            <span class="exponent_two"></span>
            <span class="iconfont"></span>
          </div> -->
          
        </div>
        <div id="main"></div>
        <div class="tab_time" >
            <span :class="selectT=='s'?'active_time':''"  @click="selectime('s')">实时</span>
            <span :class="selectT=='w'?'active_time':''" @click="selectime('w')">1周</span>
            <span :class="selectT=='m'?'active_time':''"  @click="selectime('m')">1月</span>
            <span :class="selectT=='q'?'active_time':''"  @click="selectime('q')">3个月</span>
            <span :class="selectT=='y'?'active_time':''"  @click="selectime('y')" style="border: none;">1年</span>
          </div>
      </div>
      <!-- news -->
      <div class="news">
        <div class="news_bg1"></div>
        <div class="news_bg2"></div>
        <swiper :options="swiperOption" ref="mySwiper"  v-if='getReviewList && getReviewList.length > 0' @someSwiperEvent="callback">
          <swiper-slide v-for="(item,i) in getReviewList" :key="i">
            <div class="user_list">
              <div class="userInfo">
                <img :src="item.pic==undefined?imgUrl:item.pic"/>
                <div class="user">
                  <div class="userName">{{item.name}}</div>
                   <time>{{item.datetimeStr}}</time>
                </div>
              </div>
              <div class="review">{{item.context}}</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import echarts from "echarts";
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {todayArray} from '@/until/methods'
export default {
  name: "home",
  data() {
    return {
      a: '',
      b: '',
      selectT:'s',
      setTimeName:null,
      price:'',//价格
      range:'',//涨跌幅
      imgUrl:require("../assets/img/wap_menu_avatar.png"),
      getReviewList:[],
      swiperOption: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
        loop: true,
        autoplay: {delay:4000},
        direction : 'vertical',
        observer:true,
        observeParents:true,
        slidesPerView: 4,
        centeredSlides : true,
        // loopedSlides: 20,
      },
      input1:'',
      input2:'',
      input3:'',
      htmls:''
    };
  },
  beforeMount() {},
  mounted() {
    // this.swiper.slideTo(3, 1000, true)
    // this.sTimeData();
    // this.IntervalData();
    //https://ms.jr.jd.com/gw/generic/hj/h5/m/getWaterfallsFlowForH5?reqData={"pageRequest":{"pageId":145}}
    this.initContext();
    this.initStime();
  },
  methods: {
    async money(g,m,buy){//g持有克，m共计买入金额，buy打算买进
         g = Number(g);
         m = Number(m);
         buy = Number(buy);
        let a = await this.$api.getLastCoin({ reqData: {} });
        console.log(a,'--------------')
        let price = a.resultData.datas.price;//实时价格
        let oldM = g*price;//最新资产，未投入
        let newG = Math.floor(buy/price*10000)/10000//新加仓黄金g
        let count = Math.floor((oldM+buy)*100)/100//实时总资产（包含新加仓）
        let netIncome = Math.floor((count-count*0.003)*100)/100//预计总计纯收入
        console.log(m+buy,netIncome,m+buy-netIncome,netIncome-(m+buy),Math.floor((netIncome-(m+buy))*100)/100)
        let num = Math.floor((netIncome-Number(m+buy))*100)/100//累计盈利或者亏损
        
         let weekData = await this.$api.getHisCoin({ reqData: { period: 'w' } });
         let weekDatas = weekData.resultData.datas;
         let weekNum=0;
          weekDatas.map((item, i) => {
            weekNum =weekNum +Number(item.price)
            // a.push(item.price);
          });
          // console.log(weekNum,weekDatas.length,weekNum/weekDatas.length,'------++++++------')
        let weekAver = Math.floor(weekNum/weekDatas.length*100)/100;
        // function abs(n,old){
        //   if(n < old&&n<=weekAver){
        //     return  `<div>建议：<strong>加仓</strong></div>`
        //   }else if(n >old){
        //     return  `<div>建议：<strong>减仓，清仓</strong></div>`
        //   }else{
        //     return `<div>建议：<strong>继续观望</strong></div>`
        //   }
        // }
        let html = `
          <div class='res_con'>
            <div>共计持有：<strong>${g+newG}</strong> g</div>
            <div>实时总资产：<strong>${count}</strong> 元</div>
            <div>一周均价：<strong>${weekAver}</strong> 元/g</div>
            <div>此时卖出总收入：<strong>${netIncome}</strong> 元</div>
            <div>此时卖出盈利或者亏损：<strong>${num}</strong> 元</div>
            <div>现在买入开始盈利点：<strong>${Math.floor(price/0.997*100)/100}</strong> 元/g</div>
          </div>
        `
        this.htmls = html
    },
    submit(){
      this.money(this.input1,this.input2,this.input3)
    },
    callback(a){
      console.log(a,'++')
    },
    async initContext(){//实时评论
      let res = await this.$api.getpageId();
      var rep = /[1-9][0-9]*/g;
      let pageId = '82732'
      if(res.resultCode==0){
        console.log(res.resultData.datas,'+++')
        let a,b,c;
        let datas = res.resultData.datas
        if(datas.elementHotList!=undefined&&datas.elementHotList.length!=0){
          console.log(a,b,c,'aaaaa')
          a=datas.elementHotList[0].jumpData.jumpUrl
        }
        if(datas.elementTopList!=undefined&&datas.elementTopList.length!=0){
          console.log(a,b,c,'ppppppp')
          b = datas.elementTopList[0].jumpData.jumpUrl
        }
        if(datas.elementSocialList!=undefined&&datas.elementSocialList.length!=0){
          console.log(a,b,c,'xxxxx')
          c = datas.elementSocialList[0].jumpData.jumpUrl
        }
        console.log(a,b,c,'ooooooooo')
        pageId = Math.max(a.match(rep)[0],b.match(rep)[0],c.match(rep)[0])
        console.log(pageId,'--+++')
        this.$api.getReview({reqData:{"pageId":pageId,"lastId":"0"}}).then(resd=>{//82685 82732
          let arr = resd.resultData.normalComments;
          console.log(arr,'999999999999');
          this.getReviewList = [];
          this.getReviewList = this.getReviewList.concat(arr);
          console.log(resd.resultData.normalComments,this.getReviewList,'qwerttyyuuifdfd')
        })
      }
    },
    initStime(){//今日数据+动态实时数据
      this.$api.getToday({}).then(res=>{
        console.log(res)
        let data = todayArray(res.resultData.datas)
        this.a = data.a;
        this.b = data.b;
        this.price = this.a[this.a.length-1]
        this.init()
        this.IntervalData();
      })
    },
    IntervalData(){//每隔3秒请求一次
      this.setTimeName = setTimeout(() => {
        this.sTimeData();
      }, 3000);
    },
    sTimeData(){//实时数据
      this.$api.getLastCoin({ reqData: {} }).then(res => {
        let data = res.resultData.datas;
        this.price = data.price
          console.log(data.price,this.timeSfr(data.time))
        if(data.price != this.a[this.a.length-1]){
          this.a.push(data.price);
          this.b.push(this.timeSfr(data.time))
          this.init()
        }
        console.log(this.setTimeName)
        if(this.setTimeName!=null){
          clearTimeout(this.setTimeName);
          this.setTimeName=null;
          this.IntervalData();
        }
      });
    },
    selectime(a){//时间类型切换
      console.log(a,'执行了')
      this.selectT = a;
      let _this = this;
      if(a!='s'){
        clearTimeout(this.setTimeName)
        this.setTimeName = null;
        console.log(this.setTimeName,'-----------')
        this.$api.getHisCoin({ reqData: { period: a } }).then(res => {
          console.log(res);
          let data = res.resultData.datas;
          if(data[data.length-1].price-data[0].price>0){
            this.range ='+'+ ((data[data.length-1].price-data[0].price)/data[0].price*100).toFixed(2)+'%'
          }else{
            this.range =((data[data.length-1].price-data[0].price)/data[0].price*100).toFixed(2)+'%'
          }
          let a=[],b=[];
          data.map((item, i) => {
            a.push(item.price);
            b.push(this.timeFr(item.time))
          });
          _this.a=a
          _this.b=b
          this.init();
        });
      }else{
        this.initStime();
      }
    },
    init() {
      var myChart = echarts.init(document.getElementById("main"));
      var option = {
        // title: {
        //   text: "京东黄金价格"
        // },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        grid: [
          //配置图的显示区域大小
          {
            left: "0%",
            width: "92%",
            containLabel: true,
            top:"5%",
            height: "84%"
          },
          {
            left: "0%",
            right: "8%",
            width: "1",
            // bottom: "16%",
            height: "0%"
          }
        ],
        xAxis: {
          type: "category",
          gridIndex: 0,
          data: this.b,
          scale: true,
          // boundaryGap: false,
          axisLine: {
            onZero: false
          },
         
          splitLine: {
            show: false
          },
          axisTick: {
            show: true,
            lineStyle:{
              color:'rgba(255,255,255,0.6)'
            }
          },
          axisLine:{
            lineStyle:{
              color:'rgba(255,255,255,0.6)'
            }
          },
          axisLabel: {
            show: true,
            showMinLable: false,
            align: "left",
            color:'#26ccd4',
            rich: {
              a: {
                align: "center"
              }
            },
            fontFamily: "微软雅黑"
          },
          splitNumber: 10,
          min: "dataMin",
          max: "dataMax",
          axisPointer: {
            z: 100
          }
        },
        yAxis: [
          {
            type: "value",
            scale: true,
            position: "left",
            splitArea: {
              show: true,
              areaStyle: {
                color: ["rgba(250,250,250,0.2)", "rgba(240,240,240,0.1)"]
              }
            },
            axisTick: {
              show: false, //y轴刻度
              lineStyle:{
                color:'#fff'
              }
            },
            axisLine:{
              lineStyle:{
                color:'rgba(255,255,255,0.6)'
              }
            },
            axisLabel: {
              formatter: "{value} ",
              fontFamily: "微软雅黑",
              fontSize: 18,
              color:'#26ccd4'
            }
          }
        ],

        series: [
          {
            name: "price",
            type: "line",
            data: this.a,
            markLine: {
              data: [{ type: "average", name: "平均值" }],
              lineStyle:{
                color:'yellow'
              }
            },
            smooth: true,
            showAllSymbol: false,
            label: {
              normal: {
                show: true,
                position: "top",
                color:"#ccc"
              }
            },
            lineStyle: {
              normal: {
                opacity: 0.2
              }
            },
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "rgb(170,10,20)"
                }
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(255,170,140,1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(255,170,140,0)"
                  }
                ])
              }
            }
          }
        ]
      };
      setTimeout(() => {
        myChart.setOption(option);
      }, 300);
    },
    timeFr(d) {
      //天计算
      d = new Date(d / 1);
      let date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      return date;
    },
    timeSfr(d) {
      d = new Date(d / 1);
      let h = d.getHours() > 9 ? d.getHours() : "0" + "" + d.getHours();
      let m = d.getMinutes() > 9 ? d.getMinutes() : "0" + "" + d.getMinutes();
      let date = h + ":" + m;
      return date;
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>
<style lang="scss" >
@import './../scss/home.scss'
</style>

