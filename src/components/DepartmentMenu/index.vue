<template>
    <div class="col-12 mb-4" 
        :class="{'col-md-4': (filterable && vertical), 'col-md-3': (filterable && !vertical)}"
        id="deptMenu"
    >
        <nav v-if="!vertical" class="navbar navbar-toggleable-sm" role="navigation">
            <button class="navbar-toggler collapsed bg-primary btn btn-block text-secondary mb-1"
                type="button"
                data-toggle="collapse"
                data-target="#filterBar"
                aria-controls="filterBar"
                aria-expanded="false"
                aria-label="Toggle Filter"
            >
                FILTER &#11206;
            </button>
            <div class="collapse navbar-collapse border-0" 
                id="filterBar"
            >
                <ul class="nav nav-pills nav-justified flex-column">
                    <li class="nav-item">
                        <a class="nav-link"
                            :class="{active: 0 == selected}"
                            id="id-0"
                            :href="pageUrl"
                            @click.prevent="setMenu(0)"
                        >
                            A&ndash;Z List
                        </a>
                    </li>
                    <template v-for="(subDept, index) in subDeptList">
                        <li class="nav-item"
                            :key="index"
                        >
                            <a class="nav-link"
                                :class="{active: subDept.id == selected, 'has-header': multiLevel && notAdmin(subDept.name) && !subDept.isHeader, 'is-header': multiLevel && subDept.isHeader}"
                                :id="`id-${subDept.id}`"
                                :href="`${pageUrl}?subdept=${subDept.id}`"
                                @click.prevent="setMenu(subDept.id)"
                            >
                                {{ subDept.name }}
                            </a>
                        </li>
                    </template>
                </ul>
            </div>
        </nav>
        <div v-else class="dropdown btn-group">
            <button class="btn"
                :class="'btn-' + btnColor"
                id="name-btn"
                @click="setMenu(selected)"
            >
                <span class="dept-label"
                    v-html="buttonLabel"
                >
                </span>
            </button>
            <button class="btn dropdown-toggle dropdown-toggle-split" 
                :class="'btn-' + btnColor"
                type="button" 
                id="subDeptFilterButton" 
                data-toggle="dropdown" 
                aria-haspopup="true" 
                aria-expanded="false"
            ></button>
            <div class="dropdown-menu"
                aria-labelledby="subDeptFilterButton"
            >
                <a class="dropdown-item"
                    :class="{active: selected == 0}"
                    id="id-0"
                    :href="pageUrl"
                    @click.prevent="setMenu(0)"
                >
                    A&ndash;Z List
                </a>
                <a v-for="(subDept, index) in subDeptList"
                    :key="index"
                    class="dropdown-item"
                    :class="{active: subDept.id == selected}"
                    :id="`id-${subDept.id}`"
                    :href="`${pageUrl}?subDept=${subDept.id}`"
                    @click.prevent="setMenu(subDept.id)"
                >
                    {{ subDept.name }}
                </a>
            </div>
        </div>
    </div>
</template>

<script src="./script.js"></script>
<style scoped lang="scss" src="./style.scss"></style>