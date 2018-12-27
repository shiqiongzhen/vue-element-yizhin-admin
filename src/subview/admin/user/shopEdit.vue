<template>
  <div class="page">
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="店铺ID:">
        <span>{{form.shopCertificateId}}</span>
      </el-form-item>
       <el-form-item label="用户UID:">
        <span>{{form.member.uid}}</span>
      </el-form-item>
      <el-form-item label="帐号类型:">
        <span>{{form.shopType|shopType}}</span>
      </el-form-item>
       <el-form-item label="实名:">
        <span>{{form.realName}}</span>
      </el-form-item>
      <el-form-item label="申请状态:">
        <span>{{form.status|shopStatus}}</span>
      </el-form-item>
       <el-form-item label="身份证正面:">
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540098086852&di=271687c6669df6922cabd3ea22df8944&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171111%2F8a2058c30d614674a4fa7e40cf171ebf.jpeg">
      </el-form-item>
       <el-form-item label="身份证反面">
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540098137528&di=1b51c391ef3ce014c9078ab10e4869c2&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170611%2Fe5b8f304a6594090a2c00501ecf9f6f9.png">
      </el-form-item>
      <el-form-item label="失败原因" prop="shopCertificateId">
        <el-input type="textarea" v-model="form.errorContent"></el-input>
      </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(3)">审核通过</el-button>
          <el-button type="primary" @click="submitForm(2)">审核失败</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      form: {
        shopCertificateId: this.$route.params.shopid,
        member: {
          uid: ""
        }
      }
    }
  },
  created() {
    this.initData()
  },
  filters :{
    shopType(value){
      if(value == '1'){
        return "个人"
      }else{
        return "企业"
      }
    },
    shopStatus(value){
      if(value == '1'){
        return "申请中"
      }else if(value == '2'){
        return "失败"
      }else{
        return "成功"
      }
    }
  },
  methods: {
      initData(page) {
        this.$http.post(this.$api.shopSearch,this.Qs.stringify({
          "shop.shopCertificateId":this.$route.params.shopid,
              "page.pageNo":1,
              "page.pageSize":100
        }))
       .then((response) => { 
          if(response.data.errorMessage == "您还未登录，请先登录"){
              this.$router.push('/login');
          } else if (response.data.errorMessage){
              this.$message.error(response.data.errorMessage)
          }else{
            this.form = response.data.shopCertificates[0]
            // console.log( this.form.member.uid)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      },
      submitForm(status) {
            this.$http.post(this.$api.shopUpdate,
            this.Qs.stringify({
                "shop.shopCertificateId":this.$route.params.shopid, 
                "shop.status": status,
                "shop.errorContent" :this.form.errorContent
            }))
            .then((response) => {
              if(response.data.result==1){
                this.$message({
                   message: '审核成功!',
                    type: 'success' 
                  })
              }else if(response.data.errorMessage == "您还未登录，请先登录"){
                 this.$router.push('/login');
              }else{
                this.$message.error(response.data.errorMessage)
              }
            }).catch((err)=>{
                this.$message.error('请求失败!')
            })
      }
  }
}
</script>

<style scoped lang="stylus">
.el-input
    width: 40%
</style>
