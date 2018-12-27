<template>
  <div class="page">
    <el-form ref="updateGroup" :rules="rules"   :model="updateGroup" label-width="150px">
      <el-form-item label="用户组id">
        <el-input v-model="updateGroup.authGroupId"  :disabled="true"></el-input>
      </el-form-item>
       <el-form-item label="用户组名称">
        <el-input v-model="updateGroup.groupName" prop="groupName"></el-input>
      </el-form-item>
      <el-form-item label="角色状态">
        <el-select v-model="updateGroup.status" placeholder="是否开启">
          <el-option label="开启" value="1"></el-option>
          <el-option label="关闭" value="0"></el-option>
        </el-select>
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
      updateGroup: {
        authGroupId: "",
        groupName : "", 
        status:""
      },
      rules: {
        groupName: [
          { required: true, message: '请输入角色名', trigger: 'blur' }
       ]
      }
    }
  },
  created() {
    this.initData()
  },
  methods: {
      initData(page) {
        this.$http.post(this.$api.roleSearch,this.Qs.stringify({
          "role.authGroupId":this.$route.params.roleid
        }))
       .then((response) => { 
          if(response.data.errorMessage == "您还未登录，请先登录"){
              this.$router.push('/login');
          } else if (response.data.errorMessage){
              this.$message.error(response.data.errorMessage)
          }else{
            // console.log(response)
            this.updateGroup = response.data.authGroups[0]
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      },
      submitForm(formName) {
            this.$http.post(this.$api.roleUpdate,
            this.Qs.stringify({
                "role.authGroupId":this.$route.params.roleid, 
                "role.groupName" :this.updateGroup.groupName,
                "role.status" :this.updateGroup.status
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
