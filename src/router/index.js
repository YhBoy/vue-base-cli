import {createRouter,createWebHashHistory} from 'vue-router'
const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        name: 'Home',
        path:'/home',
        component: () => import('../views/home/index'),
        meta: {
            title: '首页'
        }
    },
    {
        name: 'Course',
        path:'/course',
        component: () => import('../views/course/index'),
        meta: {
            title: '课程'
        }
    },
    {
        name: 'ExaminationPaper',
        path:'/examinationPaper',
        component: () => import('../views/course/index'),
        meta: {
            title: '试卷'
        }
    },
    {
        name: 'Mine',
        path:'/mine',
        component: () => import('../views/mine/index'),
        meta: {
            title: '我的'
        }
    },
    {
        name: 'Login',
        path:'/login',
        component: () => import('../views/login/index'),
        meta: {
            title: '登录'
        }
    },
    {
        name: 'CourseInfo',
        path:'/courseInfo',
        component: () => import('../views/courseInfo/index'),
        meta: {
            title: '课程详情'
        }
    },

];

// add route path
routes.forEach(route => {
    route.path = route.path || '/' + (route.name || '');
});

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const title = to.meta && to.meta.title;
    if (title) {
        document.title = title;
    }
    if (to.name==='Login') {
        next();
    }else{
        let token=localStorage.getItem('token');
        if (token) {
            next();
        }else{
            next({ name: 'Login' })
        }
    }


});

export default router;
