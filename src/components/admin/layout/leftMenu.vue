<template>
  <!-- <div class="page"> -->
<!-- left
<router-link  :to = "{ name : 'site' }" tag="li">
  link to site
</router-link>
<router-link  :to = "{ name : 'data' }" tag="li">
  link to data
</router-link> -->
<el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['5-1','5-2','3-1','2']" router>
      <el-menu-item index="1"  :route="{ name: 'manage' }">
        <i class="el-icon-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-global"></i>全局</template>
          <!-- <el-menu-item index="2-1"  :route="{ name: 'site' }">站点设置</el-menu-item>
          <el-menu-item index="2-2"  :route="{ name: 'template' }">模板管理</el-menu-item>
          <el-menu-item index="2-3"  :route="{ name: 'nav' }">网站导航</el-menu-item> -->
          <el-menu-item index="2-4"  :route="{ name: 'file' }">附件管理</el-menu-item>
          <!-- <el-menu-item index="2-5"  :route="{ name: 'message' }">消息模板</el-menu-item>
          <el-menu-item index="2-6"  :route="{ name: 'mail' }">邮件配置</el-menu-item>
          <el-menu-item index="2-7"  :route="{ name: 'data' }">数据整合</el-menu-item>
          <el-menu-item index="2-8"  :route="{ name: 'verifycode' }">站验证码</el-menu-item> -->
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-content"></i>内容</template>
          <el-submenu index="3-1">
            <template slot="title">任务</template>
            <el-menu-item index="3-1-1"  :route="{ name: 'task' }">任务管理</el-menu-item>
            <el-menu-item index="3-1-2"  :route="{ name: 'draft' }">稿件管理</el-menu-item>
          </el-submenu>
          <el-menu-item index="3-2"  :route="{ name: 'service' }">服务管理</el-menu-item>
          <el-menu-item index="3-3"  :route="{ name: 'works' }">作品管理</el-menu-item>
          <el-menu-item index="3-4"  :route="{ name: 'cases' }">案例管理</el-menu-item>
          <!-- <el-menu-item index="3-5"  :route="{ name: 'point' }">积分管理</el-menu-item> -->
          <el-menu-item index="3-6"  :route="{ name: 'news' }">新闻管理 </el-menu-item>
          <el-menu-item index="3-7"  :route="{ name: 'help' }">帮助管理</el-menu-item>
          <el-menu-item index="3-8"  :route="{ name: 'comment' }">留言管理</el-menu-item>
          <!-- <el-menu-item index="3-9"  :route="{ name: 'refund' }">退款管理</el-menu-item>
          <el-menu-item index="3-10"  :route="{ name: 'complain' }">举报管理</el-menu-item>
          <el-menu-item index="3-11"  :route="{ name: 'evaluation' }">评价管理</el-menu-item>
          <el-menu-item index="3-12"  :route="{ name: 'notice' }">通知管理 </el-menu-item>
          <el-menu-item index="3-13"  :route="{ name: 'dynamic' }">动态管理</el-menu-item> -->
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-user"></i>用户</template>
          <el-menu-item index="4-1"  :route="{ name: 'user' }">用户管理</el-menu-item>
          <!-- <el-menu-item index="4-2"  :route="{ name: 'system' }">系统权限</el-menu-item> -->
          <el-menu-item index="4-3"  :route="{ name: 'role' }">角色管理</el-menu-item>
          <!-- <el-menu-item index="4-4"  :route="{ name: 'userclass' }">用户等级</el-menu-item>
          <el-menu-item index="4-5"  :route="{ name: 'credit' }">信用等级</el-menu-item> -->
          <el-submenu index="4-6">
            <template slot="title">站信管理</template>
            <el-menu-item index="4-6-1"  :route="{ name: 'siteReply' }">站信回复列表</el-menu-item>
            <el-menu-item index="4-6-2"  :route="{ name: 'siteTheme' }">站信主题列表</el-menu-item>
          </el-submenu>
          <el-menu-item index="4-7"  :route="{ name: 'shop' }">店铺认证</el-menu-item>
          <!-- <el-menu-item index="4-8">手邮认证</el-menu-item>
          <el-menu-item index="4-9">银行认证</el-menu-item> -->
          <el-menu-item index="4-10"  :route="{ name: 'customer' }">客服管理</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"><i class="el-icon-collect"></i>分类</template>
          <el-submenu index="5-1">
            <template slot="title">内容分类</template>
            <el-menu-item index="5-1-1"  :route="{ name: 'contFirst' }">一级分类</el-menu-item>
            <el-menu-item index="5-1-2"  :route="{ name: 'contSecond' }">二级分类</el-menu-item>
            <el-menu-item index="5-1-3"  :route="{ name: 'contThird' }">三级分类</el-menu-item>
          </el-submenu>
          <el-submenu index="5-2">
            <template slot="title">城市分类</template>
            <el-menu-item index="5-2-1"  :route="{ name: 'prov' }">省分类</el-menu-item>
            <el-menu-item index="5-2-2"  :route="{ name: 'city' }">市分类</el-menu-item>
            <el-menu-item index="5-2-3"  :route="{ name: 'dist' }">区分类</el-menu-item>
          </el-submenu>
      </el-submenu>
      <!-- <el-submenu index="6">
        <template slot="title"><i class="el-icon-finance"></i>财务</template>
          <el-menu-item index="6-1"  :route="{ name: 'site' }">交易管理</el-menu-item>
          <el-menu-item index="6-2"  :route="{ name: 'template' }">充值管理</el-menu-item>
          <el-menu-item index="6-3"  :route="{ name: 'nav' }">提现管理</el-menu-item>
          <el-menu-item index="6-4"  :route="{ name: 'file' }">增减金额</el-menu-item>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title"><i class="el-icon-operation"></i>运营</template>
          <el-menu-item index="7-1"  :route="{ name: 'site' }">运营配置</el-menu-item>
          <el-menu-item index="7-2"  :route="{ name: 'template' }">网站定位</el-menu-item>
          <el-menu-item index="7-3"  :route="{ name: 'nav' }">幻灯管理</el-menu-item>
          <el-menu-item index="7-4"  :route="{ name: 'file' }">后台日志</el-menu-item>
          <el-menu-item index="7-5"  :route="{ name: 'message' }">支付接口</el-menu-item>
          <el-menu-item index="7-6"  :route="{ name: 'mail' }">数据备份</el-menu-item>
          <el-menu-item index="7-7"  :route="{ name: 'data' }">广告管理</el-menu-item>
          <el-menu-item index="7-8"  :route="{ name: 'verifycode' }">调用数据</el-menu-item>
          <el-menu-item index="7-9"  :route="{ name: 'mail' }">微信接口</el-menu-item>
          <el-menu-item index="7-10"  :route="{ name: 'data' }">手机消费</el-menu-item>
          <el-menu-item index="7-11"  :route="{ name: 'verifycode' }">友情链接</el-menu-item>
      </el-submenu> -->
    </el-menu>
  </el-aside>
  <!-- </div> -->
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
@import '../../../assets/admin/stylus/mixin.styl'
  .el-aside
    color #333
    .el-icon-home:before
        icon('../../../assets/admin/icon/Leftmenu/首页.svg')
    .el-icon-global:before
        icon('../../../assets/admin/icon/Leftmenu/全局.svg')
    .el-icon-content:before
        icon('../../../assets/admin/icon/Leftmenu/内容.svg')
    .el-icon-user:before
        icon('../../../assets/admin/icon/Leftmenu/用户.svg')
    .el-icon-collect:before
        icon('../../../assets/admin/icon/Leftmenu/分类.svg')
    .el-icon-finance:before
        icon('../../../assets/admin/icon/Leftmenu/财务.svg')
    .el-icon-operation:before
        icon('../../../assets/admin/icon/Leftmenu/运营.svg')
    
</style>