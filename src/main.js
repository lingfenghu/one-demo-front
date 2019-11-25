import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import router from './router'
import iView from 'iview'
import axios from 'axios'
import 'iview/dist/styles/iview.css'
import './permission'

Vue.config.productionTip = false
Vue.use(iView)
Vue.use(ElementUI);
Vue.use(axios)

// 设置基础URL
axios.defaults.baseURL = 'http://localhost:8080'
// 设置请求超时时间
axios.defaults.timeout = 5000

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

Vue.prototype.$axios = axios

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})