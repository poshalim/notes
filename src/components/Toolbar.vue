<template>
    <div class="current-note__toolbar toolbar">
        <button class="current-note__btn-back" @click="updateCurrentNote">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                    d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
        </button>

        <button :class="['current-note__btn-save', { disabled: !title || !text }]" @click="editCurrentNote"
            :disabled="!title || !text">
            Сохранить изменения
        </button>

        <div class="toolbar__font">
            <div class="toolbar__font-size-container">
                <button :class="['toolbar__font-size-btn', { disabled: currentFontSize === 8 }]" @click="decreaseFontSize"
                    :disabled="currentFontSize === 8">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path
                            d="M416 256c0 17.7-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                    </svg>
                </button>

                <div class="toolbar__font-size">{{ currentFontSize }}</div>

                <button :class="['toolbar__font-size-btn', { disabled: currentFontSize === 72 }]" @click="increaseFontSize"
                    :disabled="currentFontSize === 72">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path
                            d="M240 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H176V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H240V80z" />
                    </svg>
                </button>
            </div>


            <select class="toolbar__select" name="fontFamily" id="fontFamily" v-model="currentFontFamily">
                <option :value="font" v-for="font in fontFamily" :key="font">{{ font }}</option>
            </select>

            <button :class="['toolbar__btn-bold', { 'toolbar__btn-bold--active': fontIsBold }]"
                @click="updateFontWeight"><b>Ж</b></button>
            <button :class="['toolbar__btn-italic', { 'toolbar__btn-bold--active': fontIsItalic }]"
                @click="updateFontStyle"><em>К</em></button>
        </div>
    </div>
</template>

<script>
import { ref, watch, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'MyToolbar',
    props: ['title', 'text'],
    setup(props) {

        const store = useStore()

        const currentNote = computed(() => store.state.notes.currentNote)

        const currentFontSize = computed(() => store.state.font.font.fontSize)
        const fontSizes = computed(() => store.state.font.fontSizes)

        const currentFontFamily = ref('Montserrat')
        const fontFamily = computed(() => store.state.font.fontFamily)

        const fontIsBold = computed(() => store.state.font.font.fontIsBold)
        const fontIsItalic = computed(() => store.state.font.font.fontIsItalic)

        // закрытие текущей заметки
        const updateCurrentNote = () => {
            store.dispatch('updateCurrentNote', null)
        }

        // Изменение текущей заметки
        const editCurrentNote = () => {
            if (currentNote.value.id) {
                store.dispatch('updateNote', { title: props.title, text: props.text })
            }
            else {
                store.dispatch('createNote', { id: Date.now(), title: props.title, text: props.text, images: currentNote.value.images })
            }
        }

        // Уменьшение размера шрифта
        const decreaseFontSize = () => {
            store.dispatch('updateFontSize', fontSizes.value[fontSizes.value.findIndex(el => el === currentFontSize.value) - 1])
        }

        // Увелечение размера шрифта
        const increaseFontSize = () => {
            store.dispatch('updateFontSize', fontSizes.value[fontSizes.value.findIndex(el => el === currentFontSize.value) + 1])
        }

        // Выделение текста жирным
        const updateFontWeight = () => {
            store.dispatch('updateFontIsBold')
        }

        // Выделение текста курсивом
        const updateFontStyle = () => {
            store.dispatch('updateFontStyle')
        }

        // Отслеживание изменений изменений currentFontFamily
        watch(currentFontFamily, (newValue) => {
            store.dispatch('updateFontFamily', newValue)
        })

        // Подставляем текущий fontFamily при открытии заметки
        onMounted(() => {
            currentFontFamily.value = store.state.font.font.fontFamily
        })

        return {
            currentFontSize,
            currentFontFamily,
            fontFamily,
            fontIsBold,
            fontIsItalic,
            updateCurrentNote,
            editCurrentNote,
            decreaseFontSize,
            increaseFontSize,
            updateFontWeight,
            updateFontStyle
        }
    }
}
</script>

<style lang="scss">
.toolbar {
    display: flex;
    align-items: center;
    gap: 10px;

    &__font {
        display: flex;
        align-items: center;
    }


    &__font-size-container {
        display: flex;
        align-items: center;
        gap: 7px;
        margin: 0 20px;
    }

    &__font-size-btn {
        width: 28px;
        height: 28px;
        fill: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #0041a0;
        padding: 5px;
        border-radius: 50%;
    }

    &__font-size {
        font-size: 22px;
        width: 30px;
        text-align: center;
    }

    &__select {
        height: 28px;
        width: 115px;
        cursor: pointer;
        border: 1px solid #0041a0;
        margin-right: 20px;
    }

    &__btn-bold {
        margin-right: 5px;
    }

    &__btn-bold,
    &__btn-italic {
        font-size: 18px;
        padding: 8px;
        border-radius: 10%;
    }

    &__btn-bold--active,
    &__btn-italic--active {
        color: #0041a0;
        background-color: #f0f7ff;
    }

    @media(any-hover:hover) {

        &__btn-bold:hover,
        &__btn-italic:hover {
            background-color: #f0f0f0;
        }

        &__btn-bold--active:hover,
        &__btn-italic--active:hover {
            background-color: #dbecff;
        }
    }
}



.current-note__btn-save {
    flex-basis: 300px;
    height: 40px;
    font-size: 16px;
    background-color: #0041a0;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    @media(any-hover:hover) {
        &:not([disabled]):hover {
            background-color: #002f6c;
        }
    }
}



.current-note__btn-back {
    display: none;
    min-width: 40px;
    min-height: 40px;
    border: 1px solid #0041a0;
    border-radius: 50%;
    cursor: pointer;

    & svg {
        width: 25px;
        height: 25px;
    }

    & svg path {
        fill: #0041a0;
    }
}




@media(max-width: 900px) {
    .current-note__btn-back {
        display: flex;
        align-items: center;
        justify-content: center;

    }

    .toolbar {
        justify-content: space-between;
        flex-wrap: wrap;

        &__font {
            width: 100%;
            justify-content: flex-end;
        }
    }


}

@media(max-width: 430px) {
    .current-note__btn-save {
        flex-basis: 260px;
    }
}
</style>