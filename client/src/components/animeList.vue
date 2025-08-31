<template>
    <div class="tracker-container">
        <div class="tracker-grid">
            <div class="tracker-grid__header">
                <div class="">#</div>
                <div class="">Title</div>
                <div class="">Status</div>
                <div class="">Episodes</div>
            </div>
        </div>
        <div class="tracker-grid" id="tracker-body">
            <div v-for="(anime,index) in animeList" :key="anime._id"  class="tracker-grid__body">
                <div>{{ index + 1 }}</div>
                <div>{{ anime.title }}</div>
                <div :class="`status__${anime.status}`">{{ getStatusText(anime.status) }}</div>
                <div>{{ anime.progress }} / {{ anime.episodes }}</div>
            </div>        
        </div>
    </div>
</template>
<script>
export default {
    props:{
        animeList:Array
    },
    methods:{
        getStatusText(status){
            switch (status) {
                case 'watching':
                    return 'Watching';
                case 'completed':
                    return 'Completed';
                case 'planned':
                    return 'Plan to watch';
                case 'on-hold':
                    return 'On hold';
                case 'dropped':
                    return 'Dropped'
            default:  
                return status;
            }    
        }
    }
}
</script>
<style lang="scss">
@use '@/styles/scss/_fonts' as *;
@use '@/styles/scss/_variables' as *;
@use '@/styles/scss/_globals' as *;
@use '@/styles/scss/_mixin' as *;

.tracker-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.tracker-grid{
    flex-direction: row;
}

.tracker-grid__header{
    @include tracker-grid();
}

.tracker-grid__body{
    @include tracker-grid();
}

.btn-watchingOneEpisode{

}
</style>