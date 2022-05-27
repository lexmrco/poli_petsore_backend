<template>
  <div>
    <v-row>
      <v-col :key="idx" md="4" sm="6" v-for="(item ,idx) in products" xs="12">
        <Product class="my-5" :key="idx" :product="item"></Product>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import ProductComponent from "@/app/components/Product.vue";
  import {ProductStore} from "@/app/store/product";
  import {getModule} from "vuex-module-decorators";
  import {Product} from "@/domain/entity";
  import {Component} from "vue-property-decorator";
  import {CartStore} from "@/app/store/cart";
  import axios from 'axios'
  import Services from '@/services/'
  @Component({
    components: {
      Product: ProductComponent
    }
  })
  export default class ProductListComponent extends Vue {
    loading = false
    products: Product[] = [];
    get productStore(): ProductStore {
      return getModule(ProductStore, this.$store)
    }

    created() {
      this.loadProducts()
    }

    async loadProducts(){
      await Services.productService.getItems().then(result => {
        this.products = result.data.map((item: Product) => {
          return { ...item, selected: false };
        })
      })
    }
  }
</script>