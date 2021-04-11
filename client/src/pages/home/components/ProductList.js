import React, { useState, useEffect, Fragment } from 'react'
import { Button, Popconfirm, message, List } from 'antd'
import styled from 'styled-components'
import { getProducts, uploadProductImage, postProduct, modifyProduct, deleteProduct } from '../../../api/product'
import ModalLayout from './ModalLayout'
import moment from 'moment'
import Search from './SearchInput'

/*
TODO LIST
-알림 기능 구현 후에 이미지 태그 주석된 거 풀기
-D-day 별로 리스트에 아이콘 표시하기
-무한 스크롤링 구현하기 
*/

const ListCustomize = styled(List)`
  .ant-list-item-meta-content {
    align-self: center;
  }
  .ant-list-item-meta-avatar img {
    width: 233px;
    height: 200px;
  }
`
const RefrashButton = styled.div`
  margin-top: 1rem;
  button {
    float: left;
  }
`
const CreateButton = styled.div`
  margin-top: 1rem;
  margin-bottom: 3rem;
  button {
    float: right;
  }
`
function ProductList() {
  const baseUrl ="https://d-day-api.herokuapp.com"
  const [productList, setProductList] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [visibleCreate, setVisibleCreate] = useState(false)
  const [visibleModify, setVisibleModify] = useState(false)
  const [productId, setProductId] = useState(null)
  const dateFormat = 'YYYY/MM/DD'
  let newList = []

  useEffect(() => {
    fetchProduct()
  }, [])

  const handleSearch = (keyWord) => {
    setIsSearching(true)
    for (let i in productList) {
      let nameToLowerCase = productList[i].name.toLowerCase()
      if (nameToLowerCase.indexOf(keyWord) > -1) {
        newList.push(productList[i])
      }
    }
    if (newList.length === 0) {
      setSearchResult([])
    } else {
      setSearchResult(newList)
    }
  }

  const fetchProduct = async () => {
    try {
      const productObject = await getProducts()
      if (productObject.status === 200) {
        setProductList(productObject.data.filter((item) => item.status === 'active'))
      } else {
        throw new Error(`status code: ${productObject.status}`)
      }
    } catch (error) {
      throw new Error(`서버 통신 중 에러 발생: ${error.message}`)
    }
  }

  let image = null
  const handleUpload = (e) => {
    if (e.target.id === 'img_url') {
      fetchUpload(e.target.files[0])
    }
  }

  const fetchUpload = async (fileName) => {
    const formData = new FormData()
    formData.append('imageName', fileName) //name === route/index.js single()함수 파라미터
    try {
      image = await uploadProductImage(formData)
    } catch (error) {
      throw new Error(`서버 통신 중 에러 발생: ${error.message}`)
    }
  }

  //등록하기
  const handleCreate = async (values) => {
    let productName = values.name
    let expDate = moment.utc(values.expiration_date)
    try {
      const res = await postProduct(productName, image, expDate)
      if (res.status === 200) {
        setVisibleCreate(false)
        fetchProduct()
      } else {
        throw new Error(`status code: ${res.status}`)
      }
    } catch (error) {
      throw new Error(`서버 통신 중 에러 발생: ${error.message}`)
    }
  }

  //수정하기
  const handleModify = async (values, product_id) => {
    let productName = values.name
    let expDate = moment.utc(values.expiration_date)
    try {
      const res = await modifyProduct(product_id, productName, image, expDate)
      if (res.status === 200) {
        setVisibleModify(false)
        fetchProduct()
      } else {
        throw new Error(`status code: ${res.status}`)
      }
    } catch (error) {
      throw new Error(`서버 통신 중 에러 발생: ${error.message}`)
    }
  }

  //삭제하기
  const handleDeleteFromList = async (product_id) => {
    try {
      const res = await deleteProduct(product_id)
      if (res.status === 200) {
        message.success('moved to Trash')
        fetchProduct()
      } else {
        throw new Error(`status code: ${res.status}`)
      }
    } catch (error) {
      throw new Error(`서버 통신 중 에러 발생: ${error.message}`)
    }
  }
  return (
    <Fragment>
      <Search onChangekeyWord={handleSearch} />
      {isSearching && (
        <RefrashButton>
          <Button
            type="primary"
            onClick={() => {
              window.location.replace('/')
            }}
          >
            Refresh
          </Button>
        </RefrashButton>
      )}
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

      <ListCustomize>
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={isSearching ? searchResult : productList}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Fragment>
                  <Button
                    type="link"
                    onClick={() => {
                      setProductId(item._id)
                      setVisibleModify(true)
                    }}
                  >
                    Modify
                  </Button>

                  {productId === item._id
                    && <ModalLayout
                      key={item._id}
                      visible={visibleModify}
                      title="Modify Product"
                      cancelText="Cancel"
                      okText="Modify"
                      productDetail={item}
                      onUpload={handleUpload}
                      onModify={handleModify}
                      onCancel={() => {
                        setVisibleModify(false)
                      }}
                    />
                  }
                </Fragment>,
                <Popconfirm
                  title="Are you sure to delete this item?"
                  onConfirm={() => { 
                    handleDeleteFromList(item._id) 
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link">delete</Button>
                </Popconfirm>
              ]}
            >
              <List.Item.Meta
                avatar={
                  item.image_url
                    ? <img alt={`${item.image_url}`} src={`uploads/${item.image_url}`} />
                    : <img alt="noImage" src={'images/NoImage.png'} />
                }
                title={item.name}
                description={moment(item.expiration_date).format(dateFormat)}
              />
            </List.Item>
          )}
        />
      </ListCustomize>
    </Fragment>
  )
}
export default ProductList
