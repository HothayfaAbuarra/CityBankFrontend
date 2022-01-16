<template>
    <div class="container">
        <app-header></app-header>
        <div v-if="loading" class="loader"><loader></loader></div>
        <div class="content">
            <div class="login_box" v-bind:style="[loading ? {opacity:Opacity} : '']">
                <div class="form">
                    <div class="form_title">Update Account</div>
                    <form v-on:submit.prevent="onSubmit">
                        <div class="form_group">
                            <div class="text">Customer name:</div>
                            <div class="input_field"><input type="text" v-on:blur="nameValidation" v-model="Data.customer.customer_name"></div>
                        </div>
                        <div class="validation_container"  v-for="error in errors.nameError" :key="error"><small style="color:red;">{{error}}</small></div>
                        <div class="form_group">
                            <div class="text">Customer email:</div>
                            <div class="input_field"><input type="text" v-on:blur="emailValidation" v-model="Data.customer.customer_email"></div>
                        </div>
                        <div class="validation_container"  v-for="error in errors.emailError" :key="error"><small style="color:red;">{{error}}</small></div>
                        <div class="form_group">
                            <div class="text">Customer identity:</div>
                            <div class="input_field"><input type="text" v-on:blur="IdentityValidation" v-model="Data.customer.customer_identity"></div>
                        </div>
                        <div class="validation_container"  v-for="error in errors.identityError" :key="error"><small style="color:red;">{{error}}</small></div>
                        <div class="form_group">
                            <div class="text">Customer age:</div>
                            <div class="input_field"><input type="text" v-on:blur="ageValidation" v-model="Data.customer.customer_age"></div>
                        </div>
                        <div class="validation_container"  v-for="error in errors.ageError" :key="error"><small style="color:red;">{{error}}</small></div>
                        <div class="form_group">
                            <div class="text">Customer phone:</div>
                            <div class="input_field"><input type="text" v-on:blur="phoneValidation" v-model="Data.customer.customer_phone"></div>
                        </div>
                        <div class="validation_container"  v-for="error in errors.phoneError" :key="error"><small style="color:red;">{{error}}</small></div>
                        <div class="form_group">
                            <div class="text">Account type:</div>
                            <div class="input_field">
                                <select name="" id="" v-on:blur="typeValidation" v-model="Data.account.account_type">
                                    <option value="current">current</option>
                                    <option value="saving">saving</option>
                                </select>
                            </div>
                        </div>
                        <div class="validation_container"  v-for="error in errors.typeError" :key="error"><small style="color:red;">{{error}}</small></div>
                        <div class="form_group">
                            <div class="text">Account Balance</div>
                            <div class="input_field"><input v-on:blur="balanceValidation" type="text" v-model="Data.Balance.balance"></div>
                        </div>
                        <div class="validation_container"  v-for="error in errors.balanceError" :key="error"><small style="color:red;">{{error}}</small></div>
                        <div class="form_control">
                            <div class="submit">
                                <button class="input_button">Submit</button>
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
        if(localStorage.getItem("type")=="Teller"){
            this.$router.push('/TellerHome');
        }
    },
    components:{
        'app-header':Header,
        'app-footer':Footer,
        'loader':PulseLoader,
        Modal
    },
    data:function(){
        return{
            errors:{
                nameError:[],
                emailError:[],
                identityError:[],
                ageError:[],
                phoneError:[],
                typeError:[],
                balanceError:[]
            },
            Data:null,
            loading:false,
            Opacity:.5,
            isModalVisible: false,
            valid:false,
            message:"",
            message2:""
        }
    },
    beforeMount(){
        this.Data= this.$store.getters.getCustomer;
        if(this.Data==null){
            this.$router.push('/UpdateAccount'); 
        }
    },
    methods:{
        nameValidation:function(){
            this.errors.nameError=[]
            //name Validadtion
            if(this.Data.customer.customer_name==""){
                this.errors.nameError.push("Name is Required")
                return;
            }
            let Nameregex=(/^[A-Za-z]+$/);
            let Validname=Nameregex.test(this.Data.customer.customer_name);
            if(Validname==false){
                this.errors.nameError.push("Name Allow only alphapet characters")
                return;
            }
            // end name validation
        },
        emailValidation:function(){
            this.errors.emailError=[]
            // Email Validation
            if(this.Data.customer.customer_email==""){
                this.errors.emailError.push("Email is Required");
                return;
            }
            var emailRegex=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let validEmail=emailRegex.test(this.Data.customer.customer_email);
            if(validEmail==false){
                this.errors.emailError.push("Please enter valid email");
                return;
            }
            // End Email Validation
        },
        IdentityValidation:function(){
            this.errors.identityError=[]
            // identity validation
            if(this.Data.customer.customer_identity==""){
                this.errors.identityError.push("Identity field is required")
                return;
            }
            let identityRegex = /^[0-9]{9}$/g;
            let Valididentity=identityRegex.test(this.Data.customer.customer_identity);
            if(Valididentity==false){
                this.errors.identityError.push("Identity field allowed just 9 numbers");
                return;
            }
            // end identity validation
        },
        ageValidation:function(){
            this.errors.ageError=[]
            // age validation
            if(this.Data.customer.customer_age==""){
                this.errors.ageError.push("age fieldd is required")
                return;
            }
            let ageRegex = /\d+/g;
            let Validage=ageRegex.test(this.Data.customer.customer_age);
            if(Validage==false){
                this.errors.ageError.push("Age allow only numbers");
                return;
            }
            // end age validation
        },
        phoneValidation:function(){
            this.errors.phoneError=[]
            // phone validation
            if(this.Data.customer.customer_phone==""){
                this.errors.phoneError.push("phone field is required")
                return;
            }
            let phoneRegex = /^[0-9]{10}$/g;
            let ValidPhone=phoneRegex.test(this.Data.customer.customer_phone);
            if(ValidPhone==false){
                this.errors.phoneError.push("phone field must be 10 numbers");
                return;
            }
            // end phone validation
        },
        typeValidation:function(){
            this.errors.typeError=[]
            // Department required
            if(this.Data.account.account_type==""){
                this.errors.typeError.push("department field is required");
                return;
            }
            //End department required   
        },
        balanceValidation:function(){
            this.errors.balanceError=[]
            // balance validation
            if(this.Data.Balance.balance==""){
                this.errors.balanceError.push("age field is required")
                return;
            }
            let balanceRegex = /\d+/g;
            let ValidBalance=balanceRegex.test(this.Data.Balance.balance);
            if(ValidBalance==false){
                this.errors.balanceError.push("Age allow only numbers");
                return;
            }
            // end balance validation
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
            this.IdentityValidation();
            this.ageValidation();
            this.phoneValidation();
            this.typeValidation();
            this.balanceValidation();
            if(this.errors.nameError.length==0 && this.errors.emailError.length==0 && this.errors.identityError.length==0 && this.errors.ageError.length==0 && this.errors.phoneError.length==0 && this.errors.typeError.length==0 && this.errors.balanceError.length==0){
                this.loading=true
                let token=localStorage.getItem("auth");
                let customer={
                    customer_name:this.Data.customer.customer_name,
                    customer_email:this.Data.customer.customer_email,
                    customer_identity:this.Data.customer.customer_identity,
                    customer_age:this.Data.customer.customer_age,
                    customer_phone:parseFloat(this.Data.customer.customer_phone)
                }
                let account={
                    account_type:this.Data.account.account_type
                }
                let balance={
                    balance:this.Data.Balance.balance
                }
                let obj={customer,account,balance}
                axios.put("https://localhost:44336/api/Admin/UpdateAccount/",obj,{
                    headers: {
                        'Access-Control-Allow-Origin': "*" ,
                        "Authorization" : `Bearer ${token}`
                    },
                }).then(()=>{
                    this.valid=true;
                    this.message2="Update Account sucessfully";
                    this.showModal();
                    this.loading=false
                }).catch(()=>{
                    this.valid=false;
                    this.showModal();
                    this.message="Error updating account";
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
        padding-top: 5px;
        padding-bottom: 5px;
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
        font-size: 18px;
        padding-top: 15px;
        padding-bottom: 15px;
    }
}
</style>