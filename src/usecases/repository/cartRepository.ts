import {Observable} from "rxjs";
import {Product} from "@/domain/entity";

export default interface CartRepository {
  addItemToCart(product: Product): Observable<void>;
  
  removeItemToCart(product: Product): Observable<void>;

  getTotalCartItem(): Observable<number>;

  proceedCheckout(): Observable<void>;
}
