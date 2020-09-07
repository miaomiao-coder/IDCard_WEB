import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import router from './router';
import moment from "moment";
import { store } from './store/store';
import VueLocalStorage from 'vue-localstorage'
import ports from './api/port';
import JsonExcel from 'vue-json-excel';
import $ from 'jquery'
// Tell Vue to use the plugin
import './global';


Vue.component('downloadExcel', JsonExcel);
Vue.use(VueAxios, axios);
Vue.use(iView);
Vue.use(VueLocalStorage)

Vue.prototype.$moment = moment;
Vue.prototype.$ports = ports;
Vue.prototype.$https = axios;



Vue.filter('moment', function(value, formatString) {
    formatString = formatString || 'YYYY-MM-DD ';
    return moment(value).format(formatString)
})

if (!String.prototype.moment) {
    String.prototype.moment = function(formatString) {
        formatString = formatString || 'YYYY-MM-DD ';
        return moment(this).format(formatString)
    };
}




Vue.config.silent = true;
/* router.beforeEach(function(to,from,next){
 
    if(to.path!='/login' && to.path!='/register'){
        sessionStorage.setItem('referrer',from.path) //储存来源路由
        alert('请登录')
        next({
            path:'/login'
        })
    }else{
        next()
    }
 
})


var referrer = sessionStorage.getItem('referrer');
if(referrer != null){
    this.$router.push(referrer)
}else {
    this.$router.push('/home')
} */



new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})