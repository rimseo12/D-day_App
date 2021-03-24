import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Modal, Button, Col, Divider, Input, DatePicker, Form } from 'antd'
import { getProducts, uploadProductImage, postProduct, modifyProduct} from '../../../../api/Product'
import ModalLayout from './ModalLayout'
import ProductCard from '../../../shared/ProductCard'

function ProductList() {
  const [productList, setProductList] = useState([])

  useEffect(() => {
    fetchProduct()
  }, [])

  const fetchProduct = async () => {
    const productObject = await getProducts()
    console.log(productObject)
    //setProductList(productObject.data) //기존상품들, 새로추가된 상품0
  }


  const [visible, setVisible] = useState(false)
  let image = null
  const onUpload = (e) => {
    if (e.target.id === "image_url") {
        handleUpload(e.target.files[0])
    }
  }
  const handleUpload = async (fileName) => {
    const formData = new FormData()
    formData.append("imageName", fileName) //name === route/index.js single()함수 파라미터 
    image = await uploadProductImage(formData)
  }

  //생성 modal 호출
  const handleClickFromCreate = (visible, title, okText, cancelText, onUpload, onCreate, onCancel) => {
    setVisible(true)
      return <ModalLayout
            visible={visible}
            title={title}
            okText={okText}
            cancelText={cancelText}
            onCreate={onCreate}
            onUpload={onUpload}
            onCancel={() => {
                setVisible(false)
            }}
      />
  }

  //수정 modal 호출
  const hanldeClickFromModify = (title, okText, cancelText, productId, productName, productImage, productExp) => {
    setVisible(true)
        return <ModalLayout
            visible={visible}
            title={title}
            okText={okText}
            cancelText={cancelText}
            product_id={productId}
            productName={productName}
            productImage={productImage}
            productExp={productExp}
            onUpload={onUpload}
            onModify={onModify}
            onCancel={() => {
                setVisible(false)
            }}
    />
  }

  //등록하기
  const onCreate = async (values) => {
    console.log('Received values of form: ', values, image)
    await postProduct(values, image)
    alert("등록 완료")
    setVisible(false)
  }

  //수정하기
  const onModify = async (values, product_id) => {
    console.log('Received values of form: ', values, image)
    await modifyProduct(values, product_id, image)
    alert("수정 완료")
    setVisible(false)
  }

  return (
    <>
      {/* <ProductCard /> */}
      =====================
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
                            <img src={`uploads/${item.image_url}`} style={{ height: 100 }} />
                            <b>{item.name}</b>
                            <span>{item.image_url}</span>
                            <span>{item.expiration_date}</span>
                            <div style={{ display: 'inline-flex', alignItems: 'baseline' }}>
                            <Button
                                type="primary"
                                // onClick={() => {
                                //     setVisible(true)
                                // }}
                                onClick={
                                    hanldeClickFromModify("Modify Product",
                                                    "Modify",
                                                    "Cancel",
                                                    item._id,
                                                    item.name,
                                                    item.image_url,
                                                    item.expiration_date)}
                            >
                                Modify/{item.name}
                            </Button>


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
