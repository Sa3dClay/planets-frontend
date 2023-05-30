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
          v-for="(message, index) in messages"
          :key="message.id"
          :dir="isSelfMessage(message.sender_id) ? 'rtl' : 'ltr'"
        >
          <v-col
            cols="9"
            class="pa-1 ma-0 relative"
            @mouseover="hoveredMessageId = message.id"
            @mouseleave="hoveredMessageId = null"
          >
            <p
              class="py-1 px-4 ma-0 textMessage d-inline-block"
              :class="
                isSelfMessage(message.sender_id)
                  ? 'float-right selfMessage'
                  : 'float-left otherMessage'
              "
            >
              <span v-show="isSelfMessage(message.sender_id)">
                <v-icon v-if="message.unread" small>mdi-check</v-icon>

                <v-icon v-else small color="green accent-3"
                  >mdi-check-all</v-icon
                >
              </span>

              {{ message.message }}
            </p>

            <div
              v-if="
                hoveredMessageId === message.id &&
                !isSelfMessage(message.sender_id)
              "
              class="message-reactions"
            >
              <div
                v-for="reaction in reactions"
                :key="reaction.id"
                @click="setMessageReaction(reaction.text, message.id, index)"
              >
                {{ reaction.emoji }}
              </div>
            </div>

            <div v-if="message.reaction" class="selected-reaction">
              {{ reactionEmoji(message.reaction) }}
            </div>
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

<style lang="scss" scoped>
.relative {
  position: relative;
}
.message-reactions {
  position: absolute;
  display: flex;
  top: -15px;
  left: 0;
  gap: 4px;
  z-index: 1;

  > div {
    cursor: pointer;
  }
}
.selected-reaction {
  position: absolute;
  font-size: 15px;
  bottom: -8px;
}
</style>

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
      hoveredMessageId: null,
      reactions: [
        { id: 1, text: "love", emoji: "❤️" },
        { id: 2, text: "haha", emoji: "😆" },
        { id: 3, text: "wow", emoji: "😲" },
        { id: 4, text: "sad", emoji: "😢" },
        { id: 5, text: "angry", emoji: "😠" },
      ],
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
    setMessageReaction(reactionText, messageId, messageIndex) {
      this.$axios
        .post("/chat/messages/react/" + messageId, { reaction: reactionText })
        .then((res) => {
          this.messages[messageIndex] = res.data.message;
          this.hoveredMessageId = null;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    reactionEmoji(reactionText) {
      const selectedReaction = this.reactions.find(
        (reaction) => reaction.text === reactionText
      );

      if (selectedReaction) return selectedReaction.emoji;
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
    isSelfMessage(senderId) {
      return senderId === this.user.id;
    },
    handleInputMessageFocus() {
      this.markPrevMessagesAsRead();
    },
  },
};
</script>
