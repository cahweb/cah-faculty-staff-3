import Vue from 'vue';

export const mutations = {
    updateSubDeptList(state, subDeptList) {
        Vue.set(state, 'subDeptList', subDeptList);
    },
    updateSelected(state, subDept) {
        Vue.set(state, 'selected', subDept);
    }
};