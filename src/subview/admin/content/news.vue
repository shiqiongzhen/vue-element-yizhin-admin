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
        <el-form-item style="float: right;">
          <router-link to="/main/news/add"><el-button type="primary" icon="el-icon-plus"></el-button></router-link>
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
            <span>{{scope.row.articleId}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户ID">
          <template slot-scope="scope">
            <span  v-if="scope.row.member">{{scope.row.member.uid}}</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column
          label="作者">
          <template slot-scope="scope">
            <span>{{scope.row.author}}</span>
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
          label="名称">
          <template slot-scope="scope">
            <span>{{scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="分类">
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
          label="状态 ">
          <template slot-scope="scope">
            <span :class="{statusGreen: true }" v-if="scope.row.status=='3'">{{scope.row.status | shopStatus}}</span>
            <span :class="{statusGreen: false}" v-else>{{scope.row.status | shopStatus}}</span>
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
        <el-button @click="RecommendOrNot(1)">推荐</el-button>
        <el-button @click="RecommendOrNot(0)">取消推荐</el-button>
        <el-button type="danger" @click="batchDelete">删除</el-button>
    </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState } from 'vuex'
export default {
  data() {
    return {
        searchList:[   //普通搜索框
          {
            label: "新闻ID",
            keyword:""
          },
          {
            label: "用户UID",
            keyword:""
          },
          {
            label: "标题",
            keyword:""
          }
        ],
     tableData: [],
     multipleSelection: [],
      paginations: {
          page_current: 1,  // 当前位于哪页
          page_size: 9,   // 1页显示多少条
          // total: 30,        // 总数
      },
      topGreen: true,
      shopGray: true,
      shopGreen: true,
      statusGreen:true
    }
  },
  created() {
    this.handleCurrentChange(),
    this.changeColor()
  },
  filters :{
    shopStatus(value){
      if(value == '1'){
        return "申请中"
      }else if(value == '2'){
        return "失败"
      }else{
        return "成功"
      }
    },
    memberTop: (value) => {
      if (value == '0') {
        return "未推荐"
      } else {
        return "推荐"
      }
    }
  },
  methods: {
    changeColor() {
      if(this.status == '3') this.statusGreen = true
    },
    onSubmit() {
        if( this.searchList[0].keyword=="" && this.searchList[1].keyword==""&& this.searchList[2].keyword==""){
          this.$message.error("搜索框不能为空")
          this.handleCurrentChange()
          return 0
        }
        this.$http.post(this.$api.articleSearch,
            this.Qs.stringify({
              "articleType": 1,
              "userArticle.userArticleId": this.searchList[0].keyword,
              "userArticle.uid": this.searchList[1].keyword,
              "userArticle.title":  this.searchList[2].keyword,
              "page.pageNo":this.paginations.page_current,
              "page.pageSize":this.paginations.page_size
            }))
          .then((response) => {
            if (response.data.errorMessage == "您还未登录，请先登录") {
              this.$router.push('/login');
            } else {
              // console.log(response)
              this.tableData = response.data.articles
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
      handleEdit(index, row) {
        // console.log(index, row);
        this.$router.push('/main/news/edit/'+ row.articleId)
      },
      handleDelete(index, row) {
        this.$http.post(this.$api.articleDelete,this.Qs.stringify({
              "userArticle.userArticleId": row.articleId
            }))
          .then((response) => {
            if (response.data.errorMessage == "您还未登录，请先登录") {
              this.$router.push('/login')
            }else if (response.data.errorMessage) {
              this.$message.error(response.data.errorMessage)
            }else if(response.data.result==1){
                this.tableData.splice(index, 1);
                this.$message({
                   message: '成功删除新闻:  ' + row.title,
                    type: 'success' 
                  })
                this.handleCurrentChange()
              }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
    RecommendOrNot(opera) {
      let ids = []
      this.multipleSelection.forEach(function(value, index, array) {
        ids.push(array[index].articleId)
      })
      console.log("ids",ids)
      this.$http.post(this.$api.articleTop,
          this.Qs.stringify({
            "ids": ids,
            "isRecommend": opera
          }))
        .then((response) => {
          if (response.data.errorMessage == "您还未登录，请先登录") {
            this.$router.push('/login');
          } else {
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
      batchDelete() {
        let ids = []
        this.multipleSelection.forEach(function(value, index, array) {
          ids.push(array[index].articleId)
        })
        this.$http.post(this.$api.articlebatchDelete,
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
                  message: '成功删除新闻!  ',
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
        this.$http.post(this.$api.articlefindAll,
          this.Qs.stringify({
            "articleType": 1,  //新闻
            "page.pageNo":this.paginations.page_current,
            "page.pageSize":this.paginations.page_size
        }))
       .then((response) => { 
          if(response.data.errorMessage == "您还未登录，请先登录"){
              this.$router.push('/login');
          }else{
            console.log("response",response)
              this.tableData = response.data.articles
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
.shopGray
    color: white
    background: #c0c4ccb5
    padding: 5px
.shopGreen
    color: white
    background: #159715b0
    padding: 5px
.statusGreen
    color: white
    background: #159715b0
    padding: 5px
</style>
