import React, { useState, useEffect } from 'react'
import { Button, Col, Divider, Popconfirm, message } from 'antd'
import { getProducts, uploadProductImage, postProduct, modifyProduct, deleteProduct } from '../../../../api/Product'
import ModalLayout from './ModalLayout'
import moment from 'moment'
import ProductCard from '../../../shared/ProductCard'
import Search from './SearchInput'

function ProductList() {
  
  const [productList, setProductList] = useState([])
  const [visible, setVisible] = useState(false)
  const [productId, setProductId] = useState(null)
  const [productName, setProductName] = useState(null)
  const [productImage, setProductImage] = useState(null)
  const [productExp, setProductExp] = useState(null)
  const dateFormat = 'YYYY/MM/DD'

  useEffect(() => {
    fetchProduct()
  }, [])

  let newProductList = []
  const handleSearch = (keyWord) => {
    if(keyWord !== undefined && keyWord.trim('') !== ""){
      for(let i in productList){
        let regexp = productList[i].name.toLowerCase()
        if( productList[i].status === "active" 
          && regexp.indexOf(keyWord) > -1){
          newProductList.push(productList[i])
        }
      }
      setProductList(newProductList)
    } else {
      fetchProduct()
    } 
  }

  const fetchProduct = async () => {
    const productObject = await getProducts()
    setProductList(productObject.data)
    console.log(productObject.data)
  }

  let image = null
  const handleUpload = (e) => {
    if (e.target.id === "image_url") {
      fetchUpload(e.target.files[0])
    }
  }
  const fetchUpload = async (fileName) => {
    const formData = new FormData()
    formData.append("imageName", fileName) //name === route/index.js single()함수 파라미터 
    image = await uploadProductImage(formData)
  }

  //등록하기
  const handleCreate = async (values) => {
    console.log('Received values of form: ', values, image)
    await postProduct(values, image)
    setVisible(false)
    fetchProduct()
  }

  //수정하기
  const handleModify = async (values, product_id) => {
    console.log('Received values of form: ', values, image)
    await modifyProduct(values, product_id, image)
    setVisible(false)
    fetchProduct()
  }

  //삭제하기
  const handleDeleteFromList = async (product_id) => {
    const res = await deleteProduct(product_id)
    message.success('moved to Trash')
    fetchProduct()
  }

  return (
    <>
      <div>
        <Search
          keyWord={handleSearch}
        />

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
          onUpload={handleUpload}
          onCreate={handleCreate}
          onCancel={() => {
            setVisible(false)
          }}
        />
      </div>
      
      {/* UI수정 할 예정
      <img src={'images/statusUI.png'}  style={{ width: 100, height: 100 }}/> */}

      <Col xs={24} md={12}>
        {productList &&
          productList
            .filter((item) => (item.status === "active"))
            .map((item, index) => (
              <>
                
                <div key={item._id} style={{ display: 'inline-flex', border: '0.0625rem solid #D7E2EB', borderRadius: '0.25rem' }}>
                  {
                    item.image_url ? <img src={`uploads/${item.image_url}`} style={{ width: 100, height: 100 }} /> :
                      <img src={'images/NoImage.png'} style={{ width: 100, height: 100 }} />
                  }

                  <div style={{ marginLeft: 97 }}>
                    <div style={{ marginTop: 10, marginBottom: 33, fontWeight: 'bold' }}>{item.name}</div>
                    <div>{moment(item.expiration_date).format(dateFormat)}</div>
                  </div>
                  <div style={{ marginTop: 60 }}>
                    <Button
                      type="link"
                      onClick={() => {
                        setProductId(item._id)
                        setProductName(item.name)
                        setProductImage(item.image_url)
                        setProductExp(item.expiration_date)
                        setVisible(true)
                      }}
                    >
                      Modify
                    </Button>
                    {productId &&
                      productId === item._id &&
                      <ModalLayout
                        key={item._id} 
                        visible={visible}
                        title="Modify Product"
                        cancelText="Cancel"
                        okText="Modify"
                        product_id={productId}
                        productName={productName}
                        productImage={productImage}
                        productExp={productExp}
                        onUpload={handleUpload}
                        onModify={handleModify}
                        onCancel={() => {
                          setVisible(false)
                        }}
                      />
                    }

                    <Popconfirm
                      title="Are you sure to delete this item?"
                      onConfirm={() => { handleDeleteFromList(item._id) }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="link">delete</Button>
                    </Popconfirm>

                  </div>
                </div>
              </>
            ))
        }
      </Col>
    </>
  )
}

export default ProductList
