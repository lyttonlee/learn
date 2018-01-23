<template>
  <div>
    <div class="serch">
      <!-- 搜索框 -->
      <el-input 
      type="text"
      class="el-input"
      placeholder="请输入商品名"
      v-model="searchName">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button 
        type="primary"
        :disabled="disabled"
        @click="search"
        :loading="loading">
        搜索
      </el-button>
    </div>
    <div class="title">
      <h1 v-text="$route.params.class"></h1>
    </div>
    <!-- <p>共{{productlist.length}}个商品</p> -->
    <el-row class="main">
      <template v-for="item in productlist">
        <el-col :span="7" :xs="22"  class="item hvr-float-shadow" :key="item.productclass">
          <router-link
            :to="'/product/'+item.type+'/'+item.name"
            :key="item.productclass">
            <img class="hvr-bob" :src="item.image" >
          </router-link>
          <div class="onpic">
            <p v-if="item.selling" class="hot">热销中</p>
            <p v-else class="nhot">未上市</p>
          </div>
          <h3>{{item.name}}</h3>
          <p class="intro">{{item.desc}}</p>
          <router-link 
            :to="'/product/'+item.type+'/'+item.name"
            :key="item.typename">
            <p class="link">了解详情...</p>
          </router-link>
          <p class="sellnum">历史销量:<span>{{item.sellnum}}</span></p>
          <p class="price">全国包邮价:<span :class="old">{{item.price}}</span><span class="textOld" v-if="sender">￥{{item.price * sender.zhekou * 0.1}}</span></p>
        </el-col> 
      </template>
    </el-row>
    <!-- 分页 -->
    <!-- <div class="page">
      <el-pagination
        layout="prev, pager, next"
        :total="50"
        @current-change="handleCurrentChange"
        :page-size="12">
      </el-pagination>
    </div> -->
  </div>
</template>
<script>
import {SearchProductList} from '../../../api/api'
import {GetProds} from '../../../api/adminApi'
export default {
  data () {
    return {
      productlist: [],  // 商品列表
      searchName: '',
      loading: false
    }
  },
  methods: {
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    // 获取商品
    getprods () {
      // 获取分类列表
      let params = null
      if (this.$route.params.class === '全部商品') {
        params = {
          type: 'all'
        }
      } else {
        params = {
          typename: this.$route.params.class
        }
      }
      GetProds(params).then(res => {
        // console.log(res)
        this.productlist = res.data.prods
      })
    },
    // 搜索商品
    search () {
      this.loading = true
      let searchparams = {
        name: this.searchName
      }
      SearchProductList(searchparams).then(res => {
        this.loading = false
        // console.log(res)
        if (res.data.length === 0) {
          this.$notify({
            title: '很抱歉',
            message: '没有搜索到符合的商品！',
            type: 'warning',
            offset: 200
          })
          this.searchName = ''
        } else {
          this.$notify({
            title: '成功',
            message: '共搜索到' + res.data.length + '件商品',
            type: 'success',
            offset: 200
          })
          this.productlist = res.data
          this.searchName = ''
        }
      })
    }
  },
  computed: {
    sender () {
      return this.$store.getters.sender
    },
    old () {
      if (this.sender) {
        return 'textThr'
      } else {
        return 'textOld'
      }
    },
    disabled () {
      if (this.searchName === '') {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    this.getprods()
  }
}
</script>
<style lang="less" scoped>
@import '../../../common/css/hover.css';
@import '../../../common/less/index.less';
.serch {
  margin: 20px 10px;
  .el-input {
    width: 70%;
  }
  .el-button {
    width: 28%;
  }
}
a {
  text-decoration: none;
  color: #999;
}
a:hover {
  color: #669966;
}
.title {
  height: 60px;
  border-left: 4px solid #669966; 
  margin: 0 15px;
  background-color: #f2f3f2;
  text-align: left;
  padding-left:20px; 
  line-height: 60px;
}
.main {
  position: relative;
  .item {
    margin: 25px 10px;
    /* background: #f2f3f2; */
    box-shadow: 0 5px 5px #ccc;
    border-top: 1px solid #ccc; 
    /* border: 1px solid #ccc; */
    border-radius: 15px;
    .onpic {
      position: absolute;
      top: 20px;
      right: 20px;
      opacity: .7;
      .hot {
        background: #bb4945;
        color: rgb(231, 228, 228);
        margin: 0;
        padding: 5px 12px;
        border-radius: 15px;
        display: inline-block;
      }
      .nhot {
        background: #dad7d5;
        color: rgb(61, 57, 57);
        margin: 0;
        padding: 5px 12px;
        display: inline-block;
      }
    }
    img {
      width: 90%;
      padding: 10px;
      border-radius: 15px; 
    }
  }
}

.intro {
  height: 90px;
  overflow: hidden;
}
.intro,.price,.sellnum {
  margin: 0 15px 0 25px;
  text-align: left;
  color: #666;
  line-height: 2;
  letter-spacing: 1.2;
}
.link {
  text-align: right;
  font-size: 16px;
  margin-right: 40px; 
}
.price,.sellnum {
  color: gray;
}
.textOld {
  color: red;
  font-size: 25px;
}
.textThr {
  // color: #290c09;
  // font-size: 20px;
  text-decoration: line-through;
}
</style>


