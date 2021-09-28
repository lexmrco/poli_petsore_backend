import {Observable} from "rxjs";
import {inject, injectable} from "inversify";
import {Product} from "@/domain/entity";
import CartRepository from "@/usecases/repository/cartRepository";

export interface RemoveItemToCart {
  execute(product: Product): Observable<void>;
}

@injectable()
export class RemoveItemToCartImpl implements RemoveItemToCart {
  constructor(
    @inject("CartRepository") private cartRepository: CartRepository
  ) {
  }

  execute(product: Product): Observable<void> {
    return this.cartRepository.removeItemToCart(product);
  }
}
