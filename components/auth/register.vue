<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>تسجيل حساب جديد</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon @click="toggle()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-form>
            <v-card-text>
              <v-text-field
                prepend-icon="mdi-account"
                label="اسم المستخدم"
                type="text"
              ></v-text-field>

              <v-text-field
                prepend-icon="mdi-email"
                label="عنوان البريد"
                type="email"
              ></v-text-field>

              <v-text-field
                id="password"
                prepend-icon="mdi-lock"
                label="الرقم السري"
                type="password"
              ></v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="primary">تسجيل</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
  }),
  methods: {
    toggle() {
      this.$emit('toggleRegister', false)
    },
  }
};
</script>
