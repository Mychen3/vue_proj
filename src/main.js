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
//  请求拦截
Axios.interceptors.request.use(config => {
  // 将token保存到config里做预处理 为请求头对象 添加token验证authorization字段
  config.headers.authorization = window.sessionStorage.getItem('token')
  // 在最后必须反回config
  return config
})
Vue.prototype.$axios = Axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
