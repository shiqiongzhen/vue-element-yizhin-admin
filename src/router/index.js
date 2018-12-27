import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import main from '@/view/admin/main'
import login from '@/view/admin/login'
import manage from '@/subview/admin/global/manage'
import site from '@/subview/admin/global/site'
import template from '@/subview/admin/global/template'
import nav from '@/subview/admin/global/nav'
import file from '@/subview/admin/global/file'
import message from '@/subview/admin/global/message'
import mail from '@/subview/admin/global/mail'
import data from '@/subview/admin/global/data'
import verifycode from '@/subview/admin/global/verifycode'
// content
import refund from '@/subview/admin/content/refund'
import service from '@/subview/admin/content/service'
import cases from '@/subview/admin/content/cases'
import comment from '@/subview/admin/content/comment'
import complain from '@/subview/admin/content/complain'
import dynamic from '@/subview/admin/content/dynamic'
import evaluation from '@/subview/admin/content/evaluation'
import help from '@/subview/admin/content/help'
import news from '@/subview/admin/content/news'
import notice from '@/subview/admin/content/notice'
import point from '@/subview/admin/content/point'
import task from '@/subview/admin/content/task'
import draft from '@/subview/admin/content/draft' //任务管理的稿件管理
import works from '@/subview/admin/content/works'
import worksEdit from '@/subview/admin/content/worksEdit'

import casesEdit from '@/subview/admin/content/casesEdit'
import casesAdd from '@/subview/admin/content/casesAdd'
import helpEdit from '@/subview/admin/content/helpEdit'
import helpAdd from '@/subview/admin/content/helpAdd'
import newsEdit from '@/subview/admin/content/newsEdit'
import newsAdd from '@/subview/admin/content/newsAdd'
import serviceEdit from '@/subview/admin/content/serviceEdit'
import taskEdit from '@/subview/admin/content/taskEdit'
//user
import user from '@/subview/admin/user/user'
import credit from '@/subview/admin/user/credit'
import customer from '@/subview/admin/user/customer'
import role from '@/subview/admin/user/role'
import shop from '@/subview/admin/user/shop'
import siteReply from '@/subview/admin/user/siteReply'
import siteTheme from '@/subview/admin/user/siteTheme'
import system from '@/subview/admin/user/system'
import userclass from '@/subview/admin/user/userclass'

