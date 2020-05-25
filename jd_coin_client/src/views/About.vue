<template>
  <div id="">
    <a href="https://ms.jr.jd.com/gw/generic/hj/h5/m/todayPrices?reqData={}" target="_blank">222222</a>
<HellowWorld></HellowWorld>
  </div>
</template>

<script>
import HellowWorld from '@/components/HelloWorld'
import axios from 'axios'
import mqtt from 'mqtt'
export default {
  data() {
    return {

    }
  },
  mounted(){
    var client  = mqtt.connect('mqtt://192.168.13.251:9080')
    console.log('xxxxxxxxxxx')
    client.on('connect', function () {
      console.log(2222222222)
      client.subscribe('presence', function (err) {
        if (!err) {
          // setInterval(()=>{
            client.publish('presence', 'Hello mqtt2222222222111112')
          // },1000)
        }
      })
    })
    
    client.on('message', function (topic, message) {
      // message is Buffer
      console.log(topic,message.toString(),'++++++++++++++++++++++++')
      client.end()
    })
  },
  components: {
HellowWorld
  }
}
</script>

<style scoped lang="scss">
</style>
