import React from 'react'
import HeaderComp from '../../components/globalComp/header'
import FormData from '../../components/contactComp/forms'

export default function ContactPage() {
  return (
    <div>
     <HeaderComp h1='Contact Us' />
     <FormData />
    </div>
  )
}
