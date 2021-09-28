import {Observable} from "rxjs";
import {inject, injectable} from "inversify";
import {Product} from "@/domain/entity";
import CartRepository from "@/usecases/repository/cartRepository";

export interface AddItemToCart {
  execute(product: Product): Observable<void>;
}

@injectable()
export class AddItemToCartImpl implements AddItemToCart {
  constructor(
    @inject("CartRepository") private cartRepository: CartRepository
  ) {
  }

  execute(product: Product): Observable<void> {
    return this.cartRepository.addItemToCart(product);
  }
}