import userEdit from '@/subview/admin/user/userEdit'
import userAdd from '@/subview/admin/user/userAdd'
import roleEdit from '@/subview/admin/user/roleEdit'
import roleAdd from '@/subview/admin/user/roleAdd'
import customerEdit from '@/subview/admin/user/customerEdit'
import customerAdd from '@/subview/admin/user/customerAdd'
import shopEdit from '@/subview/admin/user/shopEdit'
// collect分类    
import prov from '@/subview/admin/collect/prov.vue'
import provAdd from '@/subview/admin/collect/provAdd.vue'
import provEdit from '@/subview/admin/collect/provEdit.vue'
import city from '@/subview/admin/collect/city.vue'
import cityAdd from '@/subview/admin/collect/cityAdd.vue'
import cityEdit from '@/subview/admin/collect/cityEdit.vue'
import dist from '@/subview/admin/collect/dist.vue'
import distAdd from '@/subview/admin/collect/distAdd.vue'
import distEdit from '@/subview/admin/collect/distEdit.vue'
import contFirst from '@/subview/admin/collect/contFirst.vue'
import contSecond from '@/subview/admin/collect/contSecond.vue'
import contThird from '@/subview/admin/collect/contThird.vue'
import contFirstAdd from '@/subview/admin/collect/contFirstAdd.vue'
import contSecondAdd from '@/subview/admin/collect/contSecondAdd.vue'
import contThirdAdd from '@/subview/admin/collect/contThirdAdd.vue'
import contFirstEdit from '@/subview/admin/collect/contFirstEdit.vue'
import contSecondEdit from '@/subview/admin/collect/contSecondEdit.vue'
import contThirdEdit from '@/subview/admin/collect/contThirdEdit.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'main',
      path: '/',
      component: main
    },    
    { 
    name: 'login',
    path: '/login',
    component: login
    },
    { 
      path: '/main', 
      component: main,
      children: [
        { // 全局
            name: 'manage',
            path: '',
            component: manage
          },
          { 
              name: 'site',
              path: 'site', 
              component: site
          },
          { 
              name: 'template',
              path: 'template',
              component: template
          },
          {  
              name: 'nav',
              path: 'nav',
              component: nav
          },
          {  
              name: 'file',
              path: 'file', 
              component: file
          },
          { 
              name: 'message',
              path: 'message', 
              component: message
          },
          { 
              name: 'mail',
              path: 'mail', 
              component: mail
          },
          { 
              name: 'data',
              path: 'data', 
              component: data
          },
          { 
              name: 'verifycode',
              path: 'verifycode', 
              component: verifycode
          },// 内容
          { 
           name: 'casesEdit',
           path: 'cases/edit/:articleid',
           component: casesEdit
          },
          { 
           name: 'casesAdd',
           path: 'cases/add',
           component: casesAdd
          },
          { 
           name: 'helpEdit',
           path: 'help/edit/:articleid',
           component: helpEdit
          },
          { 
           name: 'helpAdd',
           path: 'help/add',
           component: helpAdd
          },
          { 
           name: 'newsEdit',
           path: 'news/edit/:articleid',
           component: newsEdit
          },
          { 
           name: 'newsAdd',
           path: 'news/add',
           component: newsAdd
          },
          { 
              name: 'serviceEdit',
              path: 'service/:serviceid', 
              component: serviceEdit
          },
          { 
              name: 'taskEdit',
              path: 'task/:taskid',
              component: taskEdit
          },
          { 
              name: 'worksEdit',
              path: 'works/:worksid',
              component: worksEdit
          },
          { 
              name: 'task',
              path: 'task',
              component: task
          },
          { 
              name: 'draft', //任务管理的稿件管理
              path: 'draft',
              component: draft
          },
          { 
              name: 'service',
              path: 'service', 
              component: service
          },
          { 
              name: 'works',
              path: 'works',
              component: works
          },
          {  
              name: 'cases',
              path: 'cases',
              component: cases
          },
          {  
              name: 'point',
              path: 'point', 
              component: point
          },
          { 
              name: 'news',
              path: 'news', 
              component: news
          },
          { 
              name: 'help',
              path: 'help', 
              component: help
          },
          { 
              name: 'comment',
              path: 'comment', 
              component: comment
          },
          { 
              name: 'refund',
              path: 'refund', 
              component: refund
          },
          { 
              name: 'complain',
              path: 'complain', 
              component: complain
          },
          { 
              name: 'evaluation',
              path: 'evaluation', 
              component: evaluation
          },
          { 
              name: 'notice',
              path: 'notice', 
              component: notice
          },
          { 
              name: 'dynamic',
              path: 'dynamic', 
              component: dynamic
          }, // 用户
          { 
           name: 'userEdit',
           path: 'user/edit/:userid',
           component: userEdit
          },
          { 
           name: 'userAdd',
           path: 'user/add',
           component: userAdd
          },
          { 
           name: 'roleEdit',
           path: 'role/edit/:roleid',
           component: roleEdit
          },
          { 
           name: 'rolerAdd',
           path: 'role/add',
           component: roleAdd
          },
          { 
           name: 'customerEdit',
           path: 'customer/edit/:customerid',
           component: customerEdit
          },
          { 
           name: 'customerAdd',
           path: 'customer/add',
           component: customerAdd
          },
          { 
           name: 'shopEdit',
           path: 'shop/edit/:shopid',
           component: shopEdit
          },
          { 
           name: 'user',
           path: 'user',
           component: user
          },
          { 
              name: 'system',
              path: 'system',
              component: system
          },
          { 
              name: 'role',
              path: 'role', 
              component: role
          },
          { 
              name: 'userclass',
              path: 'userclass',
              component: userclass
          },
          {  
              name: 'credit',
              path: 'credit',
              component: credit
          },
          {  
              name: 'siteReply',
              path: 'siteReply', 
              component: siteReply
          },
          {  
              name: 'siteTheme',
              path: 'siteTheme', 
              component: siteTheme
          },
          { 
              name: 'shop',
              path: 'shop', 
              component: shop
          },
          { 
              name: 'customer',
              path: 'customer', 
              component: customer
          },
          // 分类
          { 
              name: 'contFirst',
              path: 'contFirst', 
              component: contFirst
          },
          { 
              name: 'contSecond',
              path: 'contSecond', 
              component: contSecond
          },
          { 
              name: 'contThird',
              path: 'contThird', 
              component: contThird
          },
          { 
              name: 'contFirstAdd',
              path: 'contFirst/add', 
              component: contFirstAdd
          },
          { 
              name: 'contSecondAdd',
              path: 'contSecond/add', 
              component: contSecondAdd
          },
          { 
              name: 'contThirdAdd',
              path: 'contThird/add', 
              component: contThirdAdd
          },
          { 
              name: 'contFirstEdit',
              path: 'contFirst/:cataid', 
              component: contFirstEdit
          },
          { 
              name: 'contSecondEdit',
              path: 'contSecond/:cataid', 
              component: contSecondEdit
          },
          { 
              name: 'contThirdEdit',
              path: 'contThird/:cataid', 
              component: contThirdEdit
          },
          { 
              name: 'prov',
              path: 'prov', 
              component: prov
          },
          { 
              name: 'city',
              path: 'city', 
              component: city
          },
          { 
              name: 'dist',
              path: 'dist', 
              component: dist
          },
          { 
              name: 'provAdd',
              path: 'prov/add', 
              component: provAdd
          },
          { 
              name: 'cityAdd',
              path: 'city/add', 
              component: cityAdd
          },
          { 
              name: 'distAdd',
              path: 'dist/add', 
              component: distAdd
          },
          { 
              name: 'provEdit',
              path: 'prov/:cataid', 
              component: provEdit
          },
          { 
              name: 'cityEdit',
              path: 'city/:cataid', 
              component: cityEdit
          },
          { 
              name: 'distEdit',
              path: 'dist/:cataid', 
              component: distEdit
          }
      ]
    }
    
  ]
})
