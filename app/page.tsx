import Feature from '@/components/landing/feature'
import Hero from '@/components/landing/hero'
import Intrigation from '@/components/landing/intrigaion'
import NavBar from '@/components/landing/nav'
import Price from '@/components/landing/price'
import SocialProof from '@/components/landing/socialproof'
import React from 'react'

function page() {
  return (
    <main className='w-full flex flex-col relative'>
      <NavBar/>
      <Hero/>
      <SocialProof/>
      <Feature/>
      <Intrigation/>
      <Price/>
    </main>
  )
}

export default page
