import React from 'react'
import OrderConfirmation from '../components/pageContent/checkoutComplete'
import Footer from '../components/footer'
import NavBar from '../components/navBar'

export default function CheckoutCompletePage() {
  return (
    <div>
        {/* <NavBar/> */}
        <OrderConfirmation/>
        <Footer/>
    </div>
  )
}
