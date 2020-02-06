import Vue from 'vue';
import Vuex from 'vuex';
import {facultyList} from './modules/facultyList';
import {subdepartments} from './modules/subdepartments';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    facultyList,
    subdepartments
  }
});
