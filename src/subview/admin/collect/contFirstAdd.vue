<template>
  <div class="page">
    <el-form ref="form" :rules="rules"  :model="form" label-width="120px">
      <el-form-item label="分类名称" prop="categName">
        <el-input v-model="form.categName"></el-input>
      </el-form-item>
      <el-form-item label="任务手续费" prop="fee">
        <el-input v-model="form.fee"></el-input>
      </el-form-item>
      <el-form-item label="分类模块">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="任务分类" name="type"></el-checkbox>
          <el-checkbox label="服务分类" name="type"></el-checkbox>
          <el-checkbox label="帮助分类" name="type"></el-checkbox>
          <el-checkbox label="新闻分类" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">添加一级分类</el-button>
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
          categName: '',
          fee: '',
          type: []
        },
        rules: {
          categName: [
            { required: true, message: '请输入一级分类名', trigger: 'blur' }
          ],
          fee: [
            { required: true, message: '请输入任务中标手续费', trigger: 'blur' }
          ]
        }
    }
  },
  components: {

  },
  methods:{
      submitForm(formName) {
            let data;
            this.$http.post(this.$api.First_insert, this.Qs.stringify({
              "categoryF.categName": this.form.categName,
              "categoryF.isTask": this.form.type.indexOf("任务分类") > -1?1:0,
              "categoryF.isService":  this.form.type.indexOf("服务分类") > -1?1:0,
              "categoryF.isHelp":  this.form.type.indexOf("帮助分类") > -1?1:0,
              "categoryF.isNews":  this.form.type.indexOf("新闻分类") > -1?1:0,
              "categoryF.winBidTaskFee": this.form.fee
            }))
            .then((response) => {
              if(response.data.result==1){
                this.$message({
                   message: '成功添加分类!',
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
