import { Table, Button, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { getProducts, deleteForever, deleteIndividual, moveToHome } from '../../../api/product'
import moment from 'moment'

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
    setTrashList(productObject.data)
  }

  const columns = [
    {
      title: 'Product',
      render: item => {
        return (
          <div style={{ display: 'flex' }}>
            { item.hasOwnProperty('image_url') ?
              <img src={`uploads/${item.image_url}`} style={{ height: 100 }} />
              : <img src={'images/NoImage.png'} style={{ height: 100 }} />
            }
            <div>
              <div style={{ marginBottom: 5, fontWeight: 'bold' }}>{item.name}</div>
              <div>{moment(item.expiration_date).format(dateFormat)}</div>
            </div>
            <Button
              id={item._id}
              type="link"
              onClick={handleDeleteIndividual}
              style={{ marginTop: 20 }}
            >
              Delete forever
            </Button>
          </div>

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
      <div style={{ marginBottom: 16, display: 'flex' }}>
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
      </div>
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
