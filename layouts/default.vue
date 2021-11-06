<template>
  <v-app>
    <v-main>
      <div class="pg">
        <div class="overlay"></div>

        <div class="pg-content">
          <v-btn class="mt-4" color="success" to="/">الرئيسية</v-btn>
          
          <v-btn class="mt-4" v-if="authenticated" color="indigo" dark to="/profile">الصفحة الشخصية</v-btn>            
          
          <nuxt />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {}
</script>
