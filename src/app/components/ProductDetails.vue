<template>
  <v-row justify="center">
    

    <v-dialog
      v-model="show"
      max-width="600"
    >
      <v-card>
        <v-card-title class="headline">{{product.name}}
          <v-spacer></v-spacer>
          <v-btn icon @click="show = false" text>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text> 
          <v-img hover 
             :src="product.thumbnailUrl"/>
          <v-divider></v-divider>
        </v-card-text>
          <v-card-text> 
          {{product.description}}
        </v-card-text>

        <v-card-actions>

                <v-btn v-if="product.selected" block  color="default" @click="removeToCart" :loading="loading">Quitar del carrito</v-btn>
                <v-btn v-else color="red lighten-1" block class="white--text" @click="addToCart" :loading="loading">Agregar al carrito</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import Vue from 'vue'

const bus = new Vue({});
  export default {
  props: {
     openDialog: Boolean,
     productDetails: Object
  },
  data: () => ({
    loading: false
  }),
  computed: {
    show: {
      get () {
        return this.openDialog;
      },
      set (value) {
         this.$emit('showDetails',value);
      }    
    },
    product: {
      get () {
        return this.productDetails
      }
    }
  },
  methods: {
    addToCart: function () { 
         this.$emit('addToCart');
         this.$emit('showDetails',false);
     },
    removeToCart: function () { 
        this.$emit('removeToCart');
         this.$emit('showDetails',false);
     }
  }
}
</script>