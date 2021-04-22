<template>
    <div class="row">
        <div class="col d-flex flex-column">
            <ul class="nav nav-tabs">
                <li v-for="(term, i) of termList" :key="i" class="nav-item">
                    <a class="m-0 nav-link" :class="{active: term === displayedTerm}" @click.prevent="changeDisplayedTerm(term)">{{ term }}</a>
                </li>
            </ul>
            <div class="tab-pane">
                <table class="table table-sm table-striped table-bordered table-hover">
                    <thead class="thead-default text-center">
                        <tr>
                            <th style="white-space: nowrap;">Course #</th>
                            <th>Course</th>
                            <th>Title</th>
                            <th>Mode</th>
                            <th v-if="isSummer">Session</th>
                            <th>Days/Times</th>
                            <!-- <th>Syllabus</th> -->
                        </tr>
                    </thead>
                    <tbody v-if="courseList[displayedTerm] !== undefined && courseList[displayedTerm].length">
                        <template v-for="(course, i) of courseList[displayedTerm]">
                            <tr :key="i">
                                <td>{{ course.number }}</td>
                                <td>{{ course.catalogRef }}</td>
                                <td>{{ course.title }}</td>
                                <td>{{ course.instructionMode }}</td>
                                <td v-if="isSummer">{{ course.session }}</td>
                                <td>{{ course.meetingDays }} {{ course.startTime }}&ndash;{{ course.endTime }}</td>
                                <!--
                                <td v-if="course.syllabusFile !== null" v-html="getSyllabusLink(course)"></td>
                                <td v-else>Unavailable</td>
                                -->
                            </tr>
                            <tr v-if="course.description !== 'No Description Available'" :key="`description-${i}`">
                                <td :colspan="isSummer ? 6 : 5"><p v-html="course.description"></p></td>
                            </tr>
                        </template>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td :colspan="isSummer ? 6 : 5" class="text-center">
                                <p>No course information to display.</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script src="./script.js"></script>

<style lang="scss" src="./style.scss" scoped></style>