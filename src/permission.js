import router from './router'
import store from './store'
import { menusToRoutes, resetTokenAndClearUser } from './utils'
import { LoadingBar } from 'iview'
// 是否有菜单数据
let hasMenus = false
router.beforeEach(async (to, from, next) => {
    LoadingBar.start()
    if (localStorage.getItem('token')) {
        if (to.path === '/login') {
            next({path: '/'})
        } else {
            if (hasMenus) {
                next()
            } else {
                try {
                    const routes = menusToRoutes(store.state.menuItems)
                    // 动态添加路由
                    router.addRoutes(routes)
                    hasMenus = true
                    next({path: to.path || '/'})
                } catch (error) {
                    resetTokenAndClearUser()
                    next(`/login?redirect=${to.path}`)
                }
            }
        }
    } else {
        hasMenus = false
        if (to.path === '/login') {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }
    }
})

router.afterEach(() => {
    LoadingBar.finish()
})