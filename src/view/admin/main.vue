<template>
  <div class="home" style="">
    <head-nav></head-nav>
    <el-container style="border: 1px solid #eee;height: calc(100vh - 60px);">
        <LeftMenu></LeftMenu>
            <Content></Content>
    </el-container>
  </div>
</template>

<script type="text/ecmascript-6">
  import HeadNav from '@/components/admin/layout/headNav.vue';
	import LeftMenu from '@/components/admin/layout/leftMenu.vue';
  import Content from '@/components/admin/layout/content.vue';
  
  export default {
    data() {
      return {
  
      }
    },
    components: {
        HeadNav,LeftMenu,Content
    },
    methods: {
      
    }
  }
</script>

<style scoped lang="stylus">     
    .fade-enter-active,
    .fade-leave-active 
        transition: opacity .3s
    .fade-enter, .fade-leave-active 
        opacity: 0
</style>
