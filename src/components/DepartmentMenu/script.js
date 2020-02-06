/* eslint no-undef: 1 */

import {mapState, mapGetters, mapActions} from 'vuex';

export default {
    data() {
        return{
            menuDisplayed: false,
        };
    },
    computed: {
        isAZ() {
            return this.selected == 0;
        },
        classObj() {
            return {
                'col-md-4': this.vertical,
                'col-lg-3': this.vertical,
            }
        },
        buttonLabel() {
            
            if (this.isAZ) return "A&ndash;Z List";
            else {
                for (const subDept of this.subDeptList) {
                    if (subDept.id == this.selected) {
                        return subDept.name;
                    }
                }
            }
        },
        ... mapState('subdepartments', [
            'subDeptList',
            'selected'
        ]),
        ... mapState('facultyList', [
            'vertical',
            'filterable',
        ]),
        ... mapGetters('facultyList', [
            'pageUrl'
        ]),
    },
    methods: {
        displayName(subDeptId) {
            const entry = this.subDeptList[subDeptId];
            return entry.name.length > 20 
                ? entry.name 
                : entry.shortName;
        },
        setMenu(target) {
            if (!this.vertical) {
                document.querySelector('#deptMenu .nav-link.active').classList.remove('active');
            }
            else {
                document.querySelector('#deptMenu .dropdown-item.active').classList.remove('active');
            }

            document.querySelector(`#id-${target}`).classList.add('active');

            this.selectDepartment(target);
        },
        showDropdown() {
            return;
        },
        ... mapActions('subdepartments', [
            'getSubDeptList',
            'selectDepartment'
        ]),
    }
}