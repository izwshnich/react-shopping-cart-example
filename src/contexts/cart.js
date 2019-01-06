import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react'
import { ProductsContext } from './products'

export const CartContext = createContext()
export const CartProvider = ({ children }) => {
  const { products } = useContext(ProductsContext)
  const initialState = {
    quantity_by_id: {}
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        const { id, count } = action.payload

        return {
          quantity_by_id: {
            ...state.quantity_by_id,
            [id]: (state.quantity_by_id[id] || 0) + count
          }
        }

      case 'CHECKOUT_SUCCESS':
        return {
          ...initialState
        }

      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const onAddToCart = useCallback((id, count) => dispatch({
    type: 'ADD_TO_CART',
    payload: { id, count }
  }))

  const onCheckout = useCallback(() => dispatch({
    type: 'CHECKOUT_SUCCESS'
  }))

  const quantity_by_id = state.quantity_by_id

  const total_quantity = Object.keys(state.quantity_by_id)
    .map(key => state.quantity_by_id[key])
    .reduce((prev, current) => prev + current, 0)

  const total_price = Object.keys(state.quantity_by_id)
    .map(key => products[key].price * state.quantity_by_id[key])
    .reduce((prev, current) => prev + current, 0)

  return (
    <CartContext.Provider value={{ onAddToCart, onCheckout, quantity_by_id, total_quantity, total_price }}>
      {children}
    </CartContext.Provider>
  )
}
