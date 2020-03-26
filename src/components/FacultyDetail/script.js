/*eslint no-console: 1*/
/*eslint no-undef: 1 */

import {mapState} from 'vuex';
import FacultyDetailFormattedList from '../FacultyDetailFormattedList';
import FacultyHeadshot from '../FacultyHeadshot';
import _ from 'underscore';

export default {
    // Components we'll use
    components: {
        'list': FacultyDetailFormattedList,
        'faculty-headshot': FacultyHeadshot,
    },

    // Props we need. This can technically be given as an
    // array, but doing it as an object allows us to implement
    // some type-hinting, which is nice.
    props: {
        user: Number,
    },

    // Data property
    data() {
        return{
            // Once we've loaded the course information, whether we've
            // set up the JS EventListeners or not.
            hasCourseListeners: false,
        };
    },

    // Computed properties
    computed: {

        // The specific person object we'll be using. Could have passed
        // a reference to the object, I suppose, but this integrates
        // better with the action/mutation set that fires when you
        // click on a FacultyCard
        person() {
            return this.personList[this.user];
        },

        // Display Title. Here, we want to display all the users titles
        // in a list, if we can, though we avoid duplicates.
        displayTitle() {
            const titleList = [];

            for (let i = 0; i < Object.values(this.person.titleDept).length; i++) {
                const title = Object.values(this.person.titleDept)[i];

                let tempStr = '';

                if (!title) {
                    tempStr = Object.values(this.person.title)[i];
                }
                else {
                    tempStr += title;
                }

                if (!titleList.includes(tempStr)) {
                    titleList.push(tempStr);
                }
            }

            const titleStr = titleList.join(', ');

            return titleStr;
        },

        // Turn the person's education information into a decent-
        // looking bit of HTML
        formatEdu() {
            const edu = new DOMParser().parseFromString('<h3 class="heading-underline">Education</h3><div><ul id="edu-rows"></ul></div>', 'text/html');

            if (this.person.edu.length) {
                for (const deg of this.person.edu) {
                    // Create a new list element
                    const newLi = edu.createElement('li');

                    // Supertemplates!
                    newLi.innerHTML = deg['degree'] + (deg['field'] ? ` in ${deg['field']}` : '') + (deg['institution'] ? ` from ${deg['institution']}` : '') + (deg['year'] ? ` (${deg['year']})` : '');

                    // Attach the thing
                    edu.querySelector('#edu-rows').append(newLi);
                }
            }

            return edu.body.innerHTML;
        },

        // Do basically the same thing we did for their education, only
        // for user publications.
        formatPubs() {
            const pubs = new DOMParser().parseFromString('<div id="pubs"></div>', 'text/html');

            const pubDiv = pubs.querySelector('#pubs');

            let type = '';
            let newList;

            if (this.person.pubs && this.person.pubs.length > 0) {
                for (const [index, pub] of this.person.pubs) {

                    // If it's not the first element in the list and
                    // the type changes, append the now-completed <ul> 
                    // to the document
                    if (index > 0 && pubs.pubType != type) {
                        pubDiv.append(newList);
                    }

                    // If we've got a new pub type (including the first one),
                    // we create a new heading and a <ul> to store its
                    // entries in
                    if (pub.pubType != type) {
                        const newHead = pubs.createElement('h4');
                        newHead.classList.add('pt-4');
                        newHead.innerHTML = pub.pubType;
                        pubDiv.append(newHead);

                        newList = pubs.createElement('ul');
                    }

                    // Add the current entry
                    const newItem = pubs.createElement('li');
                    newItem.innerHTML = (parseInt(pub.forthcoming) ? `<em>Forthcoming</em> ` : '') + `${pub.pubDate} ` + _.unescape(pub.citation);
                    newList.append(newItem);

                    type = pub.pubType;
                }
            }

            // Return the HTML
            return pubDiv.innerHTML;
        },

        // Mapping state
        ...mapState('facultyList', [
            'personList',
        ]),
        ...mapState('subdepartments', [
            'selected',
        ]),
    },

    // Methods
    methods: {

        // Sometimes the FacultyCard the user clicks on is far down,
        // the list, so we want to make sure we're at the top of the
        // viewport. This may technically be deprecated, now that we
        // do a full page reload (so we can make the specific URL
        // user-facing), but I'll leave it here for now.
        scrollToTop() {
            window.scrollTo(0, 0);
        }
    },

    // Fires once everything is rendered, but before the Update cycle
    // starts.
    mounted() {
        this.scrollToTop();
    },

    // Fires once the app has finished updating.
    updated() {

        // If we haven't already created EventListeners for the tabbed
        // courses list, we'll do that now.
        if (!this.hasCourseListeners && this.person.courses) {
            document.querySelectorAll('.nav.nav-tabs .nav-item .nav-link').forEach(item => {
                item.addEventListener('shown.bs.tab', function(event) {
                    event.relatedTarget.classList.remove('active');
                });
            });

            this.hasCourseListeners = true;
        }
    }
}