<template>
  <v-card v-if="availableUsers.length" class="my-4">
    <v-card-title>إضافة أصدقاء</v-card-title>
    <v-card-text>
      <v-text-field
        label="Search"
        v-model="search"
        append-icon="mdi-magnify"
        placeholder="ابحث عن الأصدقاء"
        autofocus
        single-line
        hide-details
      />
      <v-list>
        <v-list-item v-for="user in filteredUsers" :key="user.id">
          <v-list-item-content>
            {{ user.name }}
          </v-list-item-content>
          <v-list-item-action>
            <v-btn
              color="primary"
              @click.prevent="requestFriendship(user.id, user.name)"
              >إضافة صديق</v-btn
            >
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      availableUsers: [],
      search: "",
    };
  },
  mounted() {
    this.getAvailableUsers();
  },
  computed: {
    filteredUsers() {
      if (!this.search) return [];
      return this.availableUsers.filter((user) =>
        user.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  methods: {
    async getAvailableUsers() {
      const res = await this.$axios.$get("/users/friends/available");
      this.availableUsers = res.data;
    },
    async requestFriendship(userId, userName) {
      try {
        await this.$axios.$post("/users/friends/requests/send/" + userId);
        this.availableUsers = this.availableUsers.filter(
          (user) => user.id !== userId
        );
        this.$swal({
          icon: "success",
          title: "تم ارسال طلبك بنجاح الى " + userName,
          showConfirmButton: false,
          timer: 2000,
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
