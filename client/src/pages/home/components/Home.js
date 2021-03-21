import React, { useState, useEffect } from 'react'
import { getProducts } from '../../../api/Product'
import ExampleModal from './shared/ModalLayout'
import { Button, List, Avatar, Space } from 'antd'
import axios from 'axios'
import { Row, Col } from 'antd'

function Home() {
    const [productList, setProductList] = useState([])
    useEffect(() => {
        fetchProduct()
    }, [productList])

    const fetchProduct = async () => {
        const productObject = await getProducts()
        setProductList(productObject.data)
    }
    return (
        <>
          
          <Col xs={24} md={12}>
          {productList &&
                productList
                    .filter((itme) => (itme.status === "active"))
                    .map((item, index) => (
                        <div key={index} id={index} style={{ display: 'inline-flex' }}>
                            <b>{item.name}</b> <span>{item.image_url}</span> <span>{item.expiration_date}</span>
                            <div style={{ display: 'inline-flex', alignItems: 'baseline' }}>
                                <ExampleModal
                                    product_id={item._id}
                                    productName={item.name}
                                    productImage={item.image_url}
                                    productExp={item.expiration_date}
                                />
                                <Button type="primary" onClick={async () => {
                                    console.log("dd")
                                    //await axios.delete(`http://localhost:8080/products/${item._id}`); 
                                    const res = await axios.put(`/products/${item._id}`, {
                                        status: "inactive"
                                    })
                                }}>
                                    delete
                                </Button>

                            </div>

                        </div>
            ))}
          </Col>
        
       
        </>
    )
}

export default Home
