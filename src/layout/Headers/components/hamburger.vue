<template>
  <div class="hamburger-container" id="hamburger" @click="toggleClick">
    <el-icon v-if="!icon">
      <Expand />
    </el-icon>
    <el-icon v-else>
      <Fold />
    </el-icon>
  </div>
</template>
<script  setup>
import { Expand, Fold } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore()
const toggleClick = () => {
  store.commit('app/changeSiderType')
}
const icon = computed(() => {
  return store.getters.siderType
})
</script>
<style lang="scss" scoped>
.hamburger-container {
  margin-right: 16px;
  box-sizing: border-box;
  cursor: pointer;
  font-size:16px;
  &:active{
    font-size:18px
  }
}
</style>
