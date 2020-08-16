<template>
  <div>
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--  卡片视图区-->
    <el-card class="box-card">
      <!-- 搜索于添加区-->
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="queryList.query" clearable @clear="getUserlist">
            <el-button slot="append" icon="el-icon-search" @click="getUserlist"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" round @click="addDialog=true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userlist" border>
        <el-table-column type="index" label="编号" width="70px" align="center"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态" align="center">
          <!-- 作用域插槽 获取每一行数据-->
          <template slot-scope="scope">
            <!-- 当前行数据的获取也会用到插槽,scope相当于一行的数据， scope.row相当于当前行的数据对象,-->
            <el-switch @change="userStatech(scope.row)" v-model="scope.row.mg_state" active-color="#13ce66"
                       inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作 " align="center">
          <template slot-scope="scope">
            <!-- 修改按钮   根据scope.row拿到这一行id-->
            <el-button type="danger" icon="el-icon-edit" size="mini" @click="showUpdate(scope.row.id)"></el-button>
            <!--删除按钮 -->
            <el-button type="warning" icon="el-icon-delete" size="mini"
                       @click="showDeleteByid(scope.row.id)"></el-button>
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-share" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryList.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryList.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalpage">
      </el-pagination>
    </el-card>
    <!--  添加用户的对话框-->
    <el-dialog title=" 添加用户" :visible.sync="addDialog" width="50%" @close="addClose">
      <!--表单-->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialog=false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
    </el-dialog>
    <!-- 修改用户的对话框-->
    <el-dialog title="修改用户" :visible.sync="editupd" width="50%" @close="editupdClear">

      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editupd = false">取 消</el-button>
    <el-button type="primary" @click="editFormUpate">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        // 添加表单的验证的规则对象
        addFormRules: {
          username: [
            {
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 10,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 5,
              max: 15,
              message: '长度在 5 到 15 个字符',
              trigger: 'blur'
            }
          ],
          email: [
            {
              required: true,
              message: '请输入邮箱',
              trigger: 'blur'
            },
            {
              min: 5,
              max: 20,
              message: '长度在 5 到 20 个字符',
              trigger: 'blur'
            }
          ],
          mobile: [
            {
              required: true,
              message: '请输入手机号',
              trigger: 'blur'
            },
            {
              min: 5,
              max: 20,
              message: '长度在 5 到 20 个字符',
              trigger: 'blur'
            }
          ]
        },
        // 添加用户的表单数据
        addForm: {
          username: '',
          password: '',
          email: '',
          mobile: ''
        },
        // 控制添加用户对话框的显示和隐藏
        addDialog: false,
        // 获取用户列表参数对象
        queryList: {
          query: '',
          // 当前的页数
          pagenum: 1,
          // 当前每页显示数据
          pagesize: 5
        },
        userlist: [],
        totalpage: 0,
        // 控制修改用户对话框的显示和隐藏
        editupd: false,
        // 修改通过id查询到的用户信息保存对象
        editForm: {},
        // 修改表单验证规则对象
        editFormRules: {
          email: [
            {
              required: true,
              message: '请输入邮箱',
              trigger: 'blur'
            },
            {
              min: 5,
              max: 20,
              message: '长度在 5 到 20 个字符',
              trigger: 'blur'
            }
          ],
          mobile: [
            {
              required: true,
              message: '请输入手机号',
              trigger: 'blur'
            },
            {
              min: 5,
              max: 20,
              message: '长度在 5 到 20 个字符',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    created () {
      this.getUserlist()
    },
    methods: {
      async getUserlist () {
// 携带参数
        const res = await this.$axios.get('users', { params: this.queryList })
        console.log(res)
        if (res.data.meta.status !== 200) {
          this.$message.error('获取用户失败')
        } else {
          this.userlist = res.data.data.users
          this.totalpage = res.data.data.total
        }
      },
      // 监听pagesize改变的事件 每页显示条数
      handleSizeChange (newSize) {
        this.queryList.pagesize = newSize
        this.getUserlist()
      },
      // 监听 当前页码值 改变的事件
      handleCurrentChange (newPage) {
        this.queryList.pagenum = newPage
        this.getUserlist()
      },
      // 监听用户状态的改变
      async userStatech (userinfo) {
        const rse = await this.$axios.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
        if (rse.data.meta.status !== 200) {
          userinfo.mg_state = false
          return this.$message.error('更新用户状态失败')
        } else {
          this.$message.success('更新用户状态成功！')
        }
      },
      // 监听添加用户对话框的关闭事件 重置按钮 调用表单的引用ref
      addClose () {
        this.$refs.addFormRef.resetFields()
      },
      // 添加用户点击确认按钮确定预校验
      addUser () {
        this.$refs.addFormRef.validate(async valid => {
          if (!valid) return
          // 发起添加请求
          const res = await this.$axios.post('users', this.addForm)
          console.log(res)
          if (res.data.meta.status !== 201) {
            this.$message.error('添加失败')
          } else {
            this.$message.success('添加成功')
            // 隐藏添加对话框
            this.addDialog = false
            // 刷新列表 重新获取用户列表
            this.getUserlist()
          }
        })
      },
      // 修改用户
      async showUpdate (id) {
        const res = await this.$axios.get('users/' + id)
        if (res.data.meta.status !== 200) {
          this.$message.error('查询失败')
        } else {
          this.editForm = res.data.data
          this.$message.success('查询成功')
        }
        this.editupd = true
      },
      // 监听修改用户对话框的关闭事件
      editupdClear () {
        this.$refs.editFormRef.resetFields()
      },
      // 修改用户表单确定的预验证
      editFormUpate () {
        this.$refs.editFormRef.validate(async valid => {
          if (!valid) return
          // 发起修改请求
          const res = await this.$axios.put('users/' + this.editForm.id, {
            email: this.editForm.email,
            mobile: this.editForm.mobile
          })
          if (res.data.meta.status !== 200) {
            this.$message.error('修改失败')
          } else {
            // 关闭对话框
            this.editupd = false
            // 刷新列表
            this.getUserlist()

            this.$message.success('修改成功')
          }
        })
      },
      // 删除用户事件
      async showDeleteByid (id) {
        console.log(id)
        // 弹窗提示
        await this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$axios.delete('users/' + id)
          if (res.data.meta.status !== 200) {
            console.log(res)
            this.$message.error('删除失败')
          } else {
            // 关闭对话框
            this.editupd = false
            // 刷新列表
            this.getUserlist()
            this.$message.success('删除成功')
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  }
</script>

<style scoped lang="less">

</style>
