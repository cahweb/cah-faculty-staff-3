import axios from 'axios';
import qs from 'qs';

export const actions = {
    async getSubDeptList(context) {
        const url = context.rootGetters['facultyList/ajaxUrl'];
        const data = {
            action: 'get_subdepartments',
            dept: context.rootGetters['facultyList/dept'],
            security: context.rootGetters['facultyList/nonce']
        };
        const options = {
            headers: {
                'content-type': 'x-www-form-urlencoded',
            }
        };

        const subDeptList = await axios.post(url, qs.stringify(data), options)
            .then( response => response );

        context.commit('updateSubDeptList', subDeptList);
    },
    async setSubDeptList({commit}, subDeptList) {
        const tempList = [];
        for(const [id, name] of Object.entries(subDeptList)) {
            tempList.push({id, name});
        }
        const sortedList = tempList.sort( (a, b) => a.name.localeCompare(b.name));

        commit('updateSubDeptList', sortedList);
    },
    async selectDepartment({dispatch, commit}, subDept) {
        commit('updateSelected', subDept);
        dispatch('facultyList/filterPersonList', subDept, {root: true});
    },
};