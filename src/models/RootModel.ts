import {Instance, onSnapshot, types} from "mobx-state-tree";
import {ShopModel} from "./ShopModel";
import {CartModel} from "./CartModel";
import {createContext, useContext} from "react";
import {DollarExchangeRateModel} from "./DollarExchangeRateModel";
import nodeWindowPolyfill from "node-window-polyfill";

if (typeof window === 'undefined') {
  nodeWindowPolyfill.register();
}

export const RootModel = types.model({
  shop: ShopModel,
  cart: CartModel,
  dollarExchangeRate: DollarExchangeRateModel
})


export const rootState = RootModel.create({
  shop: {
    loading: false,
    error: null,
  },
  cart: {},
  dollarExchangeRate: {
    rate: 50
  }
})

onSnapshot(rootState.cart, snapshot => {
  window.localStorage.setItem('cart', JSON.stringify(snapshot))
})

onSnapshot(rootState, snapshot => {
  console.log('Snapshot: ', snapshot)
})

export type RootInstance = Instance<typeof RootModel>
const RootStoreContext = createContext<null | RootInstance>(null)

export const StoreProvider = RootStoreContext.Provider

export const useMst = (): RootInstance => {
  const store = useContext(RootStoreContext)

  if (store === null) throw new Error('Store cannot be null, please add a context provider')

  return store
}