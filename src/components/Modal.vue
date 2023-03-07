<template>
    <div class="modal">
        <div class="modal__bg" @click="toggleVisibleModal">
            <div class="modal__content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'MyModal',
    emits: ['toggle-visible-modal'],
    setup(_, context) {

        // закрытие модального окна
        const toggleVisibleModal = () => {
            context.emit('toggle-visible-modal')
        }

        return {
            toggleVisibleModal
        }
    }
}

</script>

<style lang="scss">
.modal {
    height: 100vh;
    width: 100vw;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 7;

    &__bg {
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__content {
        background-color: #fff;
        padding: 10px;
        height: 80%;
        min-height: 20%;
        min-width: 20%;
        max-width: 80%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }
}
</style>