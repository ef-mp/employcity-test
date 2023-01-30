import {responseToStateTransformer, TransformedProduct} from "../utils/transformer";
import {NormalizerResult, normalizers} from "../utils/normalizeData";
import {ProductGroup} from "../types/shop";
import { NormalizedData } from "src/types/shared";
import _mapValues from "lodash/mapValues";


export const fetchData = async <T>(dataPoint: string): Promise<T> => {
  try {

    const response = await fetch(dataPoint);
    const json = await response.json();

    const transformer = responseToStateTransformer[dataPoint]
    const transformedData = transformer ? transformer(json) : json;

    const normalizer = normalizers[dataPoint]

    return normalizer ? normalizer(transformedData) : transformedData
  } catch (e: any) {
    return Promise.reject(e);
  }
};


type ProductNames = {
  id: string,
  name: string,
}

export type ProductsGroupResponse = NormalizerResult<{
  products: NormalizedData<ProductNames>
  productGroups: Array<ProductGroup>,
}>

export type ProductsResponse = NormalizerResult<{
  products: NormalizedData<TransformedProduct>
}>


export const transformProductsToState = (
  productsResponse: ProductsResponse,
  productGroupsResponse: ProductsGroupResponse
) => {
  const {
    entities: {
      products
    },
  } = productsResponse

  const {
    entities: {
      products: productNames,
      productGroups,
    }
  } = productGroupsResponse

  return {
    productGroups: Object
      .values(productGroups)
      .map((productGroup: any) => ({
        ...productGroup,
        products: productGroup.products.filter((productId: any) => productId in products)
      })),
    products: _mapValues(
      products,
      product => ({
        ...product,
        name: productNames[product.id].name
      })
    )
  }
}