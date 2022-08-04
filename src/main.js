import Vue from 'vue';
import store from './store/index';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import locale from 'element-ui/lib/locale/lang/en';

Vue.config.productionTip = false

Vue.use(ElementUI, { locale });

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
