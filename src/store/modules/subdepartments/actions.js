/**
 * The actions for the subdepartments module
 */

import axios from 'axios';
import qs from 'qs';

export const actions = {

    /**
     * Gets the list of subdepartments asynchronously.
     * 
     * This may actually be deprecated, since we're loading the
     * subdepartments from the back-end now.
     * 
     * @param {Object} context The current context of the action.
     *                          Contains info about state, and some
     *                          methods to call mutations/actions
     */
    async getSubDeptList(context) {
        // Get the URL
        const url = context.rootGetters['facultyList/ajaxUrl'];
        // Construct the data, including the nonce for the WordPress
        // back-end (through admin-ajax.php)
        const data = {
            action: 'get_subdepartments',
            dept: context.rootGetters['facultyList/dept'],
            security: context.rootGetters['facultyList/nonce']
        };
        // Set the header to the right MIME type
        const options = {
            headers: {
                'content-type': 'x-www-form-urlencoded',
            }
        };

        // Use Axios for the get request, then return the response
        const subDeptList = await axios.post(url, qs.stringify(data), options)
            .then( response => response );

        // Call the mutation that updates the list
        context.commit('updateSubDeptList', subDeptList);
    },


    /**
     * Sets the subdepartment list from the initial options.
     * 
     * @param {Object} commit Used to call mutations
     * @param {Object} subDeptList The list of subdepartments
     */
    async setSubDeptList({commit}, subDeptList) {

        const tempList = Object.entries(subDeptList).map(([id, name]) => {return {id, name}});

        /*
        const tempList = [];
        for(const [id, name] of Object.entries(subDeptList)) {
            tempList.push({id, name});
        }
        */
        
        // Sort the list alphabetically
        const sortedList = tempList.sort( (a, b) => a.name.localeCompare(b.name));

        // Call the mutation to update
        commit('updateSubDeptList', sortedList);
    },


    /**
     * 
     * @param {Function} dispatch Used to call actions
     * @param {Function} commit Used to call mutations 
     * @param {Number} subDept The number of the subDept
     */
    async selectDepartment({dispatch, commit}, subDept) {
        // Update the selected subdepartment
        commit('updateSelected', subDept);
        // Re-filter the faculty list
        dispatch('facultyList/filterPersonList', subDept, {root: true});
    },
};