<template>
  <v-container>
    <friends-list />
  </v-container>
</template>

<script>
import fcmMixin from "~/plugins/mixins/fcm";
import FriendsList from "~/components/friends/FriendsList.vue";

export default {
  middleware: "auth",
  mixins: [fcmMixin],
  components: {
    FriendsList,
  },
  mounted() {
    this.setFcmToken();
  },
};
</script>
