import {actions} from './actions';
import {getters} from './getters';
import {mutations} from './mutations';

const state = {
    subDeptList: [],
    selected: 0,
};

const namespaced = true;

export const subdepartments = {
    state,
    namespaced,
    actions,
    getters,
    mutations
};