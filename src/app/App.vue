<template>
  <v-app>
    <NavBar></NavBar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <FooterVue></FooterVue>
  </v-app>
</template>

<script lang="ts">
  import Vue from 'vue';

  import NavBar from './components/NavBar.vue'
  import FooterVue from './components/Footer.vue'

  export default Vue.extend({
    name: 'App',

    components: {NavBar,FooterVue},

    data: () => ({
      //
    }),
  });
</script>
