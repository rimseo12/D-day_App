import './App.css'
import React, { Suspense, useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Layout, Avatar, Badge } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import styled, { createGlobalStyle } from 'styled-components'
import Home from './pages/home/Home'
import Trash from './pages/trash/components/Trash'
import LeftMenu from './pages/menu/LeftMenu'
import moment from 'moment'
import { getProducts } from './api/product'

const calcWidthPercent = span => {
  if (!span) return;

  const width = (span / 12) * 100;
  return width;
};

const BREAK_POINT_MOBILE = 768;
const BREAK_POINT_TABLET = 992;
const BREAK_POINT_PC = 1200;

const Global = createGlobalStyle`
.ant-layout-sider-children {
  float: left;
  minHeight: '100vh';
  width: ${({ xs }) => (xs ? `${calcWidthPercent(xs)}%` : `100%`)};
  padding: 1rem;

  @media only screen and (min-width: ${BREAK_POINT_MOBILE}px) {
    width: ${({ sm }) => sm && `${calcWidthPercent(sm)}%`};
  }
  @media only screen and (min-width: ${BREAK_POINT_TABLET}px) {
    width: ${({ md }) => md && `${calcWidthPercent(md)}%`};
  }
  @media only screen and (min-width: ${BREAK_POINT_PC}px) {
    width: ${({ lg }) => lg && `${calcWidthPercent(lg)}%`};
  }
}
`;

function App() {
  const { Header, Footer, Sider, Content } = Layout
  const [count, setCount] = useState(0)
  const list = []
  //let date = new Date()
  //console.log("res:", moment(date.getTime()).add("-1", "d").format("YYYY/MM/DD"))
  // useEffect(() => {
  //   fetchProduct()
  // }, [])

  // const fetchProduct = async () => {
  //   const productObject = await getProducts()
  //   list.push(productObject.data.expiration_date)
  // }
  var a = moment(); //2021.03.30
  var b = a.clone().add('-1', 'd'); //2021.03.29
  console.log(a.format("YYYY.MM.DD"));
  console.log(b.format("YYYY.MM.DD"));
  console.log(a.diff(b, 'days')); //일 단위로 날짜 차이 계산
  console.log(list)
  // for (let val of list) {
  //   let date = moment(val).format("YYYY/MM/DD")
  //   console.log(date.format("YYYY/MM/DD"))
  //   console.log(a.format("YYYY/MM/DD"))
  //   console.log(a.diff(date, 'days'))
  // }

  return (
    <div className="App">
      <Layout>
        {/* <Global> */}
        <Sider>
          <div>Logo</div>
          <div><LeftMenu /></div>
        </Sider>
        {/* </Global> */}

        <Layout>
          <Header style={{ background: '#f0f2f5', textAlign: 'right', padding: 0, marginRight: 18, borderBottom: 'groove' }}>
            header
            <Badge count={count}>
              <Avatar icon={<UserOutlined />} />
            </Badge>
          </Header>
          <Content style={{ textAlign: '-webkit-center', margin: '24px 16px 0' }}>
            <Suspense fallback={(<div>Loading...</div>)}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/trash" component={Trash} />
              </Switch>
            </Suspense>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Created by Seorim</Footer>
        </Layout>

      </Layout>
    </div>
  )
}

export default App
