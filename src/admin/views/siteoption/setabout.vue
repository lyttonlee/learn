<template>
  <div class="section">
    <div class="box">
      <h4>关于我们</h4>
      <el-table
        :data="abouts">
        <el-table-column
          min-width="20%"
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          min-width="20%"
          prop="img"
          label="图标">
          <template slot-scope="scope">
            <img class="table-img" :src="scope.row.img" alt="">
          </template>
        </el-table-column>
        <el-table-column
          min-width="40%"
          prop="subtext"
          label="内容">
        </el-table-column>
        <el-table-column
          min-width="20%"
          label="操作">
          <template slot-scope="scope">
            <el-button
              type="success"
              @click="Edit(scope.$index, scope.row)">修改</el-button>
              <el-button
              type="danger"
              @click="Delete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 修改管理员 -->
      <el-dialog title="修改关于我们" :visible.sync="dialogFormVisible">
        <el-form ref="editabout" :model="editabout" :rules="aboutrules">
          <el-form-item label="标题" prop="title">
            <el-input v-model="editabout.title" placeholder="请输入标题"></el-input>
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
            <el-input v-model="editabout.subtext" type="textarea" :rows="2" clearable placeholder="请输入内容100字左右"></el-input>
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
import {EditAbout, GetAbout, DeleteAbout} from '../../../api/adminApi'
export default {
  // ..
  data () {
    return {
      abouts: [],
      dialogFormVisible: false,
      editabout: {},
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
    // 获取内容
    getabouts () {
      GetAbout().then(res => {
        console.log(res)
        this.abouts = res.data
      })
    },
    // 修改
    Edit (row, rowIndex) {
      this.dialogFormVisible = true
      this.editabout = rowIndex
      this.img = rowIndex.img
    },
    // 退出修改
    exitEdit () {
      this.dialogFormVisible = false
    },
    // 确认修改并提交
    submitEdit () {
      this.$refs.editabout.validate(valid => {
        if (valid) {
          const updatedParams = {
            id: this.editabout._id,
            title: this.editabout.title,
            subtext: this.editabout.subtext,
            img: this.img
          }
          EditAbout(updatedParams).then(res => {
            this.$notify({
              title: '修改成功',
              message: res.data.msg,
              type: 'success',
              offset: 100
            })
            this.getabouts()
            this.dialogFormVisible = false
          })
        } else {
          this.$message({
            type: 'danger',
            message: '请验证后再提交修改'
          })
        }
      })
    },
    // 删除
    Delete (row, rowIndex) {
      this.$confirm('此操作将会删除该条关于我们, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DeleteAbout({id: rowIndex._id}).then(res => {
          this.$notify({
            title: '删除成功！',
            message: res.data.msg,
            type: 'success',
            offset: 100
          })
          this.getabouts()
        })
      }).catch(() => {
        this.$notify({
          title: '提醒',
          type: 'info',
          message: '已取消删除',
          offset: 200
        })
      })
    },
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
    }
  },
  mounted () {
    this.getabouts()
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
      .table-img{
        width: 100px;
        border-radius: 5px;
      }
    }
    .el-dialog {
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
}
</style>