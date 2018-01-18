<template>
  <div>
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
          <h3>{{item.name}}</h3>
          <p class="intro">{{item.desc}}</p>
          <router-link 
            :to="'/product/'+item.type+'/'+item.name"
            :key="item.typename">
            <p class="link">了解详情...</p>
          </router-link>
          <p class="sellnum">累计发货<span>{{item.productsells}}</span>件</p>
          <p class="price">全国包邮价<span :class="old">{{item.price}}</span><span class="textOld" v-if="sender">{{item.price * sender.zhekou * 0.1}}</span>元</p>
          <!-- <el-input-number size="mini" v-model="addnum"></el-input-number> -->
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
      productlist: [],
      addnum: 0
    }
  },
  methods: {
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
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
    }
  },
  mounted () {
    if (this.$route.query.name) {
      // 获取查询列表
      // console.log(this.$route.query.name)
      let searchparams = this.$route.query.name
      SearchProductList(searchparams).then(res => {
        // console.log(res)
        if (res.data.code === 200) {
          this.productlist = res.data.searchRes
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
    } else {
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
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../common/css/hover.css';
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
  .item {
    margin: 25px 10px;
    /* background: #f2f3f2; */
    box-shadow: 0 5px 5px #ccc;
    border-top: 1px solid #ccc; 
    /* border: 1px solid #ccc; */
    border-radius: 15px;
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


