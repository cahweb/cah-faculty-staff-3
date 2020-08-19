<template>
    <div class="row"
        :class="{'flex-column': vertical}" 
        id="facultyBox"
    >
        <div v-if="!filterable" class="col-12 d-flex flex-row justify-content-center">
            <div class="btn-group" id="formatButtons">
                <button type="button"
                    class="btn btn-default"
                    :class="{active: (format == 'picture')}"
                    id="picBtn"
                    @click.prevent="switchFormat('picture')"
                >
                    <img :src="distUrl + 'img/address-card-solid.svg'" aria-hidden="true">
                </button>
                <button type="button"
                    class="btn btn-default"
                    :class="{active: (format == 'a-z')}"
                    id="azBtn"
                    @click.prevent="switchFormat('a-z')"
                >
                    <img :src="distUrl + 'img/list-alt-solid.svg'" aria-hidden="true">
                </button>
            </div>
        </div>
        <dept-menu v-if="filterable"></dept-menu>
        <div v-if="!isLoaded && !displayList.length"
            class="col-12 d-flex justify-content-center"
            :class="{'col-md-9': filterable && !vertical}"
        >
            <div class="loading-gif"></div>
        </div>
        <div v-else-if="!displayList.length"
            class="col-12 d-flex justify-content-center"
            :class="{'col-md-9': filterable && !vertical}"
        >
            <p class="text-muted mt-5">Looks like there's no one here&hellip;</p>
        </div>
        <div v-else-if="!isDetail" 
            class="col-12"
            :class="{'col-md-9': filterable && !vertical}"
        >
            <div class="row" id="entryBox">
                <faculty v-for="id in displayList" :key="id" 
                    :person="personList[id]" 
                >
                </faculty>
            </div>
        </div>
        <div v-else 
            class="col-12"
            :class="{'col-md-9': filterable}"
        >
            <faculty-detail :user="parseInt(detailUser)"></faculty-detail>
        </div>
    </div>
</template>

<script src="./script.js"></script>
<style scoped lang="scss" src="./style.scss"></style>