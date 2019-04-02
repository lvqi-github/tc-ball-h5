import Vue from 'vue'
import Vuex from 'vuex'
import http from "@/api/interface";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    app: {
      appId: '99b8d17981574fe9a7a3a480a11cf38d',
      appSecret: 'b8683f967d8543df97ec466f8ab6c396'
    },
    user: {
      name: '',
      avatar: '',
      loginState: false //登陆状态 用于刷新
    }
  },
  mutations: {
    SET_USER: (state, obj) => {
      state.user.name = obj.username;
      state.user.avatar = obj.avatar;
      state.user.loginState = true;
    },
  },
  actions: {
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        http.getUserInfo().then(res => {
          if(res.resultCode == "1000"){
            commit('SET_USER', {
              username: res.value.username,
              avatar: res.value.avatar
            })
          }
          resolve(res)
        }).catch(error => {
          reject(error);
        })
      })
    },
  },
  getters: {
    name: state => state.user.name,
    avatar: state => state.user.avatar,
    loginState: state => state.user.loginState
  }
})
