<template>
  <div id="">
    <a href="https://ms.jr.jd.com/gw/generic/hj/h5/m/todayPrices?reqData={}" target="_blank">222222</a>
<HellowWorld></HellowWorld>
  </div>
</template>

<script>
import HellowWorld from '@/components/HelloWorld'
import axios from 'axios'
export default {
  data() {
    return {

    }
  },
  mounted(){
    axios.get('/getToday')
    .then(function (response) {
      console.log(response);
    })
    // setInterval(function(){
    //   axios.get('/getLastCoin?reqData={}')
    //   .then(function (response) {
    //     console.log(response.data.resultData.datas);
    //   })
    // },3000)
  },
  components: {
HellowWorld
  }
}
</script>

<style scoped lang="scss">
</style>
