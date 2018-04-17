<template>
  <div class="section">
    <!-- 网站基本设置 -->
    <div class="box">
      <h4>新增新闻动态</h4>
      <el-form ref="addnews" label-position="top" :rules="addnewsRules" :model="addnews">
        <el-form-item label="新闻标题" prop="title">
          <el-input v-model="addnews.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="标题图片">
          <!-- <el-upload
            class="img"
            action="/learn/upload"
            :show-file-list="false"
            :on-success="imgSuccess"
            :before-upload="beforeUpload">
            <img v-if="img" :src="img" class="cur-image">
            <i v-else class="el-icon-plus uploader-icon"></i>
          </el-upload> -->
          <qiniu-upload width="300" height="200" fontSize="50" ref="newsupload"></qiniu-upload>
        </el-form-item>
        <el-form-item label="新闻内容" prop="info">
          <mavon-editor  ref="md" @imgAdd="$imgAdd" @imgDel="$imgDel" v-model="addnews.info"></mavon-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" round @click="AddNews">确认添加</el-button>
          <el-button type="primary" round @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {UploadFile} from '../../../api/api'
import {NewNews} from '../../../api/adminApi'
export default {
  data () {
    return {
      addnews: {
        title: '',
        info: ''
      },
      img: '',
      addnewsRules: {
        title: [
          {
            required: true,
            message: '请添加新闻标题',
            trigger: 'blur'
          },
          {
            min: 8,
            max: 30,
            message: '长度在 8 到 30 个字',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
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
    },
    AddNews () {
      this.$refs.addnews.validate(valid => {
        if (valid) {
          let par = {
            title: this.addnews.title,
            img: this.$refs.newsupload.imageUrl,
            info: this.addnews.info
          }
          NewNews(par).then(res => {
            console.log(res)
            this.$notify({
              title: '成功！',
              type: 'success',
              message: res.data.msg,
              offset: 200
            })
            this.$router.push('/admin/mangenews/allnews')
          })
        } else {
          console.log('需验证')
        }
      })
    },
    reset () {
      this.$refs.addnews.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../common/less/index.less';
@import '../../../common/css/init.css';
.section {
  .box {
    text-align: left;
    .learncontent;
    h4 {
      text-align: center;
    }
    .img {
      width: 400px;
      height: 200px;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      .cur-image {
        width: 100%;
      }
      .uploader-icon {
        font-size: 45px;
        color: #8c939d;
        width: 400px;
        height: 200px;
        line-height: 200px;
        text-align: center;
      }
    }
  }
}
</style>