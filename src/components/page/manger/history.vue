<template>
  <div>
    <div class="head">
      <h3>{{this.$route.name}}</h3>
    </div>
  </div>
  
</template>
<script>
import {GetSended} from '../../../api/api'
export default {
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  mounted () {
    let sendedparams = {
      bename: this.user.name,
      status: '待发货'
    }
    GetSended(sendedparams).then(res => {
      console.log(res)
    })
  }
}
</script>

<style lang="less" scoped>
@import '../../../common/less/index.less';
.head {
  .leftborder
}
</style>
