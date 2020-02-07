/*eslint no-undef: 1*/

import {actions} from './actions';
import {getters} from './getters';
import {mutations} from './mutations';

const state = {
    personList: {},
    displayList: [],
    dept: 0,
    format: '',
    filterable: true,
    tiered: false,
    vertical: false,
    includeInterests: false,
    detailUser: 0,
    imgFormat: '',
    btnColor: 'primary',
    // WpVars object passed from WordPress via wp_localize_script()
    distUrl: wpVars.distUrl,
    ajaxUrl: wpVars.ajaxUrl,
    nonce: wpVars.security,
};

const namespaced = true;

export const facultyList = {
    state,
    namespaced,
    actions,
    getters,
    mutations
};