<template>
  <div class="page">
    <div class="search_container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item v-for="(item, index) in searchList"  :key="index"> 
          <el-input v-model="item.keyword" :placeholder="item.label"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fileSearch">搜索</el-button>
        </el-form-item>
        <el-form-item style="float: right;">
          <!-- <router-link to="/main/customer/add"><el-button type="primary" icon="el-icon-plus"></el-button></router-link> -->
          <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true"></el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="上传文件"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>
        <input id="file" type="file" name="file"/>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" id="upload"  @click="uploadFile">上传</el-button>
      </span>
    </el-dialog>
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
            <span>{{scope.row.fileId}}</span>
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
          label="名称">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="路径"  :min-width="300">
          <template slot-scope="scope">
            <span>{{scope.row.path}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="总量(MB)">
          <template slot-scope="scope">
            <span>{{scope.row.size}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="上传时间">
          <template slot-scope="scope">
            <span>{{scope.row.createTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
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
      fileList: [],
      multipleSelection:[],
      searchList:[   //普通搜索框
        {
          label: "文件ID",
          keyword:""
        },
        {
          label: "用户UID",
          keyword:""
        },
        {
          label: "名称",
          keyword:""
        }
      ],
    dialogVisible: false,
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
  },
  methods: {
    fileSearch() {
        if(this.searchList[0].keyword=="" && this.searchList[1].keyword=="" && this.searchList[2].keyword==""){
          this.$message.error("搜索框不能为空")
          this.handleCurrentChange()
          return 0
        }
        this.$http.post(this.$api.fileSearch,
            this.Qs.stringify({
              "fileInteract.fileInteractId": this.searchList[0].keyword,
              "fileInteract.uid": this.searchList[1].keyword,
              "fileInteract.name": this.searchList[2].keyword,
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
              this.tableData = response.data.files
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
    uploadFile(){
    	//创建formData实例对象
          let fd = new FormData();
            //将文件封装到formData
          let file = document.querySelector('#file').files[0]
          fd.append('file', file);
          console.log(file); 
          let config = {
              headers: {'Content-Type': 'multipart/form-data'}
          }
          this.$http.post(this.$api.fileInsert, fd, config)
          .then( res => {
            console.log(res)
              if(res.data.result=="1"){
                  this.$message({
                    message: '成功上传文件: ' + file.name,
                    type: 'success' 
                  })
              }else{
                this.$message.error(res.data.errorMessage)
              }
              // console.log("success:",res.data)
              this.dialogVisible = false
              this.handleCurrentChange()
          }).catch( res => {
                this.$message.error("fail"+res.data.errorMessage)
          })
        },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
    handleSuceed(){
      console.log("上传成功")
    },
    onSubmit() {
      console.log('submit!');
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push('/main/file/'+ row.servicerId)
      },
      handleDelete(index, row) {
        // console.log(index, row);
         this.$http.post(this.$api.fileDelete,
          this.Qs.stringify({
            "fileInteract.fileInteractId":row.fileId
          }))
        .then((response) => { 
            if(response.data.errorMessage == "您还未登录，请先登录"){
                this.$router.push('/login')
            }else{
              this.tableData.splice(index, 1);
              alert("成功删除文件: "+row.name)
              this.handleCurrentChange()
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
          ids.push(array[index].fileId)
          console.log("ids",ids)
        })
        this.$http.post(this.$api.fileBatchDelete,
            this.Qs.stringify({
              "ids": ids
            }))
          .then((response) => {
            if (response.data.errorMessage == "您还未登录，请先登录") {
              this.$router.push('/login')
            } else   if (response.data.errorMessage) {
                this.$message.error(response.data.errorMessage)
            }else if(response.data.result == 1){
              this.$message({
                  message: '成功删除文件!  ',
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
        this.$http.post(this.$api.filefindAll,
        this.Qs.stringify({
          "page.pageNo":this.paginations.page_current,
          "page.pageSize":this.paginations.page_size
        }))
       .then((response) => { 
          if(response.data.errorMessage == "您还未登录，请先登录"){
              this.$router.push('/login');
          }else{
            console.log(response)
            this.tableData = response.data.files
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
