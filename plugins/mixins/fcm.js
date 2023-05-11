import { eventBus } from "../event-bus";

const fcmMixin = {
  methods: {
    async setFcmToken() {
      try {
        const deviceToken = await this.$fire.messaging.getToken();

        await this.$axios.post("/users/set-fcm-token", {
          token: deviceToken,
        });
      } catch (e) {
        console.log(e);

        eventBus.$emit("show-snackbar", {
          message:
            "لقد تم حظر الإشعارات، يجب عليك السماح بها حتى تستمع بهذه الميزة 😢",
          type: "error",
        });
      }
    },
  },
};

export default fcmMixin;
