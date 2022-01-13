<template>
    <div class="container">
        <profile-icon></profile-icon>
        <app-header></app-header>
        <div class="loader" v-if="loading"><loader></loader></div>
        <div class="sub_container">
            <div v-if="step1" class="titleWithButtons">
                <div class="First_Title">
                    Click click the button below to go to the process
                </div>
                <div v-if="step1" class="subcontent">
                    <i v-on:click="onChange('1')" class="fas fa-plus-square" id="create"><router-link  class="links" to="">Withdraw</router-link></i>
                    <i v-on:click="onChange('2')" class="fas fa-pen-square" id="update"><router-link  class="links" to="">Deposit</router-link></i>
                </div>
            </div>
                <div v-if="withdraw||deposit" class="content_step1" v-bind:style="[loading ? {opacity:Opacity} : '']">
                <div v-if="withdraw" class="content_step2">
                    <div class="back">
                                <i id="arrow" v-on:click="BackButton" class="fas fa-arrow-left"><div class="arrow_text">Back</div></i>
                    </div>
                    <div class="title">
                            <div>Withdraw</div>
                    </div>
                    <div class="withdraw_form">
                        <form v-on:submit.prevent="onWithdrawSubmit">
                            <div class="form_group">
                                <div class="withdraw_text">Account Identity:</div>
                                <div class="withdraw_divinput"><input class="withdraw_input" type="withdraw_identity" v-on:blur="withdrawIdentityValidation" v-model="withdrawObject.withdraw_identity"></div>
                            </div>
                            <div class="validation_container" v-for="error in errors.WithdrawIdentityError" :key="error"><small style="color:red;">{{error}}</small></div>
                            <div class="form_group">
                                <div class="withdraw_text">Mony:</div>
                                <div class="withdraw_divinput"><input class="withdraw_input" type="withdraw_mony" v-on:blur="withdrawMonyValidation" v-model="withdrawObject.withdraw_mony"></div>
                            </div>
                            <div class="validation_container" v-for="error in errors.WithdrawMonyError" :key="error"><small style="color:red;">{{error}}</small></div>
                            <div class="formcontrol_withdraw">
                                <button class="withdraw_submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div v-if="deposit" class="content_step3">
                    <div class="back">
                                <i id="arrow" v-on:click="BackButton" class="fas fa-arrow-left"><div class="arrow_text">Back</div></i>
                    </div>
                    <div class="title">
                            <div>Deposit</div>
                    </div>
                    <div class="withdraw_form">
                        <form v-on:submit.prevent="onDepositSubmit">
                            <div class="form_group">
                                <div class="withdraw_text">Account Identity:</div>
                                <div class="withdraw_divinput"><input class="withdraw_input" type="deposit_identity" v-on:blur="depositIdentityValidation" v-model="depositObject.deposit_identity"></div>
                            </div>
                            <div class="validation_container" v-for="error in errors.depositIdentityError" :key="error"><small style="color:red;">{{error}}</small></div>
                            <div class="form_group">
                                <div class="withdraw_text">Mony:</div>
                                <div class="withdraw_divinput"><input class="withdraw_input" type="deposit_mony" v-on:blur="depositMonyValidation" v-model="depositObject.deposit_mony"></div>
                            </div>
                            <div class="validation_container" v-for="error in errors.depositMonyError" :key="error"><small style="color:red;">{{error}}</small></div>
                            <div class="formcontrol_withdraw">
                                <button class="withdraw_submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
            
        </div>
                            <!-- Modal for withdraw -->
                            <Modal v-if="validWithdraw"
                            v-show="isModalVisible"
                            @close="closeModal"
                            >

                            <template v-slot:body>
                                {{withdrawMessage}}
                            </template>

                            </Modal>
                            <!-- end of modal for withdraw -->

                            <!-- Modal for deposit -->
                            <Modal v-if="validDeposit"
                            v-show="isModalVisible"
                            @close="closeModal"
                            >

                            <template v-slot:body>
                                {{deposetMessage}}
                            </template>

                            </Modal>
                            <!-- end of modal for deposit -->
        <app-footer></app-footer>
    </div>
