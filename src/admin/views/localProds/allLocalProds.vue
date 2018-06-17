<template>
  <div class="section">
    <!-- 所有商品 -->
    <div class="allprod">
      <h4>所有商品</h4>
      <el-table
        :data="prods"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="商品名"
          min-width="40%">
        </el-table-column>
        <el-table-column
          prop="sellnum"
          label="总销量"
          min-width="10%">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          min-width="10%">
        </el-table-column>
        <el-table-column
          prop="image"
          label="图片"
          min-width="20%">
          <template slot-scope="scope">
            <img class="table-image" :src="scope.row.image" alt="">
          </template>
        </el-table-column>
        <el-table-column
          min-width="20%"
          label="操作">
          <template slot-scope="scope">
            <el-button
              type="danger"
              @click="EditProd(scope.$index, scope.row)">编辑商品</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 编辑商品 -->
    <el-dialog title="编辑商品" :visible.sync="dialogFormVisible" width="90%">
      <el-form ref="editprod" :rules="prodrules" :model="editprod">
        <el-form-item label="商品名" prop="name">
          <el-input v-model="editprod.name" placeholder="请输入商品名"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model.number="editprod.price" placeholder="请输入商品价格"></el-input>
        </el-form-item>
        <el-form-item label="商品主图" prop="image">
          <qiniu-upload :key="imageUrl" :url="imageUrl" width="200" height="200" fontSize="40" ref="qnupload"></qiniu-upload>
        </el-form-item>
        
        <el-form-item label="商品简介" prop="desc">
          <el-input type="textarea" v-model="editprod.desc" placeholder="请请输入商品简介"></el-input>
        </el-form-item>

        <el-form-item label="商品详情" prop="info">
          <!-- <mavon-editor  ref="md" @imgAdd="$imgAdd" @imgDel="$imgDel" v-model="editprod.info"></mavon-editor> -->
          <md-upload :key="editprod.info" :info="editprod.info" ref="mdedit"></md-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="exitEdit">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  
</template>
<script>
import {getAllLocalProds, editLocalProd} from '../../../api/adminApi'
export default {
  // ..
  data () {
    return {
      prodName: '',
      prods: [],
      dialogFormVisible: false,
      imageUrl: '',
      editprod: {
        name: '',
        price: '',
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
    // 获取所有商品
    getallprods () {
      getAllLocalProds().then(res => {
        console.log(res)
        this.prods = res.data
      })
    },
    // 编辑商品
    EditProd (row, rowIndex) {
      this.editprod = rowIndex
      this.imageUrl = rowIndex.image
      this.dialogFormVisible = true
      // console.log(this.imageUrl)
    },
    // 退出编辑商品
    exitEdit () {
      this.dialogFormVisible = false
    },
    // 确认修改并提交
    submitEdit () {
      this.$refs.editprod.validate(valid => {
        if (valid) {
          const updatedParams = {
            id: this.editprod._id,
            name: this.editprod.name,
            price: this.editprod.price,
            image: this.$refs.qnupload.imageUrl,
            desc: this.editprod.desc,
            info: this.$refs.mdedit.mdinfo
          }
          // console.log(updatedParams)
          editLocalProd(updatedParams).then(res => {
            this.$notify({
              title: '商品修改成功',
              message: res.data.name,
              type: 'success',
              offset: 100
            })
            this.dialogFormVisible = false
            this.getallprods()
          })
        } else {
          this.$message({
            type: 'danger',
            message: '请验证后再提交修改'
          })
        }
      })
    }
  },
  mounted () {
    this.getallprods()
  }
}
</script>
<style lang="less" scoped>
@import '../../../common/less/index.less';
.section {
  .serchprod {
    .learncontent;
    .serch-input {
      width: 70%;
    }
    .serch-btn {
      width: 29%;
    }
  }
  .allprod {
    .learncontent;
    .table-image {
      width: 60px;
      height: 60px;
      border-radius: 30px;
    }
  }
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
