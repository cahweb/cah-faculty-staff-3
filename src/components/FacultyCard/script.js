/* eslint no-console: 1 */

import {mapState, mapGetters} from 'vuex';
import FacultyHeadshot from '../FacultyHeadshot';

export default {

    // Components
    components: {
        'faculty-headshot': FacultyHeadshot,
    },

    // Props, (member variables passed from a parent object).
    props: {
        // This is the object that represents the individual faculty
        // member
        person: Object,
    },

    // Data property. Empty again.
    data() {
        return {
            personIsDir: this.person.isDir,
            personIsChair: this.person.isChair,
        };
    },

    // Computed properties
    computed: {

        // Whether or not this is an A-Z List. I should probably
        // turn this into a store-level getter, tbh, but I think
        // getters still evaluate every time they're called,
        // while the computed properties don't. Sacrifice a little
        // DRY for a (probably trivial) performance improvement? 
        // Why not?
        isAZ() {
            return this.format === 'a-z';
        },

        // Whether we're able to filter the list.
        isFilteredTextList() {
            return this.selected === 0 && this.isAZ && this.filterable;
        },

        // Whether or not the text list is filtered AND vertical
        // Both this one and the previous one are used to determine
        // conditional classes in classObj(), below.
        isVerticalFilter() {
            return (this.isFilteredTextList && this.vertical);
        },

        // The conditional classes for our FacultyCard
        classObj() {
            return {
                'col-lg-4': (((!this.isFilteredTextList && this.vertical) || (this.isFilteredTextList && !this.vertical) || (!this.filterable && this.isAZ)) && !this.includeInterests),
                'col-lg-3': ((this.isFilteredTextList && this.vertical) && !this.includeInterests),
            }
        },

        isChair() {
            return this.personIsChair != undefined ? true : false;
        },

        isDir() {
            return this.personIsDir != undefined ? true : false;
        },

        // The title we display for the faculty member. Because of
        // the way the CAH db is organized, this can get...a bit messy.
        displayTitle() {

            // We'll be referring to this a lot, so we'll make it
            // slightly shorter
            let selected = this.selected;

            // The final title we'll end up returning.
            let title = '';

            // If we're not showing a specific subdepartment, just
            // pick the first value arbitrarily
            if (selected == 0) {
                selected = Object.keys(this.person.subDept)[0];
            }

            // Special case for weird SVAD titles. Can't WAIT to
            // restructure this crap
            if( 22 == this.dept 
                && (/director/i.test(this.person.title[selected]) 
                    || /advisor/i.test(this.person.title[selected])) 
                && (this.person.titleDeptShort[selected].length > 0 
                    || this.person.titleDept[selected].length > 0
                    )
            ) {
                title = `${this.person.title[selected]} ${this.person.titleDeptShort[selected] ? this.person.titleDeptShort[selected] : this.person.titleDept[selected]}`;
            }

            // Otherwise, preference returning the short program title,
            // then the full program title, and only THEN fall back on
            // the basic entry from the titles table.
            else {
                title = this.person.titleDeptShort[selected] 
                    ? this.person.titleDeptShort[selected] 
                    : this.person.titleDept[selected] 
                        ? this.person.titleDept[selected] 
                        : this.person.title[selected];
            }

            if (Array.isArray(title)) {
                if (this.isDir) {
                    for (const t of title) {
                        if (/Director/.test(t)) {
                            title = t;
                            break;
                        }
                    }
                }
                else if (this.isChair) {
                    for (const t of title) {
                        if (/Chair/.test(t)) {
                            title = t;
                            break;
                        }
                    }
                }
                else {
                    title = title[0];
                }
            }

            if (Array.isArray(title)) {
                title = title[0];
            }

            return title;
        },

        // Whether we need to display a truncated list of the person's
        // research interests.
        showInterests() {
            return (this.format != 'a-z' && (this.includeInterests || (!this.filterable && this.format == 'picture')));
        },

        // The easiest way for me to organize things into a tier list is
        // to give the tier labels their own faux FacultyCard entries, so
        // we're checking to see if this is one of those
        isTierLabel() {
            return this.tiered && ["fullTime", "partTime", "staff"].includes(this.person.id);
        },

        // Pare down their interests into a short(ish) comma-delimited
        // list. The values of these fields vary wildly, but
        shortInterests() {
            let interestsRaw = this.person.interests;

            if (interestsRaw) {
                let interestsArr = [];

                // Some of them do a full-on unordered list...
                if (/<ul>/.test(interestsRaw)) {
                    const list = new DOMParser().parseFromString(interestsRaw, 'text/html');
                    list.querySelectorAll('li').forEach(item => {
                        interestsArr.push(item.textContent);
                    });
                }

                // Some people use <p> tags, or one <p> tag with a
                // bunch of <br>s or some other random delimiter--
                // I've seen semicolons, commas, AND periods
                //
                // One of these days, I'll get around to standardizing
                // that...
                else {

                    // Yes, I'm searching through HTML with RegExp.
                    // It's specific and the cost increase is trivial--
                    // don't @ me
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

                // Assemble our Frankensteinian monstrosity into some-
                // thing that a human being might actually read, and
                // truncate it semi-intelligently if it's too long.
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

        // Mapping state variables
        ... mapState('facultyList', [
            'personList',
            'format',
            'includeInterests',
            'filterable',
            'vertical',
            'tiered',
            'imgSize',
            'dept',
        ]),
        ... mapState('subdepartments', [
            'selected',
        ]),

        // Mapping state getters
        ... mapGetters('facultyList', [
            'pageUrl',
        ])
    },
}