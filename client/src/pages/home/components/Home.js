import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Col, Button, List, Avatar, Space } from 'antd'
import ModalLayout from './shared/ModalLayout'
import ProductList from './shared/ProductList'
//이 화면에서만 가지고 있음-추가 버튼, 필터링
//렌더링 할 부분- 카드 틀(shared/ProductCard.js)- 리스트(ProductList.js)
function Home() {
    

    
  return (
    <>
        
        
        <ProductList />
    </>
  )
}

export default Home
