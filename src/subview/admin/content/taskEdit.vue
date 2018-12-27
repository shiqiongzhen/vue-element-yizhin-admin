<template>
  <div class="page">
    <el-form ref="form" :model="form" :rules="rules"   label-width="120px">
      <el-form-item label="任务标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="任务赏金(元)" prop="bounty">
        <el-input v-model="form.bounty"></el-input>
      </el-form-item>
      <el-form-item label="任务时间(天)" prop="taskTime">
        <el-input v-model="form.taskTime"></el-input>
      </el-form-item>
      <el-form-item label="参与人数" prop="taskUserNum">
        <el-input v-model="form.taskUserNum"></el-input>
      </el-form-item>
      <el-form-item label="任务分类">
            <el-cascader
              :placeholder="catagoryInit"
              expand-trigger="hover"
              :options="catagory"
              filterable
              change-on-select
              @change="handlecatagotyChange"
            ></el-cascader>
      </el-form-item>
      <el-form-item label="任务地区">
            <el-cascader
              :placeholder="locationInit"
              expand-trigger="hover"
              :options="location"
              filterable
              change-on-select
              @change="handlelocationChange"
            ></el-cascader>
      </el-form-item>
      <el-form-item label="任务模式">
          <el-select v-model="taskMode" :placeholder="taskModeInit">
            <el-option label="悬赏" value="1"></el-option>
            <el-option label="招标" value="2"></el-option>
            <el-option label="计件 " value="3"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="文件">
          <el-select v-model="file.keyword"
          filterable>
            <el-option :label="option.label" :value="option.value" v-for="(option, index) in file.option"  :key="index" ></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="详情描述任务" prop="content">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item label="你可能还需要">
        <el-checkbox-group v-model="type">
          <el-checkbox label="推荐置顶" name="type"></el-checkbox>
          <el-checkbox label="隐藏任务内容" name="type"></el-checkbox>
          <el-checkbox label="隐藏投稿内容" name="type"></el-checkbox>
          <el-checkbox label="屏蔽搜索引擎" name="type"></el-checkbox>
          <!-- <el-checkbox label="客服迭代" name="type"></el-checkbox> -->
        </el-checkbox-group>
      </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">修改任务</el-button>
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
          // title:"",
          // content:"" ,
          // taskTime:"",
          // taskUserNum:"" 
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
        taskMode:"",
        taskModeInit:"",
        type: [],
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入电话号', trigger: 'blur' }
          ],
          bounty: [
            { required: true, message: '请输入赏金', trigger: 'blur' }
          ],
          taskTime: [
            { required: true, message: '请输入任务天数', trigger: 'blur' }
          ],
          taskUserNum: [
            { required: true, message: '请输入参与人数', trigger: 'blur' }
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
              // console.log( "this.location",this.location)
    })
    this.initData()
  },
  methods: {
      initData(page) {
        this.$http.post(this.$api.taskSearch,this.Qs.stringify({
          "mainTask.mainTaskId": this.$route.params.taskid,
          "page.pageNo":1,
          "page.pageSize":100
        }))
       .then((response) => { 
          if(response.data.errorMessage == "您还未登录，请先登录"){
              this.$router.push('/login');
          } else if (response.data.errorMessage){
              this.$message.error(response.data.errorMessage)
          }else{
            let tasks=response.data.tasks[0]
            this.form = tasks
            console.log("this.form",this.form)
            if(tasks.isTop==1) this.type.push("推荐置顶")
            if(tasks.isHideTask==1) this.type.push("隐藏任务内容")
            if(tasks.isHideDraft==1) this.type.push("隐藏投稿内容")
            if(tasks.isCloseSearchEngine==1) this.type.push("屏蔽搜索引擎")
            // if(tasks[0].isNews) this.type.push("客服迭代")
            switch(tasks.taskMode){
              case 1:this.taskModeInit="悬赏"
              case 2:this.taskModeInit="招标"
              case 3:this.taskModeInit="计件"
            }
            if(tasks.categoryFirst) this.catagoryInit=tasks.categoryFirst.categName
            if(tasks.categorySecond) this.catagoryInit+=">>"+tasks.categorySecond.categName
            if(tasks.categoryThree) this.catagoryInit+=">>"+tasks.categoryThree.categName
            //初始任务地区
            if(tasks.provCategId) this.locationInit=tasks.provCategorys.provName
            if(tasks.cityCategId) this.locationInit+=">>"+tasks.cityCategorys.cityName
            if(tasks.distCategId) this.locationInit+=">>"+tasks.distCategorys.distName
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
            this.$http.post(this.$api.taskUpdate, this.Qs.stringify({
                "mainTask.mainTaskId":this.$route.params.taskid,
                "mainTask.title":this.form.title,
                "mainTask.phone":this.form.phone,
                "mainTask.categFirstId": this.catagoryKey[0],
                "mainTask.categSecondId": this.catagoryKey[1],
                "mainTask.categThreeId": this.catagoryKey[2],
                "mainTask.content": this.form.content,
                "mainTask.bounty": this.form.bounty, //赏金
                "mainTask.taskTime": this.form.taskTime, //任务时间（天）
                "mainTask.taskUserNum": this.form.taskUserNum,//参与任务的人数
                "mainTask.taskMode": this.taskMode,
                "mainTask.provCategId": this.locationKey[0],
                "mainTask.cityCategId":this.locationKey[1],
                "mainTask.distCategId": this.locationKey[2],
                "mainTask.isTop":  this.type.indexOf("推荐置顶") > -1?1:0,
                "mainTask.isCloseSearchEngine": this.type.indexOf("屏蔽搜索引擎") > -1?1:0,//是否关闭搜索引擎（1 是、0 否）
                "mainTask.isHideTask": this.type.indexOf("隐藏任务内容") > -1?1:0,//是否隐藏任务（1 是、0 否)
                "mainTask.isHideDraft": this.type.indexOf("隐藏投稿内容") > -1?1:0,//是否隐藏稿件（1 是、0 否）
                "ids": this.file.keyword
            }))
            .then((response) => {
              if(response.data.result==1){
                this.$message({
                   message: '成功修改任务!',
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