</template>
<script>
import Header from '../Layout/Header.vue';
import Footer from '../Layout/Footer.vue';
import icon from '../profile_edit/iconProfile.vue';
import axios from 'axios';
import pulseloader from 'vue-spinner/src/PulseLoader.vue';
import Modal from '../modal/modal.vue';
export default {
    beforeCreate(){
        if(localStorage.getItem("auth")==null)
        {
            this.$router.push('/');
        }
        if(localStorage.getItem("type")=="Admin"){
            this.$router.push('/AdminHome');
        }
    },
    components:{
        "app-header":Header,
        "app-footer":Footer,
        "profile-icon":icon,
        'loader':pulseloader,
        Modal
    },
    data:function(){
        return {
            type:"Choose Process option:",
            step1:true,
            withdraw:false,
            deposit:false,
            withdrawObject:{
                withdraw_identity:"",
                withdraw_mony:""
            },
            depositObject:{
                deposit_identity:"",
                deposit_mony:""
            },
            errors:{
                WithdrawIdentityError:[],
                WithdrawMonyError:[],
                depositIdentityError:[],
                depositMonyError:[]
            },
            loading:false,
            Opacity:.5,
            isModalVisible: false,
            validWithdraw:true,
            validDeposit:true,
            withdrawMessage:"",
            deposetMessage:""
        }
    },
    methods:{
        withdrawIdentityValidation:function(){
            this.errors.WithdrawIdentityError=[]
            // identity validation
            if(this.withdrawObject.withdraw_identity==""){
                this.errors.WithdrawIdentityError.push("Identity field is required")
                return;
            }
            let identityRegex = /^[0-9]{9}$/g;
            let ValidWithdrawIdentity=identityRegex.test(this.withdrawObject.withdraw_identity);
            if(ValidWithdrawIdentity==false){
                this.errors.WithdrawIdentityError.push("Identity field allowed just 9 numbers");
                return;
            }
            // end identity validation
        },
        withdrawMonyValidation:function(){
            this.errors.WithdrawMonyError=[]
            // mony validation
            if(this.withdrawObject.withdraw_mony==""){
                this.errors.WithdrawMonyError.push("age fieldd is required")
                return;
            }
            let WithdrawmonyRegex = /\d+/g;
            let ValiWithdrawMony=WithdrawmonyRegex.test(this.withdrawObject.withdraw_mony);
            if(ValiWithdrawMony==false){
                this.errors.WithdrawMonyError.push("Age allow only numbers");
                return;
            }
            // end monu validation
        },
        depositIdentityValidation:function(){
            this.errors.depositIdentityError=[]
            // identity validation
            if(this.depositObject.deposit_identity==""){
                this.errors.depositIdentityError.push("Identity field is required")
                return;
            }
            let depositidentityRegex = /^[0-9]{9}$/g;
            let ValidDepositIdentity=depositidentityRegex.test(this.depositObject.deposit_identity);
            if(ValidDepositIdentity==false){
                this.errors.depositIdentityError.push("Identity field allowed just 9 numbers");
                return;
            }
            // end identity validation
        },
        depositMonyValidation:function(){
            this.errors.depositMonyError=[]
            // mony validation
            if(this.depositObject.deposit_mony==""){
                this.errors.depositMonyError.push("age fieldd is required")
                return;
            }
            let DepositMonyRegex = /\d+/g;
            let ValiDepositMony=DepositMonyRegex.test(this.depositObject.deposit_mony);
            if(ValiDepositMony==false){
                this.errors.depositMonyError.push("Age allow only numbers");
                return;
            }
            // end monu validation
        },
        showModal() {
        this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        onChange:function(Type){
            if(Type=="1"){
                this.step1=false;
                this.withdraw=true;
                this.deposit=false;
                this.type="Choose Process option:"
            }
            if(Type=="2"){
                this.step1=false;
                this.withdraw=false;
                this.deposit=true;
                this.type="Choose Process option:"
            }
            
        },
        BackButton:function(){
            this.step1=true;
            this.withdraw=false;
            this.deposit=false;
        },
        onDepositSubmit:function(){
            this.depositIdentityValidation();
            this.depositMonyValidation();
            if(this.errors.depositMonyError.length==0 && this.errors.depositIdentityError.length==0){
                this.loading=true;
                let obj={id:parseInt(this.depositObject.deposit_identity),mony:parseFloat(this.depositObject.deposit_mony)}
                console.log(typeof obj.id)
                axios.put("https://localhost:44336/api/teller/deposit",obj,{
                    headers: {'Access-Control-Allow-Origin': "*" },
                }).then(res=>{
                    this.loading=false;
                    this.deposetMessage=res.data
                    this.showModal();
                })
            }
            
        },
        onWithdrawSubmit:function(){
            this.withdrawIdentityValidation();
            this.withdrawMonyValidation();
            if(this.errors.WithdrawIdentityError.length==0 && this.errors.WithdrawMonyError.length==0){
                this.loading=true;
                let obj={id:parseInt(this.withdrawObject.withdraw_identity),mony:parseFloat(this.withdrawObject.withdraw_mony)}
                console.log(typeof obj.id)
                axios.put("https://localhost:44336/api/teller/withdraw",obj,{
                    headers: {'Access-Control-Allow-Origin': "*" },
                }).then(res=>{
                    this.loading=false;
                    this.withdrawMessage=res.data
                    this.showModal();
                })
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
/* step1 style */
    .First_Title{
        width: 80%;
        font-size: 25px;
        font-weight: bold;
        margin-bottom:10px;
    }
    .Title{
        font-size: 30px;
        font-weight: bold;
    }
    .titleWithButtons{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;;
    }
    .content_step1{
        background-color: #E3E4E6;
        width: 40%;
        padding: 30px;
        box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
    }
    .subcontent{
        box-sizing: border-box;
        background-color: #E3E4E6;
        width: 250px;
        padding:20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
    }
    #create{
        display: flex;
        width: 100%;
        font-size: 25px;
        padding:10px;
    }
    #update{
        display: flex;
        width: 100%;
        font-size: 25px;
        padding:10px;
    }
    .links{
        text-decoration: none;
        height: 100%;
        width: 50%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: black;
        padding-left:10px;
    }
    .sub_container{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .title{
        font-size: 20px;
        display: flex;
        justify-content: center;
        padding:5px;
    }
    .dropdown{
        margin-top:20px;
        height:40px;
        display: flex;
        justify-content: center;
        padding:5px;
    }
    select{
        width:70%;
        height:100%;
        font-size:16px;
    }
/*  */
/* Withdraw and deposit style */
    .form_group{
        display: flex;
        flex-direction: row;
        padding-top:15px;
    }
    .withdraw_input{
        height: 100%;
        width: 70%;
        font-size: 23px;
    }
    .withdraw_text{
        width: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .withdraw_divinput{
        width: 75%;
    }
    .formcontrol_withdraw{
        padding: 15px;
        padding-top:    20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .withdraw_submit{
        padding:12px;
        padding-left: 20px;
        padding-right: 20px;
        border-radius: 22px;
        border:0px;
        color: white;
        background-color: #393a3e;
    }
    #arrow{
        display: flex;
        cursor: pointer;
    }
    .button_back{
        cursor: pointer;
    }
    .button_logout{
        border:0px;
        background-color: white;
    }
    .arrow_text{
        margin-left:5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
/*  */
/* responsive */
@media (max-width:1000px) {
    .First_Title{
        font-size: 23px;
        font-weight: bold;
        text-align: justify;
        width: 250px;
        display: flex;
        justify-content: flex-start;
    }
    #create,#update{
        font-size: 27px;
    }
    .content_step1{
        width: 90%;
    }
    .title{
        font-size: 35px;
        
    }
    .dropdown{
        height:90px;
    }
    select{
        font-size: 15px;
    }
    .withdraw_text{
        font-size: 20px;
        width: 25%;
        justify-content: flex-start;
    }
    .withdraw_input{
        padding-top: 0px;
        padding-bottom: 0px;
        font-size: 40px;
        width: 100%;
    }
    .withdraw_submit{
        padding: 10px;
        padding-left: 15px;
        padding-right: 15px;
        border-radius: 43px;
        font-size: 35px;
    }
    #arrow{
        font-size: 20px;
    }
    .sub_container{
        height:unset;
        margin-top: 150px;
    }
}
/*  */
</style>