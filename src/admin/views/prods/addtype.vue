<template>
  <!-- 添加商品类 -->
  <div class="addprod">
    <h4>添加一个商品类</h4>
    <el-input
      placeholder="请输入商品类名"
      v-model="prodtype"
      clearable>
    </el-input>
    <el-input
      placeholder="请输入商品类简介"
      v-model="prodsub"
      type="textarea"
      :rows="2"
      clearable>
    </el-input>
    <el-button type="danger" :disabled="disabled" @click="addtype" round>添加</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      prodtype: '',
      prodsub: ''
    }
  },
  computed: {
    disabled () {
      if (this.prodtype === '' || this.prodsub === '') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    addtype () {
      console.log('do')
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../common/less/index.less';
.addprod {
  .learncontent;
  .el-input {
    margin: 5px 0;
  }
  .el-button {
    margin: 10px 0;
    width: 100%;
  }
}
</style>
