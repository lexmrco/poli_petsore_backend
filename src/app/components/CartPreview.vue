<template height="200">
  <v-menu offset-y>
    <template v-slot:activator="{on}">
      <v-btn color="red lighten-1" class="white--text" v-on="on">
         <v-icon dark>mdi-cart-arrow-down</v-icon>
        <v-badge v-if="carts.length > 0" :content="carts.length" color="grey darken-1">
        </v-badge>        
      </v-btn>
    </template>
    <v-card width="400" class="scroll" height="600">
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="headline font-weight-bold">Carrito</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>
      
      <v-card-text v-if="carts.length > 0">
        <v-list>

          <v-list-item v-for="(item, idx) in carts" :key="idx">
            <v-list-item-avatar>
              <img :src="item.thumbnail">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
              @click="removeToCart(item)" 
               icon small>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>


        </v-list>
        <v-card-actions>
          <v-btn block color="error" rounded @click="$route.name !== 'Checkout' && $router.push({name: 'Checkout'})">
            Revisar carrito
          </v-btn>
      </v-card-actions>
      </v-card-text>

      <v-card-text v-else>
        <p>No hay elementos</p>
      </v-card-text>

    </v-card>
  </v-menu>

</template>
<script lang="ts">
  import Vue from 'vue'
  import {getModule} from "vuex-module-decorators";
  import {CartStore} from "@/app/store/cart";
  import {Component} from "vue-property-decorator";
import { Product } from '../../domain/entity';


  @Component
  export default class CartPreview extends Vue {
    loading = false;
    get cartStore(): CartStore {
      return getModule(CartStore, this.$store)
    }

    get totalItem() {
      return this.cartStore.totalCartItem || 0;
    }

    get carts() {
      return this.cartStore.items.map(cart => ({
        id: cart.product.id,
        thumbnail: cart.product.thumbnailUrl,
        name: cart.product.name,
        description: cart.product.description,
        price: cart.product.price.toLocaleString(),
        discount: cart.product.discount,
        subtotal: ((cart.product.discount * cart.product.price) / 100).toLocaleString()
      }))
    }

    removeToCart(product: Product) {
      this.loading = true;
      console.log('Product -> removeToCart');
      console.log(product);
      console.log(this.cartStore.items);

      this.cartStore.removeProductToCart({product: product})
        .finally(() => {
          this.loading = false;
          product.selected = false;
        })
    }
  }

</script>