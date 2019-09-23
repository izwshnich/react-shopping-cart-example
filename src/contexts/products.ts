import * as React from 'react'
import { createContext } from 'react'
import { ICart, IProducts } from 'hooks/useProducts'

export interface IStore extends ICart {
  products: IProducts | null,
  onCheckout: (param: { [id: string]: number }) => void,
  onAddToCart: (id: string, quantity: number) => void,
}

export const ProductsContext: React.Context<IStore> = createContext({} as IStore)
export const ProductsProvider = ProductsContext.Provider
