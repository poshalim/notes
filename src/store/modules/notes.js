const state = {
    notes: [
        {
            id: 1,
            title: 'Это заголовок первой тестовой заметки!',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat aliquid ut repudiandae qui praesentium doloremque. Quam consequuntur voluptates dolor voluptate tempore voluptatibus commodi, sapiente repudiandae sunt similique tempora earum aspernatur omnis eius corporis aut hic, ea, cumque et distinctio modi dolore ipsum quis? Fugiat similique nemo voluptatum laborum? Consectetur possimus hic veritatis repudiandae quia nemo? Perspiciatis est ipsum deleniti id tempora, ab veniam enim provident accusamus hic asperiores aspernatur magni assumenda at dignissimos iste tempore molestias repellendus corrupti culpa soluta dolore exercitationem maiores. Qui dolorem laudantium commodi incidunt nihil dolores quidem? Modi omnis delectus eum asperiores, quae veniam dolorem iusto! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus, beatae accusamus? Sit, harum dignissimos reprehenderit molestias ab ipsum enim hic.',
            images: [],
        },
    ],
    currentNote: null,
}

const mutations = {
    getNotes(state, payload) {
        state.notes = payload
    },

    updateCurrentNote(state, payload) {
        state.currentNote = payload
    },

    createNote(state) {
        state.notes.push(state.currentNote)
    },

    updateNote(state, { title, text }) {
        state.currentNote.title = title
        state.currentNote.text = text
    },

    deleteNote(state, payload) {
        state.notes = state.notes.filter(note => note.id !== payload)
    },
    addImgToNote(state, payload) {
        state.currentNote.images.push(payload)
    },
    deleteImg(state, payload) {
        state.currentNote.images = state.currentNote.images.filter(img => img !== payload)
    },
}

const actions = {
    getNotes(context, notes) {
        context.commit('getNotes', notes)
    },

    updateCurrentNote(context, currentNote) {
        context.commit('updateCurrentNote', currentNote)
    },

    createNote(context, note) {
        context.commit('updateCurrentNote', note)
        context.commit('createNote')
    },

    updateNote(context, data) {
        context.commit('updateNote', data)
    },

    deleteNote(context, id) {
        context.commit('deleteNote', id)
    },
    addImgToNote(context, img) {
        context.commit('addImgToNote', img)
    },
    deleteImg(context, img) {
        context.commit('deleteImg', img)
    },
}

export default {
    state, mutations, actions
}