/**
 * Subcomponent for displaying/formatting faculty headshots.
 */

import {mapState} from 'vuex';

export default {
    // Props
    props: {
        src: String,
        fullname: String,
    },

    // Data
    data() {
        return {
            // resize URL we'll be filtering the photos through.
            baseUrl: "https://cah.ucf.edu/common/resize.php",
        };
    },

    // Computed Properties
    computed: {

        // Get the URL that we'll use for the src attribute of the
        // final <img>. We use a generic profile photo silhouette
        // if we don't have a photo on file for them.
        imgUrl() {
            const url = this.src ? this.src : 'profilephoto.jpg';
            return `${this.baseUrl}?filename=${url}&sz=${this.size}`;
        },

        // Whether or not this is a faculty detail or just a faculty card
        // (affects the size we feed itno the imgUrl)
        isDetail() {
            return parseInt(this.detailUser) != 0;
        },

        // Whether the image is a rounded square or a circle
        isRounded() {
            return this.imgFormat == 'rounded';
        },

        // Whether we have a src attribute or not. Used in
        // FacultyHeadshot/index.vue
        isEmpty() {
            return !!this.src;
        },

        // The size we'll give to the imgUrl
        size() {
            return this.isDetail ? 2 : this.imgSize;
        },

        // Mapping state
        ... mapState('facultyList', [
            'imgFormat',
            'detailUser',
            'imgSize',
        ]),
    }
}