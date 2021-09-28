<template>
  <v-footer
    dark
    padless

  >
    <v-card
      flat
      tile
      class="red lighten-5  text-center" dark
      style="width:100%"
    >
    <v-row align="center" justify="center">
      <v-img
        src="img/pet-store-logo.jpg"
        max-width="300"
      />
    </v-row>
      <v-card-text class="lighten-1 grey--text pt-0">
        
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="lighten-1 grey--text">
        {{ new Date().getFullYear() }} — <strong>Politécnico Grancolombiano -  Gerencia de proyectos</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data () {
      return {
        footer: false,
      }
    },
  }
</script>