<template>
  <div class="page">
    <el-form ref="form" :model="form" :rules="rules"   label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="form.title" prop="title"></el-input>
      </el-form-item>
      <el-form-item label="分类">
            <el-cascader
              placeholder="内容分类"
              expand-trigger="hover"
              :options="form.catagory"
              filterable
              change-on-select
              @change="handlecatagotyChange"
            ></el-cascader>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="form.author"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <tinyEdit :tinyHtml="form.content" @content="getContent"></tinyEdit>
      </el-form-item>
      <el-form-item label="关键词" prop="keywords">
        <el-input v-model="form.keywords"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option label="开启" value="1"></el-option>
          <el-option label="关闭" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文件">
          <el-select v-model="file.keyword"
          filterable>
            <el-option :label="option.label" :value="option.value" v-for="(option, index) in file.option"  :key="index" ></el-option>
          </el-select>
      </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">添加新闻</el-button>
           <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import tinyEdit from "@/components/admin/TinyEdit.vue"

export default {
  data() {
    return {
        form: {
          title:"",
          author:"" ,
          content:"",
          keywords:"" ,
          description:"" ,
          status:"",
          catagory:  [],   //三级搜索框
          catagoryKey:"",
        },
        file:{        //一级搜索框
          keyword:"",
          option:[]
        },
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          author: [
            { required: true, message: '请输入作者名', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ],
          keywords: [
            { required: true, message: '请输入关键字', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请输入新闻描述', trigger: 'blur' }
          ]
        },
        editorInit: {
          language_url: '/static/tinymce/zh_CN.js',
          language: 'zh_CN',
          skin_url: '/static/tinymce/skins/lightgray',
          height: 300,
          plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
          toolbar:
            'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
          branding: false
        }
    }
  },
  created() {
      this.GLOBAL.getCategory((data)=>{
              data = JSON.parse(JSON.stringify(data).replace(/categFirstId|categSecondId|categThreeId/g,"value"));
              data = JSON.parse(JSON.stringify(data).replace(/categName/g,"label"));
              data = JSON.parse(JSON.stringify(data).replace(/categorySeconds|categoryThrees/g,"children"));
              this.form.catagory = data.categoryFirsts
       })
      this.GLOBAL.getUnusefile((data)=>{
              data = JSON.parse(JSON.stringify(data).replace(/fileId/g,"value"));
              data = JSON.parse(JSON.stringify(data).replace(/name/g,"label"));
              this.file.option = data.files
       })
  },
  mounted() {
    tinymce.init({})
  },
  components:{
    tinyEdit
  },
  methods: {
      getContent:function(value){
        // console.log("value:",value);
        this.form.content = value;
      },
      handlecatagotyChange(val){
        this.form.catagoryKey=val
      },
      submitForm(formName) {
            this.$http.post(this.$api.articleInsert, this.Qs.stringify({
                "userArticle.title":this.form.title,
                "userArticle.categFirstId":this.form.catagoryKey[0],
                "userArticle.categSecondId": this.form.catagoryKey[1],
                "userArticle.categThreeId": this.form.catagoryKey[2],
                "userArticle.author": this.form.author ,
                "userArticle.content": this.form.content ,
                "userArticle.keywords": this.form.keywords,
                "userArticle.description": this.form.description,
                "userArticle.status":this.form.status,
                "userArticle.type": 1,
                "ids": this.file.keyword
            }))
            .then((response) => {
              if(response.data.result==1){
                this.$message({
                   message: '成功添加新闻!',
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
