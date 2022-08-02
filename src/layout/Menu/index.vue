<template>
  <div class="menu">
    <el-menu :default-active="defaultActive" :router="true" :unique-opened="false" :collapse="!appStore.getSiderType">
      <!-- 递归组件 -->
      <SubItem :menusList="menusList" />
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/index'
import { menuList } from '@/api/meun'
import SubItem from './components/SubItem.vue'
import { ImenuItem } from '@/stores/interface'
const defaultActive = ref(sessionStorage.getItem('path') || '/users')
const appStore = useAppStore()
//获取菜单数据
const iniMenusList = async () => {
  const res = await menuList()
  appStore.setMenuList(res)
}
const menusList = computed((): ImenuItem[] => appStore.menuList);
iniMenusList()
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
