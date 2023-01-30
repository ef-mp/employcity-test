import {ReactNode} from "react";

export type Children = string | JSX.Element | JSX.Element[] | ReactNode

export interface NormalizedData<T> {
  [id: string]: T
}