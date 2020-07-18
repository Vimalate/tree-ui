/*
 * @Author: Vimalakirti
 * @Date: 2020-07-18 18:19:02
 * @LastEditTime: 2020-07-18 18:28:13
 * @Description: 
 * @FilePath: \tree-ui\main.js
 */

import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'

Vue.use(ElementUI);

export default new Vue({
  el: '#app',
  render: h => h(App)
})