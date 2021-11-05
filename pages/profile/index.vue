<template>
  <div class="user">
    <h1 class="py-8 text-center font-weight-light">
      مرحباً بك أيها
      <span>{{ user.planet == 'saturn' ? 'الزوحلي' : 'المريخي' }}</span>
    </h1>

    <v-btn color="indigo" dark to="profile/update">تعديل بياناتي</v-btn>
  </div>
</template>

<script>
export default {
  middleware: "auth",
}
</script>
