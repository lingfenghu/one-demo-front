import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

if(sessionStorage.getItem("token")){
    store.commit("setToken",sessionStorage.getItem("token"))
}

const commonRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/Login.vue')
    },
    {path: '/', redirect: '/home'},
] 

// 需要通过后台数据来生成的组件
export const asyncRoutes = {
    'home': {
        path: 'home',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    't1': {
        path: 't1',
        name: 't1',
        component: () => import('../views/T1.vue')
    },
    'password': {
        path: 'password',
        name: 'password',
        component: () => import('../views/Password.vue')
    },
    'msg': {
        path: 'msg',
        name: 'msg',
        component: () => import('../views/Msg.vue')
    },
    'userinfo': {
        path: 'userinfo',
        name: 'userinfo',
        component: () => import('../views/UserInfo.vue')
    },
    'basicinfo': {
        path: 'basicinfo',
        name: 'basicinfo',
        component: () => import('../views/BasicInfo.vue')
    },
    'stafflist': {
        path: 'stafflist',
        name: 'stafflist',
        component: () => import('../views/StaffList.vue')
    }
}

const createRouter = () => new Router({
    mode: 'history',//去除路径/#！/
    routes: commonRoutes
})

const router = createRouter()

router.beforeEach((to,from,next)=>{
    if(to.path === '/login'){
        next()
    }else{
        let token = localStorage.getItem('token')
        if(token === null || token === ''){
            next('/login')
        }else{
            next()
        }
    }
})

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher 
}

export default router