import React from 'react'
import NavBar from '../components/navBar'
import ShoppingCartContent from '../components/pageContent/shoppingCartContent'
import Footer from '../components/footer'

export default function ShoppingCartPage() {
  return (
    <div>
        <NavBar/>
        <ShoppingCartContent/>
        <Footer/>
    </div>
  )
}
