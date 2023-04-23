<template>
  <v-container>
    <h1 class="font-weight-light my-4">محادثة {{ friend.name }}</h1>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      friend: {}
    }
  },
  mounted () {
    this.getFriendData()
  },
  methods: {
    async getFriendData () {
      const res = await this.$axios.$get('/users/' + this.$route.params.id)
      this.friend = res.user
    }
  }
}
</script>
