import * as React from 'react'
import { hot } from 'react-hot-loader'
import { ProductsProvider, IStore } from './contexts/products'
import Cart from './components/Cart'
import List from './components/List'
import { useProducts } from './hooks/useProducts'

const App: React.FC = () => {
  const store: IStore = useProducts()

  return (
    <ProductsProvider value={store}>
      <h2>Shopping Cart Example</h2>
      <hr />
      <List />
      <hr />
      <Cart />
    </ProductsProvider>
  )
} 

export default hot(module)(App)