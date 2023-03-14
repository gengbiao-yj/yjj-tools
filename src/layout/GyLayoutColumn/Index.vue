<!-- 分栏布局 -->
<template>
  <el-container style="height: 100%">
    <el-aside width="200px">
      <gy-side-menu />
    </el-aside>
    <el-main>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </el-main>
  </el-container>
</template>

<script lang="ts">
  import GySideMenu from '_components/GySideMenu.vue'

  export default {
    name: 'Index',
    components: { GySideMenu },
  }
</script>

<style scoped lang="scss"></style>
