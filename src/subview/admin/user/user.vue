<template>
  <div class="page">
    <div class="search_container"> 
      <el-form :inline="true" class="demo-form-inline"> <!--  :model="formInline" -->
        <el-form-item v-for="(item, index) in searchList"  :key="index"> <!--  :label="item.label" -->
          <el-input v-model="item.keyword" :placeholder="item.label"></el-input>
        </el-form-item>
        <el-form-item><!-- :label="group.label" -->
          <el-select v-model="group.keyword" 
          :placeholder="group.label"
          filterable>
            <el-option :label="option.label" :value="option.value" v-for="(option, index) in group.option"  :key="index" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item><!-- label="分类" -->
            <el-cascader
              placeholder="内容分类"
              expand-trigger="hover"
              :options="catagory"
              filterable
              change-on-select
              @change="handlecatagotyChange"
            ></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="userSearch">搜索</el-button>
        </el-form-item>
        <el-form-item style="float: right;">
          <router-link to="/main/user/add">
            <el-button type="primary" icon="el-icon-plus"></el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column label="UID" sortable>
            <template slot-scope="scope">
                  <span>{{scope.row.uid}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户名">
            <template slot-scope="scope">
              <span>{{scope.row.userName}}</span>
            </template>
        </el-table-column>
        <el-table-column
          label="是否开店">
          <template slot-scope="scope">
            <span :class="{shopGreen: true,shopGray:false}" v-if="scope.row.isShop=='1'">{{scope.row.isTop | memberShop}}</span>
            <span :class="{shopGreen: false,shopGray:true}" v-else>{{scope.row.isShop | memberShop}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="店铺名称">
          <template slot-scope="scope">
            <span>{{scope.row.shopName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="分类">
          <template slot-scope="scope">
            <span>{{scope.row.type}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="邮箱 " :min-width="120">
          <template slot-scope="scope">
            <span>{{scope.row.email}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="实名认证">
          <template slot-scope="scope">
            <span>{{scope.row.memberCertificate}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="帐号类型">
          <template slot-scope="scope">
            <span>{{scope.row.accountType}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户组名">
          <template slot-scope="scope">
            <span>{{scope.row.groupName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="推广员UID" sortable>
          <template slot-scope="scope">
            <span>{{scope.row.promoterId}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="推荐">
          <template slot-scope="scope">
            <span :class="{topGreen: true}" v-if="scope.row.isTop=='1'">{{scope.row.isTop | memberTop}}</span>
            <span :class="{topGreen: false}" v-else>{{scope.row.isTop | memberTop}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="注册时间" sortable>
          <template slot-scope="scope">
            <span v-if="scope.row.memberWebsite">{{scope.row.memberWebsite.registTime}}</span>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" :min-width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
              编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
        <el-row>
          <el-pagination
            layout="prev, pager, next"
            :total="paginations.total"
            :page-size="paginations.page_size"
            :current-page.sync="paginations.page_current"
            @current-change="handleCurrentChange">
        </el-pagination>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-button @click="Recommend">推荐</el-button>
        <el-button @click="cancelRecommend">取消推荐</el-button>
        <el-button type="danger" @click="batchDelete">删除</el-button>
    </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        searchList:[   //普通搜索框
          {
            label: "用户UID",
            keyword:""
          },
          {
            label: "用户名",
            keyword:""
          },
          {
            label: "推广员UID",
            keyword:""
          },
          {
            label: "推广员名称",
            keyword:""
          },
        ],
        group:{        //一级搜索框
          label: "用户组名",
          keyword:"",
          option:[]
        },
        catagory:  [],   //三级搜索框
        catagoryKey:"",
        multipleSelection: [],
        tableData: [],
        //  {
        //   uid: '2',
        //   userName: '王小虎',
        //   isShop: '推荐',
        //   shopName: '老王健身店',
        //   type: '前端开发',
        //   email: '852741963@qq.com',
        //   memberCertificate: '1',
        //   accountType: '个人',
        //   groupName: '超级管理员',
        //   promoterId: '1',
        //   isTop: '推荐',
        //   memberWebsite: {
        //     registTime: '2017.9.2'
        // }
        // }
        paginations: {
          page_current: 1, // 当前位于哪页
          page_size: 7, // 1页显示多少条
          // total: 30,        // 总数
        },
        topGreen: true,
        shopGray: true,
        shopGreen: true
      }
    },
    created() {
      this.GLOBAL.getCategory((data)=>{
              // 先将json对象转为json字符串，再替换你要替换的属性名，最后再转为json对象
              // console.log("getCategory", data.categoryFirsts)
              data = JSON.parse(JSON.stringify(data).replace(/categFirstId|categSecondId|categThreeId/g,"value"));
              data = JSON.parse(JSON.stringify(data).replace(/categName/g,"label"));
              data = JSON.parse(JSON.stringify(data).replace(/categorySeconds|categoryThrees/g,"children"));
              this.catagory = data.categoryFirsts
    }),
    this.GLOBAL.getRole((data)=>{
              // console.log("getRole", data)
               data = JSON.parse(JSON.stringify(data).replace(/authGroupId/g,"value"))
               data = JSON.parse(JSON.stringify(data).replace(/groupName/g,"label"))
              this.group.option = data.authGroups
              this.group.option.unshift({
                label:"用户组不限",
                value:""
              });
    })
    this.handleCurrentChange()
    },
    filters: {
      memberTop: (value) => {
        if (value == '0') {
          return "未推荐"
        } else {
          return "推荐"
        }
      },
      memberShop: (value) => {
        if (value == '0') {
          return "未开店"
        } else {
          return "已开店"
        }
      }
    },
    watch: {},
    methods: {
      userSearch() {
        if( this.catagoryKey=="" &&this.searchList[0].keyword=="" && this.searchList[1].keyword==""&& this.searchList[2].keyword==""&& this.searchList[3].keyword==""){
          this.$message.error("搜索框不能为空")
          this.handleCurrentChange()
          return 0
        }
        this.$http.post(this.$api.userSearch,
            this.Qs.stringify({
              "searchMember.uid": this.searchList[0].keyword,
              "searchMember.userName": this.searchList[1].keyword,
              "searchMember.authGroupId": this.group.keyword,
              "searchMember.promoterId": this.searchList[2].keyword,
              "searchMember.promoterName":  this.searchList[3].keyword,
              "searchMember.shopCategIdFirst": this.catagoryKey[0],
              "searchMember.shopCategIdSecond":  this.catagoryKey[1],
              "searchMember.shopCategIdThree":  this.catagoryKey[2],
              "page.pageNo":this.paginations.page_current,
              "page.pageSize":this.paginations.page_size
            }))
          .then((response) => {
            if (response.data.errorMessage == "您还未登录，请先登录") {
              this.$router.push('/login');
            } else {
              // console.log(response)
              this.tableData = response.data.members
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      handlecatagotyChange(val){
        this.catagoryKey=val
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        // console.log(val)
      },
      cancelRecommend() {
        let ids = []
        this.multipleSelection.forEach(function(value, index, array) {
          ids.push(array[index].uid)
        })
        this.$http.post(this.$api.userTop,
            this.Qs.stringify({
              "ids": ids,
              "isRecommend": 0
            }))
          .then((response) => {
            if (response.data.errorMessage == "您还未登录，请先登录") {
              this.$router.push('/login');
            } else {
              // console.log(response.data)
              this.handleCurrentChange()
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      Recommend() {
        let ids = []
        this.multipleSelection.forEach(function(value, index, array) {
          ids.push(array[index].uid)
        })
        this.$http.post(this.$api.userTop,
            this.Qs.stringify({
              "ids": ids,
              "isRecommend": 1
            }))
          .then((response) => {
            if (response.data.errorMessage == "您还未登录，请先登录") {
              this.$router.push('/login');
            } else {
              // console.log(response.data)
              this.handleCurrentChange()
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push('/main/user/edit/' + row.uid)
      },
      handleDelete(index, row) {
        // console.log(index, row);
        this.$http.post(this.$api.userDelete,this.Qs.stringify({
              "updateMember.uid": row.uid
            }))
          .then((response) => {
            if (response.data.errorMessage == "您还未登录，请先登录") {
              this.$router.push('/login')
            }else if (response.data.errorMessage) {
              this.$message.error(response.data.errorMessage)
            }else {
              this.tableData.splice(index, 1);
              if(response.data.result==1){
                this.$message({
                   message: '成功删除用户:  ' + row.userName,
                    type: 'success' 
                  })
               this.handleCurrentChange()
              }
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      batchDelete() {
        let ids = []
        this.multipleSelection.forEach(function(value, index, array) {
          ids.push(array[index].uid)
        })
        this.$http.post(this.$api.userbatchDelete,
            this.Qs.stringify({
              "ids": ids
            }))
          .then((response) => {
            if (response.data.errorMessage == "您还未登录，请先登录") {
              this.$router.push('/login')
            } else   if (response.data.errorMessage) {
                this.$message.error(response.data.errorMessage)
            } else {
              this.$message({
                  message: '成功删除用户!  ',
                  type: 'success' 
                })
              this.handleCurrentChange()
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      handleCurrentChange(page) {
        console.log(this.paginations.page_current)
        this.$http.post(this.$api.userfindAll,
            this.Qs.stringify({
              "page.pageNo": this.paginations.page_current,
              "page.pageSize": this.paginations.page_size
            }))
          .then((response) => {
            if (response.data.errorMessage == "您还未登录，请先登录") {
              this.$router.push('/login');
            } else if (response.data.errorMessage){
                this.$message.error(response.data.errorMessage)
            }else {
              // console.log(response)
              this.tableData = response.data.members
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      }
    },
    components: {
  
    }
  }
</script>

<style scoped lang="stylus">
a
    color: #000
a:-webkit-any-link
    text-decoration none
.topGreen
    color: white
    background: #159715b0
    padding: 5px
.shopGray
    color: white
    background: #c0c4ccb5
    padding: 5px
.shopGreen
    color: white
    background: #159715b0
    padding: 5px
</style>
