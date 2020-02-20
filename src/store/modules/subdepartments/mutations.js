/**
 * The mutations for the subdepartments module.
 */

import Vue from 'vue';

export const mutations = {

    /**
     * Updates the list of subdepartments
     * 
     * @param {Object} state A reference to the current state
     * @param {Array} subDeptList The list of subDepartments
     */
    updateSubDeptList(state, subDeptList) {
        Vue.set(state, 'subDeptList', subDeptList);
    },

    /**
     * Updates the current subdepartment
     * 
     * @param {Object} state A reference to the current state
     * @param {Number} subDept The subdepartment we're switching to
     */
    updateSelected(state, subDept) {
        Vue.set(state, 'selected', subDept);
    }
};