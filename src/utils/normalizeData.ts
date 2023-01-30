import {normalize, schema} from "normalizr";
import {PRODUCT_NAMES_DATA_POINT, PRODUCTS_DATA_POINT} from "../contants/dataPoints";
import {TransformedProduct, TransformedProductNames} from "./transformer";
import { ProductsGroupResponse, ProductsResponse } from "../contants/api";


export interface NormalizerResult<T> {
  entities: T,
  result: Array<any>
}

const productsSchema =  [new schema.Entity('products')]

const productGroupSchema = new schema.Entity('productGroups', {
  products: productsSchema
})

const productGroupValuesSchema = new schema.Values(productGroupSchema)


export const normalizers: any = {
  [PRODUCTS_DATA_POINT]: (products: TransformedProduct[]): NormalizerResult<ProductsResponse> =>
    normalize(products, productsSchema),
  [PRODUCT_NAMES_DATA_POINT]: (productNames: TransformedProductNames): NormalizerResult<ProductsGroupResponse> =>
    normalize(productNames, productGroupValuesSchema)
}




