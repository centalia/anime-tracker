<template>
    <div v-if="isModalOpen">
        <div class="modal">
            <div class="modal__content">
                <div class="modal__header">
                    <h3>Добавление тайтла</h3>
                    <button class="modal__btn-close" @click="closeModal">
                        <svg class="modal__btn-close-icon"width="12" height="12" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.11334 1.11323C1.18001 1.04657 1.28334 1.04657 1.35001 1.11323L4.88667 4.6499C4.95334 4.71657 4.95334 4.8199 4.88667 4.88657C4.82001 4.95323 4.71667 4.95323 4.65001 4.88657L1.11334 1.34657C1.04667 1.28323 1.04667 1.17657 1.11334 1.11323Z"  stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M1.11334 4.88323C1.04667 4.81657 1.04667 4.71323 1.11334 4.64657L4.64667 1.11323C4.71334 1.04657 4.81667 1.04657 4.88334 1.11323C4.95001 1.1799 4.95001 1.28323 4.88334 1.3499L1.34667 4.88323C1.28334 4.9499 1.17667 4.9499 1.11334 4.88323Z" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
                <div class="add-anime-form">
                    <div class="add-anime-form__input">
                        <input type="text" 
                            class="add-anime-form__input-title"
                            v-model="animeData.title" 
                            placeholder="Название тайтла"
                        >
                        <input type="number" 
                            class="add-anime-form__input-episodes"
                            v-model="animeData.episodes" 
                        >
                        <select v-model="animeData.status">
                            <option value="watching">Смотрю</option>
                            <option value="completed">Просмотрено</option>
                            <option value="on-hold">Отложено</option>
                            <option value="dropped">Брошено</option>
                            <option value="planned">В планах</option>
                        </select>
                    </div>

                    <div class="modal__footer">
                        <button type="button" class="modal__btn-add-anime" @click="addAnimeFromForm">Добавить</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="overlay" @click="closeModal"></div> -->
    </div>
</template>
<script>
export default {
    name: 'addModalAnime',
    props: {
        isModalOpen:{
            type: Boolean,
            default: false,
        }
    },
    data(){
        return{
            animeData:{
                title: '',
                episodes: '12',
                status: 'watching'
            }
        }
    },
    methods: {
        closeModal(){
            this.$emit('close')
            this.resetForm();
        },
        addAnimeFromForm(){
            this.$emit('add-anime', { ...this.animeData});
            this.closeModal();
        },
        resetForm(){
            this.animeData = {
                title: '',
                episodes: '',
                status: 'watching'
            };
        }
    }
}
</script>
<style lang="scss">
@use '@/styles/scss/_fonts' as *;
@use '@/styles/scss/_variables' as *;
@use '@/styles/scss/_globals' as *;

.modal{
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
    z-index: 1000;
    background-color: $primary-dark-gray;
    border: 1px solid $color-border;
    border-radius: 10px;
    @include font('primary','body','normal','150');
        &__header{
            justify-content: space-between;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 40px;
            border-bottom: 1px solid $color-border;
            & > h3{
                @include font('heading','h6','normal','150');
                margin: 10px 0 0 10px;
                color: $base-white;
                letter-spacing: 1px;
            }
        }
        &__content{
            width: 380px;
            height: 100px;
            padding: 50px 14px 0;
            position: relative;;
            border-radius: 10px;
        }
        &__footer{
            display: flex;
            justify-content: end;
            align-items: center;
        }
        &__btn-close{
            width: 24px;
            height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 10px;
            right: 5px;
            border: 1px solid oklch(1 0 0 / 10%);
            border-radius: 12px;
            background-color: oklch(0 0 0 / 0%); 
            transition: all 0.3s ease;
            &:hover{
                border: 1px solid oklch(0.8921 0.1209 94.9);
                background-color: oklch(0.6648 0.1785 26.27);
                stroke: $base-white;
                transform: scale(1.1);
            }
            &:active{
                transform: scale(0.95);
                border: 1px solid oklch(1 0 0 / 10%);
                stroke: oklch(1 0 0 / 10%)
            }
            &-icon{
                position: relative;
                z-index: 2;
            }

        }
        &__btn-add-anime{
            background-color: oklch(0 0 0 / 0%);
            width: 110px;
            padding: 4px 12px;
            border-radius: 8px;
            border: 1px solid oklch(1 0 0 / 10%);
            backdrop-filter: blur(10px);
            box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.1), 0 4px 4px 0 rgba(0, 0, 0, 0.05), 0 1px 0 0 rgba(0, 0, 0, 0.05);
            @include font('primary', 'body', 'normal', '171');
            color: $base-white;
            transition: all 0.2s ease-in-out;
            transform: scale(1);
            &:hover{
                border: 1px solid oklch(0.8921 0.1209 94.9);
            }
            &:active{
                border: 1px solid oklch(1 0 0 / 10%);
                transform:scale(0.95);
            }
        }
}
.add-anime-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    @include font('primary','body','normal','150');
    &__input{
        display: flex;
        flex-direction: row;
        
        &-title{
            margin-right:10px;
        }
        &-episodes{
            width: 45px;
            margin-right:10px;
        }
    }
    & input{
        backdrop-filter: blur(20px);
        box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.1), 0 4px 4px 0 rgba(0, 0, 0, 0.05), 0 1px 0 0 rgba(0, 0, 0, 0.05);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.1) 100%);
        height: 28px;
        padding: 0 5px;
        border: 1px solid rgba(255, 255, 255, 0.07);
        border-radius: 99px;
        text-indent: 5px;
        color: $base_white;
        &::placeholder{
            text-indent: 5px;
        }
    }
    & select{
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.1) 100%);
        border: 1px solid rgba(255, 255, 255, 0.07);
        border-radius: 99px;
        padding: 0 5px;
        color:$base-white;
        option{
            background-color: $primary-dark-gray;
            color: $base-white;
            padding: 10px;
        }
    }
}
</style>