import Vue from 'vue'
import axios from 'axios'
import { INCREMENT, DECREMENT } from './mutation-types';

Vue.prototype.$http = axios

const test  = {
  state: {      //全局状态
    count: 0
  },
  getters: {       //对状态进行过滤

  },
  mutations: {     //改变全局状态,否则会丢失数据 
    INCREMENT (state) {
      state.count++
    },
    DECREMENT(state){
      state.count--
    }
  },
  actions: {    //放业务逻辑, 相比mutations包含异步操作, context 是 state 的父级，包含  state、getters
    async myIncrease(context) {
      context.commit(INCREMENT)
      const login = await axios.get('http://111.230.231.12:8888/weteamjava/adminCustomer_findAll')
      .then(function (response) {
          return response
      })
      .catch(function (error) {
        console.log(error)
      })
      return login;
    },
    myDecrease(context) {
      context.commit(DECREMENT)
    }
  }
}

export default test