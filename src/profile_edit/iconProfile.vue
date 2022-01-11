<template>
    <div class="container">
        <router-link to="/profile" class="edit"><i class="fas fa-user-edit" style="box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);"></i></router-link>
        <div class="edit_text">Edit Your Account</div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .edit_text{
        display: none;
    }
    .edit{
        position: fixed;
        bottom: 30%;
        left:0%;
        font-size:30px;
        border-radius:10px;
        border-bottom-right-radius: 3px;
        border-top-right-radius: 3px;
        border-top-left-radius: 0px;
        border-top-left-radius: 0px;
        cursor: pointer;
        background-color: #393a3e;
        color: white;
        z-index: 3;
    }
    .edit:hover ~ .edit_text{
        animation-name:animate_edit;
        animation-duration: .5s;
        animation-fill-mode: forwards;
        background-color: #393a3e;
        color: white;
        position: fixed;
        bottom: 30%;
        left: 0%;
        z-index: 1;
        font-size: 15px;
        display: flex;
        align-items: center;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        height:30px;
    }
    @keyframes animate_edit {
        from{
            left:-10%;
            display: none;
        }to{
            left:2.5%;
            display: block;
        }
    }
</style>