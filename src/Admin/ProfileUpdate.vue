<template>
    <div class="container">
        <app-header></app-header>
        <div v-if="loading" class="loader"><loader></loader></div>
        <div class="content">
            <div class="login_box" v-bind:style="[loading ? {opacity:Opacity} : '']">
                <div class="form">
                    <div class="form_picture">
                        <img class="image" src="../assets/profile.png" alt="">
                        <div class="profile_edit_icon"><i class="fas fa-pen-square"></i></div>
                    </div>
                    <form @submit.prevent="onSubmit">
                        <div class="form_group">
                            <div class="text">Name:</div>
                            <div class="input_field"><input v-on:blur="nameValidation" v-model="name" type="text"></div>
                        </div>
                        <div class="validation_container"  v-for="error in errors.nameError" :key="error"><small style="color:red;">{{error}}</small></div>
                        <div class="form_group">
                            <div class="text">Email:</div>
                            <div class="input_field"><input v-on:blur="emailValidation" v-model="email" type="text"></div>
                        </div>
                        <div class="validation_container"  v-for="error in errors.emailError" :key="error"><small style="color:red;">{{error}}</small></div>
                        <div class="form_group">
                            <div class="text">Identity:</div>
                            <div class="input_field"><input v-on:blur="IdentityValidation" v-model="identity" type="text"></div>
                        </div>
                        <div class="validation_container"  v-for="error in errors.identityError" :key="error"><small style="color:red;">{{error}}</small></div>
                        <div class="form_control">
                            <div class="submit">
                                <button  class="input_button">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
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
        <app-footer></app-footer>
    </div>
</template>
<script>
import Header from '../Layout/Header.vue';
import Footer from '../Layout/Footer.vue';
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import Modal from '../modal/modal.vue';
export default {
    beforeCreate(){
        if(localStorage.getItem("auth")==null)
        {
            this.$router.push('/');
        }
    },
    data:function(){
        return{
            errors:{
                nameError:[],
                emailError:[],
                identityError:[]
            },
            name:null,
            email:null,
            identity:null,
            password:null,
            loading:false,
            Opacity:.5,
            id:"",
            isModalVisible: false,
            valid:false,
            message:"",
            message2:""
        }
    },
    created(){
        let base64Url = localStorage.getItem("auth").split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        let token=localStorage.getItem("auth");


        axios.get(`https://localhost:44336/api/employee/GetEmployee/${JSON.parse(jsonPayload).id}`,{
            headers: {
                'Access-Control-Allow-Origin': "*" ,
                "Authorization" : `Bearer ${token}`
            },
        }).then(res=>{
            this.loading=false;
            this.name=res.data.employee_username;
            this.email=res.data.employee_Email;
            this.identity=res.data.employee_identity;
            this.id=JSON.parse(jsonPayload).id  
        }).catch(error=>{
            console.log(error)
        })
    },
    components:{
        'app-header':Header,
        'app-footer':Footer,
        'loader':PulseLoader,
        Modal
    },
    methods:{
        nameValidation:function(){
            this.errors.nameError=[]
            //name Validadtion
            if(this.name==""){
                this.errors.nameError.push("Name is Required")
                return;
            }
            let Nameregex=(/^[A-Za-z]+$/);
            let Validname=Nameregex.test(this.name);
            if(Validname==false){
                this.errors.nameError.push("Name Allow only alphapet characters")
                return;
            }
            // end name validation
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
                return;
            }
            // End Email Validation
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
                return;
            }
            // end identity validation,
        },
        showModal() {
        this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        onSubmit:function(){
            this.nameValidation();
            this.emailValidation();
            this.IdentityValidation()
            
            if(this.errors.nameError.length==0 && this.errors.emailError.length==0 && this.errors.identityError.length==0){
                let obj={employee_username:this.name,employee_Email:this.email,employee_identity:parseInt(this.identity)}
                let token=localStorage.getItem("auth");
                axios.put   (`https://localhost:44336/api/employee/UpdateEmployee/${this.id}`,obj,{
                    headers: {
                        'Access-Control-Allow-Origin': "*" ,
                        "Authorization" : `Bearer ${token}`
                    },
                    
                }).then(()=>{
                    this.valid=false;
                    this.message="Update Account Sucessfully"
                    this.showModal();
                }).catch(()=>{
                    this.valid=true;
                    this.message2="Failed Update Account"
                    this.showModal();
                })
                return;
            }else{
                return;
            }
        }
    }
}
</script>
<style scoped>
    .validation_container{
        width:65%;
        margin-left: 35%;
        text-align: left;
    }
    .loader {
        position: absolute;
        z-index: 9999999;
        bottom: 50%;
        left: 50%;
    }
    .content{
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 30px;
        height: 100%;
    }
    .login_box{
        width:500px;
        background-color: #f8f9fd;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    .form{
        padding:8%;
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
    .form_picture{
        height:100px;
        position: relative;
    }
    .image{
        max-width: 100%;
        max-height: 100%;
        border-radius:55px;
    }
    .profile_edit_icon{
        position: absolute;
        right: 240px;
        bottom: 5px;
        cursor: pointer;
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
        background: #393a3e;
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
    .validation_container{
        width:100%;
        margin-left: 0%;
        text-align: left;
    }
    .content{
        height: unset;
        margin-bottom: 50px;
        margin-top: 2px;
    }
    .text{
        width: 100%;
        font-size: 20px;
        justify-content: flex-start;
    }
    .form_title{
        font-size: 33px;
    }
    .login_box{
        width: 400px;
    }
    .form_group{
        flex-direction: column;
    }
    .input_field{
        width: 100%;
    }
    input{
        font-size: 35px;
        padding-top: 5px;
        padding-bottom: 4px;
    }
    .input_button{
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius: 41px;
        font-size: 19px;
    }
    .link{
        font-size: 30px;
    }
    select{
        font-size: 15px;
        padding-top: 15px;
        padding-bottom: 15px;
    }
    .profile_edit_icon{
        right:200px;
    }
}
</style>