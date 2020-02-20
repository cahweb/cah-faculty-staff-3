/**
 * The main script for the subdepartments module. As you can see, it's
 * much smaller than the facultyList module.
 * 
 * I technically could have folded this functionality into the other
 * module, but this let me experiment a bit more with module namespacing
 */

// We keep the actions, getters, and mutations in separate files, for
// ease of reference
import {actions} from './actions';
import {getters} from './getters';
import {mutations} from './mutations';

// The state
const state = {
    subDeptList: [],
    selected: 0,
};

// Namespacing for better encapsulation
const namespaced = true;

// The actual module object
export const subdepartments = {
    state,
    namespaced,
    actions,
    getters,
    mutations
};