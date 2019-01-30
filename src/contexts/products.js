import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react'
import { database } from '../plugins/firebase'

function useProducts() {
  const [products, setProducts] = useState(null)
  const initialCartState = { quantity_by_id: {} }
  const [cart, setCart] = useState(initialCartState)
  const productRef = useMemo(() => database.ref('products'), [database])
  const quantity_by_id = useMemo(() => cart.quantity_by_id, [cart])

  useEffect(() => productRef.on('value', snapshot => setProducts(snapshot.val())), products)

  const onCheckout = useCallback(quantity_by_id => {
    Object.keys(quantity_by_id).forEach(key =>
      productRef.child(`${key}/inventory`).transaction(inventory => inventory - quantity_by_id[key]))

    setCart(initialCartState)
  }, [productRef])

  const onAddToCart = useCallback((id, quantity) => setCart({
    quantity_by_id: {
      ...quantity_by_id,
      [id]: (quantity_by_id[id] || 0) + quantity
    }
  }), [quantity_by_id])

  return [products, quantity_by_id, onCheckout, onAddToCart]
}

export const ProductsContext = createContext()
export const ProductsProvider = ({ children }) => {
  const [products, quantity_by_id, onCheckout, onAddToCart] = useProducts()

  return (
    <ProductsContext.Provider value={{ products, quantity_by_id, onCheckout, onAddToCart }}>
      {children}
    </ProductsContext.Provider>
  )
}
