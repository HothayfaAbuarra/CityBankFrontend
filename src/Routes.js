import Login from './Registrationandlogin/Login.vue';
import SignUp from './Registrationandlogin/SignUp.vue';
import TellerHome from './Teller/TellerHome.vue';
import AdminHome from './Admin/AdminHome.vue';
import CreateAccount from './Admin/CreateAccount.vue';
import UpdateAccount from './Admin/UpdateAccount.vue';
import DeleteAccount from './Admin/DeleteAccount.vue';
import UpdateAccountv from './Admin/UpdateAccount_2.vue';
export default[
    {path:'/login',component:Login},
    {path:'/SignUp',component:SignUp},
    {path:'/TellerHome',component:TellerHome},
    {path:'/TellerHome',component:TellerHome},
    {path:'/AdminHome',component:AdminHome},
    {path:'/CreateAccount',component:CreateAccount},
    {path:'/UpdateAccount',component:UpdateAccount},
    {path:'/DeleteAccount',component:DeleteAccount},
    {path:'/Update',component:UpdateAccountv},
]