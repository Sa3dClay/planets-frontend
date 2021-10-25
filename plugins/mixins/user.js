import Vue from 'vue'
import {mapGetters} from 'vuex'

const User = {
    install(Vue) {
        Vue.mixin({
            computed: {
                ...mapGetters({
                    user: 'user',
                    authenticated: 'authenticated',
                })
            }
        })
    }
}

Vue.use(User)
