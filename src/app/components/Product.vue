<template>
  <v-card  outlined >
    <v-card-text>
  <div style="cursor: pointer;"  @click.stop="showDetails = true">
      <v-img hover height="200"
             :src="product.thumbnailUrl"/>

      <p class="mt-6 mb-0 title dark--text">{{ product.name }} </p>
      <p v-if="product.discount > 0" class="dark--text body-1"><strike>${{ product.price.toLocaleString() }}</strike> <small>- %{{ product.discount.toLocaleString() }}</small></p>
      <p  class="red--text body-1"><b>${{ ( (product.price - (product.price * product.discount) / 100)).toLocaleString() }}</b></p>
      <p style="text-overflow: ellipsis; overflow: hidden;white-space: nowrap;">{{ product.description }}</p>
      
      <ProductDetails :openDialog="showDetails" :productDetails="product" @showDetails="setShowDetails" @addToCart="addToCart" @removeToCart="removeToCart"> </ProductDetails>
      <v-btn small
        text
        @click.stop="showDetails = true"
        color="blue darken-1"
      >
        Ver mas ...
      </v-btn>
  </div>
    </v-card-text>
    <v-card-actions>
      <v-btn v-if="product.selected" block color="default" @click="removeToCart" :loading="loading">Quitar del carrito</v-btn>
      <v-btn v-else block color="red lighten-1" class="white--text" @click="addToCart" :loading="loading">Agregar al carrito</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
  import Vue from 'vue'
  import {CartStore} from "@/app/store/cart";
  import {getModule} from "vuex-module-decorators";
  import {Component, Prop, Emit} from "vue-property-decorator";
  import {Product} from "@/domain/entity";
  import ProductDetails from "@/app/components/ProductDetails.vue";


  @Component({
    components: {
      ProductDetails: ProductDetails
    }
  })

  export default class ProductComponent extends Vue {
    @Prop({required: true}) product!: Product

    loading = false;
     showDetails = false;

    get cartStore(): CartStore {
      return getModule(CartStore, this.$store)
    }

    @Emit()
    setShowDetails(value: boolean ) {
      this.showDetails = value;
      }

    @Emit()
    addToCart() {
    console.log('Product -> addtoCart');
      this.loading = true;
      this.cartStore.addProductToCart({product: this.product})
        .finally(() => {
          this.loading = false;
          this.product.selected = true;
        })
    }

    @Emit()
    removeToCart() {
      this.loading = true;

      this.cartStore.removeProductToCart({product: this.product})
        .finally(() => {
          this.loading = false;
          this.product.selected = false;
        })
    }
  }
</script>