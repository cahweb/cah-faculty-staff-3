/*eslint no-console: 1*/
/*eslint no-undef: 1 */

import {mapState} from 'vuex';
import FacultyDetailFormattedList from '../FacultyDetailFormattedList';
import FacultyHeadshot from '../FacultyHeadshot';
import _ from 'underscore';

export default {
    components: {
        'list': FacultyDetailFormattedList,
        'faculty-headshot': FacultyHeadshot,
    },
    props: {
        user: Number,
    },
    data() {
        return{
            hasCourseListeners: false,
        };
    },
    computed: {
        person() {
            return this.personList[this.user];
        },
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
        formatEdu() {
            const edu = new DOMParser().parseFromString('<h3 class="heading-underline">Education</h3><div><ul id="edu-rows"></ul></div>', 'text/html');

            for (const deg of this.person.edu) {
                const newLi = edu.createElement('li');
                newLi.innerHTML = deg['degree'] + (deg['field'] ? ` in ${deg['field']}` : '') + (deg['institution'] ? ` from ${deg['institution']}` : '') + (deg['year'] ? ` (${deg['year']})` : '');
                edu.querySelector('#edu-rows').append(newLi);
            }

            return edu.body.innerHTML;
        },
        formatPubs() {
            const pubs = new DOMParser().parseFromString('<div id="pubs"></div>', 'text/html');

            const pubDiv = pubs.querySelector('#pubs');

            let type = '';
            let i = 0;
            let newList;
            for (const pub of this.person.pubs) {
                if (i > 0 && pubs.pubType != type) {
                    pubDiv.append(newList);
                }
                if (pub.pubType != type) {
                    const newHead = pubs.createElement('h4');
                    newHead.classList.add('pt-4');
                    newHead.innerHTML = pub.pubType;
                    pubDiv.append(newHead);

                    newList = pubs.createElement('ul');
                }

                const newItem = pubs.createElement('li');
                newItem.innerHTML = (parseInt(pub.forthcoming) ? `<em>Forthcoming</em> ` : '') + `${pub.pubDate} ` + _.unescape(pub.citation);
                newList.append(newItem);

                i++;
                type = pub.pubType;
            }

            return pubDiv.innerHTML;
        },
        ...mapState('facultyList', [
            'personList',
        ]),
        ...mapState('subdepartments', [
            'selected',
        ]),
    },

    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        }
    },

    mounted() {
        this.scrollToTop();
    },
    updated() {
        if (!this.hasCourseListeners && this.person.courses) {
            document.querySelectorAll('.nav.nav-tabs .nav-item .nav-link').forEach(item => {
                item.addEventListener('shown.bs.tab', function(event) {
                    console.log(event.relatedTarget);
                    event.relatedTarget.classList.remove('active');
                });
            });

            this.hasCourseListeners = true;
        }
    }
}