import { PRODUCTS_DATA_POINT, PRODUCT_NAMES_DATA_POINT } from "../contants/dataPoints"
import {Product} from "../types/shop";

enum SERVER_PRODUCTS_PROPERTY {
  PRICE = "C",
  AMOUNT = "P",
  GROUP_ID = "G",
  PRODUCT_ID = "T"
}

enum SERVER_PRODUCT_NAME_PROPERTY {
  GROUP_NAME = "G",
  PRODUCTS_OF_GROUP = "B",
  PRODUCT_NAME = "N",
  GROUP_ID = "T"
}


export type TransformedProduct = Omit<Product, 'name'>

const productsTransformer = (response: any): TransformedProduct[] => {
  const {
    Value: {
      Goods: products
    }
  } = response

  return products.map((product: any) => {
    const {
      [SERVER_PRODUCTS_PROPERTY.AMOUNT]: amount,
      [SERVER_PRODUCTS_PROPERTY.PRICE]: price,
      [SERVER_PRODUCTS_PROPERTY.PRODUCT_ID]: id,
      [SERVER_PRODUCTS_PROPERTY.GROUP_ID]: groupId,
    } = product

    return {
      amount,
      price,
      id,
      groupId,
    }
  })
}

export interface TransformedProductNames {
  [groupId: string]: {
    name: string,
    id: string,
    products: {
      [productId: string]: {
        id: string,
        name: string,
      }
    }
  }
}

const productNamesTransformer = (response: any): TransformedProductNames => {
  return Object
    .keys(response)
    .reduce((acc, groupId) => {

      const productGroup = response[groupId]

      const groupName = productGroup[SERVER_PRODUCT_NAME_PROPERTY.GROUP_NAME]

      const productsOfGroup = productGroup[SERVER_PRODUCT_NAME_PROPERTY.PRODUCTS_OF_GROUP]

      return {
        ...acc,
        [groupId]: {
          name: groupName,
          id: Number(groupId),
          products: Object
            .keys(productsOfGroup)
            .reduce((acc: any, productId) => {
              const {
                [SERVER_PRODUCT_NAME_PROPERTY.PRODUCT_NAME]: name
              } = productsOfGroup[productId]

              return {
                ...acc,
                [productId]: {
                  name,
                  id: Number(productId)
                }
              }
            }, {})
        }
      }
    }, {})
}


interface ResponseToStateTransformer {
    [dataPoint: string]: (response: any) => any,
}

export const responseToStateTransformer: ResponseToStateTransformer = {
  [PRODUCTS_DATA_POINT]: productsTransformer,
  [PRODUCT_NAMES_DATA_POINT]: productNamesTransformer
};