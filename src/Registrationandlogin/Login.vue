<template>
    <div class="container">
        <div v-if="loading" class="loader"><loader></loader></div>
        <div class="login_box" v-bind:style="[loading ? {opacity:Opacity} : '']">
            <div class="form">
                <div class="form_title">SignIn Page:</div>
                <form v-on:submit.prevent="onSubmit">
                    <div class="form_group">
                        <div class="text">UserName:</div>
                        <div class="input_field"><input v-on:blur="usernameValidation" v-model="username" type="text"></div>
                    </div>
                    <div class="validation_container"  v-for="error in errors.usernameError" :key="error"><small style="color:red;">{{error}}</small></div>
                    <div class="form_group" style="position:relative;">
                        <div class="text">Password:</div>
                        <div class="input_field"><input v-bind:type="inputType" v-on:blur="passWordValidation" v-model="password"></div>
                        <button :style="{color:activeColor}" v-on:click.prevent="Show" class="eye"><i class="fas fa-eye-slash"></i></button>
                    </div>
                    <div class="validation_container" v-for="error in errors.passwordError" :key="error"><small style="color:red;">{{error}}</small></div>
                    <div class="form_control">
                        <div class="submit">
                            <button class="input_button">SignIn</button>
                        </div>
                        <div class="signup">
                            <router-link class="link" to="/SignUp" exact>Signup</router-link>
                        </div>

                            <Modal v-if="!valid"
                            v-show="isModalVisible"
                            @close="closeModal"
                            >

                            <template v-slot:body>
                                Invalid Credintials
                            </template>

                            </Modal>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>
<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import Modal from '../modal/modal.vue';
import axios from 'axios';

export default {
    components:{
        'loader':PulseLoader,
        Modal
    },
    beforeCreate(){
        if(localStorage.getItem("auth")!=null && localStorage.getItem("type")=="Admin"){
            this.$router.push("/AdminHome");
        }
        if(localStorage.getItem("auth")!=null && localStorage.getItem("type")=="Teller"){
            this.$router.push("/TellerHome");
        }
    },
    data:function(){
        return{
            errors:{
                usernameError:[],
                passwordError:[]
            },
            inputType:"password",
            username:"",
            password:"",
            activeColor:"black",
            toggle:false,
            loading:false,
            Opacity:.5,
            isModalVisible: false,
            valid:false,
        }
    },
    methods:{
        Show:function(){
            this.toggle=!this.toggle;
            if(this.toggle==true){
                this.inputType="text"
                this.activeColor="blue"
            }
            if(this.toggle==false){
                this.inputType="password"
                this.activeColor="black"
            }
        },
        usernameValidation:function(){
            this.errors.usernameError=[]
            //Username Validadtion
            if(this.username==""){
                this.errors.usernameError.push("Name is Required")
                return;
            }
            let Nameregex=(/^[A-Za-z]+$/);
            let Validname=Nameregex.test(this.username);
            if(Validname==false){
                this.errors.usernameError.push("Name Allow only alphapet characters")
            }
            // end username validation
        },
        passWordValidation:function(){
            this.errors.passwordError=[]
            //password validation
            if(this.password==""){
                this.errors.passwordError.push("password required");
                return;
            }
            let passwordRegex=/^[a-z0-9]+$/i;
            let validPassword=passwordRegex.test(this.password);
            if(validPassword==false){
                this.errors.passwordError.push("Password Allow only alphanumeric characters")
            }
            //end password validation
        },
        showModal() {
        this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        onSubmit:function(){
            this.usernameValidation();
            this.passWordValidation();
            if(this.errors.usernameError.length==0 && this.errors.passwordError.length==0){
                this.loading=true;
                axios.post("https://localhost:44336/api/employee/auth",{username:this.username,password:this.password},{
                    headers: {'Access-Control-Allow-Origin': "*" }
                }).then(res=>{
                    console.log(res.data.department_name)
                    if(res.data.department_name!=null){
                        localStorage.setItem("auth",res.data.token)
                        if(res.data.department_name=="Admin"){
                            this.$router.push('/AdminHome');
                            localStorage.setItem("type","Admin");
                        }else{
                            this.$router.push('/TellerHome');
                            localStorage.setItem("type","Teller");
                        }
                        return;
                    }else{
                        this.showModal();
                        this.loading=false;
                    }
                }).catch(error=>{
                    this.loading=false;
                    console.log(error)
                })
            }
        },
    }
}
</script>
<style scoped>
    .loader {
        position: absolute;
        z-index: 9999999;
    }
    .validation_container{
        width:65%;
        margin-left: 35%;
        text-align: left;
    }
    .eye{
        border:0px;
        background-color: transparent;
        position: absolute;
        right: 0px;
        bottom: 10px;
    }
    .container{
        height:100%;
        display: flex;
        justify-content: center;
        align-items:center;
        background-image: url('../assets/bank.jpg');
        background-position: center;
    }
    .login_box{
        width:500px;
        background-color: #f8f9fd;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    .form{
        padding:5%;
        box-shadow:0 4px 8px 0 rgb(0 0 0 / 20%);
    }
    .form_group{
        display: flex;
        flex-direction: row;
        padding-top:25px;
    }
    .text{
        width: 35%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .input_field{
        width: 65%;
        text-align: center;
    }
    input{
        height:100%;
        width:100%;
        padding-top: 5px;
        padding-bottom: 5px;
        font-size: 20px;
    }
    .form_control{
        padding-top:15px;
        display: flex;
        flex-direction: row;
    }
    .submit{
        align-self: center;
    }
    .form_title{
        font-size: 22px;
        padding:10px;
        text-align: center;
    }
    .submit{
        width:50%;
        text-align: right;
    }
    .input_button{
        height: 100%;
        width: 50%;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius: 18px;
        border: 0px;
        color: white;
        background: #a542ab;
        cursor: pointer;
    }
    .signup{
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
    }
    .link{
        text-decoration: none;
    }
    @media (max-width:1000px) {
        .validation_container{
            width:100%;
            margin-left: 0%;
            text-align: left;
        }
        .eye{
            bottom: 15px;
            font-size: 20px;
        }
        .title{
            font-size:27px;
        }
        .form_title{
            font-size:28px ;
        }
        .text{
            width: 100%;
            font-size: 23px;
            justify-content: left;
        }
        .login_box{
            width: 90%;
        }
        .form_group{
            flex-direction: column;
        }
        .input_field{
            width: 100%;
        }
        input{
            font-size: 35px;
        }
        .input_button{
            padding-top: 20px;
            padding-bottom: 20px;
            border-radius: 30px;
            font-size: 20px;
        }
        .link{
            font-size: 30px;
        }
    }
</style>