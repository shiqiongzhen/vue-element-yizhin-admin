<template>
  <div class="page">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="用户UID" prop="uid">
        <el-input v-model="form.member.uid" :placeholder="此项为必填项"></el-input>
      </el-form-item>
      <el-form-item label="客服名称">
        <el-input v-model="form.servicerName"></el-input>
      </el-form-item>
      <el-form-item label="客服电话">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="客服QQ">
        <el-input v-model="form.qq"></el-input>
      </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">修改</el-button>
           <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
        form: {
          member:{
            uid: ""
          },
          servicerName: "",
          phone: "",
          qq: ""
        },
        rules: {
          uid: [
            { required: true, message: '请输入用户ID', trigger: 'blur' }
          ]
        }
    }
  },
  created() {
    this.initData()
  },
  methods: {
      initData(page) {
        this.$http.post(this.$api.customerSearch,this.Qs.stringify({
          "searchServicer.servicerId":this.$route.params.customerid,
          "page.pageNo":1, //后台bug
          "page.pageSize":1
        }))
       .then((response) => { 
          if(response.data.errorMessage == "您还未登录，请先登录"){
              this.$router.push('/login');
          } else if (response.data.errorMessage){
              this.$message.error(response.data.errorMessage)
          }else{
             if(response.data.servicers[0].member){
              this.form = response.data.servicers[0]
             }else{
              response.data.servicers[0].member={"uid": "" }
              // console.log("this.form1",response.data.servicers[0])
              this.form =  response.data.servicers[0]
             }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      },
      submitForm(formName) {
        if(this.form.member.uid){
            this.$http.post(this.$api.customerUpdate,
            this.Qs.stringify({
                "service.uid":this.form.member.uid, 
                "service.servicerName" :this.form.servicerName,
                "service.phone" :this.form.phone,
                "service.qq" :this.form.qq
            }))
            .then((response) => {
              if(response.data.result==1){
                this.$message({
                   message: '成功修改角色!',
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
        }else{
            this.$message.error("请输入用户UID再提交")
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
}
</script>

<style scoped lang="stylus">
.el-input
    width: 40%
</style>
