<template>
    <el-container class="app-wrapper">
      <el-aside :width="asideWidth" class="sidebar-container">
        <Menu />
      </el-aside>
      <el-container class="container" :class="{ hidderContainer: !$store.getters.siderType }">
        <el-header>
          <Header />
        </el-header>
        <el-main>

          <!-- 给路由切换加入动画，需要给每个页面加入根元素 -->
          <router-view v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in">
              <component :is="Component" :key="route.path" />
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
</template>
<script setup>
import Menu from './Menu/index.vue'
import Header from './Headers/index.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useStore()

const asideWidth = computed(() => {
  return store.getters.siderType ? '210px' : '67px'
})
</script>
<style lang="scss" scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.container {
  width: calc(100% - $sideBarWidth);
  height: 100%;

  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  transition: all 0.28s;

  &.hidderContainer {
    width: calc(100% - $hideSideBarWidth);
  }
}

:deep(.el-header) {
  padding: 0;
}

</style>
