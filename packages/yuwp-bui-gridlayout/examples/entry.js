import Vue from 'vue';
import entry from './app';
import VueRouter from 'vue-router';
import routes from './route.config';
import YuwpUI from '@/src/index.js';
import '@/packages/theme-default/src/index.css';
import demoBlock from './components/demo-block.vue';
import MainFooter from './components/footer.vue';
import MainHeader from './components/header.vue';
import title from './i18n/title.json';
// import './yufp/yufp.core.min.js';

Vue.use(YuwpUI);
Vue.use(VueRouter);
Vue.component('demo-block', demoBlock);
Vue.component('main-footer', MainFooter);
Vue.component('main-header', MainHeader);

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
});

router.afterEach(route => {
  const data = title[route.meta.lang];
  for (let val in data) {
    if (new RegExp('^' + val, 'g').test(route.name)) {
      document.title = data[val];
      return;
    }
  }
  document.title = 'YUFP统一前端平台-PC';
});

new Vue({ // eslint-disable-line
  render: h => h(entry),
  router
}).$mount('#app');
