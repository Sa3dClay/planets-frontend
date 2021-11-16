<template>
  <div class="chatPage">
    <h1 class="py-8 myFont">الدردشة مع الأصدقاء تحت الإنشاء!</h1>

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
                  width="33"
                  class="d-block mx-auto"
                  v-if="message.avatar == 'saturn'"
                  :src="require('~/assets/img/saturn.png')"
                  :alt="message.avatar"
                ></v-img>

                <v-img
                  width="33"
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

            <v-col cols="9" class="pa-1 ma-0">
              <p
                class="py-1 px-4 ma-0 textMessage d-inline-block"
                :class="message.userId == user.id ? 'float-right selfMessage' : 'float-left otherMessage'"
              >{{ message.userMessage }}</p>

              <v-menu v-if="message.userId == user.id">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-on="on"
                    v-bind="attrs"
                    color="primary"
                    dark
                    icon
                  >
                    <v-icon>mdi-dots-horizontal</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item dense>
                    <v-list-item-icon>
                      <v-btn
                        @click.prevent="showCurrentMessage(index, message.userMessage)"
                        color="success"
                        dark
                        icon
                      >
                        <v-icon>mdi-pencil</v-icon>
                        تعديل
                      </v-btn>
                    </v-list-item-icon>
                  </v-list-item>

                  <v-divider></v-divider>

                  <v-list-item dense>
                    <v-list-item-icon>
                      <v-btn
                        @click.prevent="deleteUserMessage(index, message.userMessage)"
                        color="red"
                        dark
                        icon
                      >
                        <v-icon>mdi-delete</v-icon>
                        حذف
                      </v-btn>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list>
              </v-menu>

            </v-col>
          </v-row>
        </div>
        <!-- end chat -->

        <!-- str edit message dialog -->
        <v-dialog
          v-model="editDialog"
          width="500"
        >
          <v-card class="py-8">
            <v-card-text>
              <v-form>
                <v-text-field
                  label="اكتب رسالتك هنا..."
                  v-model="editMessage"
                ></v-text-field>

                <v-btn
                  @click="editUserMessage(oldIndex, oldMessage)"
                  :disabled="!editMessage"
                >تعديل</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
        <!-- end edit message dialog -->

        <!-- str new message form -->
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
        <!-- end new message form -->

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
    editMessage: '',
    oldMessage: '',
    oldIndex: '',
    editDialog: false,
    chat: { 
      messages: []
    }
  }),

  methods: {
    sendMessage() {
      // console.log(this.typeMessage)
      this.addNewMessage(this.user, this.typeMessage)

      this.$axios.post('/sendMessage', {
          message: this.typeMessage
        })
          .then((res) => {
            // console.log(res)

            this.typeMessage = ''
          })
          .catch((err) => {
            console.log(err)
          })
    },

    setOldMessageIndex(i, m) {
      this.oldIndex = i
      this.oldMessage = m
    },
    
    showCurrentMessage(i, m) {
      this.editMessage = m
      this.editDialog = true
      this.setOldMessageIndex(i, m)
    },

    editUserMessage(i, m) {
      // console.log('edit', i, m)
      this.editDialog = false

      if(this.editMessage === m) {
        console.log('no change')
        return true
      }

      this.$axios.post('/editMessage/'+this.user.id, {
        oldMessage: this.oldMessage,
        newMessage: this.editMessage
      })
        .then(res => {
          // console.log(res)

          this.chat.messages[i].userMessage = this.editMessage
        })
        .catch(err => {
          console.log(err)
        })
    },

    deleteUserMessage(i, m) {
      // console.log('delete', i, m)
      this.editDialog = false

      this.$axios.post('/deleteMessage/'+this.user.id, {
        message: m
      })
        .then(res => {
          // console.log(res)

          this.chat.messages.splice(i, 1)
        })
        .catch(err => {
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
    }
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
    // }
  }
}
</script>
