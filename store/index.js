export const getters = {
    authenticated(state) {
        return state.auth.loggedIn
    },

    user(state) {
        return state.auth.user
    }
}

export const mutations = {
    // updateUserName (state, updatedUserName) {
    //     state.auth.user.name = updatedUserName
    // },
    // updateUserEmail (state, updatedUserEmail) {
    //     state.auth.user.email = updatedUserEmail
    // },
    // updateUserPlanet (state, updatedUserPlanet) {
    //     state.auth.user.planet = updatedUserPlanet
    // }
}
