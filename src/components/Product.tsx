import * as React from 'react'

interface IProps {
  name: string,
  price: number,
  quantity: number,
}

const Product: React.FC<IProps> = (props: IProps) => {
  const { name, price, quantity } = props

  return (
    <div>
      {name} - ¥{price} {quantity ? ` x ${quantity}` : <span style={{color: 'red'}}>Soldout</span>}
    </div>    
  )
}

export default Product