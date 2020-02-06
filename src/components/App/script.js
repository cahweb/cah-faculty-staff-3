/*eslint no-console: 1*/

import {mapState, mapActions} from 'vuex';
import DepartmentMenu from '../DepartmentMenu';
import FacultyCard from '../FacultyCard';
import FacultyDetail from '../FacultyDetail';

export default {
    components: {
        "dept-menu": DepartmentMenu,
        "faculty": FacultyCard,
        "faculty-detail": FacultyDetail,
    },
    data() {
        return {};
    },
    computed: {
        isDetail() {
            return this.detailUser > 0;
        },
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
        ])
    },
    methods: {
        switchFormat(newFormat) {
            this.changeFormat(newFormat).then(() => {
                this.filterPersonList(this.selected);
            });
        },
        ... mapActions('facultyList', [
            'setDetailUser',
            'changeFormat',
            'filterPersonList',
        ]),
    },
    created() {
        const pageURL = new URL(window.location.href);
        const params = {};

        pageURL.searchParams.forEach((value, key) => {
            params[key] = value;
        });

        let found = false;
        for (const [key, value] of Object.entries(params) ) {

            switch(key) {
                case 'id':
                    if (Object.keys(this.personList).includes(value)) {
                        found = true;
                        this.$store.dispatch('facultyList/setDetailUser', value);
                    }
                    break;

                case 'subdept':
                    for (const subDept of this.subDeptList) {
                        if (value == subDept.id) {
                            found = true;
                            this.$store.dispatch('subdepartments/selectDepartment', value);
                            break;
                        }
                    }
                    break;
                default:
                    break;
            }

            if (found) break;
        }
    }
}