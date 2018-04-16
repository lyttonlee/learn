<template>
  <!-- upload -->
  <div class="upload">
    <el-upload
      class="qnuploader"
      :action= domain
      :http-request = upqiniu
      :show-file-list="false"
      :before-upload="beforeUpload">
      <img v-if="imageUrl" :src="imageUrl" class="upload-img">
      <i v-else class="el-icon-plus uploader-icon"></i>
    </el-upload>
  </div>
</template>
<script>
import {GetQiniuUpToken} from '../api/api'
export default {
  data () {
    return {
      imageUrl: '',
      // 七牛云的上传地址，根据自己所在地区选择，我这里是华南区
      domain: '',
      // 这是七牛云空间的外链默认域名
      qiniuaddr: ''
    }
  },
  methods: {
    // 上传文件到七牛云
    upqiniu (req) {
      console.log(req)
      const config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      let filetype = ''
      if (req.file.type === 'image/png') {
        filetype = 'png'
      } else {
        filetype = 'jpg'
      }
      // 重命名要上传的文件
      const keyname = this.$moment(new Date()).format('YYYY/MM/DD-HH:mm:ss') + '-' + 'consignment' + '-' + Math.floor(Math.random() * 100) + '.' + filetype
      // 从后端获取上传凭证token
      GetQiniuUpToken().then(res => {
        // console.log(res)
        let {token, domain, upUrl} = res.data
        this.domain = domain
        this.qiniuaddr = upUrl
        const formdata = new FormData()
        formdata.append('file', req.file)
        formdata.append('token', token)
        formdata.append('key', keyname)
        // console.log(formdata)
        // 获取到凭证之后再将文件上传到七牛云空间
        this.$axios.post(this.qiniuaddr, formdata, config).then(res => {
          this.imageUrl = 'http://' + this.domain + '/' + res.data.key
          console.log(this.imageUrl)
        })
      })
    },
    // 验证文件合法性
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!isJPG) {
        this.$message.error('上传头像图片只能是JPG或者PNG格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style scoped lang="less">
.upload {
  width: 100%;
  margin: 0 auto;
  .qnuploader {
    width: 200px;
    height: 200px;
    border: 2px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: rgba(62, 95, 128, .5);
    }
  }
  .upload-img {
    width: 200px;
    height: 200px;
    display: block;
  }
  .uploader-icon {
    font-size: 40px;
    color: #8c939d;
    width: 200px;
    height: 200px;
    line-height: 200px;
    text-align: center;
  }
}
</style>
