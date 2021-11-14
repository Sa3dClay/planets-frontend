<template>
  <div class="chatPage">
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
        <!-- <v-list v-chat-scroll class="chat">
          <v-list-item
            v-for="(message, index) in chat.messages"
            :key="index"
            :dir="message.userId == user.id ? 'rtl' : 'ltr'"
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
                v-if="isDiffUser(index) && message.userId !== user.id"
                v-html="message.userName"
              ></v-list-item-title>

              <v-list-item-subtitle class="text--primary" v-html="message.userMessage"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list> -->
        <!-- end list -->

        <!-- str chat -->
        <div class="chat pa-8" v-chat-scroll>
          <v-row
            v-for="(message, index) in chat.messages"
            :key="index"
            :dir="message.userId == user.id ? 'rtl' : 'ltr'"
          >
            <v-col class="pa-0 ma-0" cols="3">
              <v-responsive v-if="isDiffUser(index)">
                <v-img
                  width="40"
                  class="d-block mx-auto"
                  v-if="message.avatar == 'saturn'"
                  :src="require('~/assets/img/saturn.png')"
                  :alt="message.avatar"
                ></v-img>

                <v-img
                  width="40"
                  class="d-block mx-auto"
                  v-else
                  :src="require('~/assets/img/jupiter.png')"
                  :alt="message.avatar"
                ></v-img>

                <p
                  v-if="message.userId !== user.id"
                  class="py-0 px-4 ma-0 text-center"
                >{{ message.userName }}</p>  
              </v-responsive>
            </v-col>

            <!-- <v-col
              cols="2"
              class="pa-1 ma-0"
              v-if="isDiffUser(index) && message.userId !== user.id"
            >
              <p class="py-0 px-4 ma-0 text-left">{{ message.userName }}</p>
            </v-col> -->

            <v-col cols="9" class="pa-1 ma-0">
              <p
                class="py-0 px-4 ma-0 textMessage d-inline-block"
                :class="message.userId == user.id ? 'float-right selfMessage' : 'float-left otherMessage'"
              >{{ message.userMessage }}</p>
            </v-col>
          </v-row>
        </div>
        <!-- end chat -->

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
      messages: []
    }
  }),

  methods: {
    sendMessage() {
      console.log(this.typeMessage)

      this.$axios.post('/sendMessage', {
          message: this.typeMessage
        })
          .then((res) => {
            console.log(res)
            
            this.addNewMessage(this.user, this.typeMessage)

            this.typeMessage = ''
          })
          .catch((err) => {
            console.log(err)
          })
    },

    getMessages() {
      this.$axios.get('/getMessages')
        .then(res => {
          // console.log(res.data.messages)

          let messages = res.data.messages

          if(messages.length > 0) {
            this.showMessages(messages)
          }
        })
        .catch(err => {
          console.log(err)
        })
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
    },

    showMessages(messages) {
      // console.log(messages)

      messages.forEach(oldMessage => {
        // console.log(oldMessage.user, oldMessage.message)

        this.addNewMessage(oldMessage.user, oldMessage.message)
      })
    },

    addNewMessage(user, message) {
      let newUserMessage = {
        userId: user.id,
        avatar: user.planet,
        userName: user.name,
        userMessage: message
      }

      this.chat.messages.push(newUserMessage)
    },
  },

  mounted() {
    this.getMessages()

    this.$echo.channel(`chat`)
      .on(`chat-event`, (e) => {
        if(e.user.id !== this.user.id) {
          this.addNewMessage(e.user, e.message)
        }
      })
      // .listenForWhisper('typing', (e) => {
      //   console.log(e.name);
      // })
  },

  watch: {
    // typeMessage() {
    //   this.$echo.private(`chat`)
    //     .whisper('typing', {
    //       name: this.typeMessage
    //     })
    // },
  },
}
</script>
