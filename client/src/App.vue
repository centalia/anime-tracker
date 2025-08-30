<template>
    <div id="app">
        <Header @open-add-modal="openAddModal"/>
        <AnimeView ref="animeView"/>
    </div>
</template>

<script>
import Header from './components/Header.vue';
import AnimeView from './components/animeView.vue';

export default {
    name: 'App',
    components:{ Header, AnimeView },

    data(){
        return{
            animeList: [],
            showModal: false,
        }
    },
    methods:{
        openAddModal(){
            this.$refs.animeView.openModal();
        }
    }
}
</script>

<style lang="scss">

</style>