import React, { Fragment, useState } from 'react'
import { Menu, Button } from 'antd'
import { Link } from 'react-router-dom'
import { HomeTwoTone, DeleteTwoTone, MenuFoldOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const BREAK_POINT_MOBILE = 768

const MenuCustomize = styled(Menu)` 
  height: 100vh;
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
  @media (max-width:${BREAK_POINT_MOBILE}px) {
    display: none;
  }
`

const SideMenu = styled.div`
.side-menu-button {
    display: none;
}
@media (max-width: 800px) {
  .side-menu-button {
    display: block;
  }
}
.side-menu-button {
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
}
.side-menu-button .img-box {
  width: 50px;
}
.side-menu-button:hover .side-menu-bar {
  left: 0;
}
.side-menu-bar {
  position: fixed;
  top: 0;
  left: -300px;
  height: 100%;
  width: 180px;
  background-color: #dfdfdf;
  box-sizing: border-box;
  z-index:3;
  transition: left 1s;
}
.side-menu-bar .side-menu-box ul > li {
  position: relative;
  background-color: #dfdfdf;
  margin: 10px;
}
.side-menu-bar .side-menu-box ul > li > div > span {
  margin-right: 10px;
}
.side-menu-bar .side-menu-box > ul {
  margin-top: 40px;
  list-style: none;
  padding-left: 0px;
}
.side-menu-bar .side-menu-box ul > li > a {
  display: block;
  padding: 15px;
  font-weight: bold;
  white-space: nowrap;
}
.side-menu-bar .side-menu-box ul > li:hover > a {
  color: white;
  background-color: #dfdfdf;
}
`
function LeftMenu() {
    const [Current, setCurrent] = useState("home")
    const handleClick = (e) => {
        setCurrent(e.key)
    }

    return (
        <Fragment>
            <MenuCustomize>
                <Menu
                    onClick={handleClick}
                    selectedKeys={Current}
                >

                    <Menu.Item key="home">
                        <HomeTwoTone /><Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="trash">
                        <DeleteTwoTone /><Link to="/trash">Trash</Link>
                    </Menu.Item>
                </Menu>
            </MenuCustomize>

            <SideMenu>
                <div className="side-menu-button">
                    <div className="img-box">
                        <Button type="primary">
                            <MenuFoldOutlined />
                        </Button>
                    </div>
                    <div className="side-menu-bar">
                        <nav className="side-menu-box">
                            <ul>
                                <li>
                                    <div><HomeTwoTone /><Link to="/">Home</Link></div>
                                </li>
                                <li>
                                    <div><DeleteTwoTone /><Link to="/trash">Trash</Link></div>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </SideMenu>
        </Fragment>
    )
}

export default LeftMenu