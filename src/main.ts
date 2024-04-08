// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
import ElementUI, { Message } from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)
Vue.use(ElementUI) //使用elementUI

// 全局路由构造函数，判断是否登录和要跳转到页面
router.beforeEach((to, from, next) => {

  if (localStorage.token) {
    next()
  } else if (to.path !== '/') {
    let token = localStorage.token;
    if (token === 'null' || token === '' || token === undefined) {
      next({ path: '/' })
      Message({ message: '检测到您还未登录,请登录后操作！', duration: 1500 })
    }
  } else {
    next()
  }
}
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
