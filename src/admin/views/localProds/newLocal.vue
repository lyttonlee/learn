<template>
  <!-- 新增商品 -->
  <div class="addprod">
    <h4>新增批发商品</h4>
    <el-form ref="addprod" :rules="prodrules" :model="addprod" label-width="80px">
      <el-form-item label="商品名" prop="name">
        <el-input v-model="addprod.name" placeholder="请输入商品名"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model.number="addprod.price" placeholder="请输入商品价格"></el-input>
      </el-form-item>
      <el-form-item label="商品主图" prop="image">
        <!-- <el-upload
          class="prod-image"
          action="/learn/upload"
          :show-file-list="false"
          :on-success="handleSuccess"
          :before-upload="beforeUpload">
          <img v-if="imageUrl" :src="imageUrl" class="cur-image">
          <i v-else class="el-icon-plus prod-uploader-icon"></i>
        </el-upload> -->
        <qiniu-upload width="200" height="200" fontSize="40" ref="qnupload"></qiniu-upload>
      </el-form-item>
      <!-- <el-form-item label="商品类别" prop="typename">
        <el-select v-model="addprod.typename" placeholder="请选择商品类别">
          <template v-for="item in products">
            <el-option :label="item.name" :value="item.name" :key="item.type"></el-option>
          </template>
        </el-select>
      </el-form-item> -->

      <!-- <el-form-item label="商品类名">
        <el-input v-model="addprod.type" disabled></el-input>
      </el-form-item>
      
      <el-form-item label="是否上架">
        <el-switch v-model="addprod.selling"></el-switch>
      </el-form-item> -->
      
      <!-- <el-form-item label="售卖时间" prop="selltime">
        <el-input v-model="addprod.selltime" placeholder="请请输入商品售卖时间，月份或全年"></el-input>
      </el-form-item> -->
      
      <el-form-item label="商品简介" prop="desc">
        <el-input type="textarea" v-model="addprod.desc" placeholder="请请输入商品简介"></el-input>
      </el-form-item>

      <el-form-item label="商品详情" prop="info">
        <!-- <mavon-editor  ref="md" @imgAdd="$imgAdd" @imgDel="$imgDel" v-model="addprod.info"></mavon-editor> -->
        <md-upload ref="newmd"></md-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="newprod">添加批发商品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {newLocalProd} from '../../../api/adminApi'
export default {
  data () {
    return {
      imageUrl: '',
      // products: [],
      addprod: {
        name: '',
        price: '',
        // type: '',
        // typename: '',
        // selling: '',
        desc: '',
        info: ''
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
        // type: [
        //   {
        //     required: true,
        //     message: '商品必须选择一个类别',
        //     trigger: 'change'
        //   }
        // ],
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
    // 新增一个批发商品
    newprod () {
      this.$refs.addprod.validate(valid => {
        if (valid) {
          let addprodpar = {
            name: this.addprod.name,
            price: this.addprod.price,
            image: this.$refs.qnupload.imageUrl,
            desc: this.addprod.desc,
            info: this.$refs.newmd.mdinfo
          }
          // console.log(addprodpar)
          newLocalProd(addprodpar).then(res => {
            // console.log(res)
            this.$notify({
              title: '成功',
              type: 'success',
              message: res.data.msg,
              offset: 200
            })
            this.$refs.addprod.resetFields()
            this.$router.push('/admin/mangelocal/alllocalprods')
          }).catch(err => {
            console.error(err)
            this.$notify({
              title: '哎呀！好像出现问题了哦！',
              type: 'error',
              message: '请稍后再试',
              offset: 200
            })
          })
        } else {
          this.$notify({
            title: '警告!',
            type: 'warning',
            message: '请先完成验证',
            offset: 200
          })
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
    .prod-image {
      width: 200px;
      height: 200px;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      .cur-image {
        width: 100%;
      }
      .prod-uploader-icon {
        font-size: 45px;
        color: #8c939d;
        width: 200px;
        height: 200px;
        line-height: 200px;
        text-align: center;
      }
    }
  }
}
</style>
