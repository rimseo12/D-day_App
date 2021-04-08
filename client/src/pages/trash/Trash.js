import { Table, Button, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { getProducts, deleteForever, deleteIndividual, moveToHome } from '../../api/product'
import moment from 'moment'
import styled from 'styled-components'

const HeaderContainer = styled.div`
  margin-bottom: 16px;
  display: flex;
  .ant-btn {
    align-self: flex-end;
  }
`
const ListWrapper = styled.div`
  display: flex;
  img {
    height: 100px;
  }
  button {
    margin: 30px;
  }
`
const ProductInfo = styled.div`
  margin-left: 10px;
  align-self: center;
`
const ProductName = styled.div`
  margin-bottom: 5px;
  font-weight: bold;
`
function TrashList() {
  const [trashList, setTrashList] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [checked, setChecked] = useState(true)
  const dateFormat = 'YYYY/MM/DD'

  useEffect(() => {
    fetchProduct()
  }, [])

  const fetchProduct = async () => {
    try {
      const productObject = await getProducts()
      if (productObject.status === 200) {
        setTrashList(productObject.data)
      } else {
        throw new Error(`status code: ${productObject.status}`)
      }
    } catch (error) {
      throw new Error(`서버 통신 중 에러 발생: ${error.message}`)
    }
  }

  const columns = [
    {
      title: 'Product',
      render: item => {
        return (
          <ListWrapper>
            { item.hasOwnProperty('image_url')
              ? <img src={`uploads/${item.image_url}`} />
              : <img src={'images/NoImage.png'} />
            }
            <ProductInfo>
              <ProductName>{item.name}</ProductName>
              <div>{moment(item.expiration_date).format(dateFormat)}</div>
            </ProductInfo>
            <Button
              id={item._id}
              type="link"
              onClick={handleDeleteIndividual}
            >
              Delete forever
            </Button>
          </ListWrapper>
        )
      }
    }
  ]

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys)
      if (selectedRows.length !== 0) {
        setChecked(false)
      } else {
        setChecked(true)
      }
    }
  }

  const handleDeleteIndividual = async (e) => {
    const productId = e.target.parentNode.id
    try {
      const res = await deleteIndividual(productId)
      if (res.status === 200) {
        message.success('deleted forever')
        fetchProduct()
      } else {
        throw new Error(`status code: ${res.status}`)
      }
    } catch (error) {
      throw new Error(`서버 통신 중 에러 발생: ${error.message}`)
    }
  }

  const handleDeleteForever = async () => {
    try {
      const res = await deleteForever(selectedRowKeys)
      if (res.status === 200) {
        message.success('deleted forever')
        fetchProduct()
      } else {
        throw new Error(`status code: ${res.status}`)
      }
    } catch (error) {
      throw new Error(`서버 통신 중 에러 발생: ${error.message}`)
    }
  }

  const handleMoveToHome = async () => {
    try {
      const res = await moveToHome(selectedRowKeys)
      if (res.status === 200) {
        message.info('moved to home')
        fetchProduct()
      } else {
        throw new Error(`status code: ${res.status}`)
      }
    } catch (error) {
      throw new Error(`서버 통신 중 에러 발생: ${error.message}`)
    }
  }

  return (
    <div>
      <HeaderContainer>
        <Button
          type="link"
          onClick={() => { handleDeleteForever() }}
          disabled={checked}
        >
          Delete forever
        </Button>
        <Button
          type="link"
          onClick={() => { handleMoveToHome() }}
          disabled={checked}
        >
          Move to home
        </Button>
      </HeaderContainer>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        rowKey={'_id'}
        dataSource={trashList &&
          trashList
            .filter((item) => (item.status === "inactive"))
        }
      />
    </div>
  )
}

export default TrashList
