/*eslint no-console: 1*/

/**
 * The list of actions for the FacultyList module
 */

import axios from 'axios';
import qs from 'qs';
import _ from 'underscore';

export const actions = {

    /**
     * Get the list of faculty. I think this is technically deprecated,
     * since we'll be loading the list of users we'll need with the
     * page, rather than doing it asyncrhonously.
     * 
     * @param {Function} commit Used to call mutations
     * @param {Object} state The state from the current namespace 
     */
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

    /**
     * This one gets called on page load, as well as every time the user
     * filters the list. Probably the biggest and most complicated
     * action in the app.
     * 
     * @param {Function} commit Used to call mutations
     * @param {Function} dispatch Used to call other actions
     * @param {Object} state The state from the same namespace as the
     *                          action
     * @param {Object} rootState The global state
     * @param {Number} subDept The subdepartment we're switching to
     */
    async filterPersonList({commit, dispatch, state, rootState}, subDept) {

        // If we're just a basic, plaintext A-Z List, then we'll
        // handle the sorting in another action
        if (subDept == 0 && (!state.tiered || 'a-z' == state.format)) {
            dispatch('azList', state.personList);
            commit('updateFormat', 'a-z');
            commit('updateDetailUser', 0);
            return;
        }

        // Filter the list to get only people who are in the requested
        // subdepartment
        const tmpList = Object.values(state.personList).filter(person => {
            if (["fullTime", "partTime", "staff"].includes(person.id)) {
                return false;
            }

            for (const dept in person.subDept) {
                if ((parseInt(dept) == parseInt(subDept))
                    || (0 == subDept && state.tiered)) {
                    return true;
                }
            }

            return false;
        });

        // Old version, might delete later idk
        /*
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
        */

        // Defining some sort functions to prevent indentation hell later
        const nameSort = (a, b) => {

            // If one of the things is a tier label, we want that to stay
            // in place
            if (a.tierLabel !== undefined || b.tierLabel !== undefined) {
                return 0;
            }

            // Compare last names. If they're the same, compare first
            // names
            const lastComp = a.lname.localeCompare(b.lname);
            return lastComp !== 0 ? lastComp : a.fname.localeCompare(b.fname);
        };

        // Test a title string against a given RegExp pattern
        const titleTest = (pattern, subject, titleOnly = false) => {
            
            // Hokay, so...
            // testResult is the boolean value of any of the following:
            //      * The pattern matches the subject's title, either
            //          for the given subdepartment OR the first title
            //          in the list (if a tiered A-Z List)
            //
            //      * The pattern matches the user-defined program title,
            //          but only if titleOnly is false
            const testResult = (pattern.test(subject.title[subDept]) 
                || (0 == subDept && pattern.test(Object.entries(subject.title)[0])) 
                || (!titleOnly && pattern.test(Object.entries(subject.titleDept)[0])));
            return testResult;
        }

        // We're going to stitch these arrays together later.
        const directors = [],
            chairs = [],
            programDirs = [];

        // Filter the School Directors, Department Chairs, and Program
        // Directors to the top of the list
        const dirFilter = person => {

            // For the School Director, we want to match their title
            // from the cah.titles table ONLY
            // We also have some wonkiness for a specific member of the
            // SVAD Faculty, whose official title is "Assistant Director
            // UCF Art Gallery," and is the one case that throws
            // LITERALLY EVERYTHING I BUILT out of whack. (Rude!)
            if(titleTest(/Director/, person, true) && !(22 == state.dept && 96 == person.id)) {
                if (titleTest(/Assistant\sDirector/, person, true)) {
                    if( directors.filter(per => /^Director$/.test(per.title)).length > 0) {
                        if ( directors.length == 1 ) {
                            directors.splice(1, 0, person);
                        }
                    }
                }
                else {
                    person.isDir = true;
                }

                directors.push(person);
                return false;
            }

            // Chairs come next
            else if(titleTest(/Chair/, person)) {
                person.isChair = true;
                chairs.push(person);
                return false;
            }

            // Then we do Program Directors, whose titles are almost
            // exclusively determined in their program titles
            else if (titleTest(/Program\sDirector/, person)) {

                // And we also have to test if they're the P.D. for 
                // the subdepartment we're currently filtering, because
                // so many faculty members wear lots of different hats.
                // Thus far, this hasn't broken, but I'm pretty sure
                // it will at one point.
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


        // Now, we do the things:

        // Sort the list alphabetically
        tmpList.sort(nameSort);

        // Filter the list AGAIN, to pull out the Directors and Chairs
        const filterList = tmpList.filter((person) => dirFilter(person));
        
        // Stitch all those together into a single Array
        // (thank the ECMA gods for the spread operator)
        const tmpList2 = [...directors, ...chairs, ...programDirs, ...filterList];

        // Creating a new array to hold things
        let newList = [];

        // We need to do some more reorganizing if we're in a tiered list
        // One day I may try to see if I can combine some of this, but
        // it already runs pretty fast, so I'm not sure there's a need.
        if (state.tiered && 'a-z' != state.format) {

            // More containers to hold the various groups
            const fullTime = [];
            const partTime = [];
            const staff = [];

            // Sort them into the arrays. Part-time faculty will all
            // show up as "Adjunct," and any other title not in ftPatt
            // will go to the staff section
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

            // Setting up the objects we'll use for the section labels
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

            // Copy the personList to a new Object, which we'll then pass to our mutation for updating.
            const newPersonList = {... state.personList };

            // Insert the headers into the PersonList
            for (const header of [ftHeader, ptHeader, staffHeader]) {
                newPersonList[header.id] = header;
            }

            // Make this into the new personList
            commit('updatePersonList', newPersonList);

            // Get rid of the headers
            fullTime.unshift(ftHeader);
            partTime.unshift(ptHeader);
            staff.unshift(staffHeader);

            // Our newList will be the now-ordered list
            newList = [...fullTime, ...partTime, ...staff];
        }
        else {
            newList = tmpList2;
        }

        // Create a list of IDs for the display list
        const displayList = newList.map(person => person.id);

        /*
        const displayList = [];
        newList.forEach(item => { displayList.push(item.id); });
        */

        // Switch to a picture format if we're going into a subdepartment
        if (0 != subDept && 'a-z' == state.format) {
            commit('updateFormat', 'picture');
        }

        // Update the list of people to display
        commit('updateDisplayList', displayList);

        // Reset the value of DetailUser (in case we've clicked on a
        // subdepartment entry from a faculty detail page)
        commit('updateDetailUser', { userId: 0 });
    },


    /**
     * Displays an alphabetized list of faculty members.
     * 
     * @param {Function} commit We'll use this to call mutations 
     * @param {Object} personList The full list of faculty members
     */
    async azList({commit}, personList) {
        
        const tmpList = Object.values(personList);

        /*
        const tmpList = [];
        for (const person of Object.values(personList)) {
            tmpList.push(person);
        }
        */

        // Sort alphabetically
        tmpList.sort((a, b) => {

            // If one of the compared items is a tier label, we wnat
            // to leave it in place.
            if (a.tierLabel !== undefined || b.tierLabel !== undefined) {
                return 0;
            }
            
            // If the last names are the same, compare the first names
            const lastComp = a.lname.localeCompare(b.lname);
            if (lastComp == 0) {
                return a.fname.localeCompare(b.fname);
            }
            else return lastComp;
        });

        // Make the list of IDs to display.
        const displayList = tmpList.map(item => item.id);

        /*
        const displayList = [];
        tmpList.forEach(item => {
            displayList.push(item.id);
        });
        */

        // Call the mutation to update the displayList
        commit('updateDisplayList', displayList);
    },


    /**
     * Get specific details for a given user that we didn't need to
     * load when the app started.
     * 
     * @param {Function} commit Used to call mutations
     * @param {Object} state The state for the current namespace 
     * @param {Number} userId The ID of the faculty member we want
     *                          details for
     */
    async getUserDetails({commit, state}, userId) {

        // This is where we'll send the AJAX request
        const url = state.ajaxUrl;

        // The payload. Including a nonce, since we'll be routing this
        // through the WordPress back-end with admin-ajax.php
        const data = {
            action: 'user_detail',
            security: state.nonce,
            user: userId
        };

        // Setting Content-Type to application/x-www-form-urlencoded,
        // because Axios defaults to application/json, and WordPress
        // is looking for $_REQUEST['action'], so we'll need to
        // force Axios not to JSON-ify the payload
        const options = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }

        // Run the request with Axios. We use qs.stringify() to make
        // the data compact while still maintaining the structure for
        // the WP back-end.
        // We then() return the response.
        const details = await axios.post(url, qs.stringify(data), options)
            .then(response => response.data);

        // Call the mutation to update the user details
        commit('updateUserDetails', {userId, details});
    },


    /**
     * Action that sends info on to the updateDetailUser() mutation.
     * 
     * @param {Function} commit Used to call mutations
     * @param {Function} dispatch Used to call actions 
     * @param {Number} userId The user ID we want to change it to
     */
    setDetailUser({commit, dispatch}, userId) {

        // If we're not resetting the detailUser so we can display
        // a list of FacultyCards, then we have to get their details,
        // like Education, Publications, Courses, etc.
        if (parseInt(userId) > 0) {
            dispatch('getUserDetails', userId);
        }

        // Call the mutation
        commit('updateDetailUser', { userId });
    },


    /**
     * As the app starts up, grab the various data we need from the
     * hidden inputs the WordPress shortcode created, and apply them
     * to the appropriate state variables.
     * 
     * @param {Function} commit Used to call mutations
     * @param {Function} dispatch Used to call actions 
     */
    getInitData({commit, dispatch}) {

        // Get the options included with the shortcode call
        const options = JSON.parse(_.unescape(document.getElementById('vueData').value));

        // Get the list of subdepartments
        const subDeptList = JSON.parse(_.unescape(document.getElementById('vueSubDept').value));

        // Get the list of faculty
        const facultyList = JSON.parse(_.unescape(document.getElementById('vueFaculty').value));

        const tempSort = Object.values(facultyList);

        /*
        const tempSort = []
        for(const person of Object.values(facultyList)) {
            tempSort.push(person);
        }
        */

        // Sort alphabetically by last name, or by first name if
        // last names are the same
        tempSort.sort((a, b) => {
            const lastComp = a.lname.localeCompare(b.lname);
            if (lastComp == 0) {
                return a.fname.localeCompare(b.fname);
            }
            else return lastComp;
        });

        const displayList = tempSort.map(item => item.id);

        /*
        const displayList = [];
        tempSort.forEach(item => {
            displayList.push(item.id);
        });
        */
        
        // Call the updateOptions mutation
        commit('updateOptions', options);
        // Call the setSubDeptList action from the subdepartments module
        dispatch('subdepartments/setSubDeptList', subDeptList, {root: true});
        // Update the list of people
        commit('updatePersonList', facultyList);
        // Update the display list
        commit('updateDisplayList', displayList);
    },


    /**
     * Wrapper for the mutation to change formats.
     * 
     * @param {Function} commit Used to call mutations
     * @param {Function} dispatch Used to call actions 
     * @param {Object} format 
     */
    changeFormat({commit, dispatch}, format) {
        // Set detailUser to 0
        dispatch('setDetailUser', 0);
        // Update the format
        commit('updateFormat', format);
    },
};