import Vue from 'vue'
import Router from 'vue-router'

//index页面
import index from 'component/index/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    }
  ]
})
