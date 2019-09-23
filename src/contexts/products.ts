import * as React from 'react'
import { createContext } from 'react'
import { ICart, IParams, IProducts } from 'hooks/useProducts'

export interface IStore extends ICart {
  products: IProducts | null,
  onCheckout: (param: ICart['quantityById']) => void,
  onAddToCart: (id: IParams['id'], quantity: IParams['quantity']) => void,
}

// function useProducts() {
//   const [products, setProducts] = useState<any[] | null>(null)
//   const initialCartState = { quantityById: {} }
//   const [cart, setCart] = useState(initialCartState)
//   const productRef = useMemo(() => database.ref('products'), [database])
//   const quantityById = useMemo(() => cart.quantityById, [cart])

//   useEffect(() => productRef.on('value', snapshot => setProducts(snapshot.val())), products)

//   const onCheckout = useCallback(quantityById => {
//     Object.keys(quantityById).forEach(key =>
//       productRef.child(`${key}/inventory`).transaction(inventory => inventory - quantityById[key]))

//     setCart(initialCartState)
//   }, [productRef])

//   const onAddToCart = useCallback((id, quantity) => setCart({
//     quantityById: {
//       ...quantityById,
//       [id]: (quantityById[id] || 0) + quantity
//     }
//   }), [quantityById])

//   return [products, quantityById, onCheckout, onAddToCart]
// }

export const ProductsContext: React.Context<IStore> = createContext({} as IStore)

export const ProductsProvider = ProductsContext.Provider

// export const ProductsProvider: React.FC<IProps> = (props: IProps) => {
//   const [products, quantityById, onCheckout, onAddToCart] = useProducts()

//   const store: IStore = {
//     products,
//     quantityById,
//     onCheckout,
//     onAddToCart,
//   }

//   return (
//     <ProductsContext.Provider value={store}>
//       {props.children}
//     </ProductsContext.Provider>
//   )
// }
