/* eslint no-console: 1 */

import {mapState, mapGetters} from 'vuex';
import FacultyHeadshot from '../FacultyHeadshot';

export default {
    components: {
        'faculty-headshot': FacultyHeadshot,
    },
    props: {
        person: Object,
    },
    data() {
        return {};
    },
    computed: {
        isAZ() {
            return this.format === 'a-z';
        },
        isFilteredTextList() {
            return this.selected === 0 && this.isAZ && this.filterable;
        },
        isVerticalFilter() {
            return (this.isFilteredTextList && this.vertical);
        },
        classObj() {
            return {
                'col-lg-4': (((!this.isFilteredTextList && this.vertical) || (this.isFilteredTextList && !this.vertical) || (!this.filterable && this.isAZ)) && !this.includeInterests),
                'col-lg-3': ((this.isFilteredTextList && this.vertical) && !this.includeInterests),
            }
        },
        displayTitle() {

            let selected = this.selected;
            if (selected == 0) {
                selected = Object.keys(this.person.subDept)[0];
            }
            return this.person.titleDeptShort[selected] 
                ? this.person.titleDeptShort[selected] 
                : this.person.titleDept[selected] 
                    ? this.person.titleDept[selected] 
                    : this.person.title[selected];
        },
        showInterests() {
            return (this.format != 'a-z' && (this.includeInterests || (!this.filterable && this.format == 'picture')));
        },
        isTierLabel() {
            return this.tiered && ["fullTime", "partTime", "staff"].includes(this.person.id);
        },
        shortInterests() {
            let interestsRaw = this.person.interests;

            if (interestsRaw) {
                let interestsArr = [];

                if (/<ul>/.test(interestsRaw)) {
                    const list = new DOMParser().parseFromString(interestsRaw, 'text/html');
                    list.querySelectorAll('li').forEach(item => {
                        interestsArr.push(item.textContent);
                    });
                }
                else {
                    interestsRaw = interestsRaw.replace(/<br\s?\/?>/g, '');
                    interestsRaw = interestsRaw.replace(/<\/?p>/g, '');

                    if (/;/.test(interestsRaw)) {
                        interestsArr = interestsRaw.split(';');
                    }
                    else if (/,/.test(interestsRaw) && interestsArr.length <= 2) {
                        interestsArr = interestsRaw.split(',');
                    }
                    else if (interestsRaw.match(/./g).length > 1 || interestsRaw.indexOf('.') !== interestsRaw.length - 1) {
                        interestsArr = interestsRaw.split('.');
                    }
                    interestsArr = interestsArr.map(item => item.trim());
                }

                let interestsOut = '';
                for (let i = 0; i < interestsArr.length; i++) {
                    interestsOut += interestsArr[i];

                    if (i + 1 == interestsArr.length) {
                        interestsOut += '.';
                        break;
                    }
                    if (interestsOut.length >= 30) {
                        interestsOut += '&hellip;';
                        break;
                    }
                    else {
                        interestsOut += ', ';
                    }
                }
                return 'Interests: ' + interestsOut;
            }
            else return '';
        },
        ... mapState('facultyList', [
            'personList',
            'format',
            'includeInterests',
            'filterable',
            'vertical',
            'tiered',
            'imgSize',
        ]),
        ... mapState('subdepartments', [
            'selected',
        ]),
        ... mapGetters('facultyList', [
            'pageUrl',
        ])
    },
}