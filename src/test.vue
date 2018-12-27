<template>
  <div id="app">
    {{count}}
    <button @click="increment"> + </button>
    <button @click="decrement"> - </button>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { INCREMENT, DECREMENT } from '@/store/mutation-types';

export default {
  name: 'App',
  data() {
    return {};
  },
  computed: {
    // ...mapState(["count"])
    ...mapState({
      count: state  => {
        return state.test.count
      }
    })
  },
  methods: {
    ...mapMutations([INCREMENT, DECREMENT]),
    ...mapActions(['myIncrease', 'myDecrease']),   // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
    async increment () {
      // this.$store.commit('increment')
      const login = await this.myIncrease();
      console.log(login)
    },
    decrement(state){
      // this.$store.commit('decrement')
      this.myDecrease();
    }
  }
}
</script>

<style  scoped lang="stylus">
    #app
        font-family: 'Avenir', Helvetica, Arial, sans-serif
        -webkit-font-smoothing: antialiased
        -moz-osx-font-smoothing: grayscale
</style>
