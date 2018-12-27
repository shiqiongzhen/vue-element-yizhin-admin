<template>
  <div class="page">
    <el-form ref="form" :rules="rules"  :model="form" label-width="120px">
      <el-form-item label="手机" v-if="radioAccount == 1" prop="mobile">
        <el-input v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" v-if="radioAccount == 2" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="用户账号类型">
        <el-radio v-model="radioAccount" label="1">手机</el-radio>
        <el-radio v-model="radioAccount" label="2">邮箱</el-radio>
      </el-form-item>
      <el-form-item label="用户密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="用户重复密码" prop="checkPass">
        <el-input v-model="form.checkPass"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="form.code">
          <span slot="append">{{ verifyCode }}</span>
        </el-input>
      </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">添加用户</el-button>
           <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.checkPass !== '') {
            this.$refs.form.validateField('checkPass');
          }
          callback();
        }
      };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
        form: {
          mobile: '',
          email: '',
          password: '',
          checkPass: '',
          userName: '',
          code: ''
        },
        rules: {
          mobile: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码' }
          ],
          email: [
            { required: true, message: '请输入邮箱号', trigger: 'blur' },
            { pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, message: '邮箱格式不正确' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]
        },
        radioAccount: '1',      //选择用户名方式(2邮箱/1手机)
        verifyCode: '',
        dialogVisible: true    //点击添加用户后返回的信息弹窗
    }
  },
  created() {
    this.$http.get(this.$api.getCode)
      .then((response) => {
       this.verifyCode = response.data.verifyCode
      })
  },
  computed: {
  },
  methods: {
      submitForm(formName) {
            let data;
            if(this.radioAccount == '1'){
             data = {"regist.mobile": this.form.mobile, "regist.password": this.form.password, "regist.userName": this.form.userName, "regist.passwordRepeat": this.form.checkPass,"regist.code": this.form.code }
            }else{
              data =  {"regist.email": this.form.email, "regist.password": this.form.password, "regist.userName": this.form.userName, "regist.passwordRepeat": this.form.checkPass,"regist.code": this.form.code }
            }
            this.$http.post(this.$api.userInsert,this.Qs.stringify(data))
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
.el-input
    width: 40%
</style>
