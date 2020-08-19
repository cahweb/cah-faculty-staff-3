<template>
    <div v-if="!isAZ && isTierLabel && selected == 0" class="col-12 tier-label">
        <h2 class="row-title">{{ person.tierLabel }}</h2>
    </div>
    <div v-else-if="!isTierLabel"
        class="faculty-card col-12 col-md-6 mb-0"
        :class="classObj"
    >
        <div class="cah-staff-list">
            <a :href="pageUrl + '?id=' + person.id" @click.prevent="setDetailUser(person.id)">
                <div class="staff-list d-flex align-items-center">
                    <faculty-headshot v-if="!isAZ" 
                        :src="person.photoUrl" 
                        :fullname="person.fullName"
                    >
                    </faculty-headshot>
                    <div class="d-flex flex-column"
                        :class="{'format-picture': (format == 'picture')}"
                    >
                        <p class="staff-name"><strong>{{ person.fullName }}</strong></p>
                        <div class="fs-list">
                            <small>
                                <p class="staff-title"><em v-html="displayTitle"></em></p>
                                <p class="staff-email">
                                    <a :href="'mailto:' + person.email">{{ person.email }}</a>
                                </p>
                                <p v-if="!!person.phone">{{ person.phone }}</p>
                                <p v-if="showInterests"    
                                    class="mt-1">
                                    <em v-html="shortInterests"></em>
                                </p>
                            </small>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>

<script src="./script.js"></script>
<style scoped lang="scss" src="./style.scss"></style>