import React, { Fragment, useState } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { HomeTwoTone, DeleteTwoTone } from '@ant-design/icons'

function LeftMenu() {
  const [Current, setCurrent] = useState("home")
  const handleClick = (e) => {
    setCurrent(e.key)
  }
  console.log("current:", Current)

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={Current}
      style={{ width: 256}}
      mode="inline"
    >
     
      <Menu.Item key="home">
        <HomeTwoTone /><Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="trash">
        <DeleteTwoTone /><Link to="/trash">Trash</Link>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu
