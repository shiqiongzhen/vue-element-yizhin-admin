const catagory = {
  state: {
    catagory: { //保存用户信息
      catagoryFirst: "i am catagoryFirst",
      catagorySecond: null,
      catagoryThird: null
    }
  },
  mutations: {
    //更新用户信息
    setCatagoryFirst(state, newcatagoryFirst) {
      state.catagory.catagoryFirst = newcatagoryFirst;
    },
    setCatagorySecond(state, newcatagorySecond) {
      state.catagory.catagorySecond = newcatagorySecond;
    },
    setCatagoryThird(state, newcatagoryThird) {
      state.catagory.catagoryThird = newcatagoryThird;
    }
  },
  actions: {
    getCatagoryFirst(context) {
      this.$http.post(this.$api.First_findAll,
      {
        "page.pageNo":1,
        "page.pageSize":100
      })
     .then((response) => { 
        if(response.data.errorMessage == "您还未登录，请先登录"){
            this.$router.push('/login')
        }else{
          console.log(response)
          context.commit(setCatagoryFirst(response.data.categoryFirsts))
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    }

  }
}

export default catagory