<template>
  <v-app dark>
    <div class="my-5">
      <v-btn color="indigo white--text" to="/"
        >العودة الى الصفحة الرئيسية</v-btn
      >

      <not-found />
    </div>
  </v-app>
</template>

<script>
import NotFound from "~/components/UI/NotFound.vue";

export default {
  components: { NotFound },
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "عذراً هذه الصفحة غير موجودة",
      otherError: "حدث خطأ ما",
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>
