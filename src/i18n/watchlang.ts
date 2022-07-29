import { watch } from 'vue'
import { useAppStore } from '@/stores/index'

export const watchLang = (...cbs: any[]) => {
  const appStore = useAppStore()
  watch(
    () => appStore.lang,
    () => {
      cbs.forEach((cb) => cb(appStore.lang))
    },
    { deep: true }
  )
}
