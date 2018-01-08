<template>
  <div class="section">
    <!-- 添加商品类 -->
    <div class="addprod">
      <h4>添加一个商品类</h4>
      <el-input
        placeholder="请输入商品类名"
        v-model="prodname"
        clearable>
      </el-input>
      <el-input
        placeholder="请输入商品类,用英文字母表示，方便路由"
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
    <!-- 获取商品分类 -->
    <div class="getproducts">
      <h4>所有商品分类</h4>
      <el-table
        :data="products">
        <el-table-column
          min-width="20%"
          prop="name"
          label="分类名称">
        </el-table-column>
        <el-table-column
          min-width="20%"
          prop="type"
          label="分类类别">
        </el-table-column>
        <el-table-column
          min-width="40%"
          prop="sub"
          label="分类简介">
        </el-table-column>
        <el-table-column
          min-width="20%"
          label="操作">
          <template slot-scope="scope">
            <el-button
              type="danger"
              @click="EditProducts(scope.$index, scope.row)">修改分类信息</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 修改商品分类 -->
      <el-dialog title="修改商品分类" :visible.sync="dialogFormVisible">
        <el-form ref="editproduct"  :model="selectedProduct">
          <el-form-item>
            <el-input
              placeholder="请输入商品类名"
              v-model="selectedProduct.name"
              clearable>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              placeholder="请输入商品类,用英文字母表示，方便路由"
              v-model="selectedProduct.type"
              clearable>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              placeholder="请输入商品简介"
              v-model="selectedProduct.sub"
              clearable>
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="exitEdit">取 消</el-button>
          <el-button type="primary" @click="submitEdit">确定修改</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
  
</template>
<script>
import {NewProducts, GetProducts, EditProduct} from '../../../api/adminApi'
export default {
  data () {
    return {
      products: [],
      prodtype: '',
      prodname: '',
      prodsub: '',
      dialogFormVisible: false,
      selectedProduct: {
        _id: '',
        name: '',
        type: '',
        sub: ''
      }
    }
  },
  computed: {
    disabled () {
      if (this.prodtype === '' || this.prodsub === '' || this.prodname === '') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    // 添加商品分类
    addtype () {
      let newproductsParams = {
        name: this.prodname,
        type: this.prodtype,
        sub: this.prodsub
      }
      NewProducts(newproductsParams).then(res => {
        // console.log(res)
        this.$notify({
          title: '成功',
          type: 'success',
          message: res.data.msg,
          offset: 200
        })
        this.products.unshift(res.data.newproduct)
        this.prodname = ''
        this.prodtype = ''
        this.prodsub = ''
      })
    },
    // 修改商品分类
    EditProducts (row, rowIndex) {
      // console.log(row, rowIndex)
      this.selectedProduct = rowIndex
      this.dialogFormVisible = true
    },
    // 取消修改
    exitEdit () {
      this.$notify({
        title: '取消',
        type: 'primary',
        message: '已取消修改',
        offset: 200
      })
      this.dialogFormVisible = false
    },
    // 确定修改
    submitEdit () {
      let editpar = {
        id: this.selectedProduct._id,
        name: this.selectedProduct.name,
        type: this.selectedProduct.type,
        sub: this.selectedProduct.sub
      }
      // console.log(editpar)
      EditProduct(editpar).then(res => {
        // console.log(res)
        this.$notify({
          title: '成功',
          type: 'success',
          message: res.data.msg,
          offset: 200
        })
        this.dialogFormVisible = false
      })
    },
    // 获取商品分类
    GetProducts () {
      let par = {
        type: 'all'
      }
      GetProducts(par).then(res => {
        // console.log(res)
        this.products = res.data.products
      })
    }
  },
  mounted () {
    this.GetProducts()
  }
}
</script>
<style lang="less" scoped>
@import '../../../common/less/index.less';
@import '../../../common/css/init.css';
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
.getproducts {
  .learncontent;
}
</style>
