import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App'
import Index from '../views/Index'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: '登录',
        component: () => import('../views/Login')
    },
    {
        path: '/home',
        name: '菜单',
        component: Index,
        children: [
            {
                path: '/userManage',
                name: '用户管理',
                component: Home,
                children: [
                    {
                        path: '/userManage',
                        name: '用户列表',
                        component: () => import("../views/UserManage")
                    }
                ]
            },
            {
                path: '/home',
                name: '权限管理',
                component: Home,
                children: [
                    {
                        path: '/permissionManage',
                        name: '权限列表',
                        component: () => import('../views/PermissionManage')
                    },
                    {
                        path: '/roleManage',
                        name: '角色列表',
                        component: () => import('../views/RoleManage')
                    }
                ]
            },
            {
                path: '/home',
                name: '商品管理',
                component: Home,
                children: [
                    {
                        path: '/goodsManage',
                        name: '商品列表',
                        component: () => import('../views/GoodsManage')
                    },
                    {
                        path: '/goodsManage',
                        name: '分类参数',
                        component: () => import('../views/GoodsManage')
                    },
                    {
                        path: '/goodsManage',
                        name: '商品分类',
                        component: () => import('../views/GoodsManage')
                    },
                ]
            },
            {
                path: '/home',
                name: '订单管理',
                component: Home,
                children: [
                    {
                        path: '/orderManage',
                        name: '订单列表',
                        component: () => import('../views/OrderManage')
                    }
                ]
            }
        ]
    },
    {
        path: '*',
        component: () => import('../views/Error')
    }
    // {
    //     path: '/home',
    //     name: '用户管理',
    //     component: Index,
    //     children: [
    //         {
    //             path: '/userManage',
    //             name: '用户列表',
    //             component: () => import("../views/UserManage")
    //         }
    //     ]
    // },
    // {
    //     path: '/home',
    //     name: '权限管理',
    //     component: Index,
    //     children: [
    //         {
    //             path: '/permissionManage',
    //             name: '权限列表',
    //             component: () => import('../views/PermissionManage')
    //         },
    //         {
    //             path: '/roleManage',
    //             name: '角色列表',
    //             component: () => import('../views/RoleManage')
    //         }
    //     ]
    // },
    // {
    //     path: '/home',
    //     name: '商品管理',
    //     component: Index,
    //     children: [
    //         {
    //             path: '/goodsManage',
    //             name: '商品列表',
    //             component: () => import('../views/GoodsManage')
    //         },
    //         {
    //             path: '/goodsManage',
    //             name: '分类参数',
    //             component: () => import('../views/GoodsManage')
    //         },
    //         {
    //             path: '/goodsManage',
    //             name: '商品分类',
    //             component: () => import('../views/GoodsManage')
    //         },
    //     ]
    // },
    // {
    //     path: '/home',
    //     name: '订单管理',
    //     component: Index,
    //     children: [
    //         {
    //             path: '/orderManage',
    //             name: '订单列表',
    //             component: () => import('../views/OrderManage')
    //         }
    //     ]
    // }
]
if (sessionStorage.getItem("token")){
    store.commit("set_token", sessionStorage.getItem("token"))
}
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
//挂载路由守卫
router.beforeEach((to, form, next) => {
    if (to.path === '/login') {
        return next();
    }
    const token = window.sessionStorage.getItem("token");
    if (!token) {
        return next('login');
    }
    return next();

})



export default router
