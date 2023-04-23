<template>
  <v-container>
    <friends-requests-list />
    <not-requested-list />
    <pending-requests-list />
  </v-container>
</template>

<script>
import FriendsRequestsList from '~/components/friends/FriendsRequestsList.vue'
import NotRequestedList from '~/components/friends/NotRequestedList.vue'
import PendingRequestsList from '~/components/friends/PendingRequestsList.vue'

export default {
  components: {
    FriendsRequestsList,
    NotRequestedList,
    PendingRequestsList
  }
}
</script>
