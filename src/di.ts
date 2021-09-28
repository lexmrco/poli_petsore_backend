import "reflect-metadata";
import {Container} from "inversify";
import getDecorators from "inversify-inject-decorators";
import CartRepository from "@/usecases/repository/cartRepository";
import ProductRepository from "@/usecases/repository/productRepository";
import CartRepositoryImpl from "@/data/inMemoryRepository/cartRepository";
import ProductRepositoryImpl from "@/data/inMemoryRepository/productRepository";
import {AddItemToCart, AddItemToCartImpl} from "@/usecases/interactor/addItemToCart";
import {RemoveItemToCart, RemoveItemToCartImpl} from "@/usecases/interactor/removeItemToCart";
import {GetAllProduct, GetAllProductImpl} from "@/usecases/interactor/getAllProduct";
import {GetTotalCartItem, GetTotalCartItemImpl} from "@/usecases/interactor/getTotalCartItem";
import {ProceedCheckout, ProceedCheckoutImpl} from "@/usecases/interactor/proceedCheckout";
import {ProductStore} from "@/app/store/product";
import {getModule} from "vuex-module-decorators";

const container = new Container();

container
  .bind<CartRepository>("CartRepository")
  .to(CartRepositoryImpl)
  .inSingletonScope();
container
  .bind<ProductRepository>("ProductRepository")
  .to(ProductRepositoryImpl)
  .inSingletonScope();

container
  .bind<AddItemToCart>("AddItemToCart")
  .to(AddItemToCartImpl)
  .inSingletonScope();
  container
  .bind<RemoveItemToCart>("RemoveItemToCart")
  .to(RemoveItemToCartImpl)
  .inSingletonScope();
container
  .bind<GetAllProduct>("GetAllProduct")
  .to(GetAllProductImpl)
  .inSingletonScope();
container
  .bind<GetTotalCartItem>("GetTotalCartItem")
  .to(GetTotalCartItemImpl)
  .inSingletonScope();
container
  .bind<ProceedCheckout>("ProceedCheckout")
  .to(ProceedCheckoutImpl)
  .inSingletonScope();

const {lazyInject} = getDecorators(container);
export {lazyInject, container};
