<template>
  <v-card class="my-4">
    <div v-if="friends.length">
      <v-card-title>الأصدقاء</v-card-title>

      <v-card-text>
        <v-list>
          <v-list-item v-for="user in friends" :key="user.id">
            <v-list-item-content>
              {{ user.name }}
            </v-list-item-content>

            <v-list-item-action>
              <v-badge
                :content="user.unread_counter"
                :value="user.unread_counter"
                color="error"
                overlap
              >
                <v-btn
                  color="blue darken-1 white--text"
                  :to="'/chat/' + user.id"
                >
                  محادثة
                </v-btn>
              </v-badge>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
    </div>

    <div v-else>
      <v-card-title>لا يوجد لديك اصدقاء بعد</v-card-title>

      <v-card-text>
        <p>يمكنك إضافة صديق من هنا</p>

        <v-btn color="indigo white--text" to="/friends">إضافة أصدقاء</v-btn>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    friends: [],
  }),
  mounted() {
    this.getFriends();
  },
  methods: {
    async getFriends() {
      try {
        const res = await this.$axios.$get("/users/friends");
        this.friends = res.data;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
