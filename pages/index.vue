<template>
  <div class="home">
    <h1 class="pa-8 font-weight-light">مرحباً بكوكب البطيخ</h1>

    <!-- guest -->
    <div v-if="!authenticated">
      <!-- str login dialog -->
      <v-dialog v-model="loginDialog" max-width="600">
        <template v-slot:activator="{ on }">
          <v-btn class="mx-2" color="indigo" dark v-on="on"> تسجيل الدخول </v-btn>
        </template>

        <Login @toggleLogin="loginDialog = $event" />
      </v-dialog>
      <!-- end login dialog -->

      <!-- str register dialog -->
      <v-dialog v-model="registerDialog" max-width="600">
        <template v-slot:activator="{ on }">
          <v-btn class="mx-2" color="green" dark v-on="on"> تسجيل حساب جديد </v-btn>
        </template>

        <Register @toggleRegister="registerDialog = $event" />
      </v-dialog>
      <!-- end register dialog -->
    </div>

    <!-- user -->
    <div v-else>
      <h1 class="pa-8 font-weight-light">أهلاً بك {{ user.name }}</h1>
      
      <v-btn color="red darken-2" dark @click.prevent="logout()">هل تود تسجيل الخروج؟</v-btn>
    </div>
  </div>
</template>

<script>
import Login from "~/components/auth/login.vue";
import Register from "~/components/auth/register.vue";

export default {
  data() {
    return {
      loginDialog: false,
      registerDialog: false,
    }
  },

  components: {
    Login,
    Register,
  },

  methods: {
    // isLoggedIn() {
    //   return this.$auth.$storage.getState('loggedIn')
    // },
    // getUser() {
    //   return this.$auth.$storage.getState('user')
    // },
    logout() {
      try {
        this.$auth.logout()
      } catch(e) {
        console.log(e)
      }
    }
  }
};
</script>