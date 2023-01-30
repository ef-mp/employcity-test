import {getParent, Instance, types} from "mobx-state-tree";
import {ProductModel} from "./ProductModel";
import {CartModel} from "./CartModel";


export const CartEntryModel = types.model({
  id: types.identifierNumber,
  amount: types.optional(types.number, 1),
  product: types.maybe(types.safeReference(types.late(() => ProductModel))),
})
  .actions(self => {

    const decreaseAmount = (): void => {
      const {
        amount: prevAmount
      } = self

      const newAmount = prevAmount - 1

      if (newAmount === 0) {
      return getParent<typeof CartModel>(self, 2)
        .removeCartEntry(self as Instance<typeof CartEntryModel>)
    }

    self.amount = prevAmount - 1
  }
  const increaseAmount = () => {
      if (!self.product) return;

      const {
        product: {
          amount: maxAmount
        },
        amount
      } = self

      const newAmount = amount + 1

      if (newAmount > maxAmount) return

      self.amount = newAmount
    }

    return {
      decreaseAmount,
      increaseAmount
    }
  })
  .views((self) => ({
    get isMaxAmount() {
      if (!self.product) return true

      return self.amount === self.product.amount
    },
    get isLast() {
      return self.amount === 1
    }
  }))
