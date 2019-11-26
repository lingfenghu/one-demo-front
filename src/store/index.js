import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: '',
        // 左侧菜单栏数据
        menuItems: [
            {
                name: 'home', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'md-home', // icon类型
                text: '主页', // 文本内容
            },
            {
                text: '基本信息及制卡',
                type: 'ios-paper',
                children: [
                    {
                        type: 'ios-grid',
                        name: 't1',
                        text: '表格',
                        hidden: false, // 隐藏此菜单 可以通过在地址栏上输入对应的 URL 来显示页面
                    },
                    {
                        text: '人员数据采集',
                        type: 'ios-paper',
                        name: 'basicinfo'
                    },
                    {
                        text: '人员信息管理',
                        type: 'ios-paper',
                    },
                    {
                        text: '人员信息修改',
                        type: 'ios-paper',
                    },
                    {
                        text: '三级菜单',
                        type: 'ios-paper',
                        children: [
                            {
                                type: 'ios-notifications-outline',
                                name: 'msg',
                                text: '查看消息'
                            },
                            {
                                type: 'md-lock',
                                name: 'password',
                                text: '修改密码'
                            },
                            {
                                type: 'md-person',
                                name: 'userinfo',
                                text: '基本资料',
                            }
                        ]
                    }
                ]
            },
            {
                text: '分析统计管理',
                type: 'ios-paper',
                children: [
                    {
                        text: '性别统计',
                        type: 'ios-paper',
                    },
                    {
                        text: '年龄统计',
                        type: 'ios-paper',
                    },
                    {
                        text: '工种统计',
                        type: 'ios-paper',
                    },
                    {
                        text: '等级统计',
                        type: 'ios-paper',
                    },
                ]
            },
            {
                text: '系统管理',
                type: 'ios-paper',
                children: [
                    {
                        text: '工种目录管理',
                        type: 'ios-paper',
                    }
                ]
            }
        ],
    },
    mutations: {
        setToken(state,token){
            state.token = token
            sessionStorage.token = token
        },
        removeToken(state){
            state.token = ''
            sessionStorage.removeItem("token")
        },
        setMenus(state, items) {
            state.menuItems = [...items]
        },
    }
})

export default store