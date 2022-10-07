<template>
    <template v-for="(subItem, index) in menusList" :key="subItem.id">
        <el-sub-menu v-if="subItem.children && subItem.children.length > 0" :index="subItem.id + ''">
            <template #title>
                <el-icon>
                    <component :is="iconList[index]"></component>
                </el-icon>
                <span>{{ subItem.authName }}</span>
            </template>
            <SubItem :menusList="subItem.children" />
        </el-sub-menu>
        <el-menu-item v-else :index="'/' + subItem.path" @click="savePath(subItem.path)">
            <template #title>
                <el-icon>
                    <component :is="icon"></component>
                </el-icon>
                <span>{{ $t(`menus.${subItem.path}`) }}</span>
            </template>
        </el-menu-item>
    </template>
</template>

<script lang="ts" setup>
const iconList = ref(['user', 'setting', 'shop', 'tickets', 'pie-chart'])
const icon = ref('menu')
defineProps<{ menusList: Array<any> }>()
const savePath = (path: string) => {
    sessionStorage.setItem('path', `/${path}`)
}
</script>
<style lang="scss" scoped>
@import "@/layout/Menu/index.scss";
</style>