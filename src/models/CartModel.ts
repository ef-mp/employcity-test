import {applySnapshot, destroy, getRoot, Instance, types} from "mobx-state-tree";
import {CartEntryModel} from "./CartEntryModel";
import {addDecimals, mulDecimals} from "../utils/decimal";
import _get from 'lodash/get'
import {when} from "mobx";
import {RootInstance} from "./RootModel";
import nodeWindowPolyfill from "node-window-polyfill";

if (typeof window === 'undefined') {
  nodeWindowPolyfill.register();
}

export const CartModel = types
  .model({
    products: types.array(CartEntryModel)
  })
  .actions((self) => {

    const addProductToCart = (productId: number) => {
      self.products.push({ product: productId, id: productId })
    }

    const removeCartEntry = (product: Instance<typeof CartEntryModel>) => {
      destroy(product)
    }

    const removeCartEntryById = (cartEntryId: number) => {
      const cartEntry = self.products.find(({ product }) => product?.id === cartEntryId)

      if (!cartEntry) return;

      destroy(cartEntry)
    }

    const readFromLocalStorage = () => {
      const cartData = window?.localStorage?.getItem('cart')
      if (cartData) applySnapshot(self, JSON.parse(cartData))
    }

    const afterAttach = () => {
      if (!window?.localStorage) return;

      when(
        () => !getRoot<RootInstance>(self).shop.loading,
        readFromLocalStorage
      )

    }

    return {
      afterAttach,
      addProductToCart,
      removeCartEntry,
      removeCartEntryById,
      readFromLocalStorage,
    }
  })
  .views((self) => ({

    get totalPrice() {
      if (!self.products.length) return 0;

      return self.products.reduce((acc, {product, amount}) => {
        return addDecimals(acc, mulDecimals(_get(product, 'price', 0), amount))
      }, 0)
    },

    getIsAddedToCart(productId: number) {
      return !!self.products.find(({product}) => product?.id === productId)
    },

    get isEmpty() {
      return self.products.length === 0
    }
  }))
