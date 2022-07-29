<template>
  <el-dropdown @command="handleCommand">
    <svg-icon icon-class="language"></svg-icon>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh" :disabled="currentLanguage === 'zh'">中文</el-dropdown-item>
        <el-dropdown-item command="en" :disabled="currentLanguage === 'en'">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lant="ts" setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { useAppStore } from '@/stores/index'
const appStore = useAppStore()
const i18n = useI18n()

const currentLanguage = computed(() => {
  return i18n.locale.value
})

const handleCommand = (val) => {
  appStore.changeLang(val)
  localStorage.setItem('lang', val)
  i18n.locale.value = val
}

</script>
<style scoped>
</style>
