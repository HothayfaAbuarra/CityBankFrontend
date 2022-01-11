<template>
    <div class="container">
        <div class="login_box">
            <div class="form">
                <div class="form_title">SignIn Page:</div>
                <form action="">
                    <div class="form_group">
                        <div class="text">UserName:</div>
                        <div class="input_field"><input type="text"></div>
                    </div>
                    <div class="form_group">
                        <div class="text">Password:</div>
                        <div class="input_field"><input type="text"></div>
                    </div>
                    <div class="form_control">
                        <div class="submit">
                            <button class="input_button">SignIn</button>
                        </div>
                        <div class="signup">
                            <router-link class="link" to="/SignUp" exact>Signup</router-link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
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