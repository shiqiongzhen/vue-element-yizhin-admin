<template>
  <div class="page">
    <el-form ref="form" :rules="rules"  :model="form" label-width="120px">
      <el-form-item label="省份名称" prop="provName">
        <el-input v-model="form.provName"></el-input>
      </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">添加省份</el-button>
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
          provName: ''
        },
        rules: {
          provName: [
            { required: true, message: '请输入省份名', trigger: 'blur' }
          ]
        }
    }
  },
  components: {

  },
  methods:{
      submitForm(formName) {
            let data;
            this.$http.post(this.$api.Prov_insert, this.Qs.stringify({
              "provCategoryJ.provName": this.form.provName
            }))
            .then((response) => {
              if(response.data.result==1){
                this.$message({
                   message: '成功添加省份!',
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
      },
  }
}
</script>

<style scoped lang="stylus">
.el-input
    width: 40%
</style>
