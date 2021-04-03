import React, { Fragment, useState } from 'react'
import { Menu, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import { HomeTwoTone, DeleteTwoTone } from '@ant-design/icons'
import styled from 'styled-components'

const Test = styled(Menu)`
ul > li > a {
  text-align: center;
  font-weight: bold;
  white-space: nowrap;
  position: relative;
}
ul > li:hover > a {
  color: grey;
  text-decoration: underline;
}
`;
function LeftMenu() {
  const [Current, setCurrent] = useState("home")
  const handleClick = (e) => {
    setCurrent(e.key)
  }
  console.log("current:", Current)

  return (
    <>
      <Test>
        <Menu
          onClick={handleClick}
          selectedKeys={Current}
        //  style={{ width: 256 }}
        //mode="inline"
        >

          <Menu.Item key="home">
            <HomeTwoTone /><Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="trash">
            <DeleteTwoTone /><Link to="/trash">Trash</Link>
          </Menu.Item>
        </Menu>
      </Test>
    </>
  )
}

export default LeftMenu
