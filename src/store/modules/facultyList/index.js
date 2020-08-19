/*eslint no-undef: 1*/

/**
 * The main script for the facultyList store
 */

// We define the actions, getters, and mutations in separate files,
// to make the whole thing easier to reference
import {actions} from './actions';
import {getters} from './getters';
import {mutations} from './mutations';

// Here's the HUUGE state object, with all the various properties
// that the store keeps track of:
const state = {
    personList: {},
    displayList: [],
    dept: 0,
    format: '',
    filterable: true,
    tiered: false,
    vertical: false,
    includeInterests: false,
    multiLevel: false,
    detailUser: 0,
    imgFormat: '',
    imgSize: 2,
    btnColor: 'primary',
    // WpVars object passed from WordPress via wp_localize_script()
    distUrl: wpVars.distUrl,
    ajaxUrl: wpVars.ajaxUrl,
    nonce: wpVars.security,
    isLoaded: false,
};

// We want our module to be namespaced, for the sake of encapsulation
// and clarity
const namespaced = true;

// Make the object itself
export const facultyList = {
    state,
    namespaced,
    actions,
    getters,
    mutations
};