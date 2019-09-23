import * as React from 'react'
import { useContext, useMemo } from 'react'
import { ProductsContext } from 'contexts/products'
import { IProduct } from 'hooks/useProducts'
import Product from './Product'

const Cart = () => {
  const { products, quantityById, onCheckout } = useContext(ProductsContext)
  const addedProductsIds: Array<IProduct['id']> = useMemo(() => Object.keys(quantityById), [quantityById])
  const totalPrice = useMemo(() => {
    if (products) {
      return addedProductsIds.map(key => products[key].price * quantityById[key]).reduce((prev, current) => prev + current, 0)
    }
  }, [addedProductsIds, quantityById])

  const hasProducts = useMemo(() => addedProductsIds.length > 0, [addedProductsIds])

  const handleCheckout = () => onCheckout(quantityById)

  return (
    <>
      <h3>Your Cart</h3>
      {hasProducts && products ? (
        addedProductsIds.map(id => <Product key={products[id].id} name={products[id].name} price={products[id].price} quantity={quantityById[id]} />)
      ) : (
        <em>Please add some products to cart.</em>
      )}

      <p>Total: ¥ {totalPrice}</p>
      <button
        onClick={handleCheckout}
        disabled={!hasProducts}>
        Checkout
      </button>
    </>
  )
}

export default Cart
