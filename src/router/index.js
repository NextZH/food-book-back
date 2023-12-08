import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CarouselView from '../views/CarouselView.vue'
import DataPackageView from '../views/DataPackageView.vue'
import HomeCharts from '../views/HomeCharts.vue'
import LoginView from '../views/LoginView.vue'
import MemberView from '../views/MemberView.vue'
import MenuView from '../views/MenuView.vue'
import UserView from '../views/UserView.vue'
import AddMin from '../views/AddMin.vue'

import api from '@/api';
import store from '@/store';
import { MessageBox } from 'element-ui';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: HomeView,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomeCharts,
        meta: {
          title: ['']
        },
      },
      {
        path: '/carousel',
        name: 'Carousel',
        component: CarouselView,
        meta: {
          title: ['轮播图管理']
        },
      },
      {
        path: '/dataPackage',
        name: 'DataPackage',
        component: DataPackageView,
        meta: {
          title: ['套餐管理']
        },
      },
      {
        path: '/member',
        name: 'Member',
        component: MemberView,
        meta: {
          title: ['会员管理']
        },
      },
      {
        path: '/AddMin',
        name: 'AddMin',
        component: AddMin,
        meta: {
            title: ['会员管理', '新增会员']
        }
    },
      {
        path: '/menu',
        name: 'Menu',
        component: MenuView,
        meta: {
          title: ['菜谱管理']
        },
      },
      {
        path: '/user',
        name: 'User',
        component: UserView,
        meta: {
          title: ['用户管理']
        },
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach(async (to, from, next) => {
  const token = localStorage.token;
  if (!to.path.includes('login')) {
    if (token) {
      const res = await api.users.getUserInfo()
      // console.log(res);
      if (res.code) {
        store.commit('SET_USER_INFO', res.userInfo);
        next();
        return;
      }
    }
    MessageBox.alert('你还没有登录，请先登录', '提示', {
      confirmButtonText: '确定',
      callback: action => {
        next('/login');
      }
    });
    return;
  }else{
    if (token) {
      const res = await api.users.getUserInfo()
      // console.log(res);
      if (res.code) {
        // console.log(1);
        // next(false);
        router.replace('/home');
        return
      }
    }
    next();
  }
})

export default router
