import './App.css'
import React, { Suspense, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Layout, Avatar, Badge } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import styled, { createGlobalStyle } from 'styled-components'
import Home from './pages/home/Home'
import Trash from './pages/trash/components/Trash'
import LeftMenu from './pages/menu/LeftMenu'
import MobileLeftMenu from './pages/menu/MobileLeftMenu'
import moment from 'moment'

const BREAK_POINT_MOBILE = 768;
const AppContainer = styled.div`
* {
  box-sizing: border-box;
}
`;
const HeaderContainer = styled.div`
  padding: 1 rem;
  // border: 1px soild red;
  .log-img{
    font-size: xx-large;
    font-weight: bolder;
    margin-top: 20px;
    text-align: center;
    position: relative;
  }
`;
const ListWrapper = styled.div`
  width: calc(100%/7);
  float: left;
  padding: 15px;
  margin-left: 15px;
  // border: 1px solid red;
  @media (max-width:${BREAK_POINT_MOBILE}px) {
    display: none;
  }
`;
// Main 컴포넌트
const Main = styled.div`
  width: 70%;
  float: left;
  padding: 15px;
  // border: 1px solid red;
  @media (max-width:${BREAK_POINT_MOBILE}px) {
    width: 100%;
  }
`;


function App() {
  const [count, setCount] = useState(0)

  return (
    <AppContainer>
      <div className="App">
        <HeaderContainer>
          <div>
            <div className="log-img">D-day</div>
            {/* <Badge count={count}>
              <Avatar icon={<UserOutlined />} />
            </Badge>  알림 기능 구현 시 주석 풀기 */}
          </div>
        </HeaderContainer>
        {/*메뉴 모바일 기준으로 구분*/}
        <ListWrapper>
          <div>
            <LeftMenu />
          </div>
        </ListWrapper>
        <MobileLeftMenu />
        {/*메뉴*/}
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
      </div>
    </AppContainer>
  )
}

export default App
