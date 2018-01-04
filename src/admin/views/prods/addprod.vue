<template>
  <!-- 新增商品 -->
  <div class="addprod">
    <h4>新增商品</h4>
    <el-form ref="addprod" :rules="prodrules" :model="addprod" label-width="80px">
      <el-form-item label="商品名" prop="name">
        <el-input v-model="addprod.name" placeholder="请输入商品名"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model.number="addprod.price" placeholder="请输入商品价格"></el-input>
      </el-form-item>
      <el-form-item label="商品类别" prop="type">
        <el-select v-model="addprod.type" placeholder="请选择商品类别">
          <el-option label="石榴" value="shiliu"></el-option>
          <el-option label="火腿" value="ham"></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="是否上架">
        <el-switch v-model="addprod.selling"></el-switch>
      </el-form-item>
      
      
      <el-form-item label="商品简介" prop="desc">
        <el-input type="textarea" v-model="addprod.desc" placeholder="请请输入商品简介"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="newprod">立即添加</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      addprod: {
        name: '',
        price: '',
        type: [],
        selling: '',
        desc: ''
      },
      prodrules: {
        name: [
          {
            required: true,
            message: '请输入商品名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 15,
            message: '长度在 3 到 15 个字',
            trigger: 'blur'
          }
        ],
        price: [
          {
            required: true,
            message: '请输入商品价格',
            trigger: 'blur'
          },
          {
            type: 'number',
            message: '价格必须是数字',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '商品必须选择一个类别',
            trigger: 'change'
          }
        ],
        desc: [
          {
            required: true,
            message: '请输入商品简介',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    newprod () {
      this.$refs.addprod.validate(valid => {
        if (valid) {
          console.log('add prod!')
        } else {
          console.log('请先完成验证')
          return false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../common/less/index.less';
.addprod {
  .learncontent;
  .el-form {
    text-align: left;
    .el-select {
      width: 100%;
    }
    .el-switch {
      margin: 10px 0 0 0;
    }
  }
}
</style>


