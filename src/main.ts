import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/font/iconfont/iconfont.css';
import 'normalize.css';
import lazyPlugin from 'vue3-lazy';
import naive from './utils/naiveui/init';

const app = createApp(App);
app.use(lazyPlugin, {
  loading: require('assets/svg/orange.progress-bar-stripe-loader.svg'),
  error: require('assets/img/article-my.png'),
});
app.use(naive).use(store).use(router).mount('#app');
