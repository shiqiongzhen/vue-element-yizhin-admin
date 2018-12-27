<script type="text/javascript">
import axios from 'axios'
import Qs from 'qs'
import api from "@/api/config"
// function getRandColor () {
//   var tem = Math.round(Math.random() * colorListLength)
//   return colorList[tem]
// }
var colorListLength = ""
function getCategory(hello){    //获取所有分类
  axios.post(api.First_findAll, Qs.stringify({
     "page.pageNo": 1,
     "page.pageSize": 100
   }))
  .then((res)=>{
      // return res.categoryFirsts
      hello(res.data)
      // console.log(hello)
    }).catch((err)=>{
      console.log(err)
    })
  }
function getLocation(hello){    //获取所有分类
  axios.post(api.Prov_findAll, Qs.stringify({
     "page.pageNo": 1,
     "page.pageSize": 100
   }))
  .then((res)=>{
      hello(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
function getLocationCity(hello){    //获取所有分类
  axios.post(api.City_findAll, Qs.stringify({
     "page.pageNo": 1,
     "page.pageSize": 100
   }))
  .then((res)=>{
      hello(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
function getCategoryS(hello){    //获取二级分类
  axios.post(api.Second_findAll, Qs.stringify({
     "page.pageNo": 1,
     "page.pageSize": 100
   }))
  .then((res)=>{
      // return res.categoryFirsts
      hello(res.data)
      // console.log(hello)
    }).catch((err)=>{
      console.log(err)
    })
  }
function getRole(hello){     //获取所有分组
  axios.post(api.rolefindAll, Qs.stringify({
     "page.pageNo": 1,
     "page.pageSize": 100
   }))
  .then((res)=>{
      hello(res.data)
      // console.log(hello)
    }).catch((err)=>{
      console.log(err)
    })
  }
  function getUnusefile(hello){  //获取未附属文件
    axios.get(api.filefindUnuse)
    .then((res)=>{
        hello(res.data)
        // console.log(hello)
      }).catch((err)=>{
        console.log(err)
      })
  }
export default
{
  getCategory,
  getCategoryS,
  getRole,
  getUnusefile,
  getLocation,
  getLocationCity,
}
        
</script>





