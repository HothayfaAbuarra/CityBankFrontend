<template>
    <div class="container">
        <app-header></app-header>
        <div class="loader" v-if="loading"><loader></loader></div>
        <div class="content">
            <div class="top_title">
                Fill the form below and then submit to delete the account
            </div>
            <div class="login_box" v-bind:style="[loading ? {opacity:Opacity} : '']">
                <div class="form" v-on:submit.prevent="onSubmit">
                    <div class="form_title">Enter Account Identity number</div>
                    <form action="">
                        <div class="form_group">
                            <div class="input_field"><input v-on:blur="identityValidation" v-model="identity" type="text"></div>
                        </div>
                        <div class="validation_container" v-for="error in errors.identityError" :key="error"><small style="color:red;">{{error}}</small></div>
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
import Modal from '../modal/modal.vue';
import pulseloader from 'vue-spinner/src/PulseLoader.vue';
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
    data:function(){
        return{
            errors:{
                identityError:[]
            },
            identity:null,
            loading:false,
            Opacity:.5,
            isModalVisible: false,
            valid:false,
            message:"",
            message2:""
        }
    },
    components:{
        'app-header':Header,
        'app-footer':Footer,
        'loader':pulseloader,
        Modal
    },
    methods:{
        identityValidation:function(){
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
            // end identity validation
        },
        showModal() {
        this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        onSubmit:function(){
            this.identityValidation();
            if(this.errors.identityError.length==0){
                let token=localStorage.getItem("auth");
                this.loading=true;
                let id={
                    identity:parseInt(this.identity)
                }
                axios.delete("https://localhost:44336/api/Admin/DeleteAccount/"+id.identity,{
                    headers: {
                        'Access-Control-Allow-Origin': "*" ,
                        "Authorization" : `Bearer ${token}`
                    },
                }).then((res)=>{
                    if(res.data==false){
                        this.valid=false;
                        this.message="There is no account for this identity number"
                        this.showModal();
                        //alert("There is no account for this identity number");
                        this.loading=false;
                        return;
                    }
                    this.valid=true;
                    this.message2="Deleted account successfully";
                    this.showModal();
                    this.loading=false;
                });
            }
            
        }
    }
}
</script>
<style scoped>
    .loader {
        position: absolute;
        bottom: 65%;
        left: 45%;
        z-index: 999;
    }
    .top_title{
        text-align: center;
        font-size: 25px;
        margin-bottom: 15px;
    }
    .content{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
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
        justify-content: center;
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
    .top_title{
        font-size: 22px;
    }
    .content{
        height: unset;
        margin: 26px;
        margin-top: 2px;
    }
    .form_group{
        padding-top:23px
    }
    .text{
        width: 100%;
        font-size: 38px;
        justify-content: flex-start;
    }
    .form_title{
        font-size: 25px;
        text-align: center;
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
        padding-top: unset;
        padding-bottom: unset;
    }
    .input_button{
        padding-top: unset;
        padding-bottom: unset;
        padding: 10px;
        padding-left: unset;
        padding-right:  unset;
        text-align: center;
        font-size: 18px;
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