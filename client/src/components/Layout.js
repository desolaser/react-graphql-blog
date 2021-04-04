import React from 'react'
import { Container } from '@material-ui/core'

import Header from './header'
import Navbar from './navbar'
import Footer from './footer'

const Layout = ({ children }) => {

  return (
    <div>
      <Header />
      <Navbar />
      <Container fixed style={{ minHeight: "100vh", padding: 20 }}>
        {children}
      </Container>
      <Footer />      
    </div>
  )
}

export default Layout