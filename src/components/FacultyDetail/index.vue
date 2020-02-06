<template>
    <div class="staff-detail row flex-column">
        <div class="media d-flex flex-row mb-3">
            <faculty-headshot :src="person.photoUrl" :fullname="person.fullName"></faculty-headshot>
            <div class="media-body d-flex flex-column">
                <h4>{{ person.fullName }}</h4>
                <p class="staff-title"><em v-html="displayTitle"></em></p>
                <p><a :href="'mailto:' + person.email">{{ person.email }}</a></p>
                <p v-if="!!person.phone">{{ person.phone }}</p>
                <p v-if="!!person.office">Office Hours: {{ person.office }}</p>
                <p v-if="!!person.room.num">
                    Campus Location:
                    <a v-if="!!person.room.building" :href="'https://map.ucf.edu/locations/' + person.room.building" target="_blank">{{ person.room.desc + person.room.num }}</a>
                    <span v-else>{{ person.room.desc + person.room.num }}</span>
                </p>
                <p v-else-if="!!person.location">Campus Location: {{ person.location }}</p>
                <p v-if="!!person.hasCV">
                    <a :href="'https://cah.ucf.edu/common/files/cv/' + person.id">View CV</a>
                </p>
                <p v-if="!!person.homepage">
                    <a :href="person.homepage">View Personal Website</a>
                </p>
            </div>
        </div>
        <div class="staff-info">
            <div v-if="!!person.bio" 
                class="pt-2 mw-100 mb-3"
                v-html="person.bio"
            ></div>
            <div v-if="!!person.edu && person.edu.length > 0" v-html="formatEdu"></div>
            <list v-if="!!person.interests" :heading="'Research Interests'" :text="person.interests"></list>
            <list v-if="!!person.research" :heading="'Recent Research Activities'" :text="person.research"></list>
            <div v-if="!!person.pubs && person.pubs.length > 0" v-html="formatPubs"></div>
            <div v-if="person.courses.length" v-html="person.courses"></div>
        </div>
    </div>
</template>

<script src="./script.js"></script>
<style scoped lang="scss" src="./style.scss"></style>