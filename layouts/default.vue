<template>
  <v-app>
    <v-navigation-drawer
      v-if="authenticated"
      v-model="drawer"
      right
      app
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img :src="require('~/assets/img/'+user.planet+'.png')" />
        </v-list-item-avatar>

        <v-list-item-title>{{ user.name }}</v-list-item-title>
      </v-list-item>

      <v-divider />

      <v-list dense>
        <v-list-item
          v-for="(link, index) in links"
          :key="index"
          :to="link.route"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <hr />

        <v-list-item link @click.prevent="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>تسجيل الخروج</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar v-if="authenticated" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-app-bar-title>الكواكب</v-app-bar-title>
      <v-spacer />

      <div>
        <v-btn icon to="/chat">
          <v-icon>mdi-message-outline</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <div class="pg">
        <div class="overlay" />
        <div class="pg-content">
          <nuxt />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    links: [
      { title: 'الرئيسية', icon: 'mdi-home', route: '/' },
      { title: 'الصفحة الشخصية', icon: 'mdi-account', route: '/profile' },
      { title: 'إضافة أصدقاء', icon: 'mdi-account-multiple-plus', route: '/friends' },
      { title: 'تحدث مع الأصدقاء', icon: 'mdi-message-outline', route: '/chat' }
    ]
  }),
  methods: {
    logout () {
      try {
        this.$auth.logout()
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
