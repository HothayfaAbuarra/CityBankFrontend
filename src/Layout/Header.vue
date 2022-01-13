<template>
    <div class="container">
        <header>
            <div class="logout" v-on:click="LogOut">
            <i class="fas fa-sign-out-alt" id="logout">logout</i>
            </div>
            <!-- <div class="welcome">
                <img src="" alt="">
                {{title}}
            </div> -->
            <div class="banner">
                <img class="banner_image" src="../assets/banner.png" alt="">
            </div>
        </header>
    </div>
</template>
<script>
export default {
    data:function(){
        return{
            title:"CityBank"
        }
    },
    methods:{
        LogOut:function(){
            localStorage.removeItem("auth")
            this.$router.push("/");
        }
    }
}
</script>
<style scoped>
    .container{
        box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
    }
    .banner{
        display: flex;
        justify-content: flex-end;
        width: 90%;
    }
    .banner_image{
        max-height:100%;
        max-width:100%;
    }
    header{
        background-color: #393a3e;
        height: 50px;
        display: flex;
        flex-direction: row;
    }
    .welcome{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        font-weight: bold;
        color: white;
    }
    .logout{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #logout{
        margin-left:15px;
        font-size:20px;
        color:white;
        cursor:pointer;
    }
    @media (max-width:1000px) {
        .welcome{
        justify-content: flex-end;
        margin-right: 15px;
        }
        header{
            height:50px;
        }
        #logout{
            font-size:25px;
        }
    }
</style>