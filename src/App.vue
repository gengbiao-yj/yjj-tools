<script setup>
  import { ref, reactive, watch } from 'vue'
  import { Edit } from '@element-plus/icons-vue'

  const containerRef = ref()
  const formValue = reactive({
    text: '陕西环玉食品科技有限公司',
    rotate: 0,
    size: 1,
  })

  const addCanvasWater = {
    open(Transparent = 0.4) {
      const strArr = formValue.text
      const ctx = document.createElement('canvas')
      ctx.style.display = 'none'
      const cans = ctx.getContext('2d')

      // 计算设备DPI用于图片高清处理
      const devicePixelRatio = window.devicePixelRatio || 1
      const backingStoreRatio =
        cans.webkitBackingStorePixelRatio ||
        cans.mozBackingStorePixelRatio ||
        cans.msBackingStorePixelRatio ||
        cans.oBackingStorePixelRatio ||
        cans.backingStorePixelRatio ||
        1
      let ratio = devicePixelRatio / backingStoreRatio //设备像素比
      if (ratio > 3) {
        ratio = 2
      }
      sessionStorage.DPI = parseInt(ratio) // 存储 dpi 用于其他界面img的适配
      // 放大画布
      ctx.width = 324 * ratio
      ctx.height = 144 * ratio

      cans.rotate((-35 * Math.PI) / 180)
      cans.font = `bold ${18 * ratio}px simsun` // 放大字体
      cans.fillStyle = `rgba(17, 17, 17, ${Transparent})`
      cans.textAlign = 'left'
      cans.textBaseline = 'Middle'
      cans.fillText(strArr, 0 * ratio, 178 * ratio) // 确定轨迹
      cans.save()
      const isAddWaterMark = document.getElementsByClassName('watermark')
      if (!!isAddWaterMark && isAddWaterMark.length == 0) {
        const watermark = document.createElement('div')
        const styleStr = `
            position:fixed;
            top:0px;
            left:0;
            width:100vw;
            height:100vh;
            z-index:2000;
            pointer-events:none;
            background-repeat:repeat;
            mix-blend-mode: multiply;
            background-image:url('${ctx.toDataURL('image/png')}');
            background-size: 324px 144px;
            ` // 背景图片固定压缩至 270px 100px

        watermark.setAttribute('style', styleStr)
        watermark.classList.add('watermark')
        document.body.appendChild(watermark)
        // 防止点击穿透
        watermark.addEventListener('touchend', (e) => {
          e.preventDefault()
        })
      }
    },
    close() {
      const watermark = document.querySelector('.watermark')
      if (watermark) {
        document.body.removeChild(watermark)
      }
    },
  }

  addCanvasWater.open()

  // 水印文字修改
  const textChange = () => {
    addCanvasWater.close()
    addCanvasWater.open()
  }

  const jpg = ref()
  // 图片角度修改
  watch(
    () => formValue.rotate,
    () => {
      jpg.value.style.transform = `rotate(${formValue.rotate}deg)`
    }
  )

  // 图片尺寸缩放
  watch(
    () => formValue.size,
    (val) => {
      const initJpgWidth = jpg.value.naturalWidth
      const initJpgHeight = jpg.value.naturalHeight
      jpg.value.style.width = `calc(${initJpgWidth}px * ${val})`
      jpg.value.style.height = `calc(${initJpgHeight}px * ${val})`
    }
  )

  const fileList = ref([])
  const imgFile = ref()
  const checkFile = (file) => {
    // reader.readAsDataURL(file.file.file);
    // reader.onload = () => {
    //   imgFile.value = reader.result;
    // };

    imgFile.value = URL.createObjectURL(file)
    return false
  }

  const showModal = ref(false)
</script>

<template>
  <div ref="containerRef" class="img-box">
    <el-button class="tool-btn" :icon="Edit" @click="showModal = true">工具2</el-button>

    <img ref="jpg" alt="" class="img" draggable="true" :src="imgFile" />

    <el-dialog v-model="showModal" draggable :modal="false" title="水印工具">
      <el-form ref="formRef" label-position="left" :label-width="120" size="default">
        <el-form-item label="水印文字">
          <el-input
            v-model="formValue.text"
            :maxlength="13"
            placeholder="输入内容"
            show-word-limit
            @change="textChange"
          />
        </el-form-item>
        <el-form-item label="图片角度">
          <el-slider v-model="formValue.rotate" :max="360" :min="0" :step="1" />
          <el-input-number v-model="formValue.rotate" :max="360" :min="0" size="small" :step="1" />
        </el-form-item>
        <el-form-item label="图片缩放">
          <el-slider v-model="formValue.size" :max="5" :min="0" :step="0.01" />
          <el-input-number v-model="formValue.size" :max="5" :min="0" size="small" :step="0.01" />
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            v-model:file-list="fileList"
            accept="image/*"
            :before-upload="checkFile"
            :limit="1"
          >
            <el-button>上传文件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
  .img-box {
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    border: 4px solid #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: antiquewhite;
    position: relative;

    &::v-deep(.el-dialog) {
      width: 500px;
      height: 800px;
      z-index: 3200;
    }
  }

  img {
    cursor: pointer;
  }

  .el-slider {
    width: 200px;
    margin-right: 5px;
  }

  .el-input {
    width: 320px;
  }

  .tool-btn {
    position: absolute;
    top: 10px;
    right: 25px;
    z-index: 3002;
  }
</style>
