<template>
  <div>
    <h1 class="py-12 myFont">
      مرحباً بكم في
      <span class="myFont indigo--text">كوكب البطيخ</span>
    </h1>

    <div v-if="!authenticated">
      <v-dialog v-model="loginDialog" max-width="600">
        <template v-slot:activator="{ on }">
          <v-btn class="mx-2" color="indigo" dark v-on="on">
            تسجيل الدخول
          </v-btn>
        </template>

        <Login @toggleLogin="loginDialog = $event" />
      </v-dialog>

      <v-dialog v-model="registerDialog" max-width="600">
        <template v-slot:activator="{ on }">
          <v-btn class="mx-2" color="green" dark v-on="on">
            تسجيل حساب جديد
          </v-btn>
        </template>

        <Register @toggleRegister="registerDialog = $event" />
      </v-dialog>
    </div>

    <div v-else>
      <h1 class="py-8 myFont">أهلًا بك {{ user.name }}</h1>
    </div>
  </div>
</template>

<script>
import Login from "~/components/auth/login.vue";
import Register from "~/components/auth/register.vue";
export default {
  data: () => ({
    loginDialog: false,
    registerDialog: false,
  }),
  components: {
    Login,
    Register,
  },
};
</script>
