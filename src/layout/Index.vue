<script setup lang="ts">
  import gyLayoutColumn from '@/layout/GyLayoutColumn/index.vue'
</script>

<template>
  <div class="gy-tools-wrapper">
    <component :is="gyLayoutColumn" />
    <el-backtop target="#app" />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Index',
  }
</script>

<style scoped lang="scss">
  .gy-tools-wrapper {
    width: 100vw;
    height: 100vh;
    background-color: #f3f9fd;
    padding: 20px 16px;
  }
</style>
