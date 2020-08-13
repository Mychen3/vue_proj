import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'
//      手动配置ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
//    导入字体图标
import './assets/fonts/iconfont.css'
import Axios from 'axios'

Vue.use(ElementUI)
Vue.config.productionTip = false
Axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$axios = Axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
