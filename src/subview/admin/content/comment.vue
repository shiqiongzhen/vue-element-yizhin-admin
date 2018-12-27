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
          label="留言ID" sortable>
          <template slot-scope="scope">
            <span>{{scope.row.messageId}}</span>
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
          label="用户名">
          <template slot-scope="scope">
            <span  v-if="scope.row.member">{{scope.row.member.userName}}</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column
          label="买家ID">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column
          label="内容">
          <template slot-scope="scope">
            <span>{{scope.row.content}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="发布时间">
          <template slot-scope="scope">
            <span>{{scope.row.releaseTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" :min-width="150">
          <template slot-scope="scope">
            <!-- <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
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
            label: "留言ID",
            keyword:""
          },
          {
            label: "用户UID",
            keyword:""
          }
        ],
     multipleSelection:[],
     tableData: [],
      paginations: {
          page_current: 1,  // 当前位于哪页
          page_size: 9,   // 1页显示多少条
          // total: 30,        // 总数
      },
      topGreen: true,
      statusGray: true,
      statusGreen:true,
      serviceGreen: true
    }
  },
  created() {
    this.handleCurrentChange()
  },
  filters: {
  },
  watch: {
  },
  methods: {
    onSubmit() {
        if(this.searchList[0].keyword=="" && this.searchList[1].keyword==""){
          this.$message.error("搜索框不能为空")
          this.handleCurrentChange()
          return 0
        }
        this.$http.post(this.$api.commentSearch,
            this.Qs.stringify({
              "message.messagesId":  this.searchList[0].keyword,  //留言id
              "message.uid": this.searchList[1].keyword,
              "page.pageNo":this.paginations.page_current,
              "page.pageSize":this.paginations.page_size
            }))
          .then((response) => {
            if (response.data.errorMessage == "您还未登录，请先登录") {
              this.$router.push('/login');
            } else {
              // console.log(response)
              this.tableData = response.data.messages
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push('/main/comment/'+ row.messageId)
      },
      handleDelete(index, row) {
        this.$http.post(this.$api.commentDelete,
            this.Qs.stringify({
              "message.messagesId": row.messageId
            }))
          .then((response) => {
            if (response.data.errorMessage == "您还未登录，请先登录") {
              this.$router.push('/login')
            }else if (response.data.errorMessage) {
              this.$message.error(response.data.errorMessage)
            }else if (response.data.result==1) {
              this.tableData.splice(index, 1);
                this.$message({
                   message: '成功删除留言, ID:  ' + row.messageId,
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
          ids.push(array[index].messageId)
        })
        this.$http.post(this.$api.commentbatchDelete,
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
                  message: '成功删除留言!  ',
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
        this.$http.post(this.$api.commentfindAll,
        this.Qs.stringify({
          "message.messageType":3,
          "page.pageNo":this.paginations.page_current,
          "page.pageSize":this.paginations.page_size
        }))
       .then((response) => { 
          if(response.data.errorMessage == "您还未登录，请先登录"){
              this.$router.push('/login');
          }else{
            console.log(response)
              this.tableData = response.data.messages
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
.topGreen
    color: white
    background: #159715b0
    padding: 5px
.statusGreen
    color: white
    background: #159715b0
    padding: 5px
.statusGray
    color: white
    background: #c0c4ccb5
    padding: 5px
.serviceGreen
    color: white
    background: #159715b0
    display: block;
    margin-bottom: 3px;
    text-align: center;
</style>
