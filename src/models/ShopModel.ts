import {applySnapshot, flow, types} from "mobx-state-tree";
import {fetchData, ProductsGroupResponse, ProductsResponse, transformProductsToState} from "../contants/api";
import {ProductModel} from "./ProductModel";
import {ProductGroupModel} from "./ProductGroupModel";
import {nameFieldComparator} from "../utils/comparators";
import _isEqual from 'lodash/isEqual'
import _mapValues from "lodash/mapValues";
import _omit from "lodash/omit";
import {PRODUCT_NAMES_DATA_POINT, PRODUCTS_DATA_POINT} from "../contants/dataPoints";


export const ShopModel = types
  .model({
    products: types.map(ProductModel),
    productGroups: types.array(ProductGroupModel),
    loading: false,
    error: types.maybeNull(types.string),
  })
  .preProcessSnapshot((snapshot) => {

    const {
      products: productsResponse,
      productGroups: productGroupsResponse,
    } = snapshot as any

    if (!productsResponse?.entities || !productGroupsResponse?.entities) return snapshot

    return transformProductsToState(productsResponse, productGroupsResponse)
  })
  .actions((self) => {

    const setLoading = (isLoading: boolean) => self.loading = isLoading

    const fetchProducts = flow(function* (withToggleLoading = true) {

      withToggleLoading && setLoading(true)

      try {
        const productsResponse = yield fetchData<ProductsResponse>(PRODUCTS_DATA_POINT)

        const {
          entities: {
            products
          },
        } = productsResponse

        const currentProductsWithoutName = _mapValues(
          self.products.toJSON(),
          (prod) => _omit(prod, 'name')
        )

        /*
        Исхожу из того, что, если список продуктов не изменился, то данные групп продуктов перезапрашивать не нужно
        */
        if (_isEqual(products, currentProductsWithoutName) || !fetch) {
          return self.products
        }

        const productNamesResponse = yield fetchData<ProductsGroupResponse>(PRODUCT_NAMES_DATA_POINT)

        applySnapshot(self, {
          products: productsResponse,
          productGroups: productNamesResponse
        })
      } catch (e) {
        self.error = 'При запросе данных произошла ошибка. Попробуйте перезагрузить страницу'
      } finally {
        withToggleLoading && setLoading(false)
      }

      return self.products
    })

    const afterCreate = fetchProducts

    return {
      fetchProducts,
      afterCreate,
      setLoading,
    }

  })
  .views((self) => ({
    get sortedProductGroups() {
      return self.productGroups
        .slice()
        .filter(({isEmpty}) => !isEmpty)
        .sort(nameFieldComparator)
    },
  }))