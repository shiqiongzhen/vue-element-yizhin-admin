<template>
  <div class="page">
    <el-form ref="form" :rules="rules"  :model="form" label-width="120px">
        <el-form-item label="所属市级" ><!-- :label="group.label" -->
          <el-select v-model="form.location.keyword"   filterable>
            <el-option :label="option.label" :value="option.value" v-for="(option, index) in form.location.option"  :key="index" ></el-option>
          </el-select>
        </el-form-item>
      <el-form-item label="县级名称" prop="distName">
        <el-input v-model="form.distName"></el-input>
      </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">添加县级</el-button>
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
          distName: '',
          location: {
            keyword: "",
            option: []
          }
        },
        rules: {
          distName: [
            { required: true, message: '请输入县级名', trigger: 'blur' }
          ]
        }
    }
  },
  created() {
      this.GLOBAL.getLocationCity((data)=>{
              data = JSON.parse(JSON.stringify(data).replace(/cityCategoryId/g,"value"));
              data = JSON.parse(JSON.stringify(data).replace(/cityName/g,"label"));
              this.form.location.option = data.cityCategorys
              // console.log( this.form.location.option)
    })
  },
  methods:{
      submitForm(formName) {
            let data;
            this.$http.post(this.$api.Dist_insert, this.Qs.stringify({
              "distCategoryJ.distName": this.form.distName,
              "distCategoryJ.cityCategoryId": this.form.location.keyword
            }))
            .then((response) => {
              if(response.data.result==1){
                this.$message({
                   message: '成功添加县级!',
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
