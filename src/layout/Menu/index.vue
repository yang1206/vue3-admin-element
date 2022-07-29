<template>
  <el-menu active-text-color="#ffd04b" background-color="#304156" class="el-menu-vertical-demo"
    :default-active="defaultActive" text-color="#bfcbd9" router unique-opened :collapse="!appStore.getSiderType">
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
</template>
<script lang="ts" setup>
import { menuList } from '@/api/meun'
import { ref } from 'vue'
import { useAppStore } from '@/stores/index'
const defaultActive = ref(sessionStorage.getItem('path') || '/users')
const appStore = useAppStore()
const iconList = ref(['user', 'setting', 'shop', 'tickets', 'pie-chart'])
const icon = ref('menu')
const menusList = ref()
const iniMenusList = async () => {
  const res = await menuList()
  console.log(res);
  menusList.value = res
}

const savePath = (path) => {
  sessionStorage.setItem('path', `/${path}`)
}

iniMenusList()
</script>

<style lang="scss" scoped>
</style>
