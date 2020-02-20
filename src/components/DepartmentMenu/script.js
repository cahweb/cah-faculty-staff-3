/* eslint no-undef: 1 */

import {mapState, mapGetters, mapActions} from 'vuex';

export default {

    // Data property, once again empty. This would be used more
    // if we weren't trying to keep as much state information in
    // the store as possible.
    data() {
        return{};
    },

    // Computed properties
    computed: {

        // Whether this is the A-Z List.
        isAZ() {
            return this.selected == 0;
        },

        // Object that defines conditional classes for some of the
        // elements in DepartmentMenu/index.vue
        classObj() {
            return {
                'col-md-4': this.vertical,
                'col-lg-3': this.vertical,
            }
        },

        // Figures out the best label for the navigation button.
        buttonLabel() {
            
            // If we're not having the A-Z list as the main display
            // page, we switch to "View All" for the button
            if (this.isAZ) {
                if(this.tiered) {
                    return "View All";
                }
                else {
                    return "A&ndash;Z List";
                }
            }

            // Otherwise, we use the subdepartment's name.
            else {
                for (const subDept of this.subDeptList) {
                    if (subDept.id == this.selected) {
                        return subDept.name;
                    }
                }
            }
        },

        // Mapping state variables to the component.
        ... mapState('subdepartments', [
            'subDeptList',
            'selected'
        ]),
        ... mapState('facultyList', [
            'vertical',
            'filterable',
            'tiered',
            'btnColor',
        ]),

        // Mapping a getter for a store-level computed value.
        ... mapGetters('facultyList', [
            'pageUrl'
        ]),
    },

    // Methods
    methods: {

        // Get the display name.
        displayName(subDeptId) {
            const entry = this.subDeptList[subDeptId];
            return entry.name.length > 20 
                ? entry.name 
                : entry.shortName;
        },

        // Handle changing the filtered menu list. We're not having
        // the component call the selectDepartment() action immediately,
        // because we need to update some classes first.
        setMenu(target) {

            // We need to check if the list is vertical, because our
            // element/class structure changes
            if (!this.vertical) {
                document.querySelector('#deptMenu .nav-link.active').classList.remove('active');
            }
            else {
                document.querySelector('#deptMenu .dropdown-item.active').classList.remove('active');
            }

            // Make the current element .active
            document.querySelector(`#id-${target}`).classList.add('active');

            // NOW we fire the selectDepartment() action
            this.selectDepartment(target);
        },

        // Mapped actions
        ... mapActions('subdepartments', [
            'getSubDeptList',
            'selectDepartment'
        ]),
    }
}