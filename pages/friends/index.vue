<template>
  <v-container>
    <friends-requests-list />
    <available-friends-list />
    <pending-requests-list />
    <blocked-friends-list />
    <denied-friends-list />
  </v-container>
</template>

<script>
import fcmMixin from "~/plugins/mixins/fcm";

import FriendsRequestsList from "~/components/friends/FriendsRequestsList.vue";
import AvailableFriendsList from "~/components/friends/AvailableFriendsList.vue";
import PendingRequestsList from "~/components/friends/PendingRequestsList.vue";
import BlockedFriendsList from "~/components/friends/BlockedFriendsList.vue";
import DeniedFriendsList from "~/components/friends/DeniedFriendsList.vue";

export default {
  middleware: "auth",
  mixins: [fcmMixin],
  components: {
    FriendsRequestsList,
    AvailableFriendsList,
    PendingRequestsList,
    BlockedFriendsList,
    DeniedFriendsList,
  },
  mounted() {
    this.setFcmToken();
  },
};
</script>
