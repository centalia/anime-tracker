<template>
    <div>
        <AnimeFilter
            :currentFilter="filter"
            @filter-change="setFilter"
        />
        <AnimeList :anime-list="filteredAnime" />
        <AddModalAnime
            v-if="showModal"
            :isModalOpen="showModal"
            @close="closeModal"
            @add-anime="addAnime"
        />
    </div>
</template>
<script>
import AddModalAnime from './addModalAnime.vue';
import AnimeFilter from './animeFilter.vue';
import AnimeList from './animeList.vue';

export default {
    name: 'AnimeView',
    components: {AnimeFilter, AnimeList, AddModalAnime},
    data(){
        return{
            animeList: [],
            filter: null,
            showModal: false
        }
    },
    computed:{
        filteredAnime(){
            if (!this.filter) return this.animeList
            return this.animeList.filter(anime => anime.status === this.filter)
        }
    },

    async mounted(){
        await this.fetchAnime();
    },
    methods:{
        async fetchAnime() {
            const response = await fetch('http://localhost:3001/api/anime');
            const data = await response.json()

            this.animeList = data.map((item, index) => {                
                return {
                    id: index + 1,
                    title: item.title,
                    status: this.normalizedStatus(item.status),  
                    progress: item.progress || 0,
                    episodes: item.episodes || 0,
                }
                
            })
        },    
        
        normalizedStatus(status){
            const STATUS = {
                'watching': "watching",
                'completed': "completed",
                'on-hold': "on-hold",
                'dropped': "dropped",
                'planned': "planned"
            }  
            return STATUS[status?.toLowerCase()] || 'watching'
        },

        setFilter(newFilter){
            this.filter = newFilter;
        },
        
        async addAnime(newAnime){
            const response = await fetch('http://localhost:3001/api/anime',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAnime)
            })
            const addingAnime = await response.json();
            this.animeList.push(addingAnime);
        },

        openModal(){
            this.showModal = true
        },
        closeModal(){
            this.showModal = false
        }
    } 
} 
</script>
<style>

</style>