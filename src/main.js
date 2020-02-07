/* eslint no-undef: 1 */

import Vue from 'vue';
import App from './components/App';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
  created() {
    this.$store.dispatch('facultyList/getInitData');
  },
  mounted() {
    if (this.$store.state.facultyList.tiered && this.$store.state.facultyList.detailUser == 0) {
      this.$store.dispatch('facultyList/filterPersonList', 0);
    }

    document.querySelector('.site-header h1').remove();
  }
}).$mount('#vueApp');
