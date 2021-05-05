export default {
    props: {
        // This gets passed to the component after we query the courses from the db.
        courseList: {
            type: Object,
            required: true,
        },
    },
    data() {
        return{
            displayedTerm: '',
            isLoaded: false,
        }
    },
    computed: {
        /**
         * Gets the current term so we can make that tab active
         * 
         * @returns String
         */
        currentTerm() {
            const today = new Date()
            const month = today.getMonth() + 1 // Months are 0-indexed, so add 1 for actual calendar number
            const year = today.getFullYear()

            let term = ''

            // Jan–May is Spring
            if (month >= 1 && month < 5) {
                term = 'Spring'
            }
            // May–Aug is Summer
            else if (month >= 5 && month < 8) {
                term = 'Summer'
            }
            // Anything else (Sep–Dec) is Fall
            else {
                term = 'Fall'
            }

            // Check to see if there's a summer term available, if we're in the Summer months
            let hasSummer = false
            for (const key of Object.keys(this.courseList)) {
                if (/summer/i.test(key)){
                    hasSummer = true
                    break
                }
            }

            // If there's no summer, default to Spring if we're in May or June, and Fall if we're in July or August
            if (!hasSummer) {
                term = month < 7 ? 'Spring' : 'Fall'
            }

            return `${term} ${year}`
        },

        /**
         * Checks to see if we're looking at a Summer term, so we can separate into the various summer sections
         * 
         * @returns Boolean
         */
        isSummer() {
            return /summer/i.test(this.displayedTerm)
        },

        /**
         * Sorts the available terms chronologically.
         * 
         * @returns A sorted array of Object keys
         */
        termList() {
            return Object.keys(this.courseList).sort((a, b) => {
                const yearCompare = parseInt(a.substr(-4)) - parseInt(b.substr(-4))

                if (yearCompare === 0) {
                    const termOrder = {
                        spring: 1,
                        summer: 2,
                        fall: 3,
                    }

                    return termOrder[a.substr(0, a.length - 5).toLowerCase()] - termOrder[b.substr(0, b.length - 5).toLowerCase()]
                }

                return yearCompare
            })
        }
    },
    methods: {
        isCurrentTerm(term) {
            return this.currentTerm === term
        },
        getSyllabusLink(course) {
            const urlBase = `https://cah.ucf.edu/common/files/syllabi/`
            const fileName = `${course.catalogRef.replace(' ', '')}${course.section}${this.displayedTerm.replace(' ', '')}`

            return `<a href="${urlBase}${fileName}.pdf" rel="external">Available</a>`
        },
        changeDisplayedTerm(term) {
            this.displayedTerm = term
        }
    },
    mounted() {
        this.displayedTerm = this.currentTerm
    },
}