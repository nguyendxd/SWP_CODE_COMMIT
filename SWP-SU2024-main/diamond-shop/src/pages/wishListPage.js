import React from 'react'
import Navbar from '../components/navBar'
import Wishlist from '../components/pageContent/wishListContent'
import Footer from '../components/footer'

export default function WishListPage() {
  return (
    <div>
        <Navbar/>
        <Wishlist/>
        <Footer/>
    </div>
  )
}
