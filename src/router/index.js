import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import User from '@/components/User'
import Detail from '@/components/Detail'
import Profile from '@/components/Profile'
import NotFound from '@/components/NotFound'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/user/:id',
      name: 'User',
      component: User,
      meta:{_isMasking:true,_maskType:'param'}
    },
    {
      path: '/detail/:id/:number',
      name: 'Detail',
      component: Detail,
      meta:{_isMasking:true,_maskType:'param'}
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta:{_isMasking:true,_maskType:'query'}
    },
    {
      path: "/404",
      name: "notFound",
      component: NotFound
    },
    {
      path: "*", // 此处需特别注意置于最底部
      redirect: "/404"
    }
  ]
})
