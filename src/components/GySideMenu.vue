<!-- 侧边栏 menu 组件 -->
<script setup lang="ts">
  const indicatorBarRef = ref()
  const ulWrapper = ref()
  const selectedMenu = ref(0)

  /**
   * 指示条位置变换
   * @param i
   */
  const changeTranslateY = (i: number) => {
    selectedMenu.value = i
    const currentLi = ulWrapper.value.children[i] as HTMLDivElement
    indicatorBarRef.value.style.transform = `translateY(${currentLi.offsetTop - 40}px)`
  }

  /**
   * 选中菜单颜色变换
   */
  const changeColor = (val: number) => (selectedMenu.value === val ? '#3f8cff' : '#7d8592')
</script>

<template>
  <div class="gy-side-menu">
    <gy-logo style="margin: 0 16px" />
    <ul ref="ulWrapper">
      <li :style="{ color: changeColor(0) }" @click="changeTranslateY(0)">
        <el-icon :size="22"><Management /></el-icon>
        <span>仪表盘</span>
      </li>
      <li :style="{ color: changeColor(1) }" @click="changeTranslateY(1)">
        <el-icon :size="22"><Management /></el-icon>
        <span>项目</span>
      </li>
      <li :style="{ color: changeColor(2) }" @click="changeTranslateY(2)">
        <el-icon :size="22"><Management /></el-icon>
        <span>工具</span>
      </li>
      <li :style="{ color: changeColor(3) }" @click="changeTranslateY(3)">
        <el-icon :size="22"><Management /></el-icon>
        <span>几何学</span>
      </li>
      <li ref="indicatorBarRef">
        <div></div>
        <div></div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'GySideMenu',
  }
</script>

<style scoped lang="scss">
  .gy-side-menu {
    background-color: #fff;
    border-radius: 24px;
    height: 100%;
    margin: 0;
    padding-top: 40px;

    > ul {
      padding: 40px 0 40px 16px;
      list-style-type: none;
      margin: 0;
      position: relative;

      > li {
        width: 100%;
        height: 54px;
        padding-left: 8px;
        line-height: 54px;
        cursor: pointer;
        display: flex;
        align-items: center;
        transition: all 0.3s ease-in-out;
        > i {
          margin-right: 16px;
        }
        > span {
          font-size: 16px;
          font-family: 'PingFang SC';
        }
      }

      > li:last-child {
        height: 44px;
        width: 184px;
        justify-content: space-between;
        padding-left: 0;
        position: absolute;
        top: 45px;
        > div:nth-child(1) {
          background-color: rgb(63 147 255 / 10%);
          border-radius: 10px;
          height: 100%;
          width: calc(100% - 10px);
        }

        > div:nth-child(2) {
          height: 100%;
          width: 4px;
          border-radius: 999px;
          background-color: #3f8cff;
        }
      }
    }
  }
</style>
