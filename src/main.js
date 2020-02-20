/* eslint no-undef: 1 */

/**
 * The main script file that creates and runs the Vue app instance.
 */

import Vue from 'vue';
import App from './components/App';
import store from './store';

Vue.config.productionTip = false;


// The Vue object. Creating it anonymously like this makes it more
// difficult for scripts that aren't a part of the code already to
// reference it.
new Vue({
  // The store that we created in ./store/index.js
  store,

  // The render function. This is generally created by the Vue CLI,
  // and you shouldn't have to touch it.
  render: h => h(App),

  // Fires when the app is first created
  created() {
    // Gets the initial data from the hidden inputs that WordPress
    // gave us.
    this.$store.dispatch('facultyList/getInitData');
  },

  // Fires when the app is first rendered, but before the update cycle
  // begins
  mounted() {
    // If it's tiered, we need to filter the list so that we get the
    // tier labels in there.
    if (this.$store.state.facultyList.tiered && this.$store.state.facultyList.detailUser == 0) {
      this.$store.dispatch('facultyList/filterPersonList', 0);
    }

    // Delete the auto-generated WordPress title, because we don't
    // need it.
    document.querySelector('.site-header h1').remove();
  }
}).$mount('#vueApp'); // Mounts the app to the designated <div>
