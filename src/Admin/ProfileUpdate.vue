<template>
    <div class="container">
        <app-header></app-header>
        <div class="content">
            <div class="login_box">
                <div class="form">
                    <div class="form_picture">
                        <img class="image" src="../assets/profile.png" alt="">
                        <div class="profile_edit_icon"><i class="fas fa-pen-square"></i></div>
                    </div>
                    <form action="">
                        <div class="form_group">
                            <div class="text">Name:</div>
                            <div class="input_field"><input type="text"></div>
                        </div>
                        <div class="form_group">
                            <div class="text">Email:</div>
                            <div class="input_field"><input type="text"></div>
                        </div>
                        <div class="form_group">
                            <div class="text">Identity:</div>
                            <div class="input_field"><input type="text"></div>
                        </div>
                        <div class="form_group">
                            <div class="text">Phone:</div>
                            <div class="input_field"><input type="text"></div>
                        </div>
                        <div class="form_control">
                            <div class="submit">
                                <button class="input_button">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <app-footer></app-footer>
    </div>
</template>
<script>
import Header from '../Layout/Header.vue';
import Footer from '../Layout/Footer.vue';

export default {
    components:{
        'app-header':Header,
        'app-footer':Footer
    }
}
</script>
<style scoped>
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
        right: 250px;
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
        right:212px;
    }
}
</style>