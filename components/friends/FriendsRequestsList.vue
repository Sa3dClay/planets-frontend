<template>
  <v-card v-if="usersRequestedFriendship.length" class="my-4">
    <v-card-title>طلبات الصداقة الواردة</v-card-title>

    <v-card-text>
      <v-list>
        <v-list-item v-for="(user, index) in usersRequestedFriendship" :key="user.id">
          <v-list-item-content>
            {{ user.name }}
          </v-list-item-content>

          <v-list-item-action>
            <v-btn color="green darken-1 white--text" @click.prevent="acceptFriendship(user.id, index)">قبول</v-btn>
          </v-list-item-action>

          <v-list-item-action>
            <v-btn color="red darken-1 white--text" @click.prevent="denyFriendship(user.id, index)">رفض</v-btn>
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
      usersRequestedFriendship: []
    }
  },
  mounted () {
    this.getUsersRequestedFriendship()
  },
  methods: {
    async getUsersRequestedFriendship () {
      const res = await this.$axios.$get('/users/friend-requests')

      this.usersRequestedFriendship = res.data
    },
    async acceptFriendship (userId, index) {
      try {
        await this.$axios.$post('/users/accept-friend-request/' + userId)

        this.usersRequestedFriendship.splice(index, 1)
      } catch (error) {
        console.error(error)
      }
    },
    async denyFriendship (userId, index) {
      try {
        await this.$axios.$post('/users/deny-friend-request/' + userId)

        this.usersRequestedFriendship.splice(index, 1)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
