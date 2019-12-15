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

let AUTH_TOKEN=(function(){
    return localStorage.getItem("token");
})();

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

// 设置基础URL 192.168.80.128 192.168.43.57 
axios.defaults.baseURL = '/api'
// 设置请求超时时间 3s
axios.defaults.timeout = 3000
// axios全局token
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
// 设置axios请求头
// axios.headers = {'Content-Type':'application/json;charset=UTF-8'}
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'
//axios默认不发送cookie,每次请求都是新的会话
axios.defaults.withCredentials=true

// Vue.prototype.$axios = axios

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})