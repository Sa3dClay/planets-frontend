<template>
  <v-card v-if="deniedUsers.length" class="my-4">
    <v-card-title>الأصدقاء الذين رفضت طلبهم</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="(user, index) in deniedUsers" :key="user.id">
          <v-list-item-content>
            {{ user.name }}
          </v-list-item-content>
          <v-list-item-action>
            <v-btn
              dark
              color="green darken-1"
              @click.prevent="acceptUser(user.id, index)"
              >قبول</v-btn
            >
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    deniedUsers: [],
  }),
  mounted() {
    this.getDeniedUsers();
  },
  methods: {
    async getDeniedUsers() {
      const res = await this.$axios.$get("/users/friends/denied");

      this.deniedUsers = res.data;
    },
    async acceptUser(userId, index) {
      try {
        await this.$axios.$post("/users/friends/requests/accept/" + userId);

        this.deniedUsers.splice(index, 1);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
