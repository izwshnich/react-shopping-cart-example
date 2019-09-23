import { useState, useMemo, useEffect, useCallback } from 'react'
import { database } from 'plugins/firebase'

export interface IProduct {
  id: string,
  inventory: number,
  name: string,
  price: number,
}

export interface IProducts {
  [id: string]: IProduct
}

export interface ICart {
  quantityById: {
    [id: string]: any
  }
}

export interface IParams {
  id: string,
  quantity: number,
}

export function useProducts() {
  const [products, setProducts] = useState<IProducts | null>(null)
  const initialCartState: ICart = { quantityById: {} }
  const [cart, setCart] = useState<ICart>(initialCartState)
  const productRef = useMemo(() => database.ref('products'), [database])
  const quantityById = useMemo(() => cart.quantityById, [cart])

  useEffect(() => {
    productRef.on('value', snapshot => {
      if (snapshot) {
        setProducts(snapshot.val())
      }
    })
  }, [productRef])

  const onCheckout = useCallback((quantities: ICart['quantityById']) => {
    Object.keys(quantities).forEach(key =>
      productRef.child(`${key}/inventory`).transaction(inventory => inventory - quantities[key]))

    setCart(initialCartState)
  }, [productRef])

  const onAddToCart = useCallback<(id: IParams['id'], quantity: IParams['quantity']) => void>((id, quantity) => setCart({
    quantityById: {
      ...quantityById,
      [id]: (quantityById[id] || 0) + quantity
    }
  }), [quantityById])

  return {
    products,
    quantityById,
    onCheckout,
    onAddToCart
  }
}
