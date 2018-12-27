<template>
  <div class="page">
    <el-form ref="form" :rules="rules"  :model="form" label-width="120px">
      <el-form-item label="用户UID" prop="uid">
        <el-input v-model="form.uid"></el-input>
      </el-form-item>
      <el-form-item label="客服名称" prop="servicerName">
        <el-input v-model="form.servicerName"></el-input>
      </el-form-item>
      <el-form-item label="客服电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="客服QQ" prop="qq">
        <el-input v-model="form.qq"></el-input>
      </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">添加角色</el-button>
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
          uid: '',
          servicerName: '',
          phone: '',
          qq: ''
        },
        rules: {
          uid: [
            { required: true, message: '请输入用户UID', trigger: 'blur' }
          ],
          servicerName: [
            { required: true, message: '请输入客服名称', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入客服电话', trigger: 'blur' }
          ],
          qq: [
            { required: true, message: '请输入客服QQ', trigger: 'blur' }
          ]
        },
    }
  },
  components: {

  },
  methods:{
      submitForm(formName) {
        if(this.form.uid){
            let data;
            this.$http.post(this.$api.customerInsert,this.Qs.stringify({
                "service.uid": this.form.uid,
                "service.servicerName": this.form.servicerName,
                "service.phone": this.form.phone,
                "service.qq": this.form.qq
            }))
            .then((response) => {
              if(response.data.result==1){
                this.$message({
                   message: '成功添加客服!',
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
  }
}
</script>

<style scoped lang="stylus">
.el-input
    width: 40%
</style>
