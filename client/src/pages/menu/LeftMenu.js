import React from 'react'
import { Menu } from 'antd'

function LeftMenu() {
 return(
    <Menu>
      <Menu.Item key="home">
        <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item key="trash">
        <a href="/trash">Trash</a>
      </Menu.Item>
    </Menu>
 )
}

export default LeftMenu
