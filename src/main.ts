import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import vClickOutside from "click-outside-vue3"
import { useApplicationStore } from '@/store/modules/applicationModule'
import router from '@/router'



createApp(App).use(router).use(createPinia()).use(vClickOutside).mount('#app')

const ApplicationStore = useApplicationStore()

window.addEventListener('unhandledrejection', (evt: PromiseRejectionEvent) => {
  alert(evt.reason)
  ApplicationStore.SET_ERROR_DETAIL(evt.reason)
})

// unhandledrejection エラーハンドリングが効いているかテスト
// new Promise((resolve, reject) => {
//   noSuchFunction()
//   reject('hi')
// })
