<template>
  <div class="menu">
      <el-menu :default-active="defaultActive" :router="true" :unique-opened="false"
        :collapse="!appStore.getSiderType">
        <el-sub-menu :index="item.id + ''" v-for="(item, index) in menusList" :key="item.id">
          <template #title>
            <el-icon>
              <component :is="iconList[index]"></component>
            </el-icon>
            <span>{{ item.authName }}</span>
          </template>
          <el-menu-item :index="'/' + i.path" v-for="i in item.children" :key="i.id" @click="savePath(i.path)">
            <template #title>
              <el-icon>
                <component :is="icon"></component>
              </el-icon>
              <span>{{ $t(`menus.${i.path}`) }}</span>
            </template>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/index'
import { menuList } from '@/api/meun'
const defaultActive = ref(sessionStorage.getItem('path') || '/users')
const appStore = useAppStore()
const iconList = ref(['user', 'setting', 'shop', 'tickets', 'pie-chart'])
const icon = ref('menu')
const menusList = ref()
//获取菜单数据
const iniMenusList = async () => {
  const res = await menuList()
  menusList.value = res
}
const savePath = (path) => {
  sessionStorage.setItem('path', `/${path}`)
}
iniMenusList()
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
