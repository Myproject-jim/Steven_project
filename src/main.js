// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import VueSweetalert2 from './plugins/vue-sweetalert2'
import anime from 'vue-animejs'
import animated from 'animate.css' 
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
// import { Button, message } from 'ant-design-vue';
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(ViewUI)
Vue.use(VueSweetalert2)
Vue.use(anime)
Vue.use(animated)
Vue.use(Antd)
// Vue.use(Button);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
