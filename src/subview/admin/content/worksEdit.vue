<template>
  <div class="page">
    <el-form ref="form" :model="form" :rules="rules"   label-width="120px">
      <el-form-item label="作品标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="作品分类">
            <el-cascader
              :placeholder="catagoryInit"
              expand-trigger="hover"
              :options="catagory"
              filterable
              change-on-select
              @change="handlecatagotyChange"
            ></el-cascader>
        </el-form-item>
        <el-form-item label="详情描述作品" prop="content">
         <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">修改作品</el-button>
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
          worksMoney:"",
          worksCycle:"" 
        },
        catagory:  [],   //三级搜索框
        catagoryKey:"",
        catagoryInit:"",
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
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
    this.initData()
  },
  computed: {
  },
  methods: {
      initData(page) {
        this.$http.post(this.$api.worksSearch,this.Qs.stringify({
          "works.worksId": this.$route.params.worksid,
          "page.pageNo":1,
          "page.pageSize":100
        }))
       .then((response) => { 
          if(response.data.errorMessage == "您还未登录，请先登录"){
              this.$router.push('/login');
          } else if (response.data.errorMessage){
              this.$message.error(response.data.errorMessage)
          }else{
            let works=response.data.works[0]
            this.form = works
            // console.log("this.form",response)
            if(works.categoryFirst) this.catagoryInit=works.categoryFirst.categName
            if(works.categorySecond) this.catagoryInit+=">>"+works.categorySecond.categName
            if(works.categoryThree) this.catagoryInit+=">>"+works.categoryThree.categName
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      },
      handlecatagotyChange(val){
        this.catagoryKey=val
      },
      submitForm(formName) {
            this.$http.post(this.$api.worksUpdate, this.Qs.stringify({
                "works.worksId":this.$route.params.worksid,
                "works.title":this.form.title,
                "works.content": this.form.content,
                "works.categFirstId": this.catagoryKey[0],
                "works.categSecondId": this.catagoryKey[1],
                "works.categThreeId": this.catagoryKey[2],
                "works.picturePath":""
            }))
            .then((response) => {
              if(response.data.result==1){
                this.$message({
                   message: '成功修改作品!',
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
