<template>
  <div class="page">
    <div class="search_container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item v-for="(item, index) in searchList"  :key="index"> 
          <el-input v-model="item.keyword" :placeholder="item.label"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="shopSearch">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table
        :data="tableData"
        style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          label="ID" sortable>
          <template slot-scope="scope">
            <span>{{scope.row.shopCertificateId}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="证件">
          <template slot-scope="scope">
            <!-- <span>{{scope.row.shopBusinessLiensePath}}</span> -->
            <img :src="scope.row.shopBusinessLiensePath" :class='{cardImg}'>
          </template>
        </el-table-column>
        <el-table-column
          label="用户UID">
          <template slot-scope="scope">
            <span  v-if="scope.row.member">{{scope.row.member.uid}}</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column     
          label="认证类型">
          <template slot-scope="scope">
            <span>{{scope.row.shopType | shopType}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="实名">
          <template slot-scope="scope">
            <span>{{scope.row.realName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="申请状态 ">
          <template slot-scope="scope">
            <span :class="{statusGreen: true }" v-if="scope.row.status=='3'">{{scope.row.status | shopStatus}}</span>
            <span :class="{statusGreen: false}" v-else>{{scope.row.status | shopStatus}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="失败原因">
          <template slot-scope="scope">
            <span>{{scope.row.memberCertificate}}</span>
          </template>
        </el-table-column> -->
        <el-table-column
          label="申请时间">
          <template slot-scope="scope">
            <span>{{scope.row.createTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="审核时间">
          <template slot-scope="scope">
            <span>{{scope.row.auditTime}}</span>
          </template>
        </el-table-column>
          <el-table-column label="操作" :min-width="150">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">审核<i class="el-icon-edit-outline el-icon--right"></i></el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        <el-button @click="batchAudit(3)">审核通过</el-button>
        <el-button @click="batchAudit(2)">审核失败</el-button>
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
            label: "开店认证id",
            keyword:""
          },
          {
            label: "用户UID",
            keyword:""
          }
      ],
     tableData: [],
     multipleSelection: [],
      rules: {
        groupName: [
          { required: true, message: '请输入角色名', trigger: 'blur' }
       ]
      },
      paginations: {
          page_current: 1,  // 当前位于哪页
          page_size: 9,   // 1页显示多少条
          // total: 30,        // 总数
      },
      statusGreen:true,
      cardImg: true
    }
  },
  created() {
    this.handleCurrentChange(),
    this.changeColor()
  },
  filters :{
    shopType: function(value){
      if(value == '1'){
        return "个人"
      }else{
        return "企业"
      }
    },
    shopStatus(value){
      if(value == '1'){
        return "申请中"
      }else if(value == '2'){
        return "失败"
      }else{
        return "成功"
      }
    }
  },
  methods: {
    changeColor() {
      if(this.status == '3'){
          this.statusGreen = true
      }else{
          this.statusGreen = true
      }
    },
    shopSearch() {
        if(this.searchList[0].keyword=="" && this.searchList[1].keyword==""){
          this.$message.error("搜索框不能为空")
          this.handleCurrentChange()
          return 0
        }
        this.$http.post(this.$api.shopSearch,
            this.Qs.stringify({
              "shop.shopCertificateId": this.searchList[0].keyword,
              "shop.uid": this.searchList[1].keyword,
              "page.pageNo":this.paginations.page_current,
              "page.pageSize":this.paginations.page_size
            }))
          .then((response) => {
            if (response.data.errorMessage == "您还未登录，请先登录") {
              this.$router.push('/login');
            } else if (response.data.errorMessage){
                this.$message.error(response.data.errorMessage)
            } else {
              console.log(response)
              this.tableData = response.data.shopCertificates
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push('/main/shop/edit/'+ row.shopCertificateId)
      },
      handleDelete(index, row) {
        // console.log(index, row);
         this.$http.post(this.$api.shopDelete,
          {
            "shop.shopCertificateId":row.shopCertificateId
          })
        .then((response) => {
          if(response.data.result == 1){
              this.tableData.splice(index, 1);
                this.$message({
                   message: '成功删除店铺认证:  ' + row.realName,
                    type: 'success' 
                  })
            }else if(response.data.errorMessage == "您还未登录，请先登录"){
                this.$router.push('/login')
            } else{
                this.$message.error(response.data.errorMessage)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        // console.log(val)
      },
      batchDelete() {
        let ids = []
        this.multipleSelection.forEach(function(value, index, array) {
          ids.push(array[index].shopCertificateId)
          console.log("ids",ids)
        })
        this.$http.post(this.$api.shopbatchDelete,
            this.Qs.stringify({
              "ids": ids
            }))
          .then((response) => {
            if (response.data.errorMessage == "您还未登录，请先登录") {
              this.$router.push('/login')
            } else   if (response.data.errorMessage) {
                this.$message.error(response.data.errorMessage)
            }else{
              this.$message({
                  message: '成功删除店铺!  ',
                  type: 'success' 
                })
                this.handleCurrentChange()
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      batchAudit(status) {
        let ids = []
        this.multipleSelection.forEach(function(value, index, array) {
          ids.push(array[index].shopCertificateId)
          console.log("ids",ids)
        })
        this.$http.post(this.$api.shopbatchAudit,
            this.Qs.stringify({
              "ids": ids,
              "isAuditPass": status
            }))
          .then((response) => {
            if (response.data.errorMessage == "您还未登录，请先登录") {
              this.$router.push('/login')
            } else   if (response.data.errorMessage) {
                this.$message.error(response.data.errorMessage)
            }else{
              this.$message({
                  message: '成功审核!  ',
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
        this.$http.post(this.$api.shopfindAll,
        this.Qs.stringify({
          "page.pageNo":this.paginations.page_current,
          "page.pageSize":this.paginations.page_size
        }))
       .then((response) => { 
          if(response.data.errorMessage == "您还未登录，请先登录"){
              this.$router.push('/login');
          }else{
            console.log(response)
              this.tableData = response.data.shopCertificates
          }
        })
        .catch(function (error) {
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
.cardImg
    width: 120px
    height 80px
.statusGreen
    color: white
    background: #159715b0
    padding: 5px
</style>
