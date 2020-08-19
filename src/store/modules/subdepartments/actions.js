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

        const tempList = Object.entries(subDeptList).map(([id, data]) => {return {id, name: data.desc, dept: data.deptID, isHeader: data.isHeader, code: data.deptCode !== undefined ? data.deptCode : undefined}});

        const alphaSort = (a, b) => a.name.localeCompare(b.name)

        const adminAdvise = []
        const coreDepts = []
        for (const item of tempList) {
            if (item.name === "Administration" || item.name === "Advising" )
                adminAdvise.push(item)
            else
                coreDepts.push(item)
        }

        adminAdvise.sort(alphaSort)
        coreDepts.sort((a, b) => {
            if (a.isHeader && !b.isHeader)
                return (parseInt(a.code) - 1) - parseInt(b.dept)
            if (b.isHeader && !a.isHeader)
                return (parseInt(b.code) - 1) - parseInt(a.dept)

            const x = parseInt(a.dept)
            const y = parseInt(b.dept)

            if ((a.isHeader && b.isHeader) || x === y)
                return alphaSort(a, b)

            return x - y
        })

        const sortedList = [...adminAdvise, ...coreDepts]
        
        // Sort the list alphabetically
        /*
        const sortedList = tempList.sort((a, b) => {
            
            for (const obj of [a, b])
            switch (obj.name) {
                case 'Administration':
                    obj.level = -3
                    break
                case 'Advising':
                    obj.level = -2
                    break
                default:
                    break
            }

            if (a.level === b.level)
                return a.name.localeCompare(b.name)
            else
                return a.level < b.level ? -1 : 1
        });
        */

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