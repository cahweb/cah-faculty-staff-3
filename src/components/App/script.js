/*eslint no-console: 1*/

import {mapState, mapActions} from 'vuex';
import DepartmentMenu from '../DepartmentMenu';
import FacultyCard from '../FacultyCard';
import FacultyDetail from '../FacultyDetail';

export default {
    // The components we're using
    components: {
        "dept-menu": DepartmentMenu,
        "faculty": FacultyCard,
        "faculty-detail": FacultyDetail,
    },
    
    // Every component has to have a data property, even if it
    // just returns an empty object.
    data() {
        return {};
    },

    // Computed properties
    computed: {

        // Whether this we're getting a detailed display of a single
        // user's information.
        isDetail() {
            return this.detailUser > 0;
        },

        // Mapping some of the variables from the store that the
        // component will need.
        ... mapState('subdepartments', [
            'subDeptList',
            'selected',
        ]),
        ... mapState('facultyList', [
            'personList',
            'detailUser',
            'displayList',
            'filterable',
            'format',
            'distUrl',
            'vertical',
            'tiered',
            'multiLevel',
            'isLoaded',
        ])
    },

    // Methods (unlike computed properties, which only run when the
    // info they depend on changes, methods are run every time they're
    // called)
    methods: {

        // Switch from "picture" format to "a-z" and vice-versa.
        switchFormat(newFormat) {
            this.changeFormat(newFormat).then(() => {
                this.filterPersonList(this.selected);
            });
        },

        // Map actions from the store as component methods.
        ... mapActions('facultyList', [
            'setDetailUser',
            'changeFormat',
            'filterPersonList',
            'setIsLoaded',
        ]),
    },

    // Called as soon as the app starts up, before anything is rendered
    created() {

        this.$store.dispatch('facultyList/getFacultyList')
            .then(() => {
                // Checking any GET parameters, so we can display the right
                // information on the page.
                const pageURL = new URL(window.location.href);
                const params = {};

                pageURL.searchParams.forEach((value, key) => {
                    params[key] = value;
                });

                // Run through the parameters and see if we have an id or a
                // subdepartment.
                let found = false;
                for (const [key, value] of Object.entries(params) ) {

                    console.log(`${key}: ${value}`)

                    switch(key) {
                        // Check for ID first. If the URL has a valid ID, the
                        // subdepartment will be ignored.
                        case 'id':
                            // If the requested ID is in our list, we display
                            // that user's detail page with the setDetailUser()
                            // action
                            if (0 != value && Object.keys(this.personList).includes(value)) {
                                found = true;
                                this.$store.dispatch('facultyList/setDetailUser', value);
                            }
                            break;

                        // Check for subdepartment and filter the display list
                        // accordingly.
                        case 'subdept':
                            if (Object.values(this.subDeptList).map(item => item.id).includes(value)) {
                                found = true;
                                this.$store.dispatch('subdepartments/selectDepartment', value);
                            }
                            break;
                            
                        default:
                            break;
                    }

                    // If we've found something to change the display to, no need
                    // to keep looking
                    if (found) break;
                }
            })
            .then(() => {this.setIsLoaded(true)})
    },
}