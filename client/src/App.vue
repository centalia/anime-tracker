<template>
    <div>
        <header>
            <div class="header-container">
                <div class="brand_name">
                    <h4>Centalia Anime Tracker</h4>
                </div>
                <nav class="nav-list">
                    <ul class="nav-list__item">
                        <a class="nav-list__item-text" 
                            :class="{active: activeTab == 'Manga'}" 
                            href="#" 
                            @click.prevent="setActiveTab('Manga')">
                            Manga
                        </a>
                    </ul>
                    <ul class="nav-list__item">
                        <a class="nav-list__item-text"
                            :class="{active: activeTab == 'Anime'}"
                            href="#"
                            @click.prevent="setActiveTab('Anime')">
                            Anime
                        </a>
                    </ul>
                    <ul class="nav-list__item">
                        <a class="nav-list__item-text"
                            :class="{active: activeTab == 'Ranobe'}"
                            href="#"
                            @click.prevent="setActiveTab('Ranobe')">
                            Ranobe
                        </a>
                    </ul>
                </nav>
                <button class="btn__add-anime">Добавить в список</button>
                
            </div>
        </header>
    </div>
</template>

<script>
export default {
    data(){
        return{
            activeTab: "Anime"
        }
    },
    methods: {
        setActiveTab(tabname){
            this.activeTab = tabname
        }
    }
}
</script>

<style lang="scss">
@use '@/styles/scss/_fonts' as *;
@use '@/styles/scss/_variables' as *;
@use '@/styles/scss/_globals' as *;

.header-container{
    display: flex;
    width: $width;
    height: 104px;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto;


    margin-bottom: 15px;
}

.brand_name{
    @include font('primary', 'h4', 'bold', '150');
    color: $base-white;
}

.nav-list{
    display: flex;
    flex-direction: row;
    gap: 3rem;
}

.nav-list__item{
    @include font('primary', 'h6', 'bold', '150');
    color: $base-white;
}

.nav-list__item-text{
    @include font('primary', 'h6', 'normal', '200');
    // font-family: 'Lato', sans-serif;
    text-decoration: none;
    color: $base-white;
    position: relative;
    display: inline-block;
    transition: color 0.15s ease;
    &::after{
            content: '';
            position: absolute;
            left: 0;
            bottom: -4px;
            width: 100%;
            height: 4px;
            background-color: oklch(0.8848 0.1816 94.9);
            border-radius: 2px;

            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.15s ease-in-out;
        }
    &.active{
        font-weight: 700;
        &.active::after{
            transform: scaleX(1);
        }
    }
}

.btn__add-anime{
    background-color: oklch(0.8848 0.1816 94.9);
    width: 180px;
    height: $btn-height;
    padding: 8px 13px;
    border-radius: $btn-border-radius;
    border: none;
    @include font('heading', 'body', 'normal', '171');

    transition: all 0.2s ease-in-out;
    transform: scale(1);
    &:hover{
        border: 1px solid oklch(0.8921 0.1209 94.9);
        padding: 8px;
        background-color: oklch(0.8921 0.1209 94.9);
        color: $base-black;
        transform: scale(1.05);
    }
    &:active{
        background-color: oklch(0.895 0.0987 94.9);
        color: $text-body;
        border: none;
        transform: scale(0.95);
        box-shadow: 0 2px 4px oklch(0% 0 0 / 20%);
    }
    &:focus-visible{
        outline: 2px solid $secondary-yellow;
        outline-offset: 2px;
    }
}
</style>