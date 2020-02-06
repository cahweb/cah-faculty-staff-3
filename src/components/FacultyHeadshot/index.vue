<template>
    <div class="faculty-img">
        <img :class="{'img-circle': !isDetail, rounded: isRounded, 'd-flex': isEmpty, detail: isDetail}"
            class="mr-3" 
            :src="imgUrl" :alt="fullname">
    </div>
</template>

<script src="./script.js"></script>
<style scoped lang="scss" src="./style.scss"></style>