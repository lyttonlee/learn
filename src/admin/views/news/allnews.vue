<template>
  <div class="section">
    <!-- 网站基本设置 -->
    <div class="box">
      <h4>所有新闻动态</h4>
      <el-table
        :data="news">
        <el-table-column
          min-width="20%"
          prop="date"
          label="日期">
        </el-table-column>
        <el-table-column
          min-width="30%"
          prop="title"
          label="新闻标题">
        </el-table-column>
        <el-table-column
          min-width="30%"
          prop="img"
          label="图片">
          <template slot-scope="scope">
            <img class="table-img" :src="scope.row.img" alt="">
          </template>
        </el-table-column>
        <el-table-column
          min-width="20%"
          label="操作">
          <template slot-scope="scope">
            <el-button
              type="danger"
              @click="EditNews(scope.$index, scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 修改新闻 -->
      <el-dialog title="修改新闻" :visible.sync="dialogFormVisible" width="90%">
        <el-form ref="editnews" label-position="top" :rules="addnewsRules" :model="editnews">
          <el-form-item label="新闻标题" prop="title">
            <el-input v-model="editnews.title" placeholder="请输入标题"></el-input>
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
            <qiniu-upload :key="img" :url="img" width="300" height="200" fontSize="50" ref="newsupload"></qiniu-upload>
          </el-form-item>
          <el-form-item label="新闻内容" prop="info">
            <mavon-editor  ref="md" @imgAdd="$imgAdd" @imgDel="$imgDel" v-model="editnews.info"></mavon-editor>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="exitEdit">取 消</el-button>
          <el-button type="primary" @click="submitEdit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {GetNews, EditNews} from '../../../api/adminApi'
import {UploadFile} from '../../../api/api'
export default {
  data () {
    return {
      news: [],
      editnews: {},
      img: '',
      dialogFormVisible: false,
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
    allnews () {
      GetNews().then(res => {
        console.log(res)
        this.news = res.data
      })
    },
    EditNews (row, rowIndex) {
      this.dialogFormVisible = true
      this.editnews = rowIndex
      this.img = rowIndex.img
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
    },
    // 退出修改
    exitEdit () {
      this.dialogFormVisible = false
    },
    // 确认修改并提交
    submitEdit () {
      this.$refs.editnews.validate(valid => {
        if (valid) {
          const updatedParams = {
            id: this.editnews._id,
            title: this.editnews.title,
            info: this.editnews.info,
            img: this.$refs.newsupload.imageUrl
          }
          EditNews(updatedParams).then(res => {
            this.$notify({
              title: '修改成功',
              message: res.data.msg,
              type: 'success',
              offset: 100
            })
            this.allnews()
            this.dialogFormVisible = false
          })
        } else {
          this.$message({
            type: 'danger',
            message: '请验证后再提交修改'
          })
        }
      })
    }
  },
  mounted () {
    this.allnews()
  }
}
</script>

<style lang="less" scoped>
@import '../../../common/less/index.less';
@import '../../../common/css/init.css';
.section {
  .box {
    .learncontent;
    .el-table {
      .table-img {
        width: 120px;
      }
    }
    .el-dialog {
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
}
</style>