import {lazyInject} from "@/di";
import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {Cart, Product} from "@/domain/entity";
import {AddItemToCart} from "@/usecases/interactor/addItemToCart";
import {RemoveItemToCart} from "@/usecases/interactor/removeItemToCart";
import {ProceedCheckout} from "@/usecases/interactor/proceedCheckout";

export interface CartState {
  items: Cart[];
}

export interface AddProductToCartPayload {
  product: Product;
}

export interface RemoveProductToCartPayload {
  product: Product;
}

@Module({
  name: "cart",
  namespaced: true
})
export class CartStore extends VuexModule implements CartState {
  public items: Cart[] = [];
  @lazyInject("AddItemToCart") private addItemToCart!: AddItemToCart;
  @lazyInject("ProceedCheckout") private proceedCheckout!: ProceedCheckout;
  @lazyInject("RemoveItemToCart") private removeItemToCart!: RemoveItemToCart;

  get totalCartItem(): number {
    return this.items.reduce((acc, cart) => acc , 0);
  }

  get totalAmount(): number {
    return this.items.reduce(
      (acc, item) => acc +  item.product.price,
      0
    );
  }

  @Mutation
  clearCart() {
    this.items = []
  }

  @Mutation
  addItem(cart: Cart) {
    console.log('cart.ts -> addItem');
  
    const idx = this.items.findIndex(c => c.product.id === cart.product.id);
    if (idx >= 0) {
      //this.items[idx].quantity += cart.quantity;
    } else {
      this.items.push(cart);
    }
  }

  @Mutation
  removeItem(cart: Cart) {
    console.log('cart.ts -> removeItem');
    const idx = this.items.findIndex(c => c.product.id === cart.product.id);
    
    console.log(this.items);
    if (idx >= 0) {
      this.items.splice(idx,1);
    } 
  }

  @Action
  async addProductToCart({product}: AddProductToCartPayload) {
    console.log('cart.ts -> addProductToCart');

    await this.addItemToCart.execute(product).toPromise();
    this.addItem({
      product: product
    } as Cart);
  }

  @Action
  async removeProductToCart({product}: RemoveProductToCartPayload) {
  
    await this.removeItemToCart.execute(product).toPromise();
    this.removeItem({
      product: product
    } as Cart);
  }

  @Action
  async checkout() {
    await this.proceedCheckout.execute().toPromise();
    this.clearCart()
  }
}
