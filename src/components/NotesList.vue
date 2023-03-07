<template>
    <div class="notes-list__container">
        <button :class="['notes__btn-add', { disabled: isDisabled }]" @click="updateCurrentNote()" :disabled="isDisabled">
            Добавить новую заметку
        </button>

        <ul class="notes__list notes-list">
            <li class="notes__item notes-item" v-for="note in notes" :key="note.id">

                <div :class="['notes-item__content', { active: note.id === currentNote?.id }]"
                    @click="updateCurrentNote(note)">
                    <h4 class="notes-item__title">{{ note.title }}</h4>
                    <p class="notes-item__text">{{ note.text }}</p>
                </div>

                <button class="notes-item__btn-delete" @click="deleteNote(note.id)">
                    <img src="@/assets/cart-icon.svg" alt="иконка корзины">
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'MyNotesList',
    setup() {
        const store = useStore()

        const currentNote = computed(() => store.state.notes.currentNote)
        const notes = computed(() => store.state.notes.notes)

        // Можно ли нажать на кнопку
        const isDisabled = computed(() => {
            if (!currentNote.value || (currentNote.value && currentNote.value?.id)) {
                return false
            }
            return true
        })

        // Отображение выбранной заметки
        const updateCurrentNote = (note = { title: '', text: '', images: [] }) => {
            store.dispatch('updateCurrentNote', note)
        }

        // Удаление заметки
        const deleteNote = (id) => {
            if (id === currentNote.value?.id) {
                store.dispatch('updateCurrentNote', null)
            }

            store.dispatch('deleteNote', id)
        }

        return {
            notes,
            currentNote,
            isDisabled,
            updateCurrentNote,
            deleteNote
        }
    }
}
</script>

<style lang="scss">
.notes__btn-add {
    height: 40px;
    width: 60%;
    background-color: #0041a0;
    color: #fff;
    font-size: 16px;
    border-radius: 10px;
    margin: 20px 0;
    margin-left: 15px;
    padding: 0 5px;
    transition: background-color .3s ease;

    @media(any-hover: hover) {
        &:not([disabled]):hover {
            background-color: #002f6c;
            transition: background-color .3s ease;
        }
    }
}



.notes-list__container {
    width: 30%;
    height: 100vh;
    border-right: 1px solid #1f232426;
}

.notes__list {
    max-height: calc(100% - 80px);
    overflow-y: auto;
    border-top: 1px solid #1f232426;
}



.notes-item {
    display: flex;
    border-bottom: 1px solid #1f232426;
    transition: background-color .3s ease;

    &__content {
        width: 100%;
        transition: background-color .3s ease, color .3s ease;
        padding: 15px 25px 10px;
        cursor: pointer;

        @media(any-hover: hover) {
            &:hover {
                background-color: #0041a0;
                color: #fff;
            }
        }
    }

    &__title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 5px;
    }

    &__text {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
    }

    &__btn-delete {
        min-width: 60px;
        width: 60px;
        border-left: 1px solid #1f232426;
        transition: background-color .3s ease;

        & img {
            width: 30px;
            height: 30px;
        }

        @media(any-hover: hover) {
            &:hover {
                background-color: red;
            }
        }
    }

    &:has(.notes-item__btn-delete:hover) {
        background-color: #4c444426;
    }
}

.active {
    background-color: #0041a0;
    color: #fff;
}


@media(max-width: 1200px) {
    .notes__list {
        font-size: 14px;
    }
}

@media(max-width: 900px) {

    .notes-list__container {
        width: 100%;
        border: none;
    }

    .notes__btn-add {
        width: 90%;
        display: block;
        margin: 10px auto;
    }
}
</style>
