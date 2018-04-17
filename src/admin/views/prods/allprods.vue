<template>
  <div class="section">
    <!-- 搜索商品 -->
    <div class="serchprod">
      <h4>搜索商品</h4>
      <!-- 搜索框 -->
      <el-input class="serch-input" v-model="prodName" placeholder="请输入确切的商品名">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button class="serch-btn" @click="SerchProd" :disabled="disable" type="primary">搜索</el-button>
    </div>
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
          prop="typename"
          label="类型"
          min-width="10%"
          :filters="productsFilter"
          :filter-method="filterType"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              close-transition>{{scope.row.typename}}</el-tag>
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
          <!-- <el-upload
            class="prod-image"
            action="/learn/upload"
            :show-file-list="false"
            :on-success="handleSuccess"
            :before-upload="beforeUpload">
            <img v-if="imageUrl" :src="imageUrl" class="cur-image">
            <i v-else class="el-icon-plus prod-uploader-icon"></i>
          </el-upload> -->
          <qiniu-upload :key="imageUrl" :url="imageUrl" width="200" height="200" fontSize="40" ref="qnupload"></qiniu-upload>
        </el-form-item>
        <el-form-item label="商品类别" prop="typename">
          <el-select v-model="editprod.typename" placeholder="请选择商品类别">
            <template v-for="item in products">
              <el-option :label="item.name" :value="item.name" :key="item.type"></el-option>
            </template>
          </el-select>
        </el-form-item>

        <el-form-item label="商品类名">
          <el-input v-model="editprod.type" disabled></el-input>
        </el-form-item>
        
        <el-form-item label="是否上架">
          <el-switch v-model="editprod.selling"></el-switch>
        </el-form-item>

        <el-form-item label="售卖时间" prop="selltime">
          <el-input v-model="editprod.selltime" placeholder="请请输入商品售卖时间，月份或全年"></el-input>
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
import {GetProducts, GetProds, EditProd} from '../../../api/adminApi'
// import {UploadFile} from '../../../api/api'
export default {
  // ..
  data () {
    return {
      prodName: '',
      productsFilter: [],
      prods: [],
      products: [],
      dialogFormVisible: false,
      imageUrl: '',
      editprod: {
        name: '',
        price: '',
        type: '',
        typename: '',
        selling: '',
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
        ],
        selltime: [
          {
            required: true,
            message: '商品售卖时间段是必须的！',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    disable () {
      if (this.prodName.length !== 0) {
        return false
      } else {
        return true
      }
    }
  },
  watch: {
    'editprod.typename': function (val) {
      // console.log(val)
      // console.log(this.products)
      const CurProduct = this.products.filter(p => {
        return p.name === this.editprod.typename
      })
      // console.log(CurProduct)
      this.editprod.type = CurProduct[0].type
      // console.log(this.addprod.type)
    },
    deep: true
  },
  methods: {
    // 搜索商品
    SerchProd () {
      let serchpar = {
        name: this.prodName
      }
      GetProds(serchpar).then(res => {
        // console.log(res)
        if (res.data.prods.length > 0) {
          this.$notify({
            title: '成功',
            type: 'success',
            message: '共搜索到' + res.data.prods.length + '个商品',
            offset: 200
          })
          this.prods = res.data.prods
          this.prodName = ''
        } else {
          this.$notify({
            title: '失败',
            type: 'error',
            message: '没有找到合适的商品,请检查商品名',
            offset: 200
          })
          this.prodName = ''
        }
      })
    },
    // 获取所有商品类
    getproducts () {
      let productsPar = {
        type: 'all'
      }
      GetProducts(productsPar).then(res => {
        // console.log(res)
        const Oproducts = res.data.products
        this.products = res.data.products
        for (let i = 0; i < Oproducts.length; i++) {
          this.productsFilter.push({
            text: Oproducts[i].name,
            value: Oproducts[i].name
          })
        }
        // console.log(this.productsFilter)
      })
    },
    // 获取所有商品
    getallprods () {
      let allprospar = {
        type: 'all'
      }
      GetProds(allprospar).then(res => {
        // console.log(res)
        this.prods = res.data.prods
      })
    },
    // 通过商品类型过滤显示商品
    filterType (value, row) {
      // console.log('value', value)
      // console.log('row', row)
      return row.typename === value
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
            type: this.editprod.type,
            typename: this.editprod.typename,
            selling: this.editprod.selling,
            desc: this.editprod.desc,
            info: this.$refs.mdedit.mdinfo,
            selltime: this.editprod.selltime
          }
          // console.log(updatedParams)
          EditProd(updatedParams).then(res => {
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
    // ..
    this.getproducts()
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

