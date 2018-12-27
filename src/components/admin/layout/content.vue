<template>
      <!-- <transition name="fade"> -->
      <!-- </transition> -->
        <el-container>
            <el-header style="background-color: #eee;height: 44px !important;line-height: 44px;padding: 15px 20px;">
                  <div class="breadcrumb">
                        <el-breadcrumb separator-class="el-icon-arrow-right">
                              <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
                              <el-breadcrumb-item v-for='(item,index) in levelList' :key='index' v-if='item.name!="manage"'>{{item.name|tranChinese}}</el-breadcrumb-item>
                        </el-breadcrumb>
                  </div>
            </el-header>
            <el-main>
              <transition name="fade">
                  <router-view></router-view>
              </transition>
            </el-main>
        </el-container>
</template>

<script type="text/ecmascript-6">

export default {
  data() {
      return {
            // firstRoute:"",
            levelList:null
      }
  },
  filters:{
        tranChinese(val){
            //   console.log("val",val)
              switch(val){
                    case "user":return "用户管理";break; //用户
                    case "role":return "角色管理";break;
                    case "siteReply":return "站信回复";break;
                    case "siteTheme":return "站信主题";break;
                    case "shop":return "店铺认证";break;
                    case "customer":return "客服管理";break;
                    case "contFirst":return "一级分类";break; //分类
                    case "contSecond":return "二级分类";break;
                    case "contThird":return "三级分类";break;
                    case "prov":return "省分类";break;
                    case "city":return "市分类";break;
                    case "dist":return "区分类";break;
                    case "file":return "附件管理";break; //全局
                    case "task":return "任务管理";break; //内容
                    case "draft":return "稿件管理";break; //内容
                    case "service":return "服务管理";break;
                    case "works":return "作品管理";break;
                    case "cases":return "案例管理";break;
                    case "news":return "新闻管理";break;
                    case "help":return "帮助管理";break;
                    case "comment":return "留言管理";break;
                    
                    case "userAdd":return "用户添加";break; //用户
                    case "roleAdd":return "角色添加";break;
                    case "customerAdd":return "客服添加";break;
                    case "contFirstAdd":return "一级分类添加";break; //分类
                    case "contSecondAdd":return "二级分类添加";break;
                    case "contThirdAdd":return "三级分类添加";break;
                    case "provAdd":return "省分类添加";break;
                    case "cityAdd":return "市分类添加";break;
                    case "distAdd":return "区分类添加";break;
                    case "casesAdd":return "案例添加";break;
                    case "newsAdd":return "新闻添加";break;
                    case "helpAdd":return "帮助添加";break;

                    case "userEdit":return "用户编辑";break; //用户
                    case "roleEdit":return "角色编辑";break;
                    case "customerEdit":return "客服编辑";break;
                    case "contFirstEdit":return "一级分类编辑";break; //分类
                    case "contSecondEdit":return "二级分类编辑";break;
                    case "contThirdEdit":return "三级分类编辑";break;
                    case "provEdit":return "省分类编辑";break;
                    case "cityEdit":return "市分类编辑";break;
                    case "distEdit":return "区分类编辑";break;
                    case "casesEdit":return "案例编辑";break;
                    case "newsEdit":return "新闻编辑";break;
                    case "helpEdit":return "帮助编辑";break;
                    default:return val
              }
        }
  },
  created() {
      this.getBreadcrumb();
  },
  watch: {
      $route() {
            this.getBreadcrumb();
      }
  },
  methods: {
      getBreadcrumb(){
            let matched = this.$route.matched.filter(item => item.name);
            this.levelList = matched;
            // console.log("this.levelList",this.levelList[0].path)
      }
  }
}
</script>

<style scoped lang="stylus">

</style>
