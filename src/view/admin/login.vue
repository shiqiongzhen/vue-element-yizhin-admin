<template>
  <div class="page">
		<!-- <router-link to="/main">kmain</router-link> -->
		<el-form :model="userInfo" status-icon ref="userInfo" label-width="100px" class="demo-ruleForm">
			<el-form-item label="帐号" prop="account">
				<el-input v-model="userInfo.account"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="pass">
				<el-input type="password" v-model="userInfo.pass" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="验证码" prop="verifycode">
				<el-input v-model="userInfo.verifycode"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('userInfo')">提交</el-button>
				<el-button @click="resetForm('userInfo')">重置</el-button>
				<el-checkbox v-model="checked" @change="remPass">记住密码</el-checkbox>
			</el-form-item>
		</el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState, mapActions } from 'vuex'
import { INCREMENT, DECREMENT } from '@/store/mutation-types'

  export default {
    data() {
      return {
				checked: false,
        userInfo: {
          account: '',
          pass: '',
          verifycode: ''
        }
      };
		},
		created() {
				this.$http.get(this.$api.getCode)
					.then((response) => {
						this.userInfo.verifycode = response.data.verifyCode
						// console.log(this.userInfo.verifycode)
					})
					.catch((response) => {
						console.log("erro"+response)
					}),
					this.userInfo.account = localStorage.getItem('remAccount') || null
					this.userInfo.pass = localStorage.getItem('remPass') || null
					if(localStorage.getItem('remAccount') || localStorage.getItem('remPass')){
						this.checked = true
					}
		},
    methods: {
			remPass(){
					if(this.checked){
							localStorage.setItem('remAccount', this.userInfo.account)
							localStorage.setItem('remPass', this.userInfo.pass) 
					}else{
							localStorage.removeItem('remAccount')
							localStorage.removeItem('remPass') 
					}
			},
			submitForm(formName) {
					this.$refs[formName].validate((valid) => {
						if (valid) {
							// var params = new URLSearchParams();
								this.$http.post(this.$api.login,  this.Qs.stringify({
									"login.account":this.userInfo.account,
									"login.password":this.userInfo.pass,
									"login.code":this.userInfo.verifycode
								}))
								.then((response) => {
									if(response.data.result == '1'){
										// localStorage.setItem('userAccount', this.userInfo.account)
										// localStorage.setItem('userPass', this.userInfo.password) 
										this.$router.push( 'main' )
									}else if(response.data.errorMessage=="用户名或密码错误"){
										alert("用户名或密码错误")
										// localStorage.removeItem('remAccount')
										// localStorage.removeItem('remPass') 
									}else if(response.data.errorMessage=="验证码错误"){
										alert("验证码错误")
										// localStorage.removeItem('remAccount')
										// localStorage.removeItem('remPass') 
									}else{
										alert("无法登录")
									}
								})
								.catch((response) => {
									console.log("erro"+response)
								});
						} else {
							console.log('error submit!!');
							return false;
						}
					});
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
