import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store/index'

//显示的设置域名，来与iframe交互获取页面
document.domain = location.hostname
createApp(App).use(store).mount('#app')
