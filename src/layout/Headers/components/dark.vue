<template>
  <el-switch @click="toggleDark()" v-model="isdark" class="mt-2" style="margin-left: 24px;" inline-prompt
    :active-icon="Moon" active-value="dark" inactive-value="auto" :inactive-icon="Sunny" />
</template>
<script lang="ts" setup>
import { Moon, Sunny } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { toggleDark } from '@/composables'
const isdark = ref(
  localStorage.getItem('vueuse-color-scheme')
)
</script>

<style scoped>
</style>
