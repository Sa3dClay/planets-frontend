<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <div class="pg">
          <div class="overlay"></div>

          <div class="pg-content">
            <v-btn color="success" to="/">الرئيسية</v-btn>
            
            <v-btn v-if="authenticated" color="indigo" dark to="/profile">الصفحة الشخصية</v-btn>            
            
            <nuxt />
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {}
</script>
