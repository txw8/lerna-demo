import Vue from 'vue';
import YuwpUI from '@/src/index.js';
import App from './play/index.vue';
import '@/packages/theme-default/src/index.css';

Vue.use(YuwpUI);

new Vue({ // eslint-disable-line
  render: h => h(App)
}).$mount('#app');
