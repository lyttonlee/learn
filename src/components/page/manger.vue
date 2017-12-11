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
              v-for="(item, index) in $router.options.routes[4].children"
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
              <h3>{{user.name}}</h3>
              <p>代理级别：{{role}}</p>
              <p>共发货{{total}}件</p>
              <p>离达到{{next}}还需再发货{{num}}件</p>
            </el-col>
          </el-row>
        </div>
        <transition name="el-zoom-in-center">
          <router-view></router-view>
        </transition>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {GetSended} from '../../api/api'
export default {
  data () {
    return {
      role: '',
      total: '',
      next: '',
      num: ''
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  mounted () {
    let pars = {
      bename: this.user.name,
      status: '待发货'
    }
    GetSended(pars).then(res => {
      this.total = res.data.sended.length
      if (res.data.sended.length < 10) {
        this.role = '初出茅庐'
        this.next = '渐入佳境'
        this.num = 10 - res.data.sended.length
      } else if (res.data.sended.length < 100 && res.data.sended.length >= 10) {
        this.role = '渐入佳境'
        this.next = '炉火纯青'
        this.num = 100 - res.data.sended.length
      } else {
        this.role = '炉火纯青'
      }
    })
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/index.less';
.container {
  .menu {
    position: fixed;
    left: 20px;
    top: 200px;
    background: @color;
    width: 20%;
    box-shadow:  2px 0 5px #E0E0E0;
    z-index: 3;
    .el-menu {
      background: @color;
      border: none;
      .el-menu-item {
        color: #ccc;
        &:hover {
          background: @color;
        }
      }
    }
    .is-active {
      color: #eee !important;
      font-weight: bold !important;
      background: @color !important;
    }
  }
  .user {
    box-shadow: 0 4px 2px @color;
    border-radius: 10px;
    border-top: 1px solid #ccc;  
    margin: 0 15px;
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50px;
      margin: 10px 0 5px 0;  
    }
  }
}

</style>
