<template>
  <div class="user">
    <h1 class="py-8 text-center font-weight-light">
      مرحباً بك أيها
      <span>{{ user.planet == 'saturn' ? 'الزوحلي' : 'المريخي' }}</span>
    </h1>

    <v-card class="my-4">
      <v-row justify="center" align="center">
        <v-col cols="10" sm="4">
          <div v-if="user.planet == 'saturn'">
            <v-img
              :src="require(`~/assets/img/saturn.png`)"
            ></v-img>
          </div>

          <div v-else>
            <v-img
              :src="require(`~/assets/img/jupiter.png`)"
            ></v-img>
          </div>
        </v-col>

        <v-col cols="10" sm="6">
          <v-card-title class="d-block">
            {{ user.name }}
          </v-card-title>

          <v-card-subtitle>
            {{ user.email }}
          </v-card-subtitle>
        </v-col>
      </v-row>
    </v-card>

    <v-btn class="my-4" color="indigo" dark to="profile/update">تعديل بياناتي</v-btn>
  </div>
</template>

<script>
export default {
  middleware: "auth",
}
</script>
