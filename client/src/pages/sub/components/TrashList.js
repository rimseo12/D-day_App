import { Table, Button } from 'antd'
import { useEffect, useState } from 'react'
import { getProducts } from '../../../api/Product'

function TrashList() {
  const [trashList, setTrashList] = useState([])
  useEffect(() => {
    fetchProduct()
  },[])
  const fetchProduct = async() => {
    const productObject = await getProducts()
    setTrashList(productObject.data)
  }
  const columns = [
    // {
    //   title: 'Name',
    //   dataIndex: 'name'
    // },
    {
      title: 'Product',
      dataIndex: 'name'
    }
  ]

  const data = []
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    })
  }
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSelectChange = () => {
    setSelectedRowKeys(rowSelection.selectedRowKeys)
  }
  return(
    <div>
      <div style={{ marginBottom: 16, display: 'flex' }}>
        <Button type="primary">
          Delete forever
        </Button>
      </div>
      <Table 
      rowSelection={handleSelectChange} 
      columns={columns}
      //dataSource={data} 
      dataSource={trashList && 
        trashList.filter((item) => (item.status === "inactive"))} 
      />
    </div>
  )
}

export default TrashList
