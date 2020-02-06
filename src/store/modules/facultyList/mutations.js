/*eslint no-console: 1*/

import Vue from 'vue';

export const mutations = {
    updatePersonList(state, faculty) {
        Vue.set(state, 'personList', faculty);
    },

    updateDisplayList(state, displayList) {
        Vue.set(state, 'displayList', displayList);
    },

    updateOptions(state, options) {
        Vue.set(state, 'format', options.format);
        Vue.set(state, 'includeInterests', options.include_interests);
        Vue.set(state, 'imgFormat', options.img_format);
        Vue.set(state, 'dept', options.dept);
        Vue.set(state, 'filterable', options.filterable);
        Vue.set(state, 'vertical', options.vertical);
        Vue.set(state, 'tiered', options.tiered);
    },

    updateFormat(state, format) {
        Vue.set(state, 'format', format);
    },

    updateDetailUser(state, userId) {
        Vue.set(state, 'detailUser', userId);
    },

    updateUserDetails(state, payload) {
        const list = {...state.personList};
        const user = list[payload.userId];

        user.edu = payload.details.edu;
        user.pubs = payload.details.pubs;
        user.courses = payload.details.courses;

        Vue.set(state, 'personList', list);
    }
};