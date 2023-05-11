<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md10>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>تسجيل حساب جديد</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon @click="toggle()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-form v-model="valid" @submit.prevent="submitRegister">
            <v-card-text>
              <v-text-field
                prepend-icon="mdi-account"
                label="اسم المستخدم"
                type="text"
                v-model="registerForm.name"
                :rules="nameRules"
              ></v-text-field>

              <v-text-field
                prepend-icon="mdi-email"
                label="عنوان البريد"
                type="email"
                v-model="registerForm.email"
                :rules="emailRules"
                dir="ltr"
              ></v-text-field>

              <v-text-field
                prepend-icon="mdi-lock"
                label="الرقم السري"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                v-model="registerForm.password"
                :rules="passwordRules"
              ></v-text-field>

              <v-text-field
                prepend-icon="mdi-check"
                label="تأكيد الرقم السري"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                v-model="registerForm.confirmPassword"
                :rules="[
                  registerForm.confirmPassword === registerForm.password ||
                    'الرقم السري غير متطابق',
                ]"
              ></v-text-field>

              <v-radio-group
                v-model="registerForm.planet"
                :rules="planetRules"
                row
              >
                <v-radio label="زحل" value="saturn" />
                <img
                  src="~/assets/img/saturn.png"
                  width="auto"
                  height="50"
                  class="ml-2"
                />

                <v-radio label="المريخ" value="jupiter" />
                <img
                  src="~/assets/img/jupiter.png"
                  width="auto"
                  height="50"
                  class="ml-2"
                />
              </v-radio-group>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                type="submit"
                color="primary"
                :disabled="!valid || isLoading"
                >تسجيل</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import fcmMixin from "~/plugins/mixins/fcm";

export default {
  mixins: [fcmMixin],
  data: () => ({
    drawer: null,
    valid: false,
    isLoading: false,
    showPassword: false,
    registerForm: {
      name: "",
      email: "",
      planet: "",
      password: "",
      confirmPassword: "",
    },
    nameRules: [
      (v) => !!v || "رجاء ادخال اسم المستخدم",
      (v) => v.length <= 20 || "يجب الا يزيد الاسم عن عشرين حرف",
    ],
    emailRules: [
      (v) => !!v || "رجاء ادخال البريد الالكتروني",
      (v) => /.+@.+/.test(v) || "يجب أن يكون البريد الالكتروني صحيحاً",
    ],
    passwordRules: [
      (v) => !!v || "رجاء ادخال الرقم السري",
      (v) => v.length >= 8 || "الرقم السري يجب ان لا يقل عن ثمانية أحرف",
    ],
    planetRules: [(v) => !!v || "رجاء اختيار الكوكب"],
  }),
  methods: {
    toggle() {
      this.$emit("toggleRegister", false);
    },
    async submitRegister() {
      this.isLoading = true;

      try {
        await this.$axios.post("auth/register", this.registerForm);

        await this.$auth.loginWith("local", {
          data: {
            email: this.registerForm.email,
            password: this.registerForm.password,
          },
        });

        this.setFcmToken();

        this.$swal({
          icon: "success",
          title: "لقد تم تسجيلك بنجاح",
          showConfirmButton: false,
          timer: 1500,
        });

        this.toggle();

        this.$router.push("/profile");
      } catch (e) {
        console.log(e);

        this.isLoading = false;

        this.$swal({
          icon: "error",
          title: "عذراً، حدث خطأ أثناء التسجيل",
          showConfirmButton: true,
          confirmButtonText: "حسناً",
          confirmButtonColor: "#3498db",
        });
      }
    },
  },
};
</script>
