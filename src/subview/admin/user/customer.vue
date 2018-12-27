<template>
  <div class="page">
    <div class="search_container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item v-for="(item, index) in searchList"  :key="index"> 
          <el-input v-model="item.keyword" :placeholder="item.label"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="customerSearch">搜索</el-button>
        </el-form-item>
        <el-form-item style="float: right;">
          <router-link to="/main/customer/add"><el-button type="primary" icon="el-icon-plus"></el-button></router-link>
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
            <span>{{scope.row.servicerId}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户UID">
          <template slot-scope="scope">
            <span v-if="scope.row.member">{{scope.row.member.uid}}</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column
          label="客服名称">
          <template slot-scope="scope">
            <span>{{scope.row.servicerName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="电话">
          <template slot-scope="scope">
            <span>{{scope.row.phone}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="QQ">
          <template slot-scope="scope">
            <span>{{scope.row.qq}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="发布时间">
          <template slot-scope="scope">
            <span>{{scope.row.createTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
          label: "客服id",
          keyword:""
        },
        {
          label: "用户uid",
          keyword:""
        }
      ],
      formInline: {
        user: '',
        region: ''
      },
     tableData: [],
     multipleSelection: [],
      //  {
      //   servicerId: '2',
      //   member:{
      //      uid:  '王小虎'
      //   },
      //   servicerName: '推荐',
      //   phone: '王小虎',
      //   qq: '推荐',
      //   createTime: '王小虎'
      // }
      paginations: {
          page_current: 1,  // 当前位于哪页
          page_size: 9,   // 1页显示多少条
          // total: 30,        // 总数
      }
    }
  },
  created() {
    this.handleCurrentChange()
  },
  filters :{
  },
  methods: {
      customerSearch() {
        if(this.searchList[0].keyword=="" && this.searchList[1].keyword==""){
          this.$message.error("搜索框不能为空")
          this.handleCurrentChange()
          return 0
        }
          this.$http.post(this.$api.customerSearch,
            this.Qs.stringify({
              "searchServicer.servicerId": this.searchList[0].keyword,
              "searchServicer.uid": this.searchList[1].keyword,
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
              this.tableData = response.data.servicers
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push('/main/customer/edit/'+ row.servicerId)
      },
      handleDelete(index, row) {
        // console.log(index, row);
         this.$http.post(this.$api.customerDelete, this.Qs.stringify({
            "service.uid":row.member.uid
          }))
        .then((response) => { 
            if(response.data.errorMessage == "您还未登录，请先登录"){
                this.$router.push('/login')
            }else if(response.data.errorMessage){
                this.$message.error(response.data.errorMessage)
            }else{
              this.tableData.splice(index, 1);
                this.$message({
                   message: '成功删除客服:  ' + row.servicerName,
                    type: 'success' 
                  })
            }
          })
          .catch(function (error) {
                this.$message.error("请求失败!")
          })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val)
      },
      batchDelete() {
        let ids = []
        this.multipleSelection.forEach(function(value, index, array) {
          ids.push(array[index].member.uid)
          console.log("ids",ids)
        })
        this.$http.post(this.$api.customerbatchDelete,
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
                  message: '成功删除客服!  ',
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
        this.$http.post(this.$api.customerfindAll,
        this.Qs.stringify({
          "page.pageNo":this.paginations.page_current,
          "page.pageSize":this.paginations.page_size
        }))
       .then((response) => { 
          if(response.data.errorMessage == "您还未登录，请先登录"){
              this.$router.push('/login');
          }else{
            console.log(response)
            this.tableData = response.data.servicers
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
</style>
