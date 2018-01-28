<template>
  <div class="section">
    <!-- 网站基本设置 -->
    <div class="box">
      <h4>网站基本设置</h4>
      <el-form :model="weboption">
        <el-form-item label="网站名">
          <el-input v-model="weboption.sitename" placeholder="请输入网站名"></el-input>
        </el-form-item>
        <el-form-item label="首页banner">
          <el-upload
            class="banner"
            action="/learn/upload"
            :show-file-list="false"
            :on-success="bannerSuccess"
            :before-upload="beforeUpload">
            <img v-if="banner" :src="banner" class="cur-image">
            <i v-else class="el-icon-plus uploader-icon"></i>
          </el-upload>
        </el-form-item>
        
        <el-form-item label="备案号">
          <el-input v-model="weboption.beian" placeholder="请输入网站备案号"></el-input>
        </el-form-item>

        <el-form-item label="logo">
          <el-upload
            class="logo"
            action="/learn/upload"
            :show-file-list="false"
            :on-success="logoSuccess"
            :before-upload="beforeUpload">
            <img v-if="logo" :src="logo" class="cur-image">
            <i v-else class="el-icon-plus uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="公众号二维码">
          <el-upload
            class="er"
            action="/learn/upload"
            :show-file-list="false"
            :on-success="erSuccess"
            :before-upload="beforeUpload">
            <img v-if="erweima" :src="erweima" class="cur-image">
            <i v-else class="el-icon-plus uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button v-if="!hasoption" type="danger" @click="newoption">添加网站设置</el-button>
          <el-button v-else type="danger" @click="siteoption">更新</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {SiteOption, GetOption, NewOption} from '../../../api/adminApi'
export default {
  // ..
  data () {
    return {
      weboption: {
        sitename: '',
        beian: ''
      },
      banner: '',
      logo: '',
      erweima: '',
      hasoption: ''
    }
  },
  methods: {
    bannerSuccess (res, file) {
      this.banner = res
    },
    logoSuccess (res, file) {
      this.logo = res
    },
    erSuccess (res, file) {
      this.erweima = res
    },
    beforeUpload (file) {
      const isPIC = file.type === 'image/jpeg' || 'image/png'
      const isLt5M = file.size / 1024 / 1024 < 5

      if (!isPIC) {
        this.$message.error('上传图片只能是 JPG或PNG 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 5MB!')
      }
      return isPIC && isLt5M
    },
    newoption () {
      let newpars = {
        sitename: this.weboption.sitename,
        beian: this.weboption.beian,
        banner: this.banner,
        logo: this.logo,
        erweima: this.erweima
      }
      NewOption(newpars).then(res => {
        console.log(res)
        this.weboption = res.data.Option
      })
    },
    siteoption () {
      let pars = {
        id: this.weboption._id,
        sitename: this.weboption.sitename,
        beian: this.weboption.beian,
        banner: this.banner,
        logo: this.logo,
        erweima: this.erweima
      }
      SiteOption(pars).then(res => {
        console.log(res)
        this.$notify({
          title: '成功',
          type: 'success',
          message: res.data.msg,
          offset: 200
        })
        this.weboption = res.data.Option
      })
    },
    getoption () {
      GetOption().then(res => {
        console.log(res)
        if (res.data.Option.length === 0) {
          this.hasoption = false
        } else {
          this.hasoption = true
          this.weboption = res.data.Option[0]
          this.banner = res.data.Option[0].banner
          this.logo = res.data.Option[0].logo
          this.erweima = res.data.Option[0].erweima
        }
      })
    }
  },
  mounted () {
    this.getoption()
  }
}
</script>
<style lang="less" scoped>
@import '../../../common/less/index.less';
@import '../../../common/css/init.css';
.section {
  .box {
    .learncontent;
    .banner {
      width: 100%;
      height: 400px;
      border: 1px dashed @color;
      border-radius: 15px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      .uploader-icon {
        font-size: 45px;
        color: #8c939d;
        line-height: 400px;
        text-align: center;
      }
      .cur-image {
        width: 100%;
      }
    }
    .logo {
      width: 234px;
      height: 60px;
      border: 1px dashed @color;
      border-radius: 15px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      .uploader-icon {
        font-size: 15px;
        color: #8c939d;
        line-height: 60px;
        text-align: center;
      }
      .cur-image {
        width: 100%;
      }
    }
    .er {
      width: 120px;
      height: 120px;
      border: 1px dashed @color;
      border-radius: 15px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      .uploader-icon {
        font-size: 25px;
        color: #8c939d;
        line-height: 120px;
        text-align: center;
      }
      .cur-image {
        width: 100%;
      }
    }
  }
}
</style>
