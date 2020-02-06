export default {
    props: {
        heading: String,
        text: String,
    },
    data() {
        return{};
    },
    computed: {
        isList() {
            const doc = new DOMParser().parseFromString(this.text, 'text/html');
            return doc.querySelectorAll('ul').length > 0;
        }
    }
}