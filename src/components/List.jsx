import React, { useContext } from 'react'
import { ProductsContext } from '../contexts/products'
import Product from './Product'
import AddToCart from './AddToCart'

const List = () => {
  const { products } = useContext(ProductsContext)

  return (
    <>
      <h3>Products</h3>
      <ul>
        {products &&
          Object.keys(products).map(key =>
            <li key={key}>
              <Product name={products[key].name} price={products[key].price} quantity={products[key].inventory} />
              <AddToCart id={products[key].id} inventory={products[key].inventory}/>
            </li>
          )
        }
      </ul>
    </>
  )
}

export default List
