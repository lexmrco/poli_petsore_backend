import Vuex from "vuex";
import { createLocalVue } from "@vue/test-utils";
import { getModule } from "vuex-module-decorators";
import { container } from "@/di";
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import sinon from "sinon";
import { injectable } from "inversify";
import { Product } from "@/domain/entity";
import { CartStore } from "@/app/store/cart";
import { AddItemToCart } from "@/usecases/interactor/addItemToCart";
import * as _ from "lodash";

container.unbindAll();

@injectable()
class MockAddItemToCart implements AddItemToCart {
  execute(product: Product): import("rxjs").Observable<void> {
    throw new Error("Method not implemented.");
  }
}

container
  .bind<AddItemToCart>("AddItemToCart")
  .to(MockAddItemToCart)
  .inSingletonScope();
const mockUseCase = container.get<AddItemToCart>("AddItemToCart");

const sandbox = sinon.createSandbox();

describe("CartStore", () => {
  describe("[Actions]", () => {
    describe("addProductToCart()", () => {
      let module: CartStore;

      beforeEach(() => {
        const localVue = createLocalVue();
        localVue.use(Vuex);
        const store = new Vuex.Store({
          modules: { cart: _.cloneDeep(CartStore) }
        });
        module = getModule(CartStore, store);
      });
      afterEach(() => {
        sandbox.restore();
      });
      it("should execute usecase: AddItemToCart", async () => {
        // setup
        const spy = sandbox.stub(mockUseCase, "execute");
        spy.callsFake(() => of());

        // execute
        const product: Product = { name: "test", price: 999, discount: 0,selected :false };
        const params = { product: product };
        await module.addProductToCart(params);

        // assert
        expect(spy.calledOnce).toBe(true);
      });
      it("should update state", async () => {
        const spy = sandbox.stub(mockUseCase, "execute");
        spy.callsFake(() => of());

        // execute
        const product1: Product = { id: "1", name: "test 1", discount: 0, price: 999,selected:false };
        const product2: Product = { id: "2", name: "test 2", discount: 10, price: 999,selected:false };
        await module.addProductToCart({ product: product1 });

        // assert
        expect(module.items.length).toEqual(1);
        // add the same product to cart, the quantity is increased but the number of item is the same
        await module.addProductToCart({ product: product1 });
        expect(module.items.length).toEqual(1);
        // add another product, the item should be increased
        await module.addProductToCart({ product: product2 });
        expect(module.items.length).toEqual(2);
      });
    });
  });
});
