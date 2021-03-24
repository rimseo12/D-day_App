import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Modal, Button, Col, Divider, Input, DatePicker, Form, Popconfirm, message } from 'antd'
import { getProducts, uploadProductImage, postProduct, modifyProduct, deleteProduct} from '../../../../api/Product'
import ModalLayout from './ModalLayout'
import ProductCard from '../../../shared/ProductCard'

function ProductList() {
  const [productList, setProductList] = useState([])

  useEffect(() => {
    fetchProduct()
  }, [])

  const fetchProduct = async () => {
    const productObject = await getProducts()
    setProductList(productObject.data)
  }

  const [visible, setVisible] = useState(false)
  const [name, setName] =useState(null)
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
  const handleClickFromCreate = () => {
    setVisible(true)
  }

  //수정 modal 호출
  const hanldeClickFromModify = (productName) => {
    setVisible(true)
    setName(productName)
    
    //alert(productName)
  }

  //등록하기
  const handleCreate = async (values) => {
    console.log('Received values of form: ', values, image)
    await postProduct(values, image)
    setVisible(false)
    fetchProduct()
  }

  //수정하기
  const onModify = async (values, product_id) => {
    console.log('Received values of form: ', values, image)
    await modifyProduct(values, product_id, image)
    alert("수정 완료")
    setVisible(false)
  }

  //삭제하기
  const handleDeleteFromList = async(product_id) => {
    const res = await deleteProduct(product_id)
    //console.log(res)
   
    message.success('moved to Trash')
    fetchProduct()
    
  }

  return (
    <>
      {/* <ProductCard /> */}
      =====================
        <div>
          <Button
            type="primary"
            onClick={() => {
                handleClickFromCreate()
                //setVisible(true)
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
            onCreate={handleCreate}
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
                            {
                                item.image_url? <img src={`uploads/${item.image_url}`} style={{ height: 100 }} />:
                                <>No image</>
                            }
                            
                            <b>{item.name}</b>
                            <span>{item.image_url}</span>
                            <span>{item.expiration_date}</span>
                            <div style={{ display: 'inline-flex', alignItems: 'baseline' }}>
                            <Button
                                type="primary"
                                onClick={()=>{
                                    //setVisible(true)
                                    hanldeClickFromModify(item.name)
                                }}
                            >
                                Modify
                            </Button>
                            {/* <ModalLayout
                              visible={visible}
                              title="Modify Product"
                              okText="Modify"
                              cancelText="Cancel"
                              productName={name}
                              onUpload={onUpload}
                              onCreate={onCreate}
                              onCancel={() => {
                                setVisible(false)
                            }}
                            /> */}

                            <Popconfirm
                                title="Are you sure to delete this item?"
                                onConfirm={()=>{handleDeleteFromList(item._id)}}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button type="primary">delete</Button>
                            </Popconfirm>
                            

                            </div>

                        </div>
                        </>
                ))}
      </Col>
    </>
  )
}

export default ProductList
