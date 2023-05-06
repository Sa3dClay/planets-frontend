<template>
  <v-card v-if="notRequestedUsers.length" class="my-4">
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
      notRequestedUsers: [],
      search: "",
    };
  },
  mounted() {
    this.getNotRequestedUsers();
  },
  computed: {
    filteredUsers() {
      if (!this.search) return [];

      return this.notRequestedUsers.filter((user) =>
        user.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  methods: {
    async getNotRequestedUsers() {
      const res = await this.$axios.$get("/users/not-requested-users");

      this.notRequestedUsers = res.data;
    },
    async requestFriendship(userId, userName) {
      try {
        await this.$axios.$post("/users/send-friend-request/" + userId);

        this.notRequestedUsers = this.notRequestedUsers.filter(
          (user) => user.id !== userId
        );

        this.$swal({
          icon: "success",
          title: " تم ارسال طلبك بنجاح الى" + userName,
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
