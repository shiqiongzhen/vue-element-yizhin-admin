<template>
  <div class="page">
    <el-form ref="form" :model="form" :rules="rules"   label-width="120px">
      <el-form-item label="服务标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="服务报价(元)" prop="serviceMoney">
        <el-input v-model="form.serviceMoney"></el-input>
      </el-form-item>
      <el-form-item label="服务周期(天)" prop="serviceCycle">
        <el-input v-model="form.serviceCycle"></el-input>
      </el-form-item>
      <el-form-item label="服务分类">
            <el-cascader
              :placeholder="catagoryInit"
              expand-trigger="hover"
              :options="catagory"
              filterable
              change-on-select
              @change="handlecatagotyChange"
            ></el-cascader>
      </el-form-item>
      <el-form-item label="服务地区">
            <el-cascader
              :placeholder="locationInit"
              expand-trigger="hover"
              :options="location"
              filterable
              change-on-select
              @change="handlelocationChange"
            ></el-cascader>
      </el-form-item>
      <el-form-item label="文件">
          <el-select v-model="file.keyword"
          filterable>
            <el-option :label="option.label" :value="option.value" v-for="(option, index) in file.option"  :key="index" ></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="详情描述服务" prop="content">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">修改服务</el-button>
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
          title:"",
          content:"" ,
          serviceMoney:"",
          serviceCycle:"" 
        },
        catagory:  [],   //三级搜索框
        catagoryKey:"",
        catagoryInit:"",
        location:  [],   //三级搜索框
        locationKey:"",
        locationInit:"",
        file:{        //一级搜索框
          keyword:"",
          option:[]
        },
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ],
          serviceMoney: [
            { required: true, message: '请输入服务报价', trigger: 'blur' }
          ],
          serviceCycle: [
            { required: true, message: '请输入服务周期', trigger: 'blur' }
          ]
        },
    }
  },
  created() {
      this.GLOBAL.getCategory((data)=>{
              data = JSON.parse(JSON.stringify(data).replace(/categFirstId|categSecondId|categThreeId/g,"value"));
              data = JSON.parse(JSON.stringify(data).replace(/categName/g,"label"));
              data = JSON.parse(JSON.stringify(data).replace(/categorySeconds|categoryThrees/g,"children"));
              this.catagory = data.categoryFirsts
       })
      this.GLOBAL.getUnusefile((data)=>{
              data = JSON.parse(JSON.stringify(data).replace(/fileId/g,"value"));
              data = JSON.parse(JSON.stringify(data).replace(/name/g,"label"));
              this.file.option = data.files
       })
      this.GLOBAL.getLocation((data)=>{
              // console.log( data)
              data = JSON.parse(JSON.stringify(data).replace(/provCategoryId|cityCategoryId|distCategoryId/g,"value"));
              data = JSON.parse(JSON.stringify(data).replace(/provName|cityName|distName/g,"label"));
              data = JSON.parse(JSON.stringify(data).replace(/cityCategorys|distCategorys/g,"children"));
              this.location = data.provCategorys
              console.log( "this.location",this.location)
    })
    this.initData()
  },
  computed: {
  },
  methods: {
      initData(page) {
        this.$http.post(this.$api.serviceSearch,this.Qs.stringify({
          "shopServices.serviceId": this.$route.params.serviceid,
          "page.pageNo":1,
          "page.pageSize":100
        }))
       .then((response) => { 
          if(response.data.errorMessage == "您还未登录，请先登录"){
              this.$router.push('/login');
          } else if (response.data.errorMessage){
              this.$message.error(response.data.errorMessage)
          }else{
            let services=response.data.shopServices[0]
            this.form = services
            // console.log("this.form",this.form)
            if(services.categoryFirst) this.catagoryInit=services.categoryFirst.categName
            if(services.categorySecond) this.catagoryInit+=">>"+services.categorySecond.categName
            if(services.categoryThree) this.catagoryInit+=">>"+services.categoryThree.categName
            //初始服务地区
            if(services.provCategId) this.locationInit=services.provCategorys.provName
            if(services.cityCategId) this.locationInit+=">>"+services.cityCategorys.cityName
            if(services.distCategId) this.locationInit+=">>"+services.distCategorys.distName
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      },
      handlecatagotyChange(val){
        this.catagoryKey=val
      },
      handlelocationChange(val){
        this.locationKey=val
      },
      submitForm(formName) {
            this.$http.post(this.$api.serviceUpdate, this.Qs.stringify({
                "shopServices.serviceId":this.$route.params.serviceid,
                "shopServices.title":this.form.title,
                "shopServices.content": this.form.content,
                "shopServices.categFirstId": this.catagoryKey[0],
                "shopServices.categSecondId": this.catagoryKey[1],
                "shopServices.categThreeId": this.catagoryKey[2],
                "shopServices.serviceMoney": this.form.serviceMoney,
                "shopServices.serviceCycle": this.form.serviceCycle,
                "shopServices.provCategId": this.locationKey[0],
                "shopServices.cityCategId":this.locationKey[1],
                "shopServices.distCategId": this.locationKey[2],
                "ids": this.file.keyword
            }))
            .then((response) => {
              if(response.data.result==1){
                this.$message({
                   message: '成功修改服务!',
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
