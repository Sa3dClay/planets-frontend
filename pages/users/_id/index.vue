<template>
  <div>
    <div class="py-5" v-if="Object.keys(friend).length">
      <h2 class="myFont py-2">بيانات الصديق</h2>
      <!-- TODO: show friend details and unfriend and block buttons -->
    </div>
    <div v-else>
      <NoData />
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/plugins/event-bus.js";
import NoData from "@/components/UI/NoData.vue";

export default {
  middleware: "auth",
  components: { NoData },
  data() {
    return {
      friend: {},
    };
  },
  methods: {
    async getFriendData() {
      try {
        const res = await this.$axios.$get("/users/" + this.$route.params.id);

        this.friend = res.user;
      } catch (e) {
        eventBus.$emit("show-snackbar", {
          message: "عذراً ليس لديك اذن بعرض هذا الزائر",
          type: "error",
        });
      }
    },
  },
  created() {
    this.getFriendData();
  },
};
</script>
