<template>
  <div class="section">
    <!-- 网站基本设置 -->
    <div class="box">
      <h4 class="tit">新增帮助文档</h4>
      <el-form ref="newfaq" label-position="top" :model="newfaq">
        <el-form-item label="问题">
          <el-input v-model="newfaq.que" placeholder="请输入问题"></el-input>
        </el-form-item>
       
        <el-form-item label="答案">
         <mavon-editor  ref="md" @imgAdd="$imgAdd" @imgDel="$imgDel" v-model="newfaq.ans"></mavon-editor>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" :disabled = disable @click="addfaq">添加帮助文档</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {UploadFile} from '../../../api/api'
import {NewFaq} from '../../../api/adminApi'
export default {
  data () {
    return {
      newfaq: {
        que: '',
        ans: ''
      }
    }
  },
  computed: {
    disable () {
      if (this.newfaq.que === '' || this.newfaq.ans === '') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    addfaq () {
      let par = {
        que: this.newfaq.que,
        ans: this.newfaq.ans
      }
      NewFaq(par).then(res => {
        this.$notify({
          title: '成功！',
          type: 'success',
          message: res.data.msg,
          offset: 100
        })
        this.$router.push('/admin/mangeFAQ/all')
      })
    },
    $imgAdd (pos, $file) {
      // 第一步.将图片上传到服务器.
      let formdata = new FormData()
      formdata.append('file', $file)
      UploadFile(formdata)
      .then(url => {
        // console.log(url)
        // console.log(this.addprod.info)
        // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
        this.$refs.md.$img2Url(pos, url.data)
      })
    },
    $imgDel (pos) {
      delete this.img_file[pos]
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../common/less/index.less';
@import '../../../common/css/init.css';
.section {
  .box {
    .learncontent;
    text-align: left;
    .tit {
      text-align: center;
    }
  }
}
</style>