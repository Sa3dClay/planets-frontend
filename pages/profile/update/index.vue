<template>
  <v-row justify="center">
    <v-col cols="10" sm="6">
      <v-card class="my-4" elevation="2">
        <v-card-title>
          عدل بياناتك من هنا
        </v-card-title>

        <v-card-text>
          <v-form v-model="valid" @submit.prevent="updateUser">
            <v-text-field
              type="text"
              label="الاسم"
              :value="form.name"
              v-model="form.name"
              :rules="nameRules"
            >
            </v-text-field>

            <v-text-field
              type="email"
              label="البريد الالكتروني"
              :value="form.email"
              v-model="form.email"
              :rules="emailRules"
              dir="ltr"
            >
            </v-text-field>

            <v-text-field
              type="text"
              label="الوظيفة"
              :value="user.role == 0 ? 'مدير' : 'زائر'"
              disabled
            >
            </v-text-field>

            <v-radio-group
              v-model="form.planet"
              :rules="planetRules"
              row
            >
              <v-radio
                label="زحل"
                value="saturn"
              ></v-radio>
              <img src="~/assets/img/saturn.png" width="auto" height="50" class="ml-2" />

              <v-radio
                label="المريخ"
                value="mars"
              ></v-radio>
              <img src="~/assets/img/jupiter.png" width="auto" height="50" class="ml-2" />
            </v-radio-group>

            <v-btn type="submit" color="yellow" :disabled="!valid"
              >تحديث البيانات</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: "auth",
  
  data: () => ({
    valid: false,
    form: {
      name: '',
      email: '',
      planet: '',
    },
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 20 || 'Name must be less than 20 characters',
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    planetRules: [
      v => !!v || 'رجاء اختيار الكوكب',
    ]
  }),

  mounted() {
    this.fillForm()
  },
  
  methods: {
    fillForm() {
      this.form.name = this.user.name
      this.form.email = this.user.email
      this.form.planet = this.user.planet
    },
    async updateUser() {
      // check if no change
      if(
        this.form.name == this.user.name &&
        this.form.email == this.user.email &&
        this.form.planet == this.user.planet
      ) {
        this.$swal({
          icon: 'warning',
          title: 'لم يتم تغيير أي بيانات',
          showConfirmButton: false,
          timer: 1500
        })

        return true
      }

      const id = this.user.id
    
      try {
        await this.$axios.post('/users/'+id, this.form)
          .then((res) => {
            // console.log(res.data)

            try {
              // method 1 nuxt auth
              this.$auth.setUser(res.data.data)
  
              // method 2 vuex mutations
              // this.$store.commit('updateUserName', res.data.data.name)
              // this.$store.commit('updateUserEmail', res.data.data.email)
              // this.$store.commit('updateUserPlanet', res.data.data.planet)
            }
            catch (e) {
              console.log(e)
            }
          })
          .catch((e) => {
            console.log(e)
          })

        this.$swal({
          icon: 'success',
          title: 'لقد تم تحديث بياناتك بنجاح',
          showConfirmButton: false,
          timer: 1500
        })

        this.$router.push('/profile')
      }
      catch(e) {
        console.log(e)

        this.$swal({
          icon: 'error',
          title: 'عذراً، حدث خطأ أثناء تحديث البيانات',
          text: e,
          showConfirmButton: true,
          confirmButtonText: 'حسناً',
          confirmButtonColor: '#3498db'
        })

        this.fillForm()
      }
    },
  }
}
</script>
