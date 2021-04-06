import React, { useState, useEffect, Fragment } from 'react'
import { Button, Col, Divider, Popconfirm, message, List, Avatar, Skeleton, Row } from 'antd'
import styled from 'styled-components'
import { getProducts, uploadProductImage, postProduct, modifyProduct, deleteProduct } from '../../../api/product'
import ModalLayout from './ModalLayout'
import moment from 'moment'
import Search from './SearchInput'

const BREAK_POINT_MOBILE = 768;
const BREAK_POINT_TABLET = 992;
const BREAK_POINT_PC = 1200;

const ListCustomize = styled(List)`
  .ant-list-item-meta-content {
    align-self: center;
  }
  .ant-list-item-meta-avatar img {
    width: 233px;
    height: 200px;
  }
`;
const CreateButton = styled.div`
  button {
    float: right;
  }
`;



function ProductList() {
  const [productList, setProductList] = useState([])
  const [newProductList, setNewProductList] = useState([])
  const [visibleCreate, setVisibleCreate] = useState(false)
  const [visibleModify, setVisibleModify] = useState(false)
  const [productId, setProductId] = useState(null)
  const [productName, setProductName] = useState(null)
  const [productImage, setProductImage] = useState(null)
  const [productExp, setProductExp] = useState(null)
  const dateFormat = 'YYYY/MM/DD'

  useEffect(() => {
    fetchProduct()
  }, [])

  let newList = []
  const handleSearch = (keyWord) => {
    //if (keyWord !== undefined && keyWord.trim('') !== "") {
    for (let i in productList) {
      let nameToLowerCase = productList[i].name.toLowerCase()
      if (productList[i].status === "active"
        && nameToLowerCase.indexOf(keyWord) > -1) {
        newList.push(productList[i])
      }
    }
    setNewProductList(newList)
    if (newList.length === 0) {
      alert("검색 결과가 없습니다.")
    }
    //}
  }

  const fetchProduct = async () => {
    const productObject = await getProducts()
    setProductList(productObject.data)
    console.log(productObject.data)
  }

  let image = null
  const handleUpload = (e) => {
    if (e.target.id === "img_url") {
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
    let product_name = values.name
    let exp_date = moment.utc(values.expiration_date)
    //console.log('Received values of form: ', values, image)
    await postProduct(product_name, image, exp_date)
    setVisibleCreate(false)
    fetchProduct()
  }

  //수정하기
  const handleModify = async (values, product_id) => {
    let product_name = values.name
    let exp_date = moment.utc(values.expiration_date)
    //console.log('Received values of form: ', values, image)
    await modifyProduct(product_id, product_name, image, exp_date)
    setVisibleModify(false)
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
      <Search
        onChangekeyWord={handleSearch}
      />
      <br></br>
      <CreateButton>
        <Button
          type="primary"
          onClick={() => {
            setVisibleCreate(true)
          }}
        >
          Add Product
      </Button>
      </CreateButton>

      <ModalLayout
        visible={visibleCreate}
        title="Add Prodcut"
        okText="Create"
        cancelText="Cancel"
        onUpload={handleUpload}
        onCreate={handleCreate}
        onCancel={() => {
          setVisibleCreate(false)
        }}
      />

      {/* <img src={'images/statusUI.png'} style={{ width: 100, height: 100 }} /> 알림기능 완성 후 넣기 */}
      <br></br>
      <br></br>

      <ListCustomize>
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={
            newProductList.length === 0 ? productList : newProductList
          }
          renderItem={item => (
            item.status === "active" &&
            <List.Item
              actions={[
                <>
                  <Button
                    type="link"
                    onClick={() => {
                      setProductId(item._id)
                      setProductName(item.name)
                      setProductImage(item.image_url)
                      setProductExp(item.expiration_date)
                      setVisibleModify(true)
                      console.log("NewDate:", item.expiration_date)
                    }}
                  >
                    Modify
                </Button>
                  {productId &&
                    productId === item._id &&
                    productName === item.name &&

                    <ModalLayout
                      key={item._id}
                      visible={visibleModify}
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
                        setVisibleModify(false)
                      }}
                    />
                  }
                </>
                ,
                <Popconfirm
                  title="Are you sure to delete this item?"
                  onConfirm={() => { handleDeleteFromList(item._id) }}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link">delete</Button>
                </Popconfirm>
              ]}
            >

              <List.Item.Meta
                avatar={
                  item.image_url ?
                    <img
                      alt="logo"
                      src={`uploads/${item.image_url}`}
                    /> :
                    <img
                      alt="noImage"
                      src={'images/NoImage.png'}
                    />
                }
                title={item.name}
                description={moment(item.expiration_date).format(dateFormat)}
              />

            </List.Item>
          )}
        />
      </ListCustomize>
    </>
  )
}

export default ProductList
