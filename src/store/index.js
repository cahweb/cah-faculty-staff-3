/**
 * This is the file where the store itself actually gets created.
 * Normally, you'd also have actions, mutations, and getters here,
 * too, but I like to encapsulate everything in modules, so that's
 * all we're adding.
 */

import Vue from 'vue';
import Vuex from 'vuex';
import {facultyList} from './modules/facultyList';
import {subdepartments} from './modules/subdepartments';

// This tells Vue we want to use Vuex things
Vue.use(Vuex);

// The store object
export default new Vuex.Store({
  modules: {
    facultyList,
    subdepartments
  }
});
