<template>
  <mavon-editor ref="md" @imgAdd="$imgAdd" @imgDel="$imgDel" v-model="mdinfo"></mavon-editor>
</template>
<script>
import {GetQiniuUpToken} from '../api/api'
export default {
  name: 'mdedit',
  props: ['info'],
  data () {
    return {
      mdinfo: this.info
    }
  },
  methods: {
    // mavoneditor图片上传并替换地址
    // 绑定@imgAdd event
    $imgAdd (pos, $file) {
      // console.log($file)
      // 从后端获取上传凭证token
      GetQiniuUpToken().then(res => {
        // console.log(res)
        let {token, domain, upUrl} = res.data
        const config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        let filetype = ''
        if ($file.type === 'image/png') {
          filetype = 'png'
        } else if ($file.type === 'image/jpeg') {
          filetype = 'jpg'
        } else if ($file.type === 'image/gif') {
          filetype = 'gif'
        }
        const keyname = this.$moment(new Date()).format('YYYY/MM/DD-HH:mm:ss') + '-' + 'consignment' + '-' + Math.floor(Math.random() * 100) + '.' + filetype
        const formdata = new FormData()
        formdata.append('file', $file)
        formdata.append('token', token)
        formdata.append('key', keyname)
        // 上传文件到七牛云
        this.$axios.post(upUrl, formdata, config).then(res => {
          let imageUrl = 'http://' + domain + '/' + res.data.key
          // console.log(imageUrl)
          // 将返回的url替换到文本原位置![...](./0) -> ![...](url)
          this.$refs.md.$img2Url(pos, imageUrl)
        })
      })
    },
    $imgDel (pos) {
      delete this.img_file[pos]
    }
  }
}
</script>
<style lang="less" scoped>

</style>



