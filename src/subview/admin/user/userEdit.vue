<template>
  <div class="page">
    <el-form ref="updateMember" :model="updateMember" label-width="150px">
      <h2>基本信息</h2>
      <el-form-item label="用户uid">
        <el-input v-model="updateMember.uid"  :disabled="true"></el-input>
      </el-form-item>
       <el-form-item label="用户名">
        <el-input v-model="updateMember.userName"></el-input>
      </el-form-item>
        <el-form-item label="头像id">
          <el-input v-model="updateMember.imageId"></el-input>
        </el-form-item>
       <el-form-item label="新密码设置(不改留空)">
        <el-input v-model="updateMember.password"  placeholder="不更改留空"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="updateMember.email"></el-input>
        </el-form-item>
        <el-form-item label="qq">
          <el-input v-model="updateMember.qq"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="updateMember.phone"></el-input>
        </el-form-item>
        <el-form-item label="银行卡开户名">
          <el-input v-model="updateMember.bankName"></el-input>
        </el-form-item>
        <el-form-item label="银行卡卡号">
          <el-input v-model="updateMember.bankCard"></el-input>
        </el-form-item>
          <!-- <el-input v-model="updateMember.userGroupId"></el-input> -->
        <el-form-item :label="group.label">
          <el-select v-model="group.keyword" 
          :placeholder="group.label"
          filterable>
            <el-option :label="option.label" :value="option.value" v-for="(option, index) in group.option"  :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推广员id">
          <el-input v-model="updateMember.promoterId"></el-input>
        </el-form-item>
        <el-form-item label="推广员名称">
          <el-input v-model="updateMember.promoterName"></el-input>
        </el-form-item>
        <h2>店铺信息</h2>
        <el-form-item label="店铺介绍">
          <el-input v-model="updateMember.aboutShop"></el-input>
        </el-form-item>
        <el-form-item label="店铺分类">
            <el-cascader
              :placeholder="catagoryInit"
              expand-trigger="hover"
              :options="catagory"
              filterable
              change-on-select
              @change="handlecatagotyChange"
            ></el-cascader>
          <!-- <el-input v-model="updateMember.shopCategIdFirst"></el-input>
        </el-form-item>
        <el-form-item label="店铺分类2id">
          <el-input v-model="updateMember.shopCategIdSecond"></el-input>
        </el-form-item>
        <el-form-item label="店铺分类3id">
          <el-input v-model="updateMember.shopCategIdThree"></el-input> -->
        </el-form-item>
        <el-form-item label="店铺类型（1 个人、2企业)">
          <el-select v-model="updateMember.shopType" placeholder="请选择活动区域">
            <el-option label="个人" value="1"></el-option>
            <el-option label="企业" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="店铺名称">
          <el-input v-model="updateMember.shopName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('updateMember')">修改</el-button>
            <el-button @click="resetForm('updateMember')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      updateMember: {
        uid : "", 
        headPortrait:"",
        userName : '',
        password : '',
        email : '',
        qq : '',
        phone : '',
        bankName : '',
        bankCard : '',
        aboutShop : '',
        imageId : '',
        promoterId : '',
        promoterName : '',
        shopType : '1',
        shopName : ''
      },
      group : {
        label: "用户组名",
        keyword:"",
        option:[]
      },
      catagory:  [],   //三级搜索框
      catagoryKey:[],
      catagoryInit:"" //分类显示
    }
  },
  created() {
      this.GLOBAL.getCategory((data)=>{
              data = JSON.parse(JSON.stringify(data).replace(/categFirstId|categSecondId|categThreeId/g,"value"));
              data = JSON.parse(JSON.stringify(data).replace(/categName/g,"label"));
              data = JSON.parse(JSON.stringify(data).replace(/categorySeconds|categoryThrees/g,"children"));
              this.catagory = data.categoryFirsts
      }),
      this.GLOBAL.getRole((data)=>{
               data = JSON.parse(JSON.stringify(data).replace(/authGroupId/g,"value"))
               data = JSON.parse(JSON.stringify(data).replace(/groupName/g,"label"))
              this.group.option = data.authGroups
              // this.group.option.unshift({
              //   label:"用户组不限",
              //   value:""
              // });
    }),
    this.initData()
  },
  methods: {
      initData(page) {
        this.$http.post(this.$api.userSearch,
        this.Qs.stringify({
          "searchMember.uid":this.$route.params.userid
        }))
       .then((response) => { 
          if(response.data.errorMessage == "您还未登录，请先登录"){
              this.$router.push('/login');
          }else if(response.data.errorMessage){
                this.$message.error(response.data.errorMessage)
          }else{
            let member=response.data.members[0]
            this.updateMember = member
            if(member.categoryFirst) this.catagoryInit=member.categoryFirst.categName
            if(member.categorySecond) this.catagoryInit+=">>"+member.categorySecond.categName
            if(member.categoryThree) this.catagoryInit+=">>"+member.categoryThree.categName
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      },
      handlecatagotyChange(val){
          console.log("catagoryKey",val)
        this.catagoryKey=val
      },
      submitForm(formName) {
            this.$http.post(this.$api.userUpdate,
            this.Qs.stringify({
                "updateMember.uid":this.$route.params.userid, 
                "updateMember.userName" :this.updateMember.userName,
                "updateMember.password" :this.updateMember.password,
                "updateMember.email":this.updateMember.email,
                "updateMember.qq":this.updateMember.qq,
                "updateMember.phone" :this.updateMember. phone,
                "updateMember.bankName" :this.updateMember.bankName,
                "updateMember.bankCard":this.updateMember. bankCard,
                "updateMember.aboutShop" :this.updateMember.aboutShop,
                "updateMember.imageId" :this.updateMember.imageId,
                "updateMember.userGroupId" :this.group.keyword,
                "updateMember.promoterId" :this.updateMember.promoterId,
                "updateMember.promoterName":this.updateMember.promoterName,
                "updateMember.shopCategIdFirst" :this.catagoryKey[0],
                "updateMember.shopCategIdSecond" :this.catagoryKey[1],
                "updateMember.shopCategIdThree" :this.catagoryKey[2],
                "updateMember.shopType" :this.updateMember.shopType,
              "updateMember.shopName":this.updateMember.shopName
            }))
            .then((response) => {
              if(response.data.result==1){
                this.$message({
                   message: '成功修改用户!',
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
