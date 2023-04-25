<template>
  <v-card v-if="friends.length" class="my-4">
    <v-card-title>الأصدقاء</v-card-title>

    <v-card-text>
      <v-list>
        <v-list-item v-for="user in friends" :key="user.id">
          <v-list-item-content>
            {{ user.name }}
          </v-list-item-content>

          <v-list-item-action>
            <v-btn color="blue darken-1 white--text" :to="'/chat/' + user.id">محادثة</v-btn>
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
      friends: []
    }
  },
  mounted () {
    this.getFriends()
  },
  methods: {
    async getFriends () {
      const res = await this.$axios.$get('/users/friends')

      this.friends = res.data
    }
  }
}
</script>
