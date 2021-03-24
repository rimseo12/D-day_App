import { Table, Button } from 'antd'
import { useState } from 'react'

function TrashList() {
  const columns = [
    {
      title: 'Product',
      dataIndex: 'product'
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
      <Table rowSelection={handleSelectChange} columns={columns} dataSource={data} />
    </div>
  )
}

export default TrashList
