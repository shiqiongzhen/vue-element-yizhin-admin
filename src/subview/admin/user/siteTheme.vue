<template>
  <div class="page">
    <div class="search_container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item v-for="(item, index) in searchList"  :key="index"> 
          <el-input v-model="item.keyword" :placeholder="item.label"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
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
            <span>{{scope.row.dialogId}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="发信人UID">
          <template slot-scope="scope">
            <span  v-if="scope.row.fromer.uid">{{scope.row.fromer.uid}}</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column
          label="收信人UID">
          <template slot-scope="scope">
            <span  v-if="scope.row.toer.uid">{{scope.row.toer.uid}}</span>
            <span v-else></span>
          </template>
        </el-table-column> -->
        <el-table-column
          label="发信人名称">
          <template slot-scope="scope">
            <span>{{scope.row.fromer.userName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收信人名称">
          <template slot-scope="scope">
            <span>{{scope.row.toer.userName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="最后发表内容">
          <template slot-scope="scope">
            <span>{{scope.row.message}}</span>
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
          label: "对话ID",
          keyword:""
        },
        {
          label: "发信人UID",
          keyword:""
        },
        {
          label: "收信人UID",
          keyword:""
        }
      ],
    multipleSelection:[],
     tableData: [],
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
    roleStatus: function(value){
    if(value == '0'){
      return " "
      }else{
        return "开启"
      }
    }
  },
  methods: {
    onSubmit() {
        if(this.searchList[0].keyword=="" && this.searchList[1].keyword==""&& this.searchList[2].keyword==""){
          this.$message.error("搜索框不能为空")
          this.handleCurrentChange()
          return 0
        }
        this.$http.post(this.$api.themeSearch,
            this.Qs.stringify({
              "dialog.dialogId":  this.searchList[0].keyword,  //对话id
              "dialog.fromUid": this.searchList[1].keyword,
              "dialog.toUid": this.searchList[2].keyword,
              "page.pageNo":this.paginations.page_current,
              "page.pageSize":this.paginations.page_size
            }))
          .then((response) => {
            if (response.data.errorMessage == "您还未登录，请先登录") {
              this.$router.push('/login');
            } else {
              // console.log(response)
              this.tableData = response.data.dialogs
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      handleDelete(index, row) {
        this.$http.post(this.$api.themeDelete,
            this.Qs.stringify({
              "dialog.dialogId": row.dialogId
            }))
          .then((response) => {
            if (response.data.errorMessage == "您还未登录，请先登录") {
              this.$router.push('/login')
            }else if (response.data.errorMessage) {
              this.$message.error(response.data.errorMessage)
            }else if (response.data.result==1) {
              this.tableData.splice(index, 1);
                this.$message({
                   message: '成功删除对话, ID:  ' + row.dialogId,
                    type: 'success' 
                  })
               this.handleCurrentChange()
            }
          })
          .catch(function(error) {
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
          ids.push(array[index].dialogId)
        })
        this.$http.post(this.$api.themebatchDelete,
            this.Qs.stringify({
              "ids": ids
            }))
          .then((response) => {
            if (response.data.errorMessage == "您还未登录，请先登录") {
              this.$router.push('/login')
            } else   if (response.data.errorMessage) {
                this.$message.error(response.data.errorMessage)
            } else if(response.data.result==1) {
              this.$message({
                  message: '成功删除对话!  ',
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
        this.$http.post(this.$api.themefindAll,
        this.Qs.stringify({
          "page.pageNo":this.paginations.page_current,
          "page.pageSize":this.paginations.page_size
        }))
       .then((response) => { 
          if(response.data.errorMessage == "您还未登录，请先登录"){
              this.$router.push('/login');
          }else{
            console.log(response)
            this.tableData = response.data.dialogs
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
