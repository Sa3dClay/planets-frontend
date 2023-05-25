<template>
  <v-container>
    <v-card class="mx-auto my-5" max-width="500" elevation="4">
      <!-- str toolbar -->
      <v-toolbar color="deep-purple accent-4" dark>
        <v-app-bar-nav-icon />
        <v-toolbar-title>تحدث مع {{ friend.name }}</v-toolbar-title>
        <v-spacer />
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>
      <!-- end toolbar -->

      <!-- str chat -->
      <div v-if="messages.length" v-chat-scroll class="chat pa-8">
        <v-row
          v-for="message in messages"
          :key="message.id"
          :dir="message.sender_id === user.id ? 'rtl' : 'ltr'"
        >
          <v-col cols="9" class="pa-1 ma-0">
            <p
              class="py-1 px-4 ma-0 textMessage d-inline-block"
              :class="
                message.sender_id === user.id
                  ? 'float-right selfMessage'
                  : 'float-left otherMessage'
              "
            >
              {{ message.message }}
            </p>
          </v-col>
        </v-row>
      </div>
      <!-- end chat -->

      <!-- str new message form -->
      <v-form class="pa-4">
        <v-text-field
          v-model="newMessage"
          label="اكتب رسالتك هنا..."
          @focus="handleInputMessageFocus"
        />
        <v-btn
          type="submit"
          :disabled="!newMessage || isLoading"
          @click.prevent="sendNewMessage"
        >
          إرسال
        </v-btn>
      </v-form>
      <!-- end new message form -->
    </v-card>
  </v-container>
</template>

<script>
import fcmMixin from "~/plugins/mixins/fcm";

export default {
  middleware: "auth",
  mixins: [fcmMixin],
  data() {
    return {
      editDialog: false,
      newMessage: "",
      messages: [],
      friend: {},
      isLoading: false,
    };
  },
  mounted() {
    this.getFriendData();
    this.getMessages();
    this.markPrevMessagesAsRead();
    this.setFcmToken();
  },
  methods: {
    async getFriendData() {
      const res = await this.$axios.$get("/users/" + this.$route.params.id);
      this.listenForChatChannel(res.user.id);
      this.friend = res.user;
    },
    async getMessages() {
      const res = await this.$axios.$get(
        "/chat/messages/" + this.$route.params.id
      );
      this.messages = res.messages;
    },
    listenForChatChannel(friendId) {
      this.$echo
        .channel("chat." + friendId + "-" + this.user.id)
        .on("new-chat-message", (event) => {
          this.messages.push(event.message);
        });
    },
    sendNewMessage() {
      this.isLoading = true;

      this.$axios
        .post("/chat/messages/send", {
          message: this.newMessage,
          recipient_id: this.friend.id,
        })
        .then((res) => {
          this.messages.push(res.data.message);

          this.newMessage = "";
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
    markPrevMessagesAsRead() {
      this.$axios
        .patch(
          "/chat/messages/" + this.$route.params.id + "/read-prev-messages"
        )
        .then((res) => {
          // TODO: change read marks in chat
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleInputMessageFocus() {
      this.markPrevMessagesAsRead();
    },
  },
};
</script>
