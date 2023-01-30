import {Decimal} from 'decimal.js';


export const addDecimals = (a: number, b: number) => Decimal.add(a, b).toNumber()
export const mulDecimals = (a: number, b: number) => Decimal.mul(a, b).toNumber()