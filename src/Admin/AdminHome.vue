<template>
    <div class="container">
        <profile-icon></profile-icon>
        <app-header></app-header>
        <div class="content">
            <div class="title">
                Click the button below to enter the form
            </div>
            <div class="subcontent">
                <i class="fas fa-plus-square" id="create"><router-link class="links" to="/CreateAccount">CreateAccount</router-link></i>
                <i class="fas fa-pen-square" id="update"><router-link class="links" to="/UpdateAccount">UpdateAccount</router-link></i>
                <i class="fas fa-trash" id="delete"><router-link class="links" to="/DeleteAccount">DeleteAccount</router-link></i>
            </div>
        </div>
        <app-footer></app-footer>
    </div>
</template>
<script>
import Footer from '../Layout/Footer.vue';
import Header from '../Layout/Header.vue';
import icon from '../profile_edit/iconProfile.vue';
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
        "profile-icon":icon
    },
}
</script>
<style scoped>
    .title{
        font-size:25px;
        font-weight: bold;
        margin-bottom:10px;
    }
    .content{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100%;
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
    #delete{
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
    @media (max-width:1000px) {
        .title{
            font-size: 23px;
            font-weight: bold;
            text-align: justify;
            width: 250px;
            display: flex;
            justify-content: flex-start;
        }
        .subcontent{
            width: 250px; 
        }
        #create,#update,#delete{
            font-size:22px;
        }
        .createAccount,.updateAccount,.deleteAccount{
            height:200px;
            font-size:40px;
        }
        .content{
            height: unset;
            margin-top:200px;
        }
    }
</style>