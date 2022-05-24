import { watch } from 'vue'
import { useAppStore } from '@/stores/index.js'

export const watchLang = (...cbs) => {
  const appStore = useAppStore()
  watch(
    () => appStore.lang,
    () => {
      cbs.forEach((cb) => cb(appStore.lang))
    },
    { deep: true }
  )
}
