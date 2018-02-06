<template>
  <div class="container">
    <el-row>
      <el-col :span="6">
        <p></p>
        <div class="menu">
          <el-menu 
          :default-active="$router.path"
          router>
            <el-menu-item 
              v-for="item in $router.options.routes[0].children[6].children"
              :key="item.path"
              :index="item.path">
              {{item.name}}
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="user">
          <el-row>
            <el-col :span="8" :xs="24">
              <img class="avatar" :src="user.avatar" alt="">
            </el-col>
            <el-col :span="16" :xs="24">
              <h4>{{user.name}}</h4>
              <p>代理级别：<span class="text-color">{{sender.role}}</span>，折扣<span class="text-color">{{sender.zhekou}}折</span></p>
              <p>共发货<span class="text-color">{{sender.total}}</span>件</p>
              <p>离达到<span class="text-color">{{sender.next}}</span>还需再发货<span class="text-color">{{sender.num}}</span>件</p>
            </el-col>
          </el-row>
        </div>
        <transition name="el-zoom-in-center">
          <router-view :key="key"></router-view>
        </transition>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import {GetSended} from '../../api/api'
// import bus from '../../common/js/bus'
export default {
  data () {
    return {
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    key () {
      return this.$route.path
    },
    sended () {
      return this.$store.state.sended
    },
    sender () {
      return this.$store.getters.sender
    }
  },
  mounted () {
    this.$store.dispatch('sended')
    this.$store.dispatch('products')
    this.$store.dispatch('prods')
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/index.less';
.container {
  .menu {
    position: fixed;
    top: 62px;
    // background: @color;
    width: 20%;
    bottom: 0;
    box-shadow: 1px 0 1px #ccc;
    z-index: 3;
    .el-menu {
      // background: @color;
      border: none;
      margin-top: 100px;
      .el-menu-item {
        color: @color;
        text-align: center;
        padding: 0 !important;
        padding-left: 0 !important;
        &:hover {
          color: #eee;
          // font-weight: bold !important;
          background: @color;
        }
      }
    }
    .is-active {
      color: #eee !important;
      // font-weight: bold !important;
      background: @color !important;
    }
  }
  .user {
    .learncontent;
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50px;
      margin: 30px 0 5px 0;
    }
    .text-color {
      color: @color;
      font-size: 1rem;
      @media screen and (max-width: 768px) {
        font-size: .8rem;
      }
    }
  }
}

</style>
