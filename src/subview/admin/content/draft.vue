<template>
  <div class="page">
    <div class="search_container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item v-for="(item, index) in searchList"  :key="index"> 
          <el-input v-model="item.keyword" :placeholder="item.label"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd">
          </el-date-picker>
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
          label="稿件ID" sortable>
          <template slot-scope="scope">
            <span>{{scope.row.taskId}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="稿件ID">
          <template slot-scope="scope">
            <span>{{scope.row.taskSubmissionId}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="中标财务订单号">
          <template slot-scope="scope">
            <span>{{scope.row.taskMode | taskMode}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="买家ID">
          <template slot-scope="scope">
            <span  v-if="scope.row.member">{{scope.row.member.uid}}</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column
          label="买家用户名">
          <template slot-scope="scope">
            <span  v-if="scope.row.member">{{scope.row.member.userName}}</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column
          label="卖家ID">
          <template slot-scope="scope">
            <span>{{scope.row.bounty}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="卖家用户名">
          <template slot-scope="scope">
            <span>{{scope.row.bounty}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="购买服务">
          <template slot-scope="scope">
            <span :class="{serviceGreen}">{{scope.row.isCloseSearchEngine | isCloseSearchEngine}}</span>
            <span :class="{serviceGreen}">{{scope.row.isHideTask | isHideTask}}</span>
            <span :class="{serviceGreen}">{{scope.row.isHideDraft | isHideDraft}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="标题">
          <template slot-scope="scope">
            <span>{{scope.row.endTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="发布时间">
          <template slot-scope="scope">
            <span>{{scope.row.phone}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="审核时间">
          <template slot-scope="scope">
            <span :class="{topGreen: true }" v-if="scope.row.isTop=='1'">{{scope.row.isTop | isTop}}</span>
            <span :class="{topGreen: false}" v-else>{{scope.row.isTop | isTop}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="中标赏金">
          <template slot-scope="scope">
            <span>{{scope.row.endTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="稿件内容">
          <template slot-scope="scope">
            <span>{{scope.row.endTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="稿件状态">
          <template slot-scope="scope">
            <span :class="{statusGreen:true , statusGray:false }" v-if="scope.row.status=='1'">{{scope.row.status | draftStatus}}</span>
            <span :class="{statusGreen:false , statusGray:true }" v-else>{{scope.row.status | draftStatus}}</span>
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
        <el-button @click="batchAudit(0)">取消审核</el-button>
        <el-button @click="batchAudit(1)">设置中标</el-button>
        <el-button @click="batchAudit(2)">设置不合格</el-button>
        <el-button @click="batchAudit(3)">设置待选</el-button>
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
            label: "稿件ID",
            keyword:""
          },
          {
            label: "稿件ID",
            keyword:""
          },
          {
            label: "卖家UID",
            keyword:""
          },
          {
            label: "卖家用户名",
            keyword:""
          },
          {
            label: "买家UID",
            keyword:""
          },
          {
            label: "买家用户名",
            keyword:""
          }
        ],
     date:[],
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
    draftStatus: (value) => {
      if(value == '1'){
        return "已审核"
      }else{
        return "未审核"
      }
    },
    isTop: (value) => {
      if(value == '0'){
        return "未推荐"
      }else{
        return "推荐"
      }
    }
  },
  watch: {
  },
  methods: {
    onSubmit() {
        if(this.date=="" &&this.searchList[0].keyword=="" && this.searchList[1].keyword==""&& this.searchList[2].keyword==""&& this.searchList[3].keyword==""&& this.searchList[4].keyword==""&& this.searchList[5].keyword==""){
          this.$message.error("搜索框不能为空")
          this.handleCurrentChange()
          return 0
        }
        this.$http.post(this.$api.draftSearch,
            this.Qs.stringify({
              "submission.sellerId": this.searchList[2].keyword,
              "submission.sellerName": this.searchList[3].keyword,
              "submission.buyerId":this.searchList[4].keyword,
              "submission.buyerName": this.searchList[5].keyword,
              "submission.startTime": this.date[0],
              "submission.endTime":  this.date[1],
              "submission.submissionId":  this.searchList[0].keyword,  //稿件id
              "submission.taskId": this.searchList[1].keyword,
              "page.pageNo":this.paginations.page_current,
              "page.pageSize":this.paginations.page_size
            }))
          .then((response) => {
            if (response.data.errorMessage == "您还未登录，请先登录") {
              this.$router.push('/login');
            } else {
              // console.log(response)
              this.tableData = response.data.taskSubmissions
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push('/main/draft/'+ row.taskSubmissionId)
      },
      handleDelete(index, row) {
        this.$http.post(this.$api.draftDelete,
            this.Qs.stringify({
              "submission.submissionId": row.taskSubmissionId
            }))
          .then((response) => {
            if (response.data.errorMessage == "您还未登录，请先登录") {
              this.$router.push('/login')
            }else if (response.data.errorMessage) {
              this.$message.error(response.data.errorMessage)
            }else if (response.data.result==1) {
              this.tableData.splice(index, 1);
                this.$message({
                   message: '成功删除稿件:  ' + row.title,
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
          ids.push(array[index].taskSubmissionId)
        })
        this.$http.post(this.$api.draftbatchDelete,
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
                  message: '成功删除稿件!  ',
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
          ids.push(array[index].taskSubmissionId)
          // console.log("ids",ids)
        })
        this.$http.post(this.$api.draftbatchAudit,
            this.Qs.stringify({
              "ids": ids,
              "isAuditPass": status
            }))
          .then((response) => {
            if (response.data.errorMessage == "您还未登录，请先登录") {
              this.$router.push('/login')
            } else   if (response.data.errorMessage) {
                this.$message.error(response.data.errorMessage)
            }else  if (response.data.result==1){
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
        this.$http.post(this.$api.draftfindAll,
        this.Qs.stringify({
          "page.pageNo":this.paginations.page_current,
          "page.pageSize":this.paginations.page_size
        }))
       .then((response) => { 
          if(response.data.errorMessage == "您还未登录，请先登录"){
              this.$router.push('/login');
          }else{
            console.log(response)
              this.tableData = response.data.taskSubmissions
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
