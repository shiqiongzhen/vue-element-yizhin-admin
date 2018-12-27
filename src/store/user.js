const user = {
  state: {
    domain:'http://111.230.231.12:8888/weteamjava/', //保存后台请求的地址，修改时方便（比方说从测试服改成正式服域名）
    userInfo: { //保存用户信息
      account: null,
      password: null,
      uid: null,
      thumb: null
    }
  },
  mutations: {
    //更新用户信息
    updateUserInfo(state, newUserInfo) {
      state.userInfo = newUserInfo;
    }
  }
}

export default user