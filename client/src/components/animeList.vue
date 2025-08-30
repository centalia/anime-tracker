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

.status__completed{
    position: relative;
    border: 1px solid $color-status__completed;
    border-radius: 17px;
    padding: 1px 7px 1px 28px;
    background-color: $color-status__completed;
    @include font('primary', 'body', 'medium', '171');
    letter-spacing: 0.8px;
    &::before{
        content: '';
        position: absolute;
        left: 8px;
        top: 50%;
        transform: translateY(-50%);
        width: 14px;
        height: 14px;
        background-color: oklch(0.5862 0.185 145);
        border-radius: 50%;
    }
}
.status__watching{
    position: relative;
    border: 1px solid $color-status__watching;
    border-radius: 17px;
    padding: 1px 7px 1px 28px;
    background-color: $color-status__watching;
    @include font('primary', 'body', 'medium', '171');
    letter-spacing: 0.8px;
    &::before{
        content: '';
        position: absolute;
        left: 8px;
        top: 50%;
        transform: translateY(-50%);
        width: 14px;
        height: 14px;
        background-color: oklch(0.6255 0.1357 240);
        border-radius: 50%;
    }
}
.status__on-hold{
    position: relative;
    border: 1px solid $color-status__hold;
    border-radius: 17px;
    padding: 1px 7px 1px 25px;
    background-color: $color-status__hold;
    @include font('primary', 'body', 'medium', '171');
    letter-spacing: 0.8px;
    &::before{
        content: '';
        position: absolute;
        left: 8px;
        top: 50%;
        transform: translateY(-50%);
        width: 12px;
        height: 12px;
        background-color: oklch(0.8306 0.1815 73.51);
        border-radius: 50%;
    }
}
.status__dropped{
    position: relative;
    border: 1px solid $color-status__drop;
    border-radius: 17px;
    padding: 1px 7px 1px 25px;
    background-color: $color-status__drop;
    @include font('primary', 'body', 'medium', '171');
    letter-spacing: 0.8px;
    &::before{
        content: '';
        position: absolute;
        left: 8px;
        top: 50%;
        transform: translateY(-50%);
        width: 12px;
        height: 12px;
        background-color: oklch(0.595 0.2467 29.2339);
        border-radius: 50%;
    }
}
.status__planned{
    position: relative;
    border: 1px solid $color-status__planned;
    border-radius: 17px;
    padding: 1px 7px 1px 25px;
    background-color: $color-status__planned;
    @include font('primary', 'body', 'medium', '171');
    letter-spacing: 0.8px;
    &::before{
        content: '';
        position: absolute;
        left: 8px;
        top: 50%;
        transform: translateY(-50%);
        width: 12px;
        height: 12px;
        background-color: oklch(0.7205 0 300);
        border-radius: 50%;
    }
}

.btn-watchingOneEpisode{

}
</style>