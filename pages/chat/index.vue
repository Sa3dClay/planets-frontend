<template>
  <div class="chat">
    <h1 class="my-4 font-weight-light">الدردشة مع الأصدقاء تحت الإنشاء!</h1>

    <!-- str caht -->
    <v-container>
      <v-card class="mx-auto" max-width="500" elevation="4">

        <!-- str toolbar -->
        <v-toolbar color="deep-purple accent-4" dark>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>الدردشة</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-toolbar>
        <!-- end toolbar -->

        <!-- str list -->
        <v-list v-chat-scroll three-line>
          <v-list-item
            v-for="(message, index) in chat.messages"
            :key="index"
            dir="ltr"
          >
            <v-list-item-avatar v-if="isDiffUser(index)">
              <div v-if="message.avatar == 'saturn'">
                <v-img width="40" :src="require('~/assets/img/saturn.png')" :alt="message.avatar"></v-img>
              </div>

              <div v-else>
                <v-img width="40" :src="require('~/assets/img/jupiter.png')" :alt="message.avatar"></v-img>
              </div>
            </v-list-item-avatar>

            <v-list-item-content class="pa-0">
              <v-list-item-title
                class="text-left pl-2"
                v-if="isDiffUser(index)"
                v-html="message.userName"
              ></v-list-item-title>

              <v-list-item-subtitle class="text--primary" v-html="message.userMessage"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <!-- end list -->

        <!-- str form -->
        <v-form class="pa-4">
          <v-text-field
            label="اكتب رسالتك هنا..."
            v-model="typeMessage"
          ></v-text-field>

          <v-btn
            type="submit"
            @click.prevent="sendMessage"
            :disabled="!typeMessage"
          >إرسال</v-btn>
        </v-form>
        <!-- end form -->

      </v-card>
    </v-container>
    <!-- end chat -->
  </div>
</template>

<script>
export default {
  middleware: "auth",

  data: () => ({
    typeMessage: '',
    chat: { 
      messages: [
        {
          avatar: 'saturn',
          userName: 'Summer BBQ',
          userMessage: `Wish I could come, but I'm out of town this weekend.`,
        },
        {
          avatar: 'jupiter',
          userName: 'Oui oui',
          userMessage: `Do you have Paris recommendations? Have you ever been?`,
        },
      ],
    }
  }),

  methods: {
    sendMessage() {
      console.log(this.typeMessage)

      let newUserMessage = {
        avatar: this.user.planet,
        userName: this.user.name,
        userMessage: this.typeMessage
      }
      this.chat.messages.push(newUserMessage)

      this.typeMessage = ''
    },
    isDiffUser(index) {
      if(index == 0) {
        return true
      }

      let prevUser = this.chat.messages[index--].userName
      let currUser = this.chat.messages[index].userName
      
      if(prevUser == currUser) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>
