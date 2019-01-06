import React, { useContext, useMemo } from 'react'
import { ProductsContext } from '../contexts/products'
import Product from './Product'

const Cart = () => {
  const { products, quantity_by_id, onCheckout } = useContext(ProductsContext)
  const added_products_ids = useMemo(() => Object.keys(quantity_by_id), [quantity_by_id])
  const total_price = useMemo(() => added_products_ids.map(key => products[key].price * quantity_by_id[key]).reduce((prev, current) => prev + current, 0), [quantity_by_id])
  const hasProducts = useMemo(() => added_products_ids.length > 0, [quantity_by_id])

  return (
    <>
      <h3>Your Cart</h3>
      {hasProducts ? (
        added_products_ids.map(id => <Product key={products[id].id} name={products[id].name} price={products[id].price} quantity={quantity_by_id[id]} />)
      ) : (
        <em>Please add some products to cart.</em>
      )}

      <p>Total: ¥ {total_price}</p>
      <button
        onClick={() => {
          onCheckout(quantity_by_id)
        }}
        disabled={!hasProducts}>
        Checkout
      </button>
    </>
  )
}

export default Cart
