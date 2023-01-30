import {types} from "mobx-state-tree";
import {ProductModel} from "./ProductModel";

export const ProductGroupModel = types
  .model({
    id: types.identifierNumber,
    name: types.string,
    products: types.array(types.reference(ProductModel)),
  })
  .views(self => ({
    get isEmpty() {
      return self.products.length === 0
    }
  }))