<template>
  <div id="app">
     <router-view/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { INCREMENT, DECREMENT } from '@/store/mutation-types';

export default {
  name: 'App',
  data() {
    return {};
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style  scoped lang="stylus">
    #app
        font-family: 'Avenir', Helvetica, Arial, sans-serif
        -webkit-font-smoothing: antialiased
        -moz-osx-font-smoothing: grayscale
</style>
