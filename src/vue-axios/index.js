import Vue from 'vue'
import axios from 'axios'

const http = {
    install(){
        Vue.prototype.axios = axios;
    }
};

export default http
