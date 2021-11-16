<template>
  <v-app>
    <v-navigation-drawer
      app
      expand-on-hover
      permanent
      right
      v-if="authenticated"
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img :src="require('~/assets/img/'+user.planet+'.png')"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>{{ user.name }}</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="(link, index) in links"
          link
          :key="index"
          :to="link.route"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app v-if="authenticated">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-app-bar-title>الكواكب</v-app-bar-title>

      <v-spacer></v-spacer>

      <div>
        <v-btn color="red darken-2" dark @click.prevent="logout()">تسجيل الخروج</v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <div class="pg">
        <div class="overlay"></div>

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
    links: [
      { title: 'الرئيسية', icon: 'mdi-home', route: '/' },
      { title: 'الصفحة الشخصية', icon: 'mdi-account', route: '/profile' },
      { title: 'تحدث مع الأصدقاء', icon: 'mdi-message-outline', route: '/chat' }
    ]
  }),  
  methods: {
    logout() {
      try {
        this.$auth.logout()
      } catch(e) {
        console.log(e)
      }
    }
  }
}
</script>
