<template>
    <div class="container">
        <footer>
            <div class="footer_message">
                &copy; creater:Hothayfa email:habuarra@asaltech.com
            </div>
        </footer>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    footer{
        background-color: #393a3e;
        height: 50px;
        width: 100%;
        font-size: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        
    }
    @media (max-width:1000px) {
        footer{
            position: fixed;
            bottom:0;   
            height: 40px;
        }
        .footer_message{
            font-size: 18px;
            white-space: nowrap;
        }
    }
</style>