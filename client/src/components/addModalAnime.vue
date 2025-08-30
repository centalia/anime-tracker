<template>
    <div v-if="isModalOpen">
        <div class="modal">
            <div class="modal__content">
                <div class="modal__header">
                    <h3>Добавление тайтла</h3>
                    <button class="modal__btn-close" @click="closeModal">&times;</button>
                </div>
                <div class="add-anime-form">
                    <div class="add-anime-form__input">
                        <input type="text" 
                            id="anime-title"
                            class="add-anime-form__input-title"
                            v-model="animeData.title" 
                            placeholder="Название тайтла"
                        >
                        <select v-model="animeData.status">
                            <option value="watching">Смотрю</option>
                            <option value="completed">Просмотрено</option>
                            <option value="on-hold">Отложено</option>
                            <option value="dropped">Брошено</option>
                            <option value="planned">В планах</option>
                        </select>
                    </div>
                    <div class="add-anime-form__input">
                        <input type="number" 
                            id="anime-episodes"
                            class="add-anime-form__input-episodes"
                            v-model="animeData.episodes" 
                            placeholder="Всего эпизодов"
                        >
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
                episodes: '',
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
            width: 358px;
            height: 120px;
            padding: 50px 14px 0;
            position: relative;;
            border-radius: 10px;
        }
        &__footer{

            display: flex;
            justify-content: center;
            align-items: center;
        }
        &__btn-close{
            position: absolute;
            top: 10px;
            right: 5px;
        }
        &__btn-add-anime{
            background-color: oklch(0 0 0 / 0%);
    width: 100px;
    padding: 4px 12px;
    border-radius: 8px;
    border: 1px solid oklch(1 0 0 / 10%);
    backdrop-filter: blur(10px);
    box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.1), 0 4px 4px 0 rgba(0, 0, 0, 0.05), 0 1px 0 0 rgba(0, 0, 0, 0.05);
    @include font('primary', 'body', 'normal', '171');
    color: $base-white;
        }
}
.add-anime-form {
    display: flex;
    flex-direction: column;
    gap: 5px;
    @include font('primary','body','normal','150');
    &__input{
        display: flex;
        flex-direction: row;
        &-title{
            margin-right:7px;
        }
        &-episodes{
            width: 115px;
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
        &::placeholder{
            text-indent: 5px;
        }
    }
    & select{
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.1) 100%);
        border: 1px solid rgba(255, 255, 255, 0.07);
        border-radius: 99px;
        option{
            background-color: $primary-dark-gray;
            color: $base-white;
            padding: 10px;
        }
    }
}
</style>