<template>
    <div>
        <input type="file" name="" id="upload-file" hidden="hidden" ref="uploadImg" @change="addImgToNote">
        <svg class="current-note__btn-add" width="32" height="32" viewBox="0 0 32 32" fill="none"
            xmlns="http://www.w3.org/2000/svg" @click="uploadImg.click()">
            <g clip-path="url(#clip0_106_3901)">
                <path
                    d="M15.9991 20.2667C18.3555 20.2667 20.2658 18.3565 20.2658 16.0001C20.2658 13.6436 18.3555 11.7334 15.9991 11.7334C13.6427 11.7334 11.7324 13.6436 11.7324 16.0001C11.7324 18.3565 13.6427 20.2667 15.9991 20.2667Z"
                    fill="#BBBDC1" />
                <path
                    d="M11.9993 2.66699L9.55935 5.33366H5.33268C3.86602 5.33366 2.66602 6.53366 2.66602 8.00033V24.0003C2.66602 25.467 3.86602 26.667 5.33268 26.667H26.666C28.1327 26.667 29.3327 25.467 29.3327 24.0003V8.00033C29.3327 6.53366 28.1327 5.33366 26.666 5.33366H22.4394L19.9993 2.66699H11.9993ZM15.9993 22.667C12.3193 22.667 9.33268 19.6803 9.33268 16.0003C9.33268 12.3203 12.3193 9.33366 15.9993 9.33366C19.6793 9.33366 22.666 12.3203 22.666 16.0003C22.666 19.6803 19.6793 22.667 15.9993 22.667Z"
                    fill="#BBBDC1" />
            </g>
            <defs>
                <clipPath id="clip0_106_3901">
                    <rect width="32" height="32" fill="white" />
                </clipPath>
            </defs>
        </svg>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'


export default {
    name: 'MyUploadImg',
    setup() {
        const store = useStore()

        const uploadImg = ref(null)

        // Добавление изображения в заметку
        const addImgToNote = () => {
            let file = uploadImg.value.files[0]
            if (file.type.split('/')[0] === 'image') {
                let reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = function () {
                    store.dispatch('addImgToNote', reader.result)
                }
            } else {
                alert('Вы можете прикрепить только изображение!')
            }

        }

        return {
            uploadImg,
            addImgToNote,
        }
    }
}
</script>

<style lang="scss">
.current-note__btn-add {
    position: absolute;
    bottom: 20px;
    right: 20px;
    cursor: pointer;
    transition: fill 0.4s ease;

    @media (any-hover:hover) {
        &:hover path {
            fill: #919191;
            transition: fill 0.4s ease;
        }
    }
}
</style>