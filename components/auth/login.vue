<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-form @submit.prevent="submitLogin()">
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>تسجيل الدخول</v-toolbar-title>

              <v-spacer></v-spacer>

              <!-- <v-btn icon @click="loginDialog = false"> -->
              <v-btn icon @click="toggle()">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

            <v-card-text>
              <v-text-field
                v-model.trim="loginForm.email"
                prepend-icon="mdi-email"
                name="email"
                label="عنوان البريد"
                type="email"
                required
              ></v-text-field>

              <v-text-field
                v-model.trim="loginForm.password"
                id="password"
                prepend-icon="mdi-lock"
                name="password"
                label="الرقم السري"
                type="password"
                required
              ></v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="primary" type="submit">تسجيل</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    loginForm: {
      email: "",
      password: "",
    },
  }),

  methods: {
    toggle() {
      this.$emit("toggleLogin", false);
    },
    async submitLogin() {
      try {
        await this.$auth.loginWith("local", {
          data: this.loginForm,
        });

        this.toggle()
        this.$router.push('/profile')
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
