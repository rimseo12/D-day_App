import React, { Fragment, useState } from 'react'

import ProductList from './shared/ProductList'
import SearchInput from './shared/SearchInput'

function Home() {
  return (
    <Fragment>
      {/* <SearchInput/> */}
      <ProductList/>
    </Fragment>
  )
}

export default Home
