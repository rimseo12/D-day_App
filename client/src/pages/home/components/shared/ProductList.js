import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Modal, Button, Col, Divider, Input, DatePicker, Form } from 'antd'
import { getProducts } from '../../../../api/Product'
import ModalLayout from './ModalLayout'
import ProductCard from '../../../shared/ProductCard'

function ProductList() {
    const [productList, setProductList] = useState([])

    useEffect(() => {
        fetchProduct()
    }, [productList])

    const fetchProduct = async () => {
        const productObject = await getProducts()
        setProductList(productObject.data)
    }

    const [visible, setVisible] = useState(false)
    let Image = null
    const onUpload = (e) => {
        if (e.target.id === "image_url") {
            handleUpload(e.target.files[0])
        }
    }
    const handleUpload = async (fileName) => {
        const formData = new FormData()
        formData.append("imageName", fileName) //name === route/index.js single()함수 파라미터
        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        }

        const response = await axios.post("/upload", formData, config)
        if (response.status === 200) {
            console.log(response)
            console.log(response.data.data.filename)
            Image = response.data.data.filename
        }

    }

    //등록하기
    const onCreate = async (values) => {
        console.log('Received values of form: ', values, Image)
        await axios.post("/product/add", {
            name: values.name,
            image_url: Image,
            expiration_date: moment.utc(values.expiration_date)
        })
        alert("등록 완료")
        setVisible(false)
    }

    //수정하기
    const onModify = async (values, product_id) => {
        console.log('Received values of form: ', values, Image)
        await axios.put(`/products/${product_id}`, {
            name: values.name,
            image_url: Image,
            expiration_date: moment.utc(values.expiration_date)
        })
        alert("수정 완료")
        setVisible(false)
    }

    return (
        <>
            <ProductCard />
            =====
            <div>
                <Button
                    type="primary"
                    onClick={() => {
                        setVisible(true)
                    }}
                    style={{ float: 'right' }}
                >
                    Add Product
                </Button>
                <ModalLayout
                    visible={visible}
                    title="Add Prodcut"
                    okText="Create"
                    cancelText="Cancel"
                    onUpload={onUpload}
                    onCreate={onCreate}
                    onCancel={() => {
                        setVisible(false)
                    }}
                />
            </div>
            <Col xs={24} md={12}>
                {productList &&
                    productList
                        .filter((item) => (item.status === "active"))
                        .map((item, index) => (
                            <>
                                <Divider />
                                <div key={index} id={index} style={{ display: 'inline-flex' }}>
                                    <b>{item.name}</b> <span>{item.image_url}</span> <span>{item.expiration_date}</span>
                                    <div style={{ display: 'inline-flex', alignItems: 'baseline' }}>
                                            <Button
                                                type="primary"
                                                onClick={() => {
                                                    setVisible(true)
                                                }}
                                            >
                                                Modify/{item.name}
                                            </Button>
                                            <ModalLayout
                                                visible={visible}
                                                title="Modify Product"
                                                okText="Modify"
                                                cancelText="Cancel"
                                                product_id={item._id}
                                                productName={item.name}
                                                productImage={item.image_url}
                                                productExp={item.expiration_date}
                                                onUpload={onUpload}
                                                onModify={onModify}
                                                onCancel={() => {
                                                    setVisible(false)
                                                }}
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

                            </>
                        ))}

            </Col>

        </>
    )
}

export default ProductList
