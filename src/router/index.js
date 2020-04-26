import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import Vuex from 'vuex'
import Seacch from '@/components/Seacch'
import top from '@/components/headnv/top'
Vue.use(Router)
Vue.use(Vuex)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/Seacch/',
      name: 'Seacch',
      component: Seacch
    },
    {
      path: '/top/',
      name: 'top',
      component: top
    },
  ]
})
