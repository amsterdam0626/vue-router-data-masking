// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {generateUUID} from "@/utils/base.js"
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  //路由是否需要隐藏
  if (to.meta && to.meta._isMasking) {
    let temp = {}, fake = {}//temp vuex存放参数对象  fake 修改参数后的对象
    let _token=generateUUID()
    //params 不为空
    debugger;
    if (Object.keys(to.params).length > 0 &&
      to.params.hasOwnProperty('token')) {
      //token 为空 第一次进入
      if (to.params['token'] === '') {
        //将每一个参数进行替换
        for (const key of Object.keys(to.params)) {
          if (to.params.hasOwnProperty(key) && key !== 'token') {
            temp[key] = {
              value: {
                hashV: 1,
                trueV: to.params[key],
              },
            }
            fake[key] = 1
          }
        }
        fake.token = _token
        store.commit('PUSH_ROUTE', {
          path: to.fullPath,
          token: _token,
          params: temp,
        })
        next({ name: to.name, params: fake })
      } else {
        next()
      }

    } else if (Object.keys(to.query).length > 0 &&
      to.query.hasOwnProperty('token')) {
      if (to.query['token'] === '') {
        let query = to.query
        query.token = _token
        store.commit('PUSH_ROUTE', {
          path: to.fullPath,
          token:_token ,
          params: to.query,
        })
        next({ path: to.path, query: { token: _token } })
      } else {
        //校验token是否有效
        store.getters.checkInValidToken(to.query['token']) ? next() : next(
          '/404')
      }
    } else if (!to.query.hasOwnProperty('token') ||
      !to.params.hasOwnProperty('token')) { //验证无效token
      next('/404')
    } else {
      next()
    }
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
