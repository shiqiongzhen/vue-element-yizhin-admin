<template>
      <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item >新增</el-dropdown-item>
              <el-dropdown-item @click.native="loginOut">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{member.userName}}</span>
      </el-header>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      member:{
        email: null,
        headPortrait: {
        path: ""
        },
        isShop: 0,
        isTop: 1,
        memberCertificate: null,
        memberShop: { },
        memberWebsite: {
        registTime: ""
        },
        phone: "",
        uid: 1,
        userName: ""
        }
    }
  },
  created(){
    this.$http.get(this.$api.getCurrentuser)
    .then((res)=>{
      this.member = res.data.member[0]
    })
  },
  components: {

  },
  methods: {
    loginOut: function() {
      // console.log("login out")
        localStorage.removeItem('userAccount')
        localStorage.removeItem('userPass') 
        this.$router.push( 'login' )
    }
  }
}
</script>

<style scoped lang="stylus">
  .el-header
    background-color #B3C0D1
    color #333
    line-height 60px
  
</style>
