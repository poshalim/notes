<template>
  <div class="notes">
    <my-notes-list />
    <my-current-note />
  </div>
</template>

<script>
import MyNotesList from '@/components/NotesList'
import MyCurrentNote from '@/components/CurrentNote'
import { computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'MyApp',
  components: {
    MyNotesList,
    MyCurrentNote,
  },
  setup() {
    const store = useStore()

    const notes = computed(() => store.state.notes.notes)
    const font = computed(() => store.state.font.font)

    // Получение notes и font из localStorage пользователя, если они там есть
    onMounted(() => {
      const notesFromStorage = JSON.parse(localStorage.getItem('notes'))

      if (notesFromStorage?.length) {
        store.dispatch('getNotes', notesFromStorage)
      }

      const fontFromStorage = JSON.parse(localStorage.getItem('font'))

      if (fontFromStorage) {
        store.dispatch('getFont', fontFromStorage)
      }
    })

    // отслеживание изменений notes и font
    watch(notes, (newValue) => {
      localStorage.setItem('notes', JSON.stringify(newValue))
    },
      { deep: true }
    )

    watch(font, (newValue) => {
      localStorage.setItem('font', JSON.stringify(newValue))

    },
      { deep: true }
      )

    // отслеживание изменений localStorage, если открыто несколько вкладок
    window.addEventListener('storage', e => {
      store.dispatch('getNotes', JSON.parse(e.newValue))
      store.dispatch('getFont', JSON.parse(e.newValue))
    })
  }
}
</script>


<style>
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

ul,
ol {
  list-style: none;
}

button {
  border: none;
  background-color: transparent;
  font-family: 'Montserrat';
  font-size: 14px;
  cursor: pointer;
}


input,
textarea {
  border: 1px solid #0041a0;
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 400;
}

body {
  font-family: 'Montserrat';
  font-weight: 400;
  font-size: 16px;
  color: #1F2324;
}

select {
  outline: none;
  border: none;
}

.notes {
  display: flex;
  height: 100vh;
  position: relative;
  overflow-x: hidden;
  word-break: break-word;
  max-width: 2560px;
  margin: 0 auto;
}

.disabled {
  opacity: .75;
}
</style>
