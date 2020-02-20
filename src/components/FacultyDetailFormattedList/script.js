/**
 * This is a subcomponent meant for use with the FacultyDetail component.
 * Makes the whole app a bit DRYer.
 */

export default {
    // Props
    props: {
        heading: String,
        text: String,
    },

    // Data
    data() {
        return{};
    },

    // Computed properties
    computed: {

        // Whether or not the thing's a list. Used in
        // FacultyDetailFormattedList/index.vue
        isList() {
            const doc = new DOMParser().parseFromString(this.text, 'text/html');
            return doc.querySelectorAll('ul').length > 0;
        }
    }
}