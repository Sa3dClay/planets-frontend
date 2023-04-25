<template>
  <div class="admin">
    <h1 class="py-8 text-center font-weight-light">مرحباً بك أيها المشرف</h1>

    <v-container>
      <v-simple-table class="text-center">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">رقم الهوية</th>
              <th class="text-center">الاسم</th>
              <th class="text-center">البريد الالكتروني</th>
              <th class="text-center">الوظيفة</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td v-if="user.role == 0">مدير</td>
              <td v-if="user.role == 1">زائر</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </div>
</template>

<script>
export default {
  middleware: ['auth', 'isAdmin'],
  data () {
    return {
      users: null
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    async getUsers () {
      const res = await this.$axios.$get('/users')
      this.users = res.users
    }
  }
}
</script>
