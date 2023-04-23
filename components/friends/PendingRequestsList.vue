<template>
  <v-card v-if="pendingRequestedUsers.length" class="my-4">
    <v-card-title>طلبات الصداقة المسبقة</v-card-title>

    <!-- list of users those requested and pending -->
    <v-card-text>
      <v-list>
        <v-list-item v-for="(user, index) in pendingRequestedUsers" :key="user.id">
          <v-list-item-content>
            {{ user.name }}
          </v-list-item-content>

          <v-list-item-action>
            <v-btn color="red darken-1 white--text" @click.prevent="cancelFriendship(user.id, index)">إلغاء</v-btn>
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
      pendingRequestedUsers: []
    }
  },
  mounted () {
    this.getPendingRequestedUsers()
  },
  methods: {
    async getPendingRequestedUsers () {
      const res = await this.$axios.$get('/users/pending-friend-request')

      this.pendingRequestedUsers = res.data
    },
    async cancelFriendship (userId, index) {
      try {
        await this.$axios.$post('/users/remove-friend/' + userId)

        this.pendingRequestedUsers.splice(index, 1)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
