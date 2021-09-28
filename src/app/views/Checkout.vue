<template>
  <div>
   <v-container>
    <v-card v-if="!success">
      <v-data-table
          :items="carts"
          :headers="headers"
          hide-default-footer
      >
        <template v-slot:item.thumbnailUrl="{item}">
          <v-img width="60" :src="item.thumbnailUrl"></v-img>
        </template>
        <template v-slot:item.product="{item}">
          <div class="d-flex flex-column py-3 ">
            <span class="title deep-orange--text darken-4">{{ item.product }}</span>
            <span class="subtitle-2">{{ item.description }}</span>
          </div>
        </template>
        <template slot="body.append">
          <tr>
              <th colspan="4" style="text-align:right;"><span class="title indigo--text">Total</span></th>
                <th>{{totalAmount}}</th>
          </tr>
        </template>
      </v-data-table>
      <v-card-actions class="pa-4">
        <v-btn @click="$router.push({name: 'Home'})">Continuar comprando</v-btn>
        <v-spacer/>
        <v-btn class="px-4 white--text" color="red lighten-1" @click="$route.name !== 'Register' && $router.push({name: 'Register'})">Pagar</v-btn>
      </v-card-actions>
    </v-card>
    <p class="text-center" v-else>Tu orden ha sido enviada y será procesada.</p>
   </v-container>
  </div>
</template>

<script lang="ts">
  import {CartStore} from "@/app/store/cart";
  import {getModule} from "vuex-module-decorators";
  import {Component, Vue} from "vue-property-decorator";


  @Component
  export default class Checkout extends Vue {

    headers = [
      {value: "thumbnailUrl", width: 50, sortable: false, class: "title"},
      {value: "product", text: "Informe", width: 300, class: "header"},
      {value: "discount", text: "Descuento", class: "header"},
      {value: "price", text: "Valor", class: "header"},
      {value: "subtotal", text: "Subtotal", class: "header"},

    ]
    success = false

    get cartStore(): CartStore {
      return getModule(CartStore, this.$store)
    }
    get totalAmount(){
      return `$${this.cartStore.items.reduce((sum, current) => sum + (current.product.price - (current.product.discount * current.product.price) * 0.01), 0).toLocaleString()}`;
    }
    get carts() {
      return this.cartStore.items.map(item => ({
        thumbnailUrl: item.product.thumbnailUrl,
        product: item.product.name,
        description: item.product.description,
        discount: `%${item.product.discount}`,
        price: `$${item.product.price.toLocaleString()}`,
        subtotal: `$${(item.product.price - (item.product.discount * item.product.price) * 0.01).toLocaleString()}`,
      }))
    }

    async checkout() {
      await this.cartStore.checkout()
      this.success = true
    }

  }
</script>

<style>
  .header {
    font-size: 0.9em !important;
  }
</style>