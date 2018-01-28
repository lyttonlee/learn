<template>
  <div class="section">
    <div class="box">
      <h4>添加关于我们新内容</h4>
      <el-form ref="newabout" :model="newabout" :rules="aboutrules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="newabout.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="图片300*300">
          <el-upload
            class="img"
            action="/learn/upload"
            :show-file-list="false"
            :on-success="imgSuccess"
            :before-upload="beforeUpload">
            <img v-if="img" :src="img" class="cur-image">
            <i v-else class="el-icon-plus uploader-icon"></i>
          </el-upload>
        </el-form-item>
        
        <el-form-item label="内容" prop="subtext">
          <el-input v-model="newabout.subtext" type="textarea" :rows="2" clearable placeholder="请输入内容100字左右"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="addabout">添加关于我们</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {NewAbout} from '../../../api/adminApi'
export default {
  // ..
  data () {
    return {
      newabout: {
        title: '',
        subtext: ''
      },
      img: '',
      aboutrules: {
        title: [
          {
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          },
          {
            min: 4,
            max: 8,
            message: '长度在 4 到 8 个字',
            trigger: 'blur'
          }
        ],
        subtext: [
          {
            required: true,
            message: '请输入内容',
            trigger: 'blur'
          },
          {
            min: 50,
            max: 100,
            message: '长度在 50 到 100 个字',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    imgSuccess (res, file) {
      this.img = res
    },
    beforeUpload (file) {
      const isPIC = file.type === 'image/jpeg' || 'image/png'
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isPIC) {
        this.$message.error('上传图片只能是 JPG或PNG 格式!')
      }
      if (!isLt1M) {
        this.$message.error('上传图片大小不能超过 1MB!')
      }
      return isPIC && isLt1M
    },
    addabout () {
      console.log('new')
      this.$refs.newabout.validate(valid => {
        if (valid) {
          // ..
          let pars = {
            title: this.newabout.title,
            subtext: this.newabout.subtext,
            img: this.img
          }
          NewAbout(pars).then(res => {
            console.log(res)
            this.$notify({
              title: '成功',
              type: 'success',
              message: res.data.msg,
              offset: 200
            })
            this.$refs.newabout.resetFields()
            this.$router.push('/admin/siteoption/setabout')
          })
        } else {
          // err
          this.$notify({
            title: '警告!',
            type: 'warning',
            message: '请先完成验证',
            offset: 200
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../common/less/index.less';
.section {
  .box {
    .learncontent;
    .img {
      width: 300px;
      height: 300px;
      border: 1px dashed @color;
      border-radius: 15px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      .uploader-icon {
        font-size: 45px;
        color: #8c939d;
        line-height: 300px;
        text-align: center;
      }
      .cur-image {
        width: 100%;
      }
    }
  }
}
</style>