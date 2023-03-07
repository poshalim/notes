<template>
    <transition name="fade">
        <div class="notes__current-note current-note" v-if="currentNote">
            <div class="current-note__container">

                <my-toolbar :title="title" :text="text" />

                <div class="current-note-title__container">
                    <input class="current-note__title" type="text" placeholder="Введите заголовок" maxlength="60"
                        v-model.trim="title">
                    <span class="error" v-if="!title">Пожалуйста, укажите заголовок!</span>
                </div>

                <div class="current-note__text-container">
                    <textarea :class="['current-note__text', { bold: fontIsBold, italic: fontIsItalic }]"
                        :style="{ fontFamily: currentFontFamily, fontSize: currentFontSize + 'px' }"
                        placeholder="Введите текст" v-model.trim="text"></textarea>
                    <span class="error" v-if="!text">Пожалуйста, введите текст!</span>

                    <my-upload-img />

                </div>
                <my-note-images />
            </div>
        </div>
    </transition>
</template>

<script>

import MyToolbar from '@/components/Toolbar'
import MyUploadImg from '@/components/UploadImg'
import MyNoteImages from '@/components/NoteImages'
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'


export default {
    name: 'MyCurrentNote',
    components: {
        MyToolbar,
        MyNoteImages,
        MyUploadImg
    },
    setup() {
        const store = useStore()

        const currentNote = computed(() => store.state.notes.currentNote)

        const title = ref(null)
        const text = ref(null)

        const fontIsBold = computed(() => store.state.font.font.fontIsBold)
        const fontIsItalic = computed(() => store.state.font.font.fontIsItalic)
        const currentFontFamily = computed(() => store.state.font.font.fontFamily)
        const currentFontSize = computed(() => store.state.font.font.fontSize)

        // подставляем актуальные данные при открытии заметки
        watch(currentNote, (newValue) => {
            if (newValue) {
                title.value = newValue.title
                text.value = newValue.text
            }
        })


        return {
            currentNote,
            title,
            text,
            fontIsBold,
            fontIsItalic,
            currentFontFamily,
            currentFontSize,
        }
    }
}
</script>

<style lang="scss">
.current-note {
    width: 70%;
    margin-bottom: 20px;

    &__container {
        position: relative;
        padding: 20px 30px;
    }

    &-title__container {
        position: relative;
        margin-top: 20px;
        margin-bottom: 30px;
    }

    &__title {
        width: 100%;
        font-size: 24px;
        font-weight: 600;
        padding: 10px;
        cursor: text;
    }

    &__text-container {
        position: relative;
        margin-bottom: 20px;
    }

    &__text {
        height: calc(80vh - 180px);
        width: 100%;
        resize: none;
        padding: 10px;
        cursor: text;
    }
}

.error {
    position: absolute;
    bottom: -22px;
    right: 0;
    color: red;
}


@media(max-width: 900px) {

    .current-note {
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;

        &__container {
            padding: 10px 30px;
        }
    }
}

@media(max-width: 680px) {
    .current-note__title {
        font-size: 18px;
    }
}

@media(max-width: 450px) {
    .current-note__title {
        font-size: 16px;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.bold {
    font-weight: bold;
}

.italic {
    font-style: italic;
}
</style>