import {mapState} from 'vuex';

export default {
    props: {
        src: String,
        fullname: String,
    },
    data() {
        return {
            baseUrl: "https://cah.ucf.edu/common/resize.php",
        };
    },
    computed: {
        imgUrl() {
            const url = this.src ? this.src : 'profilephoto.jpg';
            return `${this.baseUrl}?filename=${url}&sz=${this.size}`;
        },
        isDetail() {
            return parseInt(this.detailUser) != 0;
        },
        isRounded() {
            return this.imgFormat == 'rounded';
        },
        isEmpty() {
            return !!this.src;
        },
        size() {
            return this.isDetail ? 2 : this.imgSize;
        },
        ... mapState('facultyList', [
            'imgFormat',
            'detailUser',
            'imgSize',
        ]),
    }
}