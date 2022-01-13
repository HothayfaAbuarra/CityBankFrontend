<template>
    <div class="container">
        <div v-if="loading" class="loader"><loader></loader></div>
        <div class="login_box" v-bind:style="[loading ? {opacity:Opacity} : '']">
            <div class="form">
                <div class="form_title">SignUp Page:</div>
                <form v-on:submit.prevent="onSubmit">
                    <div class="form_group">
                        <div class="text">identity:</div>
                        <div class="input_field"><input type="text" v-on:blur="IdentityValidation" v-model="identity"></div>
                    </div>
                    <div class="validation_container" v-for="error in errors.identityError" :key="error"><small style="color:red;">{{error}}</small></div>
                    <div class="form_group">
                        <div class="text">UserName:</div>
                        <div class="input_field"><input type="text" v-on:blur="usernameValidation" v-model="username"></div>
                    </div>
                    <div class="validation_container"  v-for="error in errors.usernameError" :key="error"><small style="color:red;">{{error}}</small></div>
                    <div class="form_group" style="position:relative;">
                        <div class="text">Password:</div>
                        <div class="input_field"><input :type="inputType" v-on:blur="passWordValidation"  v-model="password"></div>
                        <button :style="{color:activeColor}" v-on:click.prevent="Show" class="eye"><i class="fas fa-eye-slash"></i></button>
                    </div>
                    <div class="validation_container" v-for="error in errors.passwordError" :key="error"><small style="color:red;">{{error}}</small></div>
                    <div class="form_group">
                        <div class="text">Email:</div>
                        <div class="input_field"><input type="text" v-on:blur="emailValidation" v-model="email"></div>
                    </div>
                    <div class="validation_container" v-for="error in errors.emailError" :key="error"><small style="color:red;">{{error}}</small></div>
                    <div class="form_group">
                        <div class="text">Department:</div>
                        <div class="input_field">
                            <select name="" id="" v-model="department" v-on:blur="departmentValidation">
                                <option value="1">Adminstrator</option>
                                <option value="2">Teller</option>
                            </select>
                        </div>
                    </div>
                    <div class="validation_container" v-for="error in errors.departmentError" :key="error"><small style="color:red;">{{error}}</small></div>
                    <div class="form_control">
                        <div class="submit">
                            <button class="input_button">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
                            <Modal v-if="!valid"
                            v-show="isModalVisible"
                            @close="closeModal"
                            >

                            <template v-slot:body>
                                {{message}}
                            </template>

                            </Modal>
                            <Modal v-if="valid"
                            v-show="isModalVisible"
                            @close="closeModal"
                            >

                            <template v-slot:body>
                                {{message2}}
                            </template>

                            </Modal>
    </div>
</template>
<script>
import axios from 'axios';
import pulseloader from 'vue-spinner/src/PulseLoader.vue';
import Modal from '../modal/modal.vue';
export default {
    components:{
        'loader':pulseloader,
        Modal
    },
    data:function(){
        return{
            errors:{
                identityError:[],
                usernameError:[],
                passwordError:[],
                emailError:[],
                departmentError:[]
            },
            username:"",
            password:"",
            email:"",
            department:"",
            repassword:"",
            identity:"",
            eyeColor:null,
            toggle:false,
            inputType:"password",
            activeColor:"black",
            loading:false,
            Opacity:.5,
            isModalVisible: false,
            valid:false,
            message:"",
            message2:""
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
        IdentityValidation:function(){
            this.errors.identityError=[]
            // identity validation
            if(this.identity==""){
                this.errors.identityError.push("Identity field is required")
                return;
            }
            let identityRegex = /^[0-9]{9}$/g;
            let Valididentity=identityRegex.test(this.identity);
            if(Valididentity==false){
                this.errors.identityError.push("Identity field allowed just 9 numbers");
            }
            // end identity validation
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
        emailValidation:function(){
            this.errors.emailError=[]
            // Email Validation
            if(this.email==""){
                this.errors.emailError.push("Email is Required");
                return;
            }
            var emailRegex=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let validEmail=emailRegex.test(this.email);
            if(validEmail==false){
                this.errors.emailError.push("Please enter valid email");
            }
            // End Email Validation
        },
        departmentValidation:function(){
            this.errors.departmentError=[]
            // Department required
            if(this.department==""){
                this.errors.departmentError.push("department field is required");
                return;
            }
            //End department required   
        },
        showModal() {
        this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        onSubmit:function(){
            this.IdentityValidation();
            this.usernameValidation();
            this.passWordValidation();
            this.departmentValidation();
            this.emailValidation();
            if(this.errors.identityError.length==0&&this.errors.usernameError.length==0&&this.errors.passwordError.length==0,this.errors.emailError.length==0&&this.errors.departmentError.length==0){
                this.loading=true
                let obj={
                    department_id:parseInt(this.department),
                    role_id:parseInt(this.department),
                    employee_username:this.username,
                    employee_password:this.password,
                    employee_Email:this.email,
                    employee_identity:parseInt(this.identity),
                }
                axios.post("https://localhost:44336/api/employee/create",obj,{
                    headers: {'Access-Control-Allow-Origin': "*" },
                }).then((res)=>{
                    if(res.data=="00000000-0000-0000-0000-000000000000"){
                        this.loading=false
                        this.valid=false;
                        this.message="The username or identitynumber is taken";
                        this.showModal();
                        return;
                    }
                    this.valid=true;
                    this.message2="You Are Added sucesfully";
                    this.showModal();
                    this.loading=false
                    this.$router.push('/');
                })
            }
            
        }
    }
}
</script>
<style scoped>
    .loader {
        position: absolute;
        z-index: 9999999;
    }
    .eye{
        border:0px;
        background-color: transparent;
        position: absolute;
        right: 0px;
        bottom: 10px;
    }
    .validation_container{
        width:65%;
        margin-left: 35%;
        text-align: left;
    }
    .alert_danger{
        color: #721c24;
        background-color: #f8d7da;
        border-color: #f5c6cb;
        width:50%;
        margin:0 auto;
        margin-bottom:5px;
        padding:5px;
        font-size: 13px;
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
        position: relative;
    }
    .form_group{
        display: flex;
        flex-direction: row;
        padding-top:20px;
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
        width:100%;
        text-align: center;
    }
    .input_button{
        height: 100%;
        width: 30%;
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
    select{
        height: 100%;
        width: 100%;
        font-size: 20px;
        padding-top: 5px;
        padding-bottom: 5px;
    }
@media (max-width:1000px) {
    .eye{
        bottom: 15px;
        font-size: 20px;
    }
    .validation_container{
        width:100%;
        margin-left: 0%;
        text-align: left;
    }
    .text{
        width: 100%;
        font-size: 23px;
        display: flex;
        justify-content: left;
    }
    .form_title{
        font-size: 28px;
    }
    .login_box{
        width: 90%;
    }
    .form_group{
        flex-direction: column;
        padding-top: 10px;
    }
    .input_field{
        width: 100%;
    }
    input{
        font-size: 35px;
        padding-top:4px;
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
    select{
        font-size: 15px;
        padding-top: 14px;
        padding-bottom: 14px;
    }
}
</style>