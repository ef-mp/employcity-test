import {types} from "mobx-state-tree";

export const ProductModel = types.model({
  id: types.identifierNumber,
  groupId: types.number,
  price: types.number,
  amount: types.number,
  name: types.string,
})