<template>
  <div class="user">
    <h1 class="py-8 text-center font-weight-light">مرحباً بك أيها المريخي</h1>

    <v-row justify="center">
      <v-col cols="10" sm="6">
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
            :value="user.role==0 ? 'مدير' : 'زائر'"
            disabled
          >
          </v-text-field>

          <v-btn type="submit" color="yellow" :disabled="!valid">تحديث البيانات</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  
  data: () => ({
    valid: false,
    form: {
      name: '',
      email: ''
    },
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 20 || 'Name must be less than 20 characters',
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
  }),

  mounted() {
    this.fillForm()
  },
  
  methods: {
    fillForm() {
      this.form.name = this.user.name
      this.form.email = this.user.email
    },
    async updateUser() {
      const id = this.user.id
    
      try {
        await this.$axios.post('/users/'+id, this.form)
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
      }
      catch(err) {
        console.log(err)
      }
    },
  }
}
</script>
