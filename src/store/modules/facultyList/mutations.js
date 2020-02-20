/**
 * The mutations. These are the only things that should change the state
 * of the store
 */

// The recommended way to change state variables is with the Vue.set()
// method.
import Vue from 'vue';

export const mutations = {

    /**
     * Updates the personList object
     * 
     * @param {Object} state A reference to the current state
     * @param {Object} faculty The new personList object
     */
    updatePersonList(state, faculty) {
        Vue.set(state, 'personList', faculty);
    },

    /**
     * Updates the displayList array
     * 
     * @param {Object} state A reference to the current state
     * @param {Array} displayList The new displayList array
     */
    updateDisplayList(state, displayList) {
        Vue.set(state, 'displayList', displayList);
    },

    /**
     * Updates the various options when the app starts. Called
     * from the getInitData() action
     * 
     * @param {Object} state A reference to the current state
     * @param {Object} options A parsed JSON object of options
     */
    updateOptions(state, options) {
        Vue.set(state, 'format', options.format);
        Vue.set(state, 'includeInterests', options.include_interests);
        Vue.set(state, 'imgFormat', options.img_format);
        Vue.set(state, 'dept', options.dept);
        Vue.set(state, 'filterable', options.filterable);
        Vue.set(state, 'vertical', options.vertical);
        Vue.set(state, 'tiered', options.tiered);
        Vue.set(state, 'btnColor', options.btn_color);
        Vue.set(state, 'imgSize', parseInt(options.size));
    },

    /**
     * Updates the format setting
     * 
     * @param {Object} state A reference to the current state
     * @param {String} format The new format string
     */
    updateFormat(state, format) {
        Vue.set(state, 'format', format);
    },

    /**
     * Updates the detailUser in the store
     * 
     * @param {Object} state A reference to the current state
     * @param {Object} payload Object which can carry mutliple values
     */
    updateDetailUser(state, payload) {
        Vue.set(state, 'detailUser', payload.userId);
    },

    /**
     * Update the details of the current user.
     * 
     * @param {Object} state A reference to the current state
     * @param {Object} payload Object which can carry multiple values
     */
    updateUserDetails(state, payload) {
        // Make a copy of the current list, so we're not going against
        // standard Vue practice and trying to set a state object's
        // fields directly.
        const list = {...state.personList};
        // Get a reference to the current user
        const user = list[payload.userId];

        // Update the user with the current payload information
        user.edu = payload.details.edu;
        user.pubs = payload.details.pubs;
        user.courses = payload.details.courses;

        // Reassign the value of the personList
        Vue.set(state, 'personList', list);
    }
};