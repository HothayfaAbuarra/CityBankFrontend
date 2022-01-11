import Vue from 'vue';
import VueRouter from 'vue-router'
import Login from '@/Registrationandlogin/Login.vue';
import SignUp from '@/Registrationandlogin/SignUp.vue';
import TellerHome from '@/Teller/TellerHome.vue';
import AdminHome from '@/Admin/AdminHome.vue';
import CreateAccount from '@/Admin/CreateAccount.vue';
import UpdateAccount from '@/Admin/UpdateAccount.vue';
import DeleteAccount from '@/Admin/DeleteAccount.vue';
import UpdateAccountv from '@/Admin/UpdateAccount_2.vue'
import profile from '@/Admin/ProfileUpdate';


Vue.use(VueRouter)

const routes = [
  {path:'/',component:Login,name:"login"},
  {path:'/SignUp',component:SignUp,name:"SignUp"},
  {path:'/TellerHome',component:TellerHome,name:"TellerHome"},
  {path:'/AdminHome',component:AdminHome,name:"AdminHome"},
  {path:'/CreateAccount',component:CreateAccount,name:"CreateAccount"},
  {path:'/UpdateAccount',component:UpdateAccount,name:"UpdateAccount"},
  {path:'/DeleteAccount',component:DeleteAccount,name:"DeleteAccount"},
  {path:'/Update',component:UpdateAccountv,name:"UpdateAccountv"},
  {path:'/profile',component:profile},
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
