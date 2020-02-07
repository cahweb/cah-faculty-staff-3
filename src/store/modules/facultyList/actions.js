/*eslint no-console: 1*/

import axios from 'axios';
import qs from 'qs';
import _ from 'underscore';

export const actions = {
    async getFacultyList({commit, state}) {
        const url = state.ajaxUrl;
        const data = {
            action: 'get_faculty_list',
            security: state.nonce,
        };
        const options = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
        };

        const faculty = await axios.post(url, qs.stringify(data), options)
            .then( response => response);

        commit('updatePersonList', faculty);
    },

    async filterPersonList({commit, dispatch, state, rootState}, subDept) {
        if (subDept == 0 && (!state.tiered || 'a-z' == state.format)) {
            dispatch('azList', state.personList);
            commit('updateFormat', 'a-z');
            commit('updateDetailUser', 0);
            return;
        }

        const tmpList = [];
        for (const id of Object.keys(state.personList)) {

            if (["fullTime", "partTime", "staff"].includes(id)) {
                continue;
            }

            for(const dept of Object.keys(state.personList[id].subDept)) {
                if ((parseInt(dept) == parseInt(subDept)) || (0 == subDept && state.tiered)) {
                    tmpList.push(state.personList[id]);
                    break;
                }
            }
        }

        const nameSort = (a, b) => {
            if (a.tierLabel !== undefined || b.tierLabel !== undefined) {
                return 0;
            }

            const lastComp = a.lname.localeCompare(b.lname);
            return lastComp !== 0 ? lastComp : a.fname.localeCompare(b.fname);
        };

        const titleTest = (pattern, subject, titleOnly = false) => {
            const testResult = (pattern.test(subject.title[subDept]) 
                || (0 == subDept && pattern.test(Object.entries(subject.title)[0])) 
                || (!titleOnly && pattern.test(Object.entries(subject.titleDept)[0])));
            return testResult;
        }

        const directors = [],
            chairs = [],
            programDirs = [];

        const dirFilter = person => {
            if(titleTest(/Director/, person, true)) {
                directors.push(person);
                return false;
            }
            else if(titleTest(/Chair/, person)) {
                chairs.push(person);
                return false;
            }
            else if (titleTest(/Program\sDirector/, person)) {
                const subDeptList = rootState.subdepartments.subDeptList;
                let isCurrentDirector = false;
                for (const sub of subDeptList) {
                    if (sub.id == subDept) {
                        const patt = /[MB].?[FB]?.?[AS].?|PhD/;
                        if (patt.test(sub.name) && patt.test(person.titleDept[subDept])) {
                            isCurrentDirector = true;
                        }
                    }
                }

                if (isCurrentDirector) {
                    programDirs.push(person);
                    return false;
                }
            }
            return true;
        };

        tmpList.sort(nameSort);

        const filterList = tmpList.filter((person) => dirFilter(person));
        
        const tmpList2 = [...directors, ...chairs, ...programDirs, ...filterList];

        let newList = [];

        const fullTime = [];
        const partTime = [];
        const staff = [];
        if (state.tiered && 'a-z' != state.format) {
            for (const person of tmpList2) {
                const ftPatt = /Professor|Lecturer|Instructor|Director|Chair/;
                const ptPatt = /Adjunct/;

                if (titleTest(ftPatt, person)) {
                    fullTime.push(person);
                }
                else if (titleTest(ptPatt, person, true)) {
                    partTime.push(person);
                }
                else {
                    staff.push(person);
                }
            }

            const ftHeader = {
                id: "fullTime",
                tierLabel: "Full-Time Faculty"
            };
            const ptHeader = {
                id: "partTime",
                tierLabel: "Part-Time Faculty"
            }
            const staffHeader = {
                id: "staff",
                tierLabel: "Staff"
            }

            const newPersonList = {... state.personList };

            for (const header of [ftHeader, ptHeader, staffHeader]) {
                newPersonList[header.id] = header;
            }

            commit('updatePersonList', newPersonList);

            fullTime.unshift(ftHeader);
            partTime.unshift(ptHeader);
            staff.unshift(staffHeader);

            newList = [...fullTime, ...partTime, ...staff];
        }
        else {
            newList = tmpList2;
        }

        const displayList = [];
        newList.forEach(item => { displayList.push(item.id); });

        if (0 != subDept && 'a-z' == state.format) {
            commit('updateFormat', 'picture');
        }
        commit('updateDisplayList', displayList);
        commit('updateDetailUser', { userId: 0 });
    },

    async azList({commit}, personList) {
        const tmpList = [];
        for (const person of Object.values(personList)) {
            tmpList.push(person);
        }

        tmpList.sort((a, b) => {
            if (a.tierLabel !== undefined || b.tierLabel !== undefined) {
                return 0;
            }
            
            const lastComp = a.lname.localeCompare(b.lname);
            if (lastComp == 0) {
                return a.fname.localeCompare(b.fname);
            }
            else return lastComp;
        });

        const displayList = [];
        tmpList.forEach(item => {
            displayList.push(item.id);
        });

        commit('updateDisplayList', displayList);
    },

    async getUserDetails({commit, state}, userId) {
        const url = state.ajaxUrl;
        const data = {
            action: 'user_detail',
            security: state.nonce,
            user: userId
        };
        const options = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }

        const details = await axios.post(url, qs.stringify(data), options)
            .then(response => response.data);

        commit('updateUserDetails', {userId, details});
    },

    setDetailUser({commit, dispatch}, userId) {
        if (parseInt(userId) > 0) {
            dispatch('getUserDetails', userId);
        }
        commit('updateDetailUser', { userId });
    },

    getInitData({commit, dispatch}) {
        const options = JSON.parse(_.unescape(document.getElementById('vueData').value));
        const subDeptList = JSON.parse(_.unescape(document.getElementById('vueSubDept').value));
        const facultyList = JSON.parse(_.unescape(document.getElementById('vueFaculty').value));
        const tempSort = []
        for(const person of Object.values(facultyList)) {
            tempSort.push(person);
        }
        tempSort.sort((a, b) => {
            const lastComp = a.lname.localeCompare(b.lname);
            if (lastComp == 0) {
                return a.fname.localeCompare(b.fname);
            }
            else return lastComp;
        });
        const displayList = [];
        tempSort.forEach(item => {
            displayList.push(item.id);
        });
        
        commit('updateOptions', options);
        dispatch('subdepartments/setSubDeptList', subDeptList, {root: true});
        commit('updatePersonList', facultyList);
        commit('updateDisplayList', displayList);
    },

    changeFormat({commit, dispatch}, format) {
        dispatch('setDetailUser', 0);
        commit('updateFormat', format);
    },
};