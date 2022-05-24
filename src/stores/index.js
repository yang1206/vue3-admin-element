import { createPinia } from 'pinia'
import { useUserStore } from './modules/useUseStore'
import { useAppStore } from './modules/useAppStore'
const pinia = createPinia()
export { useUserStore, useAppStore }
export default pinia