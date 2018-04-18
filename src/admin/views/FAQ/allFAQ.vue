<template>
  <div class="section">
    <!-- 网站基本设置 -->
    <div class="box">
      <h4>所有帮助文档</h4>
      <el-table
        :data="faq">
        <el-table-column
          min-width="20%"
          prop="date"
          label="日期">
        </el-table-column>
        <el-table-column
          min-width="60%"
          prop="que"
          label="问题">
        </el-table-column>
        <el-table-column
          min-width="20%"
          label="操作">
          <template slot-scope="scope">
            <el-button
              type="danger"
              @click="EditFaq(scope.$index, scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 修改帮助文档 -->
      <el-dialog title="修改帮助文档" :visible.sync="dialogFormVisible" width="90%">
        <el-form ref="editfaq" label-position="top" :model="editfaq">
          <el-form-item label="问题">
            <el-input v-model="editfaq.que" placeholder="请输入问题"></el-input>
          </el-form-item>
        
          <el-form-item label="答案">
            <!-- <mavon-editor  ref="md" @imgAdd="$imgAdd" @imgDel="$imgDel" v-model="editfaq.ans"></mavon-editor> -->
            <md-upload :key="editfaq.ans" :info="editfaq.ans" ref="mdedit"></md-upload>
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
import {GetFaq, EditFaq} from '../../../api/adminApi'
// import {UploadFile} from '../../../api/api'
export default {
  data () {
    return {
      faq: [],
      editfaq: {},
      dialogFormVisible: false
    }
  },
  methods: {
    allfaq () {
      GetFaq().then(res => {
        // console.log(res)
        this.faq = res.data
      })
    },
    EditFaq (row, rowIndex) {
      this.dialogFormVisible = true
      this.editfaq = rowIndex
    },
    // 退出修改
    exitEdit () {
      this.dialogFormVisible = false
    },
    // 确认修改并提交
    submitEdit () {
      const updatedParams = {
        id: this.editfaq._id,
        que: this.editfaq.que,
        ans: this.$refs.mdedit.mdinfo
      }
      EditFaq(updatedParams).then(res => {
        this.$notify({
          title: '修改成功',
          message: res.data.msg,
          type: 'success',
          offset: 100
        })
        this.allfaq()
        this.dialogFormVisible = false
      })
    }
    // $imgAdd (pos, $file) {
    //   // 第一步.将图片上传到服务器.
    //   let formdata = new FormData()
    //   formdata.append('file', $file)
    //   UploadFile(formdata)
    //   .then(url => {
    //     // console.log(url)
    //     // console.log(this.addprod.info)
    //     // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
    //     this.$refs.md.$img2Url(pos, url.data)
    //   })
    // },
    // $imgDel (pos) {
    //   delete this.img_file[pos]
    // }
  },
  mounted () {
    this.allfaq()
  }
}
</script>

<style lang="less" scoped>
@import '../../../common/less/index.less';
@import '../../../common/css/init.css';
.section {
  .box {
    .learncontent;
  }
}
</style>