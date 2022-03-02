import Vue from 'vue'
import App from './App.vue'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import importDirective from './directive'
import i18n from './i18n/index.js'

Vue.use(MuseUI);

importDirective(Vue)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  i18n //挂载
}).$mount('#app')
