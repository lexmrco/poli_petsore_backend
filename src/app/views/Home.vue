<template>
  <div class="home container">
        <template>
          <v-card
            color="pink lighten-5"  
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">PET STORE</div>
                <v-list-item-title class="headline mb-1">Artículos para tu mascota</v-list-item-title>
                <v-list-item-subtitle>Encuentra los mejores artículos para tu mascota, nuestro portafolio cuenta con un variado grupo de artículos para tus amigos felinos y caninos. </v-list-item-subtitle>
                <div>
                  <v-row>
                    <v-col  md="12" sm="12" xs="12">
                      <v-card
                        color="red darken-2" dark
                      >
                        <v-card-subtitle><b>PRODUCTOS EXCLUSIVOS:</b> Tenemos una línea de productos exclusivos, diseños únicos y artículos necesarios</v-card-subtitle>
                      </v-card>                  
                    </v-col>
                    <v-col  md="6" sm="6" xs="12">
                      <v-card
                        color="red darken-2"
                        dark
                      >
                        <v-card-subtitle><b>Te ayudamos a encontrar lo que necesitas:</b>Si no encuentras algún artículo, preguntanos, te podemos ayudar</v-card-subtitle>
                      </v-card>
                    </v-col>
                    <v-col  md="6" sm="6" xs="12">
                      <v-card
                        color="red darken-2"
                        dark
                      >
                        <v-card-subtitle><b>OFERTA TUS PRODUCTOS:</b> Su tienes productos únicos para mascotas y no tienes como venderlos contáctanos y podras exibir tus productos en nuestros catálogos</v-card-subtitle>
                      </v-card>
                    </v-col>
                  </v-row>
                </div>
              </v-list-item-content>

              <v-list-item-avatar
                tile
                size="180"
              >
              <img
                  src="img/pet-store-logo.jpg"
                  alt="Pet Store"
                >
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
          <v-alert
      border="bottom"
      colored-border
      color="red darken-2"
      elevation="2"
    >
      A continuación puedes ver nuestro catálogo de productos, puedes seleccionar que tipo de producto que quieres y agregarlo al carrito. Cuando lo requieras puedes ver el resumen de tu compra en el ícono carrito.<v-icon
      small
      color="red darken-2"
    >
      mdi-cart-outline
    </v-icon>  
    </v-alert>
        </template>        
      <v-divider></v-divider>
    <v-card-text>
      <ProductList></ProductList>
    </v-card-text>    
  </div>
  
</template> 

<script lang="ts">
  import ProductList from "@/app/components/ProductList.vue" ;
  import {ProductStore} from "@/app/store/product";
  import {getModule} from "vuex-module-decorators";
  import {Component, Vue} from "vue-property-decorator";

  @Component({
    components: {ProductList}
  })
  export default class Home extends Vue {
    get productStore(): ProductStore {
      return getModule(ProductStore, this.$store)
    }

    created() {
      this.productStore.fetchItems()
    }
  }
</script>
