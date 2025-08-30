<template>
    <div class="animeFilter">
        <button
            v-for="filter in filter"
            :key="filter.field"
            :class="{ active: currentFilter === filter.value }"
            @click="$emit('filter-change', filter-value)"
        >
            {{ filter.label }}    
        </button>
    </div>
</template>
<script>
    export default {
        props:{
            currentFilter: String
        },
        data(){
            return{
                filters:{
                            value: null, label:"All Anime",
                            value: "watching", label:"Watching",
                            value: "completed", label:"Completed",
                            value: "on_hold", label:"On Hold",
                            value: "dropped", label:"Dropped",
                            value: "plan_to_watch", label:"Plan to Watch",
                }
            }
        }
    }
</script>
<style>

</style>