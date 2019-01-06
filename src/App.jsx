import React from 'react'
import { hot } from 'react-hot-loader'
import { ProductsProvider } from './contexts/products'
import Cart from './components/Cart'
import List from './components/List'

const App = () =>
  <ProductsProvider>
    <h2>Shopping Cart Example</h2>
    <hr />
    <List />
    <hr />
    <Cart />
  </ProductsProvider>

export default hot(module)(App)