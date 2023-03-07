const state = {
    font: 
        {
            fontSize: 16,
            fontFamily: 'Montserrat',
            fontIsBold: false,
            fontIsItalic: false,
        },

    fontSizes: [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 30, 36, 48, 60, 72],
    fontFamily: ['Helvetica', 'Verdana', 'Georgia', 'Montserrat']
}

const mutations = {
    getFont(state, payload) {
        state.font = payload
    },
    updateFontIsBold(state) {
        state.font.fontIsBold = !state.font.fontIsBold
    },
    updateFontStyle(state) {
        state.font.fontIsItalic = !state.font.fontIsItalic
    },
    updateFontFamily(state, payload) {
        state.font.fontFamily = payload
    },
    updateFontSize(state, payload) {
        state.font.fontSize = payload
    },
}

const actions = {
    getFont(context, font) {
        context.commit('getFont', font)
    },
    updateFontIsBold(context) {
        context.commit('updateFontIsBold')
    },
    updateFontStyle(context) {
        context.commit('updateFontStyle')
    },
    updateFontFamily(context, value) {
        context.commit('updateFontFamily', value)
    },
    updateFontSize(context, value) {
        context.commit('updateFontSize', value)
    },


}

export default {
    state, mutations, actions
}