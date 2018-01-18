<template>
<div class="container">
  <el-row>
    <el-col class="menu-box" :span="6">
      <p></p>
      <el-menu
        class="menu"
        :default-active="$route.path"
        router
        background-color="#fff"
        text-color="#267943"
        active-text-color="#000">
        <el-menu-item v-for="item in productclass" 
          :index="'/product/'+item.name"
          :key="'/product/'+item.name"
          v-text="item.name">
        </el-menu-item>
      </el-menu>
    </el-col>
    <!-- 右边主要内容 -->
    <el-col :span="18">
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
      <!-- 商品列表渲染的地方 -->
      <transition name="el-zoom-in-center">
        <router-view :key="key"></router-view>
      </transition>
    </el-col>
  </el-row>
</div>

</template>
<script>
import {GetProducts} from '../../api/adminApi'
import {SearchProductList} from '../../api/api'
export default {
  data () {
    return {
      searchName: '',
      isactive: false,
      loading: false,
      productclass: []
    }
  },
  computed: {
    key () {
      return this.$route.params.class + new Date()
    },
    disabled () {
      if (this.searchName === '') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    // 获取商品类列表
    getproducts () {
      GetProducts({type: 'all'}).then(res => {
        let addtype = {
          name: '全部商品',
          type: 'all'
        }
        res.data.products.unshift(addtype)
        this.productclass = res.data.products
      })
    },
    // 搜索商品
    search () {
      this.loading = true
      let searchparams = this.searchName
      SearchProductList(searchparams).then(res => {
        this.loading = false
        if (res.data.code === 200) {
          this.$router.push({
            path: '/product/search',
            query: {name: this.searchName}
          })
        } else {
          this.$notify({
            title: '很抱歉',
            message: res.data.msg,
            type: 'warning',
            offset: 200
          })
          this.$router.push('/product/all')
        }
      })
    }
  },
  mounted () {
    this.getproducts()
  }
}
</script>
<style scoped>
.el-input {
  margin: 20px 0;
  width: 60%;
}
.el-button {
  width: 25%;
  margin-right: 5px; 
}
.menu {
  position: fixed;
  width: 200px;
  top: 150px;
  left: 50px;
  box-shadow: 0 0 6px #ccc;
}
.is-active {
  background: #669966 !important;
  /* border-bottom: 3px solid #66CC00 !important; */
  color: #fff !important;
  font-weight: bold !important;
}
@media screen and (max-width: 767px) {
  .menu {
    position: fixed;
    width: 25%;
    top: 100px;
    left: 5px;
    box-shadow: 0 0 6px #ccc;
  }
  .is-active {
    background: #669966 !important;
    /* border-bottom: 3px solid #66CC00 !important; */
    color: #fff !important;
    font-weight: bold !important;
  }
}
</style>
