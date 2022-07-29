<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-bottom: 10px;">
        <el-col :span="7">
          <!-- 搜索与添加区域 -->
          <el-input placeholder="请输入管理员姓名进行搜索" clearable v-model="queryParams.query" @clear="getUsers">
            <template #append>
              <el-button :icon="Search" @click="getUsers" />
            </template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <!-- 添加用户区域 -->
          <el-button type="primary" @click="addDialogVisible = true">用户添加</el-button>
        </el-col>
      </el-row>
      <el-table :data="userList" border style="width: 100%">
        <el-table-column type="index" label="#" align="center" header-align="center" />
        <el-table-column prop="username" label="姓名" align="center" width="180" />
        <el-table-column prop="mobile" label="电话" align="center" />
        <el-table-column prop="role_name" label="角色" align="center" />
        <el-table-column prop="email" label="邮箱" align="center" />
        <el-table-column label="状态" align="center">
          <template #default="scope">
            <el-switch v-model="scope.row.mg_state" class="ml-2" active-color="#13ce66" inactive-color="#ff4949"
              @change="userStatuChanged(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template #default="scope">
            <el-tooltip class="box-item" effect="dark" content="编辑" placement="top-start">
              <el-button type="primary" @click="EditUser(scope.row.id)" :icon="Edit" />
            </el-tooltip>

            <el-popconfirm title="确认要删除吗?" @confirm="deleteUser(scope.row.id)">
              <template #reference>
                <el-button type="danger" :icon="Delete" />
              </template>
            </el-popconfirm>

            <el-tooltip class="box-item" effect="dark" content="分配角色" placement="top-start">
              <el-button type="warning" @click="setRoles(scope.row)" :icon="Setting" />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pagenum" v-model:limit="queryParams.limit"
        @pagination="handleChange" />
    </el-card>

    <!-- 添加 -->
    <el-dialog title="添加用户" v-model="addDialogVisible">
      <el-form label-width="70px" ref="addFormRef" :model="addForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮区域 -->
      <template #footer class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </template>
    </el-dialog>

    <!-- 修改 -->

    <el-dialog title="修改用户" v-model="editDialogVisible" width="50%">
      <el-form :model="editForm" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog title="分配角色" v-model="setRolesDialogVisible" width="50%">
      <div class="role-from">
        <p>当前的用户 : {{ userInfo.username }}</p>
        <p>当前的角色 : {{ userInfo.role_name }}</p>
        <p>
          分配新角色:
          <el-select v-model="selectRoleId" placeholder="请选择">
            <el-option v-for="item in rolesList" :key="item.id" :label="item.roleName" :value="item.id"> </el-option>
          </el-select>
        </p>
      </div>
      <template #footer class="dialog-footer">
        <el-button @click="setRolesDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRolesInfo">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import Pagination from '@/components/Pagination/index.vue'
import { UserList, UserChangeStatus, editUser, getUserinfo, addUserInfo, userDelete, getRoleList, setRole } from '@/api/views'
import { ref } from 'vue'
import { Delete, Edit, Setting, Search } from '@element-plus/icons-vue'

const userList = ref([])
const total = ref(0)
const pagenum = ref()
const queryParams = ref({
  query: '',
  pagenum: 1,
  pagesize: 10,
  limit: 10
})
// 添加表单数据
const addForm = ref({
  username: '',
  password: '',
  email: '',
  mobile: ''
})
// 编辑数据
const editForm = ref({
  username: '',
  email: '',
  mobile: ''
})
const selectRoleId = ref()
const user_id = ref(0)
const userInfo = ref({})
const rolesList = ref([])

const addDialogVisible = ref(false)
const editDialogVisible = ref(false)
const setRolesDialogVisible = ref(false)

// 表单数据
const getUsers = () => {
  UserList(queryParams.value).then((res) => {
    userList.value = res.users
    total.value = res.total
    pagenum.value = res.pagenum
  })
}
getUsers()

// 修改数据
const EditUser = (id) => {
  console.log(id)
  getUserinfo(id).then((res) => {
    editForm.value = res
  })
  editDialogVisible.value = true
  user_id.value = id
}
const editUserInfo = () => {
  editUser(user_id.value, editForm.value).then(() => {
    editDialogVisible.value = false
  })
}

// 删除数据
const deleteUser = (id) => {
  userDelete(id).then(() => {
    getUsers()
  })
}

// 修改状态
const userStatuChanged = (data) => {
  UserChangeStatus(data)
}

// 新增用户
const addUser = () => {
  addUserInfo(addForm.value).then(() => {
    addDialogVisible.value = false
    getUsers()
  })
}

// 分配角色
const setRoles = (data) => {
  userInfo.value = data
  user_id.value = data.id
  getRoleList().then((res) => {
    rolesList.value = res
  })
  setRolesDialogVisible.value = true
}
const saveRolesInfo = () => {
  if (!selectRoleId.value) {
    ElMessage.error('请选择角色')
  } else {
    setRole(user_id.value, { rid: selectRoleId.value }).then(() => {
      setRolesDialogVisible.value = false
      getUsers()
    })
  }
}

const handleChange = (newQuery) => {
  queryParams.value.pagesize = newQuery.limit
  queryParams.value.pagenum = newQuery.page
  getUsers()
}

</script>

<style lang="scss" scoped>
.role-from {
  display: flex;
  flex-direction: column;

  p {
    margin: 10px
  }
}
</style>
