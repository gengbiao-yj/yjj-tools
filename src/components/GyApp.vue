<!-- router view 根组件 -->
<template>
  <el-config-provider
    :button="{
      autoInsertSpace: true,
    }"
    :locale="locale"
  >
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </el-config-provider>
</template>

<script>
  export default {
    name: 'GyApp',
  }
</script>

<style scoped></style>
