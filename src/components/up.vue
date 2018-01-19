<template>
<!-- 回到顶部 -->
  <div v-if="scroll" @click="up" class="up">
    <i class="el-icon-arrow-up"></i>
  </div>
</template>
<script>
export default {
  // ..
  data () {
    return {
      y: ''
    }
  },
  computed: {
    scroll () {
      if (this.y > 200) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    up () {
      window.scrollTo(0, 0)
    },
    dis () {
      let hign = window.scrollY
      // console.log(hign)
      this.y = hign
      // console.log('this.y', this.y)
      // console.log(this.scroll)
    }
  },
  mounted () {
    window.addEventListener('scroll', this.dis)
  }
}
</script>
<style lang="less" scoped>
  .up {
    width: 30px;
    height: 30px;
    position: fixed;
    right: 20px;
    bottom: 60px;
    background: rgba(188, 194, 193, .4);
    cursor: pointer;
    z-index: 1000;
    i {
      line-height: 30px;
    }
  }
</style>


