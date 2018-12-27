<template>
  <div class="page">
    <el-form ref="form" :rules="rules"  :model="form" label-width="120px">
      <el-form-item label="分类名称" prop="categName">
        <el-input v-model="form.categName"></el-input>
      </el-form-item>
      <el-form-item label="任务手续费" prop="winBidTaskFee">
        <el-input v-model="form.winBidTaskFee"></el-input>
      </el-form-item>
      <el-form-item label="分类模块">
        <el-checkbox-group v-model="type">
          <el-checkbox label="任务分类" name="type"></el-checkbox>
          <el-checkbox label="服务分类" name="type"></el-checkbox>
          <el-checkbox label="帮助分类" name="type"></el-checkbox>
          <el-checkbox label="新闻分类" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('updateGroup')">修改</el-button>
            <el-button @click="resetForm('updateGroup')">重置</el-button>
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
          winBidTaskFee: ''
        },
        type: [],
        rules: {
          categName: [
            { required: true, message: '请输入三级分类名', trigger: 'blur' }
          ],
          winBidTaskFee: [
            { required: true, message: '请输入任务中标手续费', trigger: 'blur' }
          ]
        },
    }
  },
  created() {
    this.initData()
  },
  methods: {
      initData(page) {
        this.$http.post(this.$api.Three_search,this.Qs.stringify({
          "categoryT.categThreeId":this.$route.params.cataid
        }))
       .then((response) => { 
          if(response.data.errorMessage == "您还未登录，请先登录"){
              this.$router.push('/login');
          } else if (response.data.errorMessage){
              this.$message.error(response.data.errorMessage)
          }else{
              this.form = response.data.categoryThrees[0]
              if(response.data.categoryThrees[0].isTask) this.type.push("任务分类")
              if(response.data.categoryThrees[0].isService) this.type.push("服务分类")
              if(response.data.categoryThrees[0].isHelp) this.type.push("帮助分类")
              if(response.data.categoryThrees[0].isNews) this.type.push("新闻分类")
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      },
      submitForm(formName) {
            this.$http.post(this.$api.Three_update,
            this.Qs.stringify({
              "categoryT.categThreeId": this.$route.params.cataid,
              "categoryT.categName": this.form.categName,
              "categoryT.isTask": this.type.indexOf("任务分类") > -1?1:0,
              "categoryT.isService":  this.type.indexOf("服务分类") > -1?1:0,
              "categoryT.isHelp":  this.type.indexOf("帮助分类") > -1?1:0,
              "categoryT.isNews":  this.type.indexOf("新闻分类") > -1?1:0,
              "categoryT.winBidTaskFee": this.form.winBidTaskFee
            }))
            .then((response) => {
              if(response.data.result==1){
                this.$message({
                   message: '成功修改分类!',
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
