import * as React from 'react'
import { useState, useContext } from 'react'
import { ProductsContext } from 'contexts/products'

interface IProps {
  id: string,
  inventory: number
}

const AddToCart: React.FC<IProps> = (props: IProps) => {
  const { id, inventory } = props
  const { onAddToCart } = useContext(ProductsContext)
  const [count, setCount] = useState(0)
  const [max, setMax] = useState(inventory)

  const handleAddToCart = () => {
    if (count === 0) return
    onAddToCart(id, count)
    setMax(max - count)
    setCount(0)
  }

  const handleDecrementCount = () => {
    setCount(count > 0 ? count - 1 : 0)
  }

  const handleIncrementCount = () => {
    setCount(count < max ? count + 1 : max)
  }

  return (
    <>
      <button
        onClick={handleAddToCart}
        disabled={max <= 0}>
        Add to cart
      </button>

      <button onClick={handleDecrementCount}>-</button>
      {count}
      <button onClick={handleIncrementCount}>+</button>
    </>
  )
}

export default AddToCart
