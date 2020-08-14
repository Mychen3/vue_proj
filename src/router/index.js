import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/home',
      component: Home
    }
  ]
})
//   挂载路由导航守卫
router.beforeEach((to, from, next) => {
//  to即将要进入的目标 路由对象   from: 代表从哪个路径跳转而来  next是一个函数表示放行  next('/lohin')强制跳转
  if (to.path === '/login') return next()
//  获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router
