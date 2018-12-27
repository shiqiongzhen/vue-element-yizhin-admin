<template>
  <div class="page">
    <el-form ref="form" :rules="rules"  :model="form" label-width="120px">
      <el-form-item label="角色名称" prop="groupName">
        <el-input v-model="form.groupName"></el-input>
      </el-form-item>
      <el-form-item label="角色状态">
        <el-select v-model="form.status" placeholder="是否开启">
          <el-option label="开启" value="1"></el-option>
          <el-option label="关闭" value="0"></el-option>
        </el-select>
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
          groupName: '',
          status: ''
        },
        rules: {
          groupName: [
            { required: true, message: '请输入角色名', trigger: 'blur' }
          ]
        },
    }
  },
  components: {

  },
  methods:{
      submitForm(formName) {
            let data;
            this.$http.post(this.$api.roleInsert,this.Qs.stringify({
              "role.groupName": this.form.groupName,
              "role.status": this.form.status
            }))
            .then((response) => {
              if(response.data.result==1){
                this.$message({
                   message: '成功添加用户!',
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
