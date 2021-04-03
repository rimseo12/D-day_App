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
            <div className="log-img">Logo</div>
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
