import { Table, Button, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { getProducts, deleteForever, moveToHome } from '../../../api/Product'
import moment from 'moment'

function TrashList() {
  const [trashList, setTrashList] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [checked, setChecked] = useState(true)
  const dateFormat = 'YYYY/MM/DD'

  useEffect(() => {
    fetchProduct()
  },[])

  const fetchProduct = async() => {
    const productObject = await getProducts()
    setTrashList(productObject.data)
    console.log(productObject.data)
  }

  const columns = [
    {
      title:'Product',
      render: item => {
        return (
          <div style={{ display: 'flex'}}>
            { item.hasOwnProperty('image_url')? 
                <img src={`uploads/${item.image_url}`} style={{ height: 100 }} />
                : <img src={'uploads/noImage.png'} style={{ height: 100 }} /> 
            }
            <div>
              <div style={{ marginBottom: 5, fontWeight: 'bold' }}>{item.name}</div>
              <div>{moment(item.expiration_date).format(dateFormat)}</div>
            </div>
            <Button
              id={item._id}
              type="link"
              onClick={() =>{ handleDeleteForever()}}
              style={{ marginTop: 20 }}
              disabled={checked}
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
      setChecked(false)
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
  }

  const handleDeleteForever = async() => {
    await deleteForever(selectedRowKeys)
    message.success('deleted forever')
    fetchProduct()
  }

  const handleMoveToHome = async() => {
    await moveToHome(selectedRowKeys)
    message.info('moved to home')
    fetchProduct()
  }

  return(
    <div>
      <div style={{ marginBottom: 16, display: 'flex' }}>
        <Button 
          type="link"
          onClick={() =>{ handleDeleteForever()}}
          disabled={checked}
        >
          Delete forever
        </Button>
        <Button 
          type="link"
          onClick={() =>{ handleMoveToHome()}}
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
