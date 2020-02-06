<template>
    <div>
        <h3 class="heading-underline">{{ heading }}</h3>
        <div v-if="isList" v-html="text"></div>
        <p v-else v-html="text"></p>
    </div>
</template>

<script src="./script.js"></script>
<style scoped lang="scss" src="./style.scss"></style>