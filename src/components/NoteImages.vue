<template>
    <div>
        <div v-if="currentNote?.images?.length">
            <h2>Прикрепленные изображения:</h2>
            <div class="current-note__images">
                <div class="current-note__img-container" v-for="img in currentNote.images" :key="img">
                    <img :src="img" alt="img" @click="toggleVisibleModal(img)">
                    <div class="current-note__img-close" @click="deleteImg(img)"></div>
                </div>
            </div>
        </div>

        <my-modal v-if="isModalOpen" @toggle-visible-modal="toggleVisibleModal">
            <img class="current-note__img-item" :src="currentImage" alt="img">
            <div class="current-note__img-close" @click="toggleVisibleModal"></div>
        </my-modal>

    </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import MyModal from '@/components/Modal'


export default {
    name: 'MyNoteImages',
    components: {
        MyModal
    },
    setup() {
        const store = useStore()

        const currentNote = computed(() => store.state.notes.currentNote)
        const currentImage = ref(null)
        const isModalOpen = ref(false)

        // удаление прикрепленного изображение
        const deleteImg = (img) => {
            store.dispatch('deleteImg', img)
        }

        // открытие/закрытие изображение из заметки
        const toggleVisibleModal = (img = null) => {
            currentImage.value = img
            isModalOpen.value = !isModalOpen.value
        }

        return {
            currentNote,
            currentImage,
            isModalOpen,
            deleteImg,
            toggleVisibleModal,
        }
    }
}
</script>

<style lang="scss">
.current-note {

    &__images {
        width: 100%;
        border: 1px solid #0041a0;
        padding: 10px;
        overflow: auto;
        max-height: 200px;
        display: inline-flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 15px;
        margin-top: 10px;
    }

    &__img-container {
        position: relative;
    }

    &__img-item {
        max-width: 100%;
        max-height: 100%;
    }

    &__img-close {
        background: url(@/assets/close.svg) center center no-repeat;
        height: 27px;
        width: 27px;
        position: absolute;
        top: 5px;
        right: 5px;
        background-color: #dcdbdb;
        border-radius: 50%;
        cursor: pointer;
        transition: background-color .4s ease;

        @media (any-hover: hover) {
            &:hover {
                background-color: #919191;
                transition: background-color .4s ease;
            }
        }
    }

    &__images img {
        cursor: pointer;
        border: 1px solid #0000008f;
        max-height: 180px;
        max-width: 100%;
    }
}
</style>