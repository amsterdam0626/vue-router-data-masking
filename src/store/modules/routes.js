const routes = {
  state:{
    params: [],
  },
  mutations: {
    PUSH_ROUTE (state, payload) {
      debugger
      if (!state.params.some(route => route.token === payload.token)) {
        state.params.push({
          token: payload.token,
          params: payload.params,
          url:payload.path
        })
      }
    },
    POP_ROUTE (state, payload) {
      let index = state.params.indexOf(payload.token)
      if (index !== -1) {
        state.params.splice(index, 1)
      }
    },
  },
  getters: {
    getParamsByToken (state, getters) {
      return token => {
        let params = {}
        for(const obj of state.params.values()){
          if(obj.token===token){
            params = Object.assign({}, params, obj.params)
            delete params["token"]
          }
        }
        return params
      }
    },
    checkInValidToken (state, getters) {
      return token => {
        return state.params.some(param=>param.token===token)
      }
    },
  },

}
export default routes
