import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export const store=new Vuex.Store({
    state:{
        CustomerAccount:null
    },
    getters:{
        getCustomer:state=>{
            return state.CustomerAccount;
        }
    },
    mutations:{
        setCustomer:(state,data)=>{
            state.CustomerAccount=data
        }
    }
})