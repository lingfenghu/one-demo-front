import Vue from 'vue'
import App from './App'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './permission'
import echarts from 'echarts'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(iView)
Vue.use(VueAxios, axios)
// Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

// 设置基础URL
axios.defaults.baseURL = 'http://localhost:8080'
// 设置请求超时时间 5s
axios.defaults.timeout = 5000
// axios全局token
axios.defaults.headers.token = store.state.token
// 设置axios请求头
axios.headers = {'Content-Type':'application/json;charset=UTF-8'}


// // 添加请求拦截器
// axios.interceptors.request.use(function (config) {
//     // 在发送请求之前做些什么
//     if(localStorage.getItem('token')){
//       config.headers.token = localStorage.getItem('token')
//     }
//     return config;
//   }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
//   });

// // 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//     // 对响应数据做点什么
//     return response;
//   }, function (error) {
//     // 对响应错误做点什么
//     return Promise.reject(error);
//   });

// Vue.prototype.$axios = axios

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})