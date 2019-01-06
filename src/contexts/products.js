import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react'
import { database } from '../plugins/firebase'

export const ProductsContext = createContext()
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(null)
  const productRef = useMemo(() => database.ref('products'))
  const initialCartState = { quantity_by_id: {} }
  const [cart, setCart] = useState(initialCartState)
  const quantity_by_id = useMemo(() => cart.quantity_by_id, [cart])
  
  const onCheckout = useCallback(quantity_by_id => {
    Object.keys(quantity_by_id).forEach(key => productRef.child(`${key}/inventory`).transaction(inventory => inventory - quantity_by_id[key]))
    setCart(initialCartState)
  })

  const onAddToCart = useCallback((id, quantity) => setCart({ quantity_by_id: {
    ...quantity_by_id,
    [id]: (quantity_by_id[id] || 0) + quantity
  }}))

  useEffect(() => productRef.on('value', snapshot => setProducts(snapshot.val())), products)

  return (
    <ProductsContext.Provider value={{ products, quantity_by_id, onCheckout, onAddToCart }}>
      {children}
    </ProductsContext.Provider>
  )
}
