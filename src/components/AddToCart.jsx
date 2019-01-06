import React, { useState, useContext } from 'react'
import { ProductsContext } from '../contexts/products';

const AddToCart = ({ id, inventory }) => {
  const { onAddToCart } = useContext(ProductsContext)
  const [count, setCount] = useState(0)
  const [max, setMax] = useState(inventory)

  return (
    <>
      <button
        onClick={() => {
          if (count === 0) return
          onAddToCart(id, count)
          setMax(max - count)
          setCount(0)
        }}
        disabled={max <= 0}>
        Add to cart
      </button>

      <button onClick={() => setCount(count > 0 ? count - 1 : 0)}>-</button>
      {count}
      <button onClick={() => setCount(count < max ? count + 1 : max)}>+</button>
    </>
  )
}

export default AddToCart
