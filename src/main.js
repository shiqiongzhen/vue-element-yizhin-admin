// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import store from './store'
import axios from 'axios'
import api from "./api/config"
import Qs from 'qs'
import global_ from './components/admin/Global'

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$http = axios
Vue.prototype.Qs = Qs
Vue.prototype.GLOBAL = global_
// require styles
Vue.use(ElementUI)
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;  

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  // store,
  // watch:{   
  //   '$route':'checkLogin'
  // },
  created() {
    // this.checkLogin();
  },
  methods:{
    // checkLogin(){
    //   // console.log("checkLogin")
    //   console.log(localStorage.getItem('userAccount'))
    //   if(!localStorage.getItem('userAccount')){
    //     //如果没有登录状态则跳转到登录页
    //     this.$router.push('/login');
    //   }
    // }
  }
})
