import { Table, Button, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { getProducts, deleteForever, deleteIndividual, moveToHome } from '../../../api/product'
import moment from 'moment'
import styled from 'styled-components'

const HeaderContainer = styled.div`
  margin-bottom: 16px;
  display: flex;
  .ant-btn {
    align-self: flex-end;
  }
`;

const ListWrapper = styled.div`
  display: flex;

  img {
    height: 100px;
  }
`;

const ProductInfo = styled.div`
  margin-left: 10px;
  align-self: center;
  .product_name {
    margin-bottom: 5px;
    font-weight: bold;
  }
`;

function TrashList() {
  const [trashList, setTrashList] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [checked, setChecked] = useState(true)
  const dateFormat = 'YYYY/MM/DD'

  useEffect(() => {
    fetchProduct()
  }, [])

  const fetchProduct = async () => {
    const productObject = await getProducts()
    if (productObject.status === 200) {
      setTrashList(productObject.data)
    }
  }

  const columns = [
    {
      title: 'Product',
      render: item => {
        return (
          <ListWrapper>
            { item.hasOwnProperty('image_url') ?
              <img src={`uploads/${item.image_url}`} />
              : <img src={'images/NoImage.png'} />
            }
            <ProductInfo>
              <div className="product_name">{item.name}</div>
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
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
  }

  const handleDeleteIndividual = async (e) => {
    const product_id = e.target.parentNode.id
    await deleteIndividual(product_id)
    message.success('deleted forever')
    fetchProduct()
  }

  const handleDeleteForever = async () => {
    await deleteForever(selectedRowKeys)
    message.success('deleted forever')
    fetchProduct()
  }

  const handleMoveToHome = async () => {
    await moveToHome(selectedRowKeys)
    message.info('moved to home')
    fetchProduct()
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
