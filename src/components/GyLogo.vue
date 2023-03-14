<!-- logo 组件 -->
<script setup lang="ts"></script>

<template>
  <div v-bind="$attrs" class="gy-logo">GIY</div>
</template>

<script lang="ts">
  export default {
    name: 'GyLogo',
  }
</script>

<style scoped lang="scss">
  .gy-logo {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    background-color: #3f8cff;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    font-weight: bolder;
    color: #fff;
  }
</style>
