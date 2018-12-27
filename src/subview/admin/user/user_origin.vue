<template>
  <div class="page">
    <div class="search_container">
      <!-- <el-form-item label="">
        <el-input v-model="updateMember."></el-input>
      </el-form-item>
       <el-form-item label="用户名">
        <el-input v-model="updateMember."></el-input>
      </el-form-item>
        <el-form-item label="">
          <el-input v-model="updateMember.imageId"></el-input>
        </el-form-item>
       <el-form-item label="">
        <el-input v-model="updateMember.password"  placeholder="不更改留空"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="updateMember.email"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="updateMember.qq"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="updateMember.phone"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="updateMember.bankName"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="updateMember.bankCard"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="updateMember.promoterId"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="updateMember.promoterName"></el-input>
        </el-form-item> -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户UID">
          <el-input v-model="formInline.user" placeholder="用户UID"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="formInline.user" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="推广员UID">
          <el-input v-model="formInline.user" placeholder="推广员UID"></el-input>
        </el-form-item>
        <el-form-item label="用户组名">
          <el-select v-model="formInline.region" placeholder="用户组名">
            <el-option label="用户组不限" value="shanghai"></el-option>
            <el-option label="超级管理员" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="formInline.region" placeholder="分类">
            <el-option label="影视文化" value="shanghai"></el-option>
            <el-option label="智慧开发" value="beijing"></el-option>
          </el-select>
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
        <!-- <el-table-column
          label="用户组过期时间">
<template slot-scope="scope">
  <span>2</span>
</template>
        </el-table-column> -->
        <!-- <el-table-column
          label="可用金额">
<template slot-scope="scope">
  <span>2</span>
</template>
        </el-table-column>
        <el-table-column
          label="总收入金额">
<template slot-scope="scope">
  <span>2</span>
</template>
        </el-table-column>
        <el-table-column
          label="总支出金额">
<template slot-scope="scope">
  <span>2</span>
</template>
        </el-table-column>
        <el-table-column
          label="网站积分" :min-width="60">
<template slot-scope="scope">
  <span>2</span>
</template>
        </el-table-column> -->
        <el-table-column
          label="推广员UID" sortable>
<template slot-scope="scope">
  <span>{{scope.row.promoterId}}</span>
</template>
        </el-table-column>
        <!-- <el-table-column
          label="推广员过期时间" sortable>
<template slot-scope="scope">
  <span>2</span>
</template>
        </el-table-column> -->
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
        <!-- <el-table-column
          label="地区">
<template slot-scope="scope">
  <span>2</span>
</template>
        </el-table-column> -->
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
        formInline: {
          user: '',
          region: ''
        },
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
        search: {
          uid: '',
          userName: '',
          authGroupId: '',
          promoterId: '',
          promoterName: '',
          shopCategIdFirst: '',
          shopCategIdSecond: '',
          shopCategIdThree: ''
        },
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
        console.log(this.paginations.page_current)
        this.$http.post(this.$api.userSearch,
            this.Qs.stringify({
              "searchMember.uid": this.search.uid,
              "searchMember.userName": this.search.userName,
              "searchMember.authGroupId": this.search.authGroupId,
              "searchMember.promoterId": this.search.promoterId,
              "searchMember.promoterName": this.search.promoterName,
              "searchMember.shopCategIdFirst": this.search.shopCategIdFirst,
              "searchMember.shopCategIdSecond": this.search.shopCategIdSecond,
              "searchMember.shopCategIdThree": this.search.shopCategIdThree
            }))
          .then((response) => {
            if (response.data.errorMessage == "您还未登录，请先登录") {
              this.$router.push('/login');
            } else {
              console.log(response)
              this.tableData = response.data.members
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        // console.log(val[0])
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
              console.log(response.data)
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
              console.log(response.data)
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
          ids.push(array[index].uid)
        })
        this.$http.post(this.$api.userbatchDelete,
            this.Qs.stringify({
              "ids": ids
            }))
          .then((response) => {
            if (response.data.errorMessage == "您还未登录，请先登录") {
              this.$router.push('/login')
            } else {
              console.log(response.data)
              this.handleCurrentChange()
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push('/main/user/' + row.uid)
      },
      handleDelete(index, row) {
        // console.log(index, row);
        this.$http.post(this.$api.userDelete,
            this.Qs.stringify({
              "updateMember.uid": row.uid
            }))
          .then((response) => {
            if (response.data.errorMessage == "您还未登录，请先登录") {
              this.$router.push('/login')
            } else {
              this.tableData.splice(index, 1);
              alert("成功删除用户: " + row.userName)
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
            } else {
              console.log(response)
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
