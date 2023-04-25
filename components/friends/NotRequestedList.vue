<template>
  <v-card v-if="notRequestedUsers.length" class="my-4">
    <v-card-title>إضافة أصدقاء</v-card-title>

    <!-- list of users those not requested -->
    <v-card-text>
      <v-list>
        <v-list-item v-for="(user, index) in notRequestedUsers" :key="user.id">
          <v-list-item-content>
            {{ user.name }}
          </v-list-item-content>

          <v-list-item-action>
            <v-btn color="primary" @click.prevent="requestFriendship(user.id, index)">إضافة صديق</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      notRequestedUsers: []
    }
  },
  mounted () {
    this.getNotRequestedUsers()
  },
  methods: {
    async getNotRequestedUsers () {
      const res = await this.$axios.$get('/users/not-requested-users')

      this.notRequestedUsers = res.data
    },
    async requestFriendship (userId, index) {
      try {
        await this.$axios.$post('/users/send-friend-request/' + userId)

        this.notRequestedUsers.splice(index, 1)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
