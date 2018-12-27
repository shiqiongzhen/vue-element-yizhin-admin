<template>
  <div class="page">
    <div class="search_container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item v-for="(item, index) in searchList"  :key="index"> 
          <el-input v-model="item.keyword" :placeholder="item.label"></el-input>
        </el-form-item>
        <el-form-item label="任务模式">
          <el-select v-model="taskMode" placeholder="请选择交易类型">
            <el-option label="不限" value=""></el-option>
            <el-option label="悬赏" value="1"></el-option>
            <el-option label="招标" value="2"></el-option>
            <el-option label="计件 " value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务流程">
          <el-select v-model="curTaskProcessName" placeholder="请选择状态">
            <el-option label="不限" value=""></el-option>
            <el-option label="待支付托管金" value="1"></el-option>
            <el-option label="买家已支付托管金" value="2"></el-option>
            <el-option label="待审核 " value="3"></el-option>
            <el-option label="进行中" value="4"></el-option>
            <el-option label="暂投稿中" value="5"></el-option>
            <el-option label="带选稿中 " value="6"></el-option>
            <el-option label="退款中" value="7"></el-option>
            <el-option label="结束" value="8"></el-option>
            <el-option label="关闭" value="9"></el-option>
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
          label="ID" sortable>
          <template slot-scope="scope">
            <span>{{scope.row.taskId}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="标题">
          <template slot-scope="scope">
            <span>{{scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="任务模式">
          <template slot-scope="scope">
            <span>{{scope.row.taskMode | taskMode}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="发布者UID">
          <template slot-scope="scope">
            <span  v-if="scope.row.member">{{scope.row.member.uid}}</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column
          label="发布者">
          <template slot-scope="scope">
            <span  v-if="scope.row.member">{{scope.row.member.userName}}</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column
          label="分类 ">
          <template slot-scope="scope">
            <span  v-if="scope.row.categoryFirst">{{scope.row.categoryFirst.categName}}</span>
            <span v-else></span>
            <span  v-if="scope.row.categorySecond">>>{{scope.row.categorySecond.categName}}</span>
            <span v-else></span>
            <span  v-if="scope.row.categoryThree">>>{{scope.row.categoryThree.categName}}</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column
          label="赏金">
          <template slot-scope="scope">
            <span>{{scope.row.bounty}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="赏金数量">
          <template slot-scope="scope">
            <span>{{scope.row.bounty}}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column
          label="是否托管">
          <template slot-scope="scope">
            <span>{{scope.row.groupName}}</span>
          </template>
        </el-table-column> -->  
        <el-table-column
          label="订单流程">
          <template slot-scope="scope">
            <span>{{scope.row.endTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="电话">
          <template slot-scope="scope">
            <span>{{scope.row.phone}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="推荐">
          <template slot-scope="scope">
            <span :class="{topGreen: true }" v-if="scope.row.isTop=='1'">{{scope.row.isTop | taskTop}}</span>
            <span :class="{topGreen: false}" v-else>{{scope.row.isTop | taskTop}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="购买任务">
          <template slot-scope="scope">
            <span :class="{taskGreen}">{{scope.row.isCloseSearchEngine | isCloseSearchEngine}}</span>
            <span :class="{taskGreen}">{{scope.row.isHideTask | isHideTask}}</span>
            <span :class="{taskGreen}">{{scope.row.isHideDraft | isHideDraft}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="结束时间">
          <template slot-scope="scope">
            <span>{{scope.row.endTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="发布时间" sortable>
          <template slot-scope="scope">
            <span>{{scope.row.releaseTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="任务状态">
          <template slot-scope="scope">
            <span :class="{statusGreen:true , statusGray:false }" v-if="scope.row.status=='1'">{{scope.row.status | taskStatus}}</span>
            <span :class="{statusGreen:false , statusGray:true }" v-else>{{scope.row.status | taskStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" :min-width="150">
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
        <el-button @click="batchAudit(1)">审核</el-button>
        <el-button @click="batchAudit(0)">取消审核</el-button>
        <el-button @click="RecommendOrNot(1)">推荐</el-button>
        <el-button @click="RecommendOrNot(0)">取消推荐</el-button>
        <el-button @click="batchDelay">延期</el-button>
        <el-button @click="batchClose">关闭任务</el-button>
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
            label: "任务ID",
            keyword:""
          },
          {
            label: "用户UID",
            keyword:""
          },
          {
            label: "订单ID",
            keyword:""
          },
          {
            label: "标题",
            keyword:""
          }
        ],
        taskMode:"",  //任务模式
        curTaskProcessName:"",  //任务流程 
        catagory: [],
        catagoryKey:[],
        date:"", //时期范围
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
          taskGreen: true
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
    })
    this.handleCurrentChange()
  },
  filters: {
    taskStatus: (value) => {
      if(value == '1'){
        return "已审核"
      }else{
        return "未审核"
      }
    },
    isCloseSearchEngine: (value) => {
      if(value == '1'){
        return "关搜索引擎"
      }else{
        return ""
      }
    },
    isHideTask: (value) => {
      if(value == '1'){
        return "隐藏任务"
      }else{
        return ""
      }
    },
    isHideDraft: (value) => {
      if(value == '1'){
        return "隐藏稿件"
      }else{
        return ""
      }
    },
    taskMode: (value) => {
      if(value == '1'){
        return "悬赏"
      }else if(value == '2'){
        return "招标"
      }else{
        return "计件"
      }
    },
    taskTop: (value) => {
      if(value == '0'){
        return "未推荐"
      }else{
        return "推荐"
      }
    }
  },
  methods: {
    onSubmit() {
        if(this.date==""&&this.curTaskProcessName==""&&this.taskMode==""&&this.catagoryKey=="" &&this.searchList[0].keyword=="" && this.searchList[1].keyword==""&& this.searchList[2].keyword==""&& this.searchList[3].keyword==""){
          this.$message.error("搜索框不能为空")
          this.handleCurrentChange()
          return 0
        }
        this.$http.post(this.$api.taskSearch,
            this.Qs.stringify({
              "mainTask.mainTaskId": this.searchList[0].keyword,
              "mainTask.uid": this.searchList[1].keyword,
              "mainTask.trustRewardOrderId":this.searchList[2].keyword,
              "mainTask.title": this.searchList[3].keyword,
              "mainTask.startTime": this.date[0],
              "mainTask.endTime":  this.date[1],
              "mainTask.categFirstId":  this.catagoryKey[0],
              "mainTask.categSecondId":this.catagoryKey[1],
              "mainTask.categThreeId": this.catagoryKey[2],
              "mainTask.taskMode":  this.taskMode,
              "mainTask.curTaskProcessName":  this.curTaskProcessName,
              "page.pageNo":this.paginations.page_current,
              "page.pageSize":this.paginations.page_size
            }))
          .then((response) => {
            if (response.data.errorMessage == "您还未登录，请先登录") {
              this.$router.push('/login');
            } else {
              // console.log(response)
              this.tableData = response.data.tasks
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      handlecatagotyChange(val){
        this.catagoryKey=val
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push('/main/task/'+ row.taskId)
      },
      handleDelete(index, row) {
        this.$http.post(this.$api.taskDelete,
            this.Qs.stringify({
              "mainTask.mainTaskId": row.taskId
            }))
          .then((response) => {
            if (response.data.errorMessage == "您还未登录，请先登录") {
              this.$router.push('/login')
            }else if (response.data.errorMessage) {
              this.$message.error(response.data.errorMessage)
            }else if (response.data.result==1) {
              this.tableData.splice(index, 1);
              if(response.data.result==1){
                this.$message({
                   message: '成功删除任务:  ' + row.userName,
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
        // console.log(val)
      },
    RecommendOrNot(opera) {
      let ids = []
      this.multipleSelection.forEach(function(value, index, array) {
        ids.push(array[index].taskId)
      })
      console.log("ids",ids)
      this.$http.post(this.$api.taskTop,
          this.Qs.stringify({
            "ids": ids,
            "isRecommend": opera
          }))
        .then((response) => {
          if (response.data.errorMessage == "您还未登录，请先登录") {
            this.$router.push('/login');
          } else if (response.data.result==1){
            this.$message({
                message: '推荐成功! ',
                type: 'success' 
              })
            this.handleCurrentChange()
          }
        })
        .catch(function(error) {
          console.log(error)
        })
      },
      batchDelay(){
        let ids = []
        this.multipleSelection.forEach(function(value, index, array) {
          ids.push(array[index].taskId)
        })
        this.$http.post(this.$api.taskbatchDelay,
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
                  message: '成功延迟7天任务!  ',
                  type: 'success' 
                })
              this.handleCurrentChange()
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      batchClose(){
        let ids = []
        this.multipleSelection.forEach(function(value, index, array) {
          ids.push(array[index].taskId)
        })
        this.$http.post(this.$api.taskbatchClose,
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
                  message: '成功关闭任务!  ',
                  type: 'success' 
                })
              this.handleCurrentChange()
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      batchDelete() {
        let ids = []
        this.multipleSelection.forEach(function(value, index, array) {
          ids.push(array[index].taskId)
        })
        this.$http.post(this.$api.taskbatchDelete,
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
                  message: '成功删除任务!  ',
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
          ids.push(array[index].taskId)
          console.log("ids",ids)
        })
        this.$http.post(this.$api.taskbatchAudit,
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
        this.$http.post(this.$api.taskfindAll,
       this.Qs.stringify({
          "page.pageNo":this.paginations.page_current,
          "page.pageSize":this.paginations.page_size
        }))
       .then((response) => { 
          if(response.data.errorMessage == "您还未登录，请先登录"){
              this.$router.push('/login');
          }else{
            console.log(response)
              this.tableData = response.data.tasks
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
.taskGreen
    color: white
    background: #159715b0
    display: block;
    margin-bottom: 3px;
    text-align: center;
</style>
