import './App.css'
import React, { Suspense, useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Layout, Avatar, Badge, Row, Col } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import styled, { createGlobalStyle } from 'styled-components'
import Home from './pages/home/Home'
import Trash from './pages/trash/components/Trash'
import LeftMenu from './pages/menu/LeftMenu'
import moment from 'moment'

const AppContainer = styled.div`
* {
  box-sizing: border-box;
}
`;
const HeaderContainer = styled.div`
  padding: 1 rem;
  border: 1px soild red;
`;
const ListWrapper = styled.div`
  width: 20%;
  float: left;
  padding: 15px;
  margin-left: 15px;
  border: 1px solid red;
`;
// Main 컴포넌트
const Main = styled.div`
  width: 70%;
  float: left;
  padding: 15px;
  border: 1px solid red;
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
    <AppContainer>
      <div className="App">
        <HeaderContainer>
          <div>
            <Badge count={count}>
              <Avatar icon={<UserOutlined />} />
            </Badge>
          </div>
        </HeaderContainer>
        <ListWrapper>
          <div>
            <LeftMenu />
          </div>
        </ListWrapper>
        <Main>
          <div>
            <Suspense fallback={(<div>Loading...</div>)}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/trash" component={Trash} />
              </Switch>
            </Suspense>
          </div>
        </Main>
        {/* <Header style={{ background: '#f0f2f5', textAlign: 'right', padding: 0, marginRight: 18, borderBottom: 'groove' }}>
            header
            
          </Header> */}
        {/* <Content style={{ textAlign: '-webkit-center', margin: '24px 16px 0' }}>
            
          </Content> */}
        {/* <Footer style={{ textAlign: 'center' }}>Created by Seorim</Footer> */}
      </div>
    </AppContainer>
  )
}

export default App
