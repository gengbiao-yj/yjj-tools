import { defineStore } from 'pinia'
import { ref } from 'vue'
export default defineStore('basicPinia', () => {
  const count = ref<number>(0)

  return {
    count,
  }
})
