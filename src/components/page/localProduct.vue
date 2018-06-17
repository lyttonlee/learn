<template>
  <div class="container">
    <!-- head -->
    <div class="head">
      <h2 class="tit">{{$route.name}}</h2>
    </div>
    <!-- body -->
    <div class="body">
      <div class="order">
        <el-button-group class="button-group">
          <el-button v-for="(order, index) in orders" :key="order.name" class="button" @click.native="click(index)" type="danger" size="small" round>{{order.name}}</el-button>
          <!-- <el-button class="button" @click.native="click" type="danger" size="small" round>默认</el-button>
          <el-button class="button" @click.native="click" type="danger" size="small" round>按价格</el-button>
          <el-button class="button" @click.native="click" type="success" size="small" round>按销量</el-button> -->
        </el-button-group>
      </div>
      <transition name="el-zoom-in-center">
        <el-row :key="orderkey">
          <template v-for="item in localProds">
            <el-col :key="item._id" :span="6" :xs="12">
              <div class="item">
                <img class="img" :src="item.image" alt="">
                <h4>{{item.name}}</h4>
                <p>{{item.desc}}</p>
                <p>{{item.price}}</p>
                <p>{{item.sellnum}}</p>
              </div>
            </el-col>
          </template>
        </el-row>
      </transition>
    </div>
  </div>
</template>
<script>
import {getLocalProds} from '../../api/api'
export default {
  data () {
    return {
      localProds: [],
      uporder: true,
      orderkey: '',
      order: {
        // price: 1
      },
      orders: [
        {
          name: '默认',
          val: {}
        },
        {
          name: '按价格',
          val: {
            price: this.uporder ? 1 : -1
          }
        },
        {
          name: '按销量',
          val: {
            sellnum: 1
          }
        }
      ]
    }
  },
  computed: {
    // orderkey () {
    // dasd
    // }
  },
  methods: {
    getLocal () {
      const queryPar = {
        limit: 4,
        skip: 0,
        order: this.order
      }
      getLocalProds(queryPar).then(res => {
        console.log(res)
        this.localProds = res.data
      })
    },
    click (index) {
      this.uporder = !this.uporder
      this.order = this.orders[index].val
      this.orderkey = index
      console.log(this.order)
      this.getLocal()
    }
  },
  mounted () {
    this.getLocal()
  }
}
</script>
<style lang="less" scoped>
@import '../../common/less/index.less';
.container {
  max-width: 1280px;
  text-align: left;
  .head {
    .tit {
    .leftborder;
    }
  }
  .body {
    // .learncontent;
    .order {
      .button-group {
        width: 100%;
      }
    }
    .item {
      margin: 10px;
      .img {
        width: 100%;
      }
    }
  }
}
</style>
