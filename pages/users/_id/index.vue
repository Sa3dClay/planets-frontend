<template>
  <div v-show="!isLoading">
    <div v-if="Object.keys(friend).length">
      <h2 class="myFont py-12">بيانات الصديق</h2>

      <v-card class="my-4" elevation="4">
        <v-row justify="center" align="center">
          <v-col cols="10" sm="3">
            <div v-if="friend.planet == 'saturn'">
              <v-img
                max-width="100"
                class="mx-auto"
                :src="require(`~/assets/img/saturn.png`)"
              ></v-img>
            </div>

            <div v-else>
              <v-img :src="require(`~/assets/img/jupiter.png`)"></v-img>
            </div>
          </v-col>

          <v-col cols="10" sm="6">
            <v-card-title class="d-block">
              {{ friend.name }}
            </v-card-title>

            <v-card-subtitle>
              {{ friend.email }}
            </v-card-subtitle>
          </v-col>
        </v-row>
      </v-card>

      <v-btn class="my-4 mx-2" color="red" dark @click.prevent="deleteFriend"
        >حذف الصديق</v-btn
      >
      <v-btn class="my-4 mx-2" color="orange" dark @click.prevent="blockFriend"
        >حظر الصديق</v-btn
      >
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
  data: () => ({
    friend: {},
    isLoading: true,
  }),
  methods: {
    async getFriendData() {
      try {
        const res = await this.$axios.$get("/users/" + this.$route.params.id);
        this.friend = res.user;

        this.isLoading = false;
      } catch (e) {
        this.isLoading = false;

        eventBus.$emit("show-snackbar", {
          message: "عذراً ليس لديك اذن بعرض هذا الزائر",
          type: "error",
        });
      }
    },
    deleteFriend() {
      this.$swal({
        title: "هل أنت متأكد",
        text: "سوف تحذف " + this.friend.name + " من الأصدقاء",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "نعم، متأكد",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios
            .post("/users/friends/remove/" + this.friend.id)
            .then((res) => {
              console.log(res.data);

              this.$swal({
                title: "تم حذفه",
                text: this.friend.name + " لم يعد صديقاً لك ولا يمكنه محادثتك",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              });

              this.$router.push("/chat");
            })
            .catch((err) => {
              console.log(err.response);

              this.$swal({
                title: "عذراً، حدث خطأ ما",
                icon: "error",
                confirmButtonText: "حسناً",
              });
            });
        }
      });
    },
    blockFriend() {
      this.$swal({
        title: "هل أنت متأكد",
        text: "سوف تحظر " + this.friend.name + " من الأصدقاء",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "نعم، متأكد",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios
            .post("/users/friends/block/" + this.friend.id)
            .then((res) => {
              console.log(res.data);

              this.$swal({
                title: "تم حظره",
                text:
                  this.friend.name +
                  " لم يعد صديقاً لك ولا يمكنه إزعاجك مرة أخرى",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              });

              this.$router.push("/chat");
            })
            .catch((err) => {
              console.log(err.response);

              this.$swal({
                title: "عذراً، حدث خطأ ما",
                icon: "error",
                confirmButtonText: "حسناً",
              });
            });
        }
      });
    },
  },
  created() {
    this.getFriendData();
  },
};
</script>
