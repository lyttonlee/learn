<template>
<div class="section">
  <div class="serch">
    <h4>搜索管理员</h4>
    <el-input class="serch-input" v-model="adminerName" placeholder="请输入确切的管理员姓名">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
    <el-button class="serch-btn" @click="SerchAdminer" :disabled="disable" type="primary">搜索</el-button>
  </div>
  <div class="alladminers">
    <h4>管理员列表</h4>
    <el-table
    :data="adminers">
    <el-table-column
      min-width="20%"
      prop="time"
      label="添加日期"
      width="180">
    </el-table-column>
    <el-table-column
      min-width="20%"
      prop="name"
      label="管理员姓名"
      width="180">
    </el-table-column>
    <el-table-column
      min-width="20%"
      prop="role"
      label="管理员级别">
    </el-table-column>
    <el-table-column
      min-width="20%"
      prop="avatar"
      label="管理员头像">
      <template slot-scope="scope">
        <img class="table-avatar" :src="scope.row.avatar" alt="">
      </template>
    </el-table-column>
    <el-table-column
      min-width="20%"
      label="操作">
       <template slot-scope="scope">
        <el-button
          type="danger"
          @click="EditAdminer(scope.$index, scope.row)">修改</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 修改管理员 -->
  <el-dialog title="修改管理员" :visible.sync="dialogFormVisible">
    <el-form ref="editadminer" :rules="addadminerRules" :model="adminer">
      <el-form-item prop="name">
        <el-input v-model="adminer.name" placeholder="管理员姓名"></el-input>
      </el-form-item>
      <el-form-item prop="role">
        <el-select v-model="adminer.role" placeholder="请设置管理员角色">
          <el-option label="超级管理员" value="超级管理员"></el-option>
          <el-option label="管理员" value="管理员"></el-option>
          <el-option label="发货员" value="发货员"></el-option>
          <el-option label="商品管理员" value="商品管理员"></el-option>
        </el-select>
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
import {GetAdminer, EditAdminer} from '../../../api/adminApi'
export default {
  // ..
  data () {
    return {
      adminers: [],
      dialogFormVisible: false,
      adminer: '',
      adminerName: '',
      addadminerRules: {
        name: [
          {
            required: true,
            message: '管理员姓名是必须的',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 5,
            message: '长度在 2 到 5 个字',
            trigger: 'blur'
          }
        ],
        role: [
          {
            required: true,
            message: '管理员角色是必须选择的',
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {
    disable () {
      if (this.adminerName.length !== 0) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    SerchAdminer () {
      let SerchParams = {
        name: this.adminerName
      }
      GetAdminer(SerchParams).then(res => {
        // console.log(res)
        if (res.data.length === 0) {
          this.$notify({
            type: 'warning',
            title: '警告！',
            message: '没有找到符合的管理员，请确认姓名！',
            offset: 200
          })
        } else {
          this.adminers = res.data
        }
        this.adminerName = ''
      })
    },
    // 修改管理员
    EditAdminer (row, rowIndex) {
      // console.log(row, rowIndex)
      this.dialogFormVisible = true
      this.adminer = rowIndex
    },
    // 退出修改管理员
    exitEdit () {
      this.dialogFormVisible = false
    },
    // 确认修改并提交
    submitEdit () {
      this.$refs.editadminer.validate(valid => {
        if (valid) {
          const updatedParams = {
            id: this.adminer._id,
            name: this.adminer.name,
            role: this.adminer.role
          }
          EditAdminer(updatedParams).then(res => {
            this.$notify({
              title: '管理员修改成功',
              message: res.data.name,
              type: 'success',
              offset: 100
            })
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
    const adminparams = {
      type: 'all'
    }
    GetAdminer(adminparams).then(res => {
      // console.log(res)
      this.adminers = res.data.adminers
    })
  }
}
</script>
<style lang="less" scoped>
@import '../../../common/less/index.less';
.serch {
  .learncontent;
  .serch-input {
    width: 70%;
  }
  .serch-btn {
    width: 29%;
  }
}
.alladminers {
  .learncontent;
  .el-table {
    .warning-row {
      background: rgba(196, 144, 84, 0.6)
    }
    .success-row {
      background: rgba(136, 175, 91, 0.6)
    }
    .table-avatar {
      width: 50px;
      border-radius: 25px; 
    }
  }
  .el-dialog {
    .el-select {
      width: 100%;
    }
  }
  
}
</style>


