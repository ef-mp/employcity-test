export interface Product {
  id: number,
  groupId: number,
  amount: number,
  price: number,
  name: string,
}

export interface ProductGroup {
  id: number,
  name: string,
  products: number[]
}