import {Observable} from "rxjs";
import { of } from 'rxjs/observable/of';
import {tap, map} from "rxjs/operators";
import {injectable} from "inversify";
import {Cart, Product} from "@/domain/entity";
import CartRepository from "@/usecases/repository/cartRepository";

@injectable()
export default class CartRepositoryImpl implements CartRepository {
  private _carts: Cart[] = [];

  public addItemToCart(product: Product): Observable<void> {
    console.log('cartRepository.ts -> addItemToCart ');

    this._carts.push({product});
    return of(1).pipe(
      // delay(1000),
      map(() => {
        return;
      })
    );
  }

  public removeItemToCart(product: Product): Observable<void> {
    
    const idx = this._carts.findIndex(c => c.product.id === product.id);
    console.log(idx);
    this._carts.splice(idx, 1);
    return of(1).pipe(
      // delay(1000),
      map(() => {
        return;
      })
    );
  }

  public getTotalCartItem(): Observable<number> {
    const val = this._carts.length;
    return of(null).pipe(
      // delay(1000),
      map(() => val)
    );
  }

  proceedCheckout(): Observable<void> {
    return of(null).pipe(
      tap(() => {
        this._carts = []
      }),
      map(() => {
        return
      })
    );
  }
}
