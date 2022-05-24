<template>
  <div>
    <el-dropdown>
      <el-avatar src="https://s2.loli.net/2022/05/12/gxRJwmb1ClQPoGe.jpg" />

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

  </div>
</template>
<script  setup>
import { useUserStore } from '@/stores/index.js'
const userStore = useUserStore()
const logout = () => {
  ElMessageBox.confirm(
    '确认要退出登录吗？',
    {
      confirmButtonText: '退出',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    userStore.logout()
  }).catch(() => {

  })
}
</script>

<style scoped>
</style>
