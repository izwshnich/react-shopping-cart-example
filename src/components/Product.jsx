import React from 'react'

const Product = ({ name, price, quantity }) =>
  <div>
    {name} - ¥{price} {quantity ? ` x ${quantity}` : <span style={{color: 'red'}}>Soldout</span>}
  </div>

export default Product