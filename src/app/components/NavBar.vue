<template>
  <v-app-bar
      app
      color="blue-grey darken-2"
      dark
      elevation="1"
  >

    <v-toolbar-title>PET STORE</v-toolbar-title>

    <div class="mr-3"></div>

    <v-btn icon @click="$route.name!=='Home' && $router.push({name: 'Home'})" text>
      
        <v-icon>mdi-home</v-icon>
      
       </v-btn>
    <v-spacer/>

    <CartPreview></CartPreview>

  </v-app-bar>

</template>
<script lang="ts">
  import Vue from 'vue'
  import CartPreview from "@/app/components/CartPreview.vue";

  export default Vue.extend({
    components: {CartPreview}
  })
</script>