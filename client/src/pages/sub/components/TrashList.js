import { Table, Button, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { getProducts, deleteForever, moveToHome } from '../../../api/Product'

function TrashList() {
  const [trashList, setTrashList] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [loading, setLoading] = useState(false)

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
        return item.hasOwnProperty('image_url') ? (
          <div style={{ display: 'flex'}}>
            <img src={`uploads/${item.image_url}`} style={{ height: 100 }} />
            <div>
              <div style={{ marginBottom: 5 }}>{item.name}</div>
              <div>{item.expiration_date}</div>
            </div>
            <Button 
              type="link"
              onClick={() =>{ handleDeleteForever()}}
              style={{ marginTop: 20 }}
            >
              Delete forever
            </Button>
          </div>
         

        ) : (
          <div style={{ display: 'flex'}}>
            <div style={{ height: 100 }}>No image</div>
            <div>
              <div style={{ marginBottom: 5 }}>{item.name}</div>
              <div>{item.expiration_date}</div>
            </div>
            <Button 
              type="link"
              onClick={() =>{ handleDeleteForever()}}
              style={{ marginTop: 20 }}
            >
              Delete forever
            </Button>
          </div>
        )
      }
    },
    // {
    //   title: '',
    //   dataIndex: 'name'
    // }
  ]

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys)
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
        >
          Delete forever
        </Button>
        <Button 
          type="link"
          onClick={() =>{ handleMoveToHome()}}
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
