import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import test from './test'
import user from './user'
import catagory from './catagory'

// axios.defaults.transformRequest = [function (data) {
//     let ret = ''
//     for (let it in data) {
//       ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//     }
//     return ret
// }]

Vue.use(Vuex)
Vue.prototype.$http = axios

const store = new Vuex.Store({
  modules: {
    test, user,catagory
  }
})

export default store